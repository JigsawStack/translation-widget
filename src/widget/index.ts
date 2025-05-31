import { TranslationService } from '../lib/translation/index'
import { DocumentNavigator } from '../lib/dom'
import { languages } from '../constants/languages'
import { BATCH_SIZE, DEFAULT_CONFIG } from '../constants'
import type { Language, TranslationConfig } from '../types'
import widgetTemplate from '../templates/html/widget.html?raw'
import { generateHashForContent, getUserLanguage, removeEmojis } from '../utils/utils'
import { CACHE_PREFIX } from '../constants'
import { LocalStorageWrapper } from '../lib/storage/localstorage'
// import emojiRegex from 'emoji-regex'
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
    private userLanguage: string
    private isTranslating: boolean = false
    private observer: MutationObserver | null = null
    private translationScheduled: boolean = false
    private scheduleTimeout: number | null = null
    private lastTranslated: { url: string, lang: string, hash: string } | null = null
    private static instance: TranslationWidget | null = null

    constructor(publicKey: string, config: Partial<TranslationConfig> = {}) {
        const allowedPositions = ['top-right', 'top-left', 'bottom-left', 'bottom-right'] as const;
        let safeConfig = { ...DEFAULT_CONFIG, ...config };
        if (safeConfig.position && !allowedPositions.includes(safeConfig.position)) {
            console.warn(`Invalid position '${safeConfig.position}' passed to TranslationWidget. Falling back to 'top-right'.`);
            safeConfig.position = 'top-right';
        }
        this.config = safeConfig as Required<TranslationConfig>;

        if ( ! publicKey) {
            throw new Error('Public key is required to initialize the translation widget')
        }

        if ( !publicKey.startsWith('sk_')) {
            throw new Error('Please use proper api key. You can get one from https://jigsawstack.com')
        }

        this.translationService = new TranslationService(
            publicKey,
        )
        this.autoDetectLanguage = this.config.autoDetectLanguage || false
        this.currentLanguage = this.config.pageLanguage || 'en'
        this.userLanguage = getUserLanguage()
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
        TranslationWidget.instance = this
    }

    private initialize(): void {
        if (!this.validateConfig()) return
        
        // Get language from URL parameter
        const urlLang = this.getUrlParameter('lang')
        let initialLang = this.config.pageLanguage;
        if (urlLang) {
            const supportedLang = languages.find(lang => lang.code === urlLang)
            if (supportedLang) {
                initialLang = urlLang
            }
        } else {
            // Check localStorage for preferred language
            const prefLang = localStorage.getItem('jss-pref');
            if (prefLang && languages.find(lang => lang.code === prefLang)) {
                initialLang = prefLang;
            } else if (this.autoDetectLanguage) {
                initialLang = this.userLanguage
            }
        }
        this.currentLanguage = initialLang;
        this.createWidget()
        // Update icon if not default language
        const triggerIcon = this.elements.trigger?.querySelector('.trigger-icon');
        if (triggerIcon && this.currentLanguage !== this.config.pageLanguage) {
            // Find the language name
            const langObj = languages.find(lang => lang.code === this.currentLanguage);
            const langName = langObj ? langObj.name : this.currentLanguage.toUpperCase();
            triggerIcon.innerHTML = `<span class=\"lang-code\">${this.currentLanguage.toUpperCase()}</span><span class=\"lang-name\">${langName}</span>`;
        }
        this.setupEventListeners()
        this.setupURLObserver()
        this.setupContentObserver()
    }

    private getUrlParameter(name: string): string | null {
        const urlParams = new URLSearchParams(window.location.search)
        return urlParams.get(name)
    }

    private setupContentObserver(): void {
        this.observer = new MutationObserver((mutations) => {
            mutations.forEach(mutation => {
                if (this.widget.contains(mutation.target)) {
                    return;
                }
                if (mutation.type === 'characterData' ||
                    (mutation.type === 'childList' &&
                        Array.from(mutation.addedNodes).some(node => node.nodeType === Node.TEXT_NODE))) {
                }
            });
            if (this.isTranslating) return;
            this.scheduleTranslation();
        });
        this.observeBody();
    }

    private observeBody() {
        this.observer?.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            characterData: true
        });
    }

    private onUrlChange = () => {
        this.scheduleTranslation();
    }

    private setupURLObserver(): void {
        const historyMethods = ['pushState', 'replaceState'] as const;

        historyMethods.forEach((method) => {
            const original = history[method];
            history[method] = function (
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
        
        // Create widget element
        this.widget = document.createElement('div')
        this.widget.className = `translation-widget position-${this.config.position || 'top-right'}`
        document.body.appendChild(this.widget)
        
        this.widget.innerHTML = this.createWidgetHTML(currentLanguageLabel)

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

                    const translatedLang = parent.getAttribute('data-translated-lang')

                    // Skip if parent already has data-original-text and we're not translating to English
                    if (parent.hasAttribute('data-original-text') && targetLang === translatedLang) {
                        return;
                    }

                    let textToTranslate = this.getTextToTranslate(
                        node as Text,
                        parent,
                        targetLang
                    );
                    textToTranslate = removeEmojis(textToTranslate || '')
                    console.log('textToTranslate', textToTranslate)
                    if (textToTranslate.length === 0 || textToTranslate.length === 1) {
                        return;
                    }

                    if (textToTranslate) {
                        textsToTranslate.push(textToTranslate.trim());
                        batchNodes.push(node);
                    }
                });
                allBatchNodes.push(batchNodes);
                allBatchTexts.push(textsToTranslate);
            });

            // Only keep non-empty batches
            const nonEmptyBatchNodes: Node[][] = [];
            const nonEmptyBatchTexts: string[][] = [];
            allBatchTexts.forEach((texts, i) => {
                if (texts.length > 0) {
                    nonEmptyBatchTexts.push(texts);
                    nonEmptyBatchNodes.push(allBatchNodes[i]);
                }
            });


            // add a delay of 10min

            const key = cache.getKey(hash, window.location.href, targetLang)
            const cachedTranslations = cache.getItem(key)
            if (cachedTranslations && cachedTranslations[0]) {
                const fullTranslations = cachedTranslations[0];
                nodes.forEach((node, idx) => {
                    if (node.nodeType === Node.TEXT_NODE) {
                        node.textContent = fullTranslations[idx];
                    }
                });
                this.isTranslated = true;
                this.updateResetButtonVisibility();
                return;
            }

            // Send all batch requests in parallel
            const allTranslatedTexts = await Promise.all(
                nonEmptyBatchTexts.map(texts =>
                    this.translationService.translateBatchText(texts, targetLang)
                )
            );

            if (allTranslatedTexts.length === 0) {
                this.isTranslated = true;
                this.updateResetButtonVisibility();
                return;
            }

            // Build a full translation array for all nodes
            const fullTranslations: string[] = [];
            nodes.forEach((node, nodeIdx) => {
                const parent = node.parentElement as HTMLElement | null;
                // Check if this node was included in the API call
                const batchIdx = nonEmptyBatchNodes.findIndex(batch => batch.includes(node));
                if (batchIdx !== -1) {
                    // This node was translated in this batch
                    const textIdx = nonEmptyBatchNodes[batchIdx].indexOf(node);
                    const translatedText = allTranslatedTexts[batchIdx][textIdx];
                    fullTranslations[nodeIdx] = translatedText;
                    node.textContent = translatedText;
                } else if (parent && parent.getAttribute('data-translated-lang') === targetLang) {
                    // Already translated, use current text
                    fullTranslations[nodeIdx] = node.textContent || '';
                } else {
                    // Fallback: use original text
                    fullTranslations[nodeIdx] = node.textContent || '';
                }
            });

            // Save the full array in cache for this hash
            cache.setItem(key, [fullTranslations]);

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
                parent.setAttribute('data-translated-lang', targetLang)
                parent.setAttribute('data-original-text', originalText)
                return originalText
            }
        } else {
            const textToTranslate = node.textContent?.trim()
            if (this.currentLanguage !== 'en' && targetLang !== 'en') {
                parent.setAttribute('data-translated-lang', targetLang)
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


    resetTranslations(): void {
        if (this.observer) {
            this.observer.disconnect();
        }
        const elements = document.querySelectorAll<HTMLElement>('[data-original-text]')
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
            element.removeAttribute('data-original-text');
            element.removeAttribute('data-translated-lang');
        })
        this.isTranslated = false;

        this.currentLanguage = this.config.pageLanguage;
        // Update lastTranslated to reflect the reset state
        const nodes = DocumentNavigator.findTranslatableContent();
        const hash = generateHashForContent(nodes);
        this.lastTranslated = {
            url: window.location.href,
            lang: this.config.pageLanguage, // or 'en' if that's your default
            hash
        };

        this.updateResetButtonVisibility();
        this.observeBody(); // Reconnect observer
    }

    private adjustDropdownPosition(): void {
        const { dropdown, trigger } = this.elements;
        if (!dropdown || !trigger) return;

        const triggerRect = trigger.getBoundingClientRect();
        const dropdownRect = dropdown.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        // Reset any previous positioning
        dropdown.style.top = '';
        dropdown.style.bottom = '';
        dropdown.style.left = '';
        dropdown.style.right = '';
        dropdown.style.transform = '';

        // Calculate available space
        const spaceBelow = viewportHeight - triggerRect.bottom;
        const spaceAbove = triggerRect.top;
        const spaceRight = viewportWidth - triggerRect.right;
        const spaceLeft = triggerRect.left;

        // Determine vertical position
        if (spaceBelow < dropdownRect.height && spaceAbove > spaceBelow) {
            // Position above if there's more space above
            dropdown.style.bottom = '100%';
            dropdown.style.top = 'auto';
            dropdown.style.marginBottom = '0.5rem';
            dropdown.style.marginTop = '0';
        } else {
            // Position below (default)
            dropdown.style.top = '100%';
            dropdown.style.bottom = 'auto';
            dropdown.style.marginTop = '0.5rem';
            dropdown.style.marginBottom = '0';
        }

        // Determine horizontal position
        if (spaceRight < dropdownRect.width && spaceLeft > spaceRight) {
            // Position to the left if there's more space on the left
            dropdown.style.right = '0';
            dropdown.style.left = 'auto';
        } else {
            // Position to the right (default)
            dropdown.style.left = '0';
            dropdown.style.right = 'auto';
        }

        // Adjust if dropdown would overflow viewport
        const finalRect = dropdown.getBoundingClientRect();
        
        if (finalRect.right > viewportWidth) {
            dropdown.style.right = '0';
            dropdown.style.left = 'auto';
        }
        
        if (finalRect.left < 0) {
            dropdown.style.left = '0';
            dropdown.style.right = 'auto';
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
                this.resetTranslations()
                resetButton.classList.remove('active')
                this.isTranslated = false
                this.updateResetButtonVisibility()
                // Reset language selector to page language
                const languageItems = this.widget.querySelectorAll<HTMLElement>('.language-item')
                languageItems.forEach(item => {
                    const isSelected = item.getAttribute('data-language-code') === this.config.pageLanguage
                    item.classList.toggle('selected', isSelected)
                    item.setAttribute('aria-selected', isSelected.toString())
                })
                // Restore SVG icon
                const triggerIcon = this.elements.trigger?.querySelector('.trigger-icon');
                if (triggerIcon) {
                    triggerIcon.innerHTML = this.getLanguageSVG();
                }
                // Close dropdown
                dropdown.classList.remove('open')
                trigger.setAttribute('aria-expanded', 'false')
                // Remove has-translation class
                const triggerContent = trigger.querySelector<HTMLDivElement>('.trigger-content')
                if (triggerContent) triggerContent.classList.remove('has-translation')
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
                this.adjustDropdownPosition()
                searchInput.focus()
            }
        })

        // Adjust position on window resize
        window.addEventListener('resize', () => {
            if (dropdown.classList.contains('open')) {
                this.adjustDropdownPosition()
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

                // Save preference to localStorage
                if (langCode) {
                    localStorage.setItem('jss-pref', langCode);
                }

                // Change icon to language code and name
                const triggerIcon = this.elements.trigger?.querySelector('.trigger-icon');
                if (triggerIcon && langCode && langName) {
                    triggerIcon.innerHTML = `<span class=\"lang-code\">${langCode.toUpperCase()}</span><span class=\"lang-name\">${langName}</span>`;
                }

                // Close dropdown
                dropdown.classList.remove('open')
                trigger.setAttribute('aria-expanded', 'false')

                // Handle translation
                const triggerContent = trigger.querySelector<HTMLDivElement>('.trigger-content')
                if (langCode && langCode !== this.currentLanguage) {
                    if (triggerContent) triggerContent.classList.add('has-translation')
                    // Show loading state
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
                } else if (triggerContent) {
                    // If original language is selected, remove the class
                    triggerContent.classList.remove('has-translation')
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
        const nodes = DocumentNavigator.findTranslatableContent();
        const hash = generateHashForContent(nodes);
        if (this.lastTranslated && this.lastTranslated.url === currentUrl && this.lastTranslated.lang === currentLang && this.lastTranslated.hash === hash) {
            return;
        }
        this.translationScheduled = true;
        if (this.scheduleTimeout) clearTimeout(this.scheduleTimeout);
        this.scheduleTimeout = window.setTimeout(() => {
            this.translationScheduled = false;
            if (this.currentLanguage !== this.config.pageLanguage) {
                this.lastTranslated = { url: currentUrl, lang: currentLang, hash };
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

    /**
     * Public method to translate the page to a specific language
     * @param langCode The language code to translate to
     * @returns Promise that resolves when translation is complete
     */
    public async translateTo(langCode: string): Promise<void> {
        if (this.isTranslating) {
            console.warn('Translation already in progress')
            return
        }

        const supportedLang = languages.find(lang => lang.code === langCode)
        if (!supportedLang) {
            console.error(`Unsupported language code: ${langCode}`)
            return
        }

        if (langCode === this.currentLanguage) {
            console.log('Page is already in the requested language')
            return
        }

        try {
            await this.translatePage(langCode)
            this.currentLanguage = langCode
            
            // Update UI to reflect the selected language
            const languageItems = this.widget.querySelectorAll<HTMLElement>('.language-item')
            languageItems.forEach(item => {
                const isSelected = item.getAttribute('data-language-code') === langCode
                item.classList.toggle('selected', isSelected)
                item.setAttribute('aria-selected', isSelected.toString())
            })

            // Update trigger text
            const triggerContent = this.elements.trigger?.querySelector<HTMLDivElement>('.trigger-content')
            if (triggerContent) {
                triggerContent.classList.add('has-translation')
                const triggerSpan = triggerContent.querySelector('span')
                if (triggerSpan) {
                    this.updateTriggerText(supportedLang.name)
                }
            }
        } catch (error) {
            console.error('Translation error:', error)
            throw error
        }
    }

    /**
     * Get the current instance of TranslationWidget
     * @returns The current TranslationWidget instance or null if not initialized
     */
    public static getInstance(): TranslationWidget | null {
        return TranslationWidget.instance
    }

    // Add this helper method to the class
    private getLanguageSVG(): string {
        return `\n            <svg class=\"languages-icon\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">\n                <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"\n                    d=\"M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129\">\n                </path>\n            </svg>\n        `;
    }
}

// Expose the translate function globally
declare global {
    interface Window {
        translate: (langCode: string) => Promise<void>
    }
}

// Add the global translate function
window.translate = async (langCode: string): Promise<void> => {
    const instance = TranslationWidget.getInstance()
    if (!instance) {
        console.error('Translation widget not initialized')
        return
    }
    await instance.translateTo(langCode)
}
