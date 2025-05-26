import { TranslationService } from './lib/translation/index'
import { TranslationCache } from './lib/storage/index'
import { DOMUtils } from './lib/dom'
import { languages } from './languages'
import { DEFAULT_CONFIG, BATCH_SIZE } from './constants'
import type { Language, TranslationConfig } from './types'
import widgetTemplate from './widget.html?raw'
// import widget2Template from './widget.html?raw'
interface WidgetElements {
    trigger: HTMLDivElement | null
    dropdown: HTMLDivElement | null
    searchInput: HTMLInputElement | null
    clearSearch: HTMLDivElement | null
    languageItems: NodeListOf<HTMLDivElement> | null
    loadingIndicator: HTMLDivElement | null
}

export class TranslationWidget {
    private config: Required<TranslationConfig>
    private translationService: TranslationService
    private currentLanguage: string
    private widget: HTMLDivElement
    private elements: WidgetElements

    constructor(publicKey: string, config: Partial<TranslationConfig> = {}) {
        this.config = { ...DEFAULT_CONFIG, ...config }
        this.translationService = new TranslationService(
            publicKey,
            new TranslationCache()
        )
        this.currentLanguage = this.config.pageLanguage
        this.widget = document.createElement('div')
        this.elements = {
            trigger: null,
            dropdown: null,
            searchInput: null,
            clearSearch: null,
            languageItems: null,
            loadingIndicator: null
        }
        this.initialize()
    }

    private initialize(): void {
        if (!this.validateConfig()) return
        this.createWidget()
        this.setupEventListeners()
    }

    private validateConfig(): boolean {
        if (!this.translationService) {
            console.error(
                'Translation service is required to initialize the translation widget'
            )
            return false
        }
        return true
    }

    private createWidget(): void {
        const currentLanguageLabel = this.getCurrentLanguageLabel()
        this.widget.className = 'translate-widget'
        this.widget.innerHTML = this.createWidgetHTML(currentLanguageLabel)
        document.body.appendChild(this.widget)

        // Cache element references
        this.elements = {
            trigger: this.widget.querySelector<HTMLDivElement>('.widget-trigger'),
            dropdown: this.widget.querySelector<HTMLDivElement>('.widget-dropdown'),
            searchInput: this.widget.querySelector<HTMLInputElement>('.search-input'),
            clearSearch: this.widget.querySelector<HTMLDivElement>('.clear-search'),
            languageItems: this.widget.querySelectorAll<HTMLDivElement>('.language-item'),
            loadingIndicator: this.widget.querySelector<HTMLDivElement>('.loading-spinner')
        }
    }

    private getCurrentLanguageLabel(): string {
        return (
            languages.find(
                (language: Language) => language.code === this.currentLanguage
            )?.native || 'English'
        )
    }

    private createWidgetHTML(currentLanguageLabel: string): string {
        const languageOptions = this.createLanguageOptions()
        return widgetTemplate
            .replace('{{languageOptions}}', languageOptions)
            .replace('{{currentLanguageLabel}}', currentLanguageLabel)
    }

    private createLanguageOptions(): string {
        const currentLang = this.currentLanguage
        const currentLanguage = languages.find(
            (lang: Language) => lang.code === currentLang
        )
        const otherLanguages = languages
            .filter((lang: Language) => lang.code !== currentLang)
            .sort((a: Language, b: Language) =>
                a.native.localeCompare(b.native)
            )

        if (!currentLanguage) return ''

        return `
      <option class="translate-target-language" value="${currentLang}">${
            currentLanguage.native
        }</option>
      ${otherLanguages
          .map(
              (lang: Language) =>
                  `<option class="translate-target-language" value="${lang.code}">${lang.native}</option>`
          )
          .join('')}
    `
    }

