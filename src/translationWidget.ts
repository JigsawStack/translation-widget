import { TranslationService } from './translationService'
import { TranslationCache } from './translationCache'
import { DOMUtils } from './domUtils'
import { languages } from './languages'
import { DEFAULT_CONFIG, BATCH_SIZE } from './constants'
import type { Language, TranslationConfig } from './types'

interface WidgetElements {
    translateButton: HTMLButtonElement | null
    popup: HTMLDivElement | null
    closeButton: HTMLButtonElement | null
    languageSelect: HTMLSelectElement | null
    resetButton: HTMLButtonElement | null
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
            translateButton: null,
            popup: null,
            closeButton: null,
            languageSelect: null,
            resetButton: null,
            loadingIndicator: null,
        }
        this.initialize()
    }

    private initialize(): void {
        if (!this.validateConfig()) return

        // this.injectStyles()
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
            translateButton:
                this.widget.querySelector<HTMLButtonElement>(
                    '.translate-button'
                ),
            popup: this.widget.querySelector<HTMLDivElement>(
                '.translate-popup'
            ),
            closeButton:
                this.widget.querySelector<HTMLButtonElement>(
                    '.translate-close'
                ),
            languageSelect:
                this.widget.querySelector<HTMLSelectElement>(
                    '.translate-select'
                ),
            resetButton:
                this.widget.querySelector<HTMLButtonElement>(
                    '.translate-reset'
                ),
            loadingIndicator:
                this.widget.querySelector<HTMLDivElement>('.translate-loading'),
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
        return `
      <button class="translate-button">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="2" y1="12" x2="22" y2="12"></line>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
        </svg>
      </button>
      <div class="translate-popup">
        <div class="translate-header">
          <h3 class="translate-title">Translate Page</h3>
          <button class="translate-close">✕</button>
        </div>
        <select class="translate-select">
          ${this.createLanguageOptions()}
        </select>
        <button class="translate-reset">Reset to ${currentLanguageLabel}</button>
      </div>
      <div class="translate-loading">Translating...</div>
    `
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
            translateButton,
            popup,
            closeButton,
            languageSelect,
            resetButton,
        } = this.elements

        if (
            !translateButton ||
            !popup ||
            !closeButton ||
            !languageSelect ||
            !resetButton
        ) {
            console.error('Failed to find required elements')
            return
        }

        translateButton.addEventListener('click', () =>
            popup.classList.toggle('active')
        )
        closeButton.addEventListener('click', () =>
            popup.classList.remove('active')
        )
        languageSelect.addEventListener('change', (e: Event) =>
            this.handleLanguageChange(e)
        )
        resetButton.addEventListener('click', () => this.handleReset())
    }

    private async handleLanguageChange(event: Event): Promise<void> {
        const target = event.target as HTMLSelectElement
        const targetLang = target.value

        if (!targetLang || targetLang === this.currentLanguage) return

        const { loadingIndicator, resetButton } = this.elements

        if (!loadingIndicator || !resetButton) {
            console.error('Required elements not found')
            return
        }

        loadingIndicator.classList.add('active')
        resetButton.classList.add('active')

        try {
            await this.translatePage(targetLang)
            this.currentLanguage = targetLang
        } catch (error) {
            console.error('Translation error:', error)
            alert('An error occurred during translation. Please try again.')
        } finally {
            loadingIndicator.classList.remove('active')
        }
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

    private handleReset(): void {
        const elements = document.querySelectorAll<HTMLElement>(
            '[data-original-text]'
        )
        elements.forEach(element => {
            const textNodes = Array.from(element.childNodes).filter(
                (node): node is Text => node.nodeType === Node.TEXT_NODE
            )
            if (textNodes.length > 0) {
                const originalText = element.getAttribute('data-original-text')
                if (originalText) {
                    textNodes[0].textContent = originalText
                }
            }
        })

        const { languageSelect, resetButton } = this.elements
        if (languageSelect && resetButton) {
            languageSelect.value = this.config.pageLanguage
            this.currentLanguage = this.config.pageLanguage
            resetButton.classList.remove('active')
        }
    }
}
