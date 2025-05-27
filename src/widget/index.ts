import { TranslationService } from '../lib/translation/index'
import { DocumentNavigator } from '../lib/dom'
import { languages } from '../constants/languages'
import { BATCH_SIZE, DEFAULT_CONFIG } from '../constants'
import type { Language, TranslationConfig } from '../types'
import widgetTemplate from '../templates/html/widget.html?raw'
import { generateHashForContent } from '../utils/utils'
import { CACHE_PREFIX } from '../constants'
import { LocalStorageWrapper } from '../lib/storage/localstorage'
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
    private autoDetectLanguage: boolean
    private isTranslated: boolean = false
    private isTranslating: boolean = false
    private observer: MutationObserver | null = null
    private translationScheduled: boolean = false
    private scheduleTimeout: number | null = null
    private lastTranslated: { url: string, lang: string } | null = null
    
    constructor(publicKey: string, config: Partial<TranslationConfig> = {}) {
        this.config = { ...DEFAULT_CONFIG, ...config }
        this.translationService = new TranslationService(
            publicKey,
        )
        this.autoDetectLanguage = this.config.autoDetectLanguage || false
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
        if (this.autoDetectLanguage) {
        }
        this.createWidget()
        this.setupEventListeners()
        this.setupURLObserver()
        // this.setupContentObserver()
    }

    // private setupContentObserver(): void {
    //     this.observer = new MutationObserver(() => {
    //         if (this.isTranslating) return;
    //         this.scheduleTranslation();
    //     });
    //     this.observeBody();
    // }

    private observeBody() {
        this.observer?.observe(document.body, {
            childList: true,
            subtree: true,
            characterData: true
        });
    }

    private onUrlChange = () => {
        this.translationService.resetTranslations();
        this.scheduleTranslation();
    }

    private setupURLObserver(): void {
        const historyMethods = ['pushState', 'replaceState'] as const;
        
        historyMethods.forEach((method) => {
            const original = history[method];
            history[method] = function(
                state: any,
                title: string,
                url?: string | URL | null
            ) {
                const result = original.call(this, state, title, url);
                window.dispatchEvent(new Event(method));
                return result;
            };
            window.addEventListener(method, this.onUrlChange);
        });

        // Also listen for popstate events (browser back/forward)
        window.addEventListener('popstate', this.onUrlChange);
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

        // Initialize trigger text with fade-in class
        const triggerSpan = this.elements.trigger?.querySelector('span')
        if (triggerSpan) {
            triggerSpan.classList.add('fade-in')
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
        const languageCount = languages.length
        return widgetTemplate
            .replace('{{languageOptions}}', languageOptions)
            .replace('{{currentLanguageLabel}}', currentLanguageLabel)
            .replace('{{languageCount}}', languageCount.toString())
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

        const createLanguageItem = (lang: Language, isSelected: boolean = false) => `
            <div class="language-item ${isSelected ? 'selected' : ''}" tabindex="0" role="option" aria-selected="${isSelected}" data-language-code="${lang.code}">
                <div class="language-info">
                    <div class="language-main">
                        <span class="language-name">${lang.name}</span>
                        <div class="language-code">${lang.code}</div>
                    </div>
                    <div class="language-details">
                        <span class="language-native">${lang.native}</span>
                        <span class="language-separator">•</span>
                        <span class="language-region">${lang.region}</span>
                    </div>
                </div>
                <svg class="check-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
            </div>
        `

        return `
            ${createLanguageItem(currentLanguage, true)}
            ${otherLanguages.map(lang => createLanguageItem(lang)).join('')}
        `
    }

    private async updateTriggerText(newText: string): Promise<void> {
        const triggerSpan = this.elements.trigger?.querySelector('span')
        if (!triggerSpan) return

        // Force a reflow to ensure the animation plays
        triggerSpan.offsetHeight

        // Start fade out
        triggerSpan.classList.remove('fade-in')
        triggerSpan.classList.add('fade-out')

        // Wait for fade out
        await new Promise(resolve => setTimeout(resolve, 300))

        // Update text
        triggerSpan.textContent = newText

        // Force a reflow
        triggerSpan.offsetHeight

        // Start fade in
        triggerSpan.classList.remove('fade-out')
        triggerSpan.classList.add('fade-in')
    }

    // private setTranslatingState(isTranslating: boolean): void {
    //     this.isTranslating = isTranslating
    //     const trigger = this.elements.trigger
    //     const dropdown = this.elements.dropdown
    //     const languageItems = this.widget.querySelectorAll<HTMLElement>('.language-item')
    //     const resetButton = this.widget.querySelector<HTMLElement>('.reset-option')
    //     const searchInput = this.elements.searchInput

    //     if (trigger) {
    //         trigger.style.pointerEvents = isTranslating ? 'none' : 'auto'
    //         trigger.style.opacity = isTranslating ? '0.7' : '1'
    //     }

    //     if (dropdown) {
    //         dropdown.style.pointerEvents = isTranslating ? 'none' : 'auto'
    //     }

    //     if (searchInput) {
    //         searchInput.disabled = isTranslating
    //     }

    //     languageItems.forEach(item => {
    //         item.style.pointerEvents = isTranslating ? 'none' : 'auto'
    //         item.style.opacity = isTranslating ? '0.7' : '1'
    //     })

    //     if (resetButton) {
    //         resetButton.style.pointerEvents = isTranslating ? 'none' : 'auto'
    //         resetButton.style.opacity = isTranslating ? '0.7' : '1'
    //     }
    // }

    private async translatePage(targetLang: string): Promise<void> {
        this.isTranslating = true;
        this.observer?.disconnect(); // Pause observing during translation
        try {
            const nodes = DocumentNavigator.findTranslatableContent();
            const batches = DocumentNavigator.divideIntoGroups(nodes, BATCH_SIZE);
    
            const cache = new LocalStorageWrapper(CACHE_PREFIX)
            let hash = generateHashForContent(nodes)
            // Store all nodes and their corresponding texts for each batch
            const allBatchNodes: Node[][] = [];
            const allBatchTexts: string[][] = [];
    
            // Prepare batches
            batches.forEach(batch => {
                const textsToTranslate: string[] = [];
                const batchNodes: Node[] = [];
                batch.forEach((node: Node) => {
                    if (node.nodeType !== Node.TEXT_NODE) return;
                    const parent = node.parentElement;
                    if (!parent) return;
                    const textToTranslate = this.getTextToTranslate(
                        node as Text,
                        parent,
                        targetLang
                    );
                    if (textToTranslate) {
                        textsToTranslate.push(textToTranslate);
                        batchNodes.push(node);
                    }
                });
                allBatchNodes.push(batchNodes);
                allBatchTexts.push(textsToTranslate);
            });
    

            const key = cache.getKey(hash, window.location.href, targetLang)
            const cachedTranslations = cache.getItem(key)
            if (cachedTranslations) {
                cachedTranslations.forEach((translatedTexts: string[], batchIndex: number) => {
                    translatedTexts.forEach((translatedText: string, index: number) => {
                        const node = allBatchNodes[batchIndex][index];
                        if (node.nodeType === Node.TEXT_NODE) {
                            node.textContent = translatedText;
                        }
                    });
                });
                this.isTranslated = true;
                this.updateResetButtonVisibility();
                return;
            }

            // Send all batch requests in parallel
            const allTranslatedTexts = await Promise.all(
                allBatchTexts.map(texts =>
                    this.translationService.translateBatchText(texts, targetLang)
                )
            );
    
            // Update the DOM after all translations are done
            allTranslatedTexts.forEach((translatedTexts, batchIndex) => {
                translatedTexts.forEach((translatedText: string, index: number) => {
                    const node = allBatchNodes[batchIndex][index];
                    if (node.nodeType === Node.TEXT_NODE) {
                        node.textContent = translatedText;
                    }
                });
            });

            cache.setItem(key, allTranslatedTexts)

            this.isTranslated = true;
            this.updateResetButtonVisibility();
        } finally {
            this.isTranslating = false;
            this.observeBody(); // Resume observing after translation
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

    private updateResetButtonVisibility(): void {
        const resetButton = this.widget.querySelector<HTMLElement>('.reset-option')
        if (resetButton) {
            resetButton.style.display = this.isTranslated ? 'flex' : 'none'
        }
    }

    private setupEventListeners(): void {
        const {
            trigger,
            dropdown,
            searchInput,
            clearSearch,
            languageItems,
        } = this.elements

        if (!trigger || !dropdown || !searchInput || !clearSearch || !languageItems) {
            console.error('Failed to find required elements')
            return
        }

        // Reset button functionality
        const resetButton = this.widget.querySelector<HTMLElement>('.reset-option')
        if (resetButton) {
            resetButton.addEventListener('click', () => {
                if (this.isTranslating) return
                this.translationService.resetTranslations()
                resetButton.classList.remove('active')
                this.isTranslated = false
                this.lastTranslated = null;
                this.updateResetButtonVisibility()
                // Reset language selector to page language
                const languageItems = this.widget.querySelectorAll<HTMLElement>('.language-item')
                languageItems.forEach(item => {
                    const isSelected = item.getAttribute('data-language-code') === this.config.pageLanguage
                    item.classList.toggle('selected', isSelected)
                    item.setAttribute('aria-selected', isSelected.toString())
                })
                // Update trigger text
                const currentLanguage = languages.find(lang => lang.code === this.config.pageLanguage)
                if (currentLanguage) {
                    this.updateTriggerText(currentLanguage.name)
                }
                // Close dropdown
                dropdown.classList.remove('open')
                trigger.setAttribute('aria-expanded', 'false')
            })
        }

        // Initialize reset button visibility
        this.updateResetButtonVisibility()

        // Toggle dropdown
        trigger.addEventListener('click', () => {
            if (this.isTranslating) return
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
                if (dropdown.classList.contains('open')) {
                    dropdown.classList.add('closing')
                    setTimeout(() => {
                        dropdown.classList.remove('open', 'closing')
                        trigger.setAttribute('aria-expanded', 'false')
                    }, 300)
                }
            }
        })

        // Search functionality
        searchInput.addEventListener('input', () => {
            const searchTerm = searchInput.value.toLowerCase()
            const hasValue = searchTerm.length > 0
            clearSearch.classList.toggle('visible', hasValue)

            // Filter language items
            const items = this.widget.querySelectorAll<HTMLElement>('.language-item')
            const noResults = this.widget.querySelector<HTMLElement>('.no-results')
            let visibleCount = 0

            /**
             * Feature - User can actually search for languages by name, native, code, and region.
             */
            items.forEach(item => {
                const name = item.querySelector('.language-name')?.textContent?.toLowerCase() || ''
                const native = item.querySelector('.language-native')?.textContent?.toLowerCase() || ''
                const code = item.querySelector('.language-code')?.textContent?.toLowerCase() || ''
                const region = item.querySelector('.language-region')?.textContent?.toLowerCase() || ''

                const matches = name.includes(searchTerm) || 
                              native.includes(searchTerm) || 
                              code.includes(searchTerm) || 
                              region.includes(searchTerm)

                item.style.display = matches ? '' : 'none'
                if (matches) visibleCount++
            })

            // Show/hide no results message
            if (noResults) {
                noResults.style.display = visibleCount === 0 ? 'flex' : 'none'
            }
        })

        clearSearch.addEventListener('click', () => {
            searchInput.value = ''
            clearSearch.classList.remove('visible')
            searchInput.focus()
            
            // Show all language items and hide no results
            const items = this.widget.querySelectorAll<HTMLElement>('.language-item')
            const noResults = this.widget.querySelector<HTMLElement>('.no-results')
            
            items.forEach(item => {
                item.style.display = ''
            })
            
            if (noResults) {
                noResults.style.display = 'none'
            }
        })

        // Language selection
        languageItems.forEach(item => {
            item.addEventListener('click', async () => {
                if (this.isTranslating) return
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
                const langCode = item.getAttribute('data-language-code')

                if (langName) {
                    await this.updateTriggerText(langName)
                }

                // Close dropdown
                dropdown.classList.remove('open')
                trigger.setAttribute('aria-expanded', 'false')

                // Handle translation
                if (langCode && langCode !== this.currentLanguage) {
                    // Show loading state
                    const triggerContent = trigger.querySelector<HTMLDivElement>('.trigger-content')
                    const triggerLoading = trigger.querySelector<HTMLDivElement>('.trigger-loading')
                    
                    if (triggerContent && triggerLoading) {
                        triggerContent.style.display = 'none'
                        triggerLoading.style.display = 'flex'
                    }

                    try {
                        await this.translatePage(langCode)
                        this.currentLanguage = langCode
                    } catch (error) {
                        console.error('Translation error:', error)
                        alert('An error occurred during translation. Please try again.')
                    } finally {
                        // Hide loading state
                        if (triggerContent && triggerLoading) {
                            triggerLoading.style.display = 'none'
                            triggerContent.style.display = 'flex'
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

    private scheduleTranslation() {
        if (this.translationScheduled) return;
        const currentUrl = window.location.href;
        const currentLang = this.currentLanguage;
        if (this.lastTranslated && this.lastTranslated.url === currentUrl && this.lastTranslated.lang === currentLang) return;
        this.translationScheduled = true;
        if (this.scheduleTimeout) clearTimeout(this.scheduleTimeout);
        this.scheduleTimeout = window.setTimeout(() => {
            this.translationScheduled = false;
            if (this.currentLanguage !== this.config.pageLanguage) {
                this.lastTranslated = { url: currentUrl, lang: currentLang };
                // Show loading state
                const triggerContent = this.elements.trigger?.querySelector<HTMLDivElement>('.trigger-content')
                const triggerLoading = this.elements.trigger?.querySelector<HTMLDivElement>('.trigger-loading')
                if (triggerContent && triggerLoading) {
                    triggerContent.style.display = 'none'
                    triggerLoading.style.display = 'flex'
                }
                this.translatePage(this.currentLanguage)
                    .then(() => {
                        // Update UI to reflect the selected language
                        const languageItems = this.widget.querySelectorAll<HTMLElement>('.language-item')
                        languageItems.forEach(item => {
                            const isSelected = item.getAttribute('data-language-code') === this.currentLanguage
                            item.classList.toggle('selected', isSelected)
                            item.setAttribute('aria-selected', isSelected.toString())
                        })
                    })
                    .catch(error => {
                        console.error('Auto-translation error:', error)
                    })
                    .finally(() => {
                        if (triggerContent && triggerLoading) {
                            triggerLoading.style.display = 'none'
                            triggerContent.style.display = 'flex'
                        }
                    })
            }
        }, 200);
    }
}