    private setupEventListeners(): void {
        const {
            trigger,
            dropdown,
            searchInput,
            clearSearch,
            languageItems,
            loadingIndicator
        } = this.elements

        if (!trigger || !dropdown || !searchInput || !clearSearch || !languageItems) {
            console.error('Failed to find required elements')
            return
        }

        // Toggle dropdown
        trigger.addEventListener('click', () => {
            dropdown.classList.toggle('open')
            const isOpen = dropdown.classList.contains('open')
            trigger.setAttribute('aria-expanded', isOpen.toString())
            if (isOpen) {
                searchInput.focus()
            }
        })

        // Close dropdown when clicking outside
        document.addEventListener('click', (e: MouseEvent) => {
            if (!(e.target as Element).closest('.translation-widget')) {
                dropdown.classList.remove('open')
                trigger.setAttribute('aria-expanded', 'false')
            }
        })

        // Search functionality
        searchInput.addEventListener('input', () => {
            const hasValue = searchInput.value.length > 0
            clearSearch.classList.toggle('visible', hasValue)
        })

        clearSearch.addEventListener('click', () => {
            searchInput.value = ''
            clearSearch.classList.remove('visible')
            searchInput.focus()
        })

        // Language selection
        languageItems.forEach(item => {
            item.addEventListener('click', async () => {
                // Remove selected class from all items
                languageItems.forEach(i => {
                    i.classList.remove('selected')
                    i.setAttribute('aria-selected', 'false')
                })

                // Add selected class to clicked item
                item.classList.add('selected')
                item.setAttribute('aria-selected', 'true')

                // Update trigger text
                const langName = item.querySelector('.language-name')?.textContent
                const langCode = item.querySelector('.language-code')?.textContent
                const triggerSpan = trigger.querySelector('span')
                const triggerBadge = trigger.querySelector('.language-badge')

                if (triggerSpan && langName) {
                    triggerSpan.textContent = langName
                }
                if (triggerBadge && langCode) {
                    triggerBadge.textContent = langCode
                }

                // Close dropdown
                dropdown.classList.remove('open')
                trigger.setAttribute('aria-expanded', 'false')

                // Handle translation
                if (langCode && langCode !== this.currentLanguage) {
                    if (loadingIndicator) {
                        loadingIndicator.style.display = 'flex'
                    }
                    try {
                        await this.translatePage(langCode)
                        this.currentLanguage = langCode
                    } catch (error) {
                        console.error('Translation error:', error)
                        alert('An error occurred during translation. Please try again.')
                    } finally {
                        if (loadingIndicator) {
                            loadingIndicator.style.display = 'none'
                        }
                    }
                }
            })
        })

        // Keyboard navigation
        document.addEventListener('keydown', (e: KeyboardEvent) => {
            if (!dropdown.classList.contains('open')) return

            if (e.key === 'Escape') {
                dropdown.classList.remove('open')
                trigger.setAttribute('aria-expanded', 'false')
                trigger.focus()
            }
        })
    }

    private async translatePage(targetLang: string): Promise<void> {
        const nodes = DOMUtils.getTranslatableNodes()
        const batches = DOMUtils.createBatches(nodes, BATCH_SIZE)

        await Promise.all(
            batches.map(batch => this.processBatch(batch, targetLang))
        )
    }

    private async processBatch(
        batch: Node[],
        targetLang: string
    ): Promise<void> {
        const textsToTranslate: string[] = []
        const batchNodes: Node[] = []

        batch.forEach((node: Node) => {
            if (node.nodeType !== Node.TEXT_NODE) return

            const parent = node.parentElement
            if (!parent) return

            const textToTranslate = this.getTextToTranslate(
                node as Text,
                parent,
                targetLang
            )
            if (textToTranslate) {
                textsToTranslate.push(textToTranslate)
                batchNodes.push(node)
            }
        })

        if (textsToTranslate.length > 0) {
            const translatedTexts =
                await this.translationService.translateBatchText(
                    textsToTranslate,
                    targetLang
                )
            translatedTexts.forEach((translatedText: string, index: number) => {
                if (batchNodes[index].nodeType === Node.TEXT_NODE) {
                    batchNodes[index].textContent = translatedText
                }
            })
        }
    }

    private getTextToTranslate(
        node: Text,
        parent: HTMLElement,
        targetLang: string
    ): string | null {
        if (!parent.hasAttribute('data-original-text')) {
            const originalText = node.textContent?.trim()
            if (originalText) {
                parent.setAttribute('data-original-text', originalText)
                return originalText
            }
        } else {
            const textToTranslate = node.textContent?.trim()
            if (this.currentLanguage !== 'en' && targetLang !== 'en') {
                return parent.getAttribute('data-original-text')
            }
            return textToTranslate || null
        }
        return null
    }
}
