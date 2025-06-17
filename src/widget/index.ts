import { TranslationService } from "../lib/translation/index";
import { DocumentNavigator } from "../lib/dom";
import { languages } from "../constants/languages";
import { BATCH_SIZE, DEFAULT_CONFIG } from "../constants";
import { Language, TranslationConfig, WidgetElements, TranslationResult, Position, LANG_PARAM, LOCALSTORAGE_KEYS, ATTRIBUTES } from "../types";
import widgetTemplate from "../templates/html/widget.html?raw";
import { generateHashForContent, getUserLanguage, removeEmojis, validatePublicApiKey } from "../utils/utils";
import { CACHE_PREFIX } from "../constants";
import { LocalStorageWrapper } from "../lib/storage/localstorage";

// translation widget class
export class TranslationWidget {
  private config: Required<TranslationConfig>;
  private translationService: TranslationService;
  private currentLanguage: string;
  private widget: HTMLDivElement;
  private elements: WidgetElements;
  private autoDetectLanguage: boolean;
  private isTranslated: boolean = false;
  private userLanguage: string;
  private isTranslating: boolean = false;
  private observer: MutationObserver | null = null;
  private translationScheduled: boolean = false;
  private scheduleTimeout: number | null = null;
  private showUI = true;
  private lastTranslated: { url: string; lang: string; hash: string } | null = null;
  private static instance: TranslationWidget | null = null;
  private currentTranslationPromise: Promise<void> | null = null;
  private lastRequestedLanguage: string | null = null;
  private translationRequestId: number = 0;

  /**
   * @param publicKey - The public api key for the translation widget
   * @param config - The configuration for the translation widget
   */
  constructor(publicKey: string, config: Partial<TranslationConfig> = {}) {
    const allowedPositions: Position[] = [Position.TopRight, Position.TopLeft, Position.BottomLeft, Position.BottomRight];

    let safeConfig = { ...DEFAULT_CONFIG, ...config };

    if (safeConfig.position && !allowedPositions.includes(safeConfig.position)) {
      console.warn(`Invalid position '${safeConfig.position}' passed to TranslationWidget. Falling back to 'top-right'.`);
      safeConfig.position = Position.TopRight;
    }

    this.config = safeConfig as Required<TranslationConfig>;

    // Validate public api key
    const apiValidationResult = validatePublicApiKey(publicKey);

    if (!apiValidationResult.isValid) {
      throw new Error(apiValidationResult.message);
    }

    this.translationService = new TranslationService(publicKey);
    this.autoDetectLanguage = this.config.autoDetectLanguage || false;
    this.currentLanguage = this.config.pageLanguage;
    this.userLanguage = getUserLanguage();
    this.widget = document.createElement("div");
    this.showUI = this.config.showUI ?? true;
    this.elements = {
      trigger: null,
      dropdown: null,
      searchInput: null,
      clearSearch: null,
      languageItems: null,
      loadingIndicator: null,
    };
    this.initialize();
    TranslationWidget.instance = this;
  }

  /**
   * Initializes the translation widget
   */
  private initialize(): void {
    const urlLang = this.getUrlParameter(LANG_PARAM);
    let initialLang = this.config.pageLanguage;
    // Check if a language is specified in the URL
    if (urlLang) {
      const supportedLang = languages.find((lang) => lang.code === urlLang);
      if (supportedLang) {
        initialLang = urlLang;
      }
    }
    // Check if a preferred language is stored in localStorage
    else if (localStorage.getItem(LOCALSTORAGE_KEYS.PREFERRED_LANGUAGE)) {
      initialLang = localStorage.getItem(LOCALSTORAGE_KEYS.PREFERRED_LANGUAGE) as string;
    }
    // Use auto-detected language if enabled
    else if (this.autoDetectLanguage) {
      initialLang = this.userLanguage;
    }
    // Fallback to the page's language or default to English
    else if (!this.config.pageLanguage) {
      const htmlTag = document.querySelector("html");
      if (htmlTag && htmlTag.getAttribute(LANG_PARAM)) {
        initialLang = htmlTag.getAttribute(LANG_PARAM) as string;
      } else {
        initialLang = "en";
      }
    }

    this.currentLanguage = initialLang;

    if (this.showUI) {
      this.createWidget();
      const triggerIcon = this.elements.trigger?.querySelector(".jigts-trigger-icon");
      if (triggerIcon && this.currentLanguage !== this.config.pageLanguage) {
        const langObj = languages.find((lang) => lang.code === this.currentLanguage);
        const langName = langObj ? langObj.name : this.currentLanguage.toUpperCase();
        triggerIcon.innerHTML = `<span class=\"jigts-lang-code\">${this.currentLanguage.toUpperCase()}</span><span class=\"jigts-lang-name\">${langName}</span>`;
      }
      this.setupEventListeners();
      this.setupURLObserver();
      this.setupContentObserver();
    }
    // Trigger translation immediately if language is different from page language
    if (this.currentLanguage !== this.config.pageLanguage) {
      this.translatePage(this.currentLanguage).catch((error) => {
        console.error("Initial translation error:", error);
      });
    }
  }

  /**
   * Gets the value of a URL parameter
   * @param name - The name of the URL parameter
   * @returns The value of the URL parameter
   */
  private getUrlParameter(name: string): string | null {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  }

  /**
   * Sets up the content observer
   */
  private setupContentObserver(): void {
    if (!this.observer) {
      this.observer = new MutationObserver((mutations) => {
        if (this.isTranslating) return;
        const widgetContainer = this.widget;

        // Filter out mutations that occur within the widget container
        const relevantMutations = mutations.filter((mutation) => {
          if (widgetContainer.contains(mutation.target)) return false;

          if (mutation.type === "childList") {
            const addedScripts = Array.from(mutation.addedNodes).some((node) => node.nodeName === "SCRIPT");
            const removedScripts = Array.from(mutation.removedNodes).some((node) => node.nodeName === "SCRIPT");
            return !addedScripts && !removedScripts;
          }

          return true;
        });

        if (relevantMutations.length > 0) {
          this.scheduleTranslation();
        }
      });
      this.observeBody();
    } else {
      console.warn("Observer already exists. Skipping setupContentObserver");
    }
  }

  /**
   * Observes the body for changes
   */
  private observeBody() {
    this.observer?.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
      // this is needed to detect changes for "mobile-only" elements
      attributes: true,
    });
  }

  /**
   * Handles the URL change
   */
  private onUrlChange = () => {
    this.scheduleTranslation();
  };

  /**
   * Sets up the URL observer
   */
  private setupURLObserver(): void {
    const historyMethods = ["pushState", "replaceState"] as const;

    historyMethods.forEach((method) => {
      const original = history[method];
      history[method] = function (state: unknown, title: string, url?: string | URL | null) {
        const result = original.call(this, state, title, url);
        window.dispatchEvent(new Event(method));
        return result;
      };
      window.addEventListener(method, this.onUrlChange);
    });

    // Also listen for popstate events (browser back/forward)
    window.addEventListener("popstate", this.onUrlChange);
  }

  /**
   * Creates the widget
   */
  private createWidget(): void {
    const currentLanguageLabel = this.getCurrentLanguageLabel();

    this.widget = document.createElement("div");
    this.widget.className = `jigts-translation-widget jigts-position-${this.config.position || "top-right"}`;

    if (this.config.theme) {
      if (this.config.theme.baseColor) {
        this.widget.style.setProperty("--jigts-custom-base-color", this.config.theme.baseColor);
      }
      if (this.config.theme.textColor) {
        this.widget.style.setProperty("--jigts-custom-text-color", this.config.theme.textColor);
      }
    }

    document.body.appendChild(this.widget);

    this.widget.innerHTML = this.createWidgetHTML(currentLanguageLabel);

    //  element references
    this.elements = {
      trigger: this.widget.querySelector<HTMLDivElement>(".jigts-widget-trigger"),
      dropdown: this.widget.querySelector<HTMLDivElement>(".jigts-widget-dropdown"),
      searchInput: this.widget.querySelector<HTMLInputElement>(".jigts-search-input"),
      clearSearch: this.widget.querySelector<HTMLDivElement>(".jigts-clear-search"),
      languageItems: this.widget.querySelectorAll<HTMLDivElement>(".jigts-language-item"),
      loadingIndicator: this.widget.querySelector<HTMLDivElement>(".jigts-loading-spinner"),
    };

    // Initialize trigger text with fade-in class
    const triggerSpan = this.elements.trigger?.querySelector("span");
    if (triggerSpan) {
      triggerSpan.classList.add("jigts-fade-in");
    }
  }

  /**
   * Gets the current language label
   * @returns The current language label
   */
  private getCurrentLanguageLabel(): string {
    return languages.find((language: Language) => language.code === this.currentLanguage)?.native || "English";
  }

  /**
   * Creates the widget HTML
   * @param currentLanguageLabel - The current language label
   * @returns The widget HTML
   */
  private createWidgetHTML(currentLanguageLabel: string): string {
    const languageOptions = this.createLanguageOptions();
    const languageCount = languages.length;
    return widgetTemplate
      .replace("{{languageOptions}}", languageOptions)
      .replace("{{currentLanguageLabel}}", currentLanguageLabel)
      .replace("{{languageCount}}", languageCount.toString());
  }

  /**
   * Creates the language options
   * @returns The language options
   */
  private createLanguageOptions(): string {
    const currentLang = this.currentLanguage;
    const currentLanguage = languages.find((lang: Language) => lang.code === currentLang);
    const otherLanguages = languages
      .filter((lang: Language) => lang.code !== currentLang)
      .sort((a: Language, b: Language) => a.native.localeCompare(b.native));

    if (!currentLanguage) return "";

    const createLanguageItem = (lang: Language, isSelected: boolean = false) => `
            <div class="jigts-language-item ${isSelected ? "jigts-selected" : ""}" tabindex="0" role="option" aria-selected="${isSelected}" data-language-code="${lang.code}">
                <div class="jigts-language-info">
                    <div class="jigts-language-main">
                        <span class="jigts-language-name">${lang.name}</span>
                        <div class="jigts-language-code">${lang.code}</div>
                    </div>
                    <div class="jigts-language-details">
                        <span class="jigts-language-native">${lang.native}</span>
                    </div>
                </div>
                <svg class="jigts-check-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
            </div>
        `;

    return `
            ${createLanguageItem(currentLanguage, true)}
            ${otherLanguages.map((lang) => createLanguageItem(lang)).join("")}
        `;
  }

  /**
   * Updates the trigger text
   * @param newText - The new text
   */
  private async updateTriggerText(newText: string): Promise<void> {
    const triggerSpan = this.elements.trigger?.querySelector("span");
    if (!triggerSpan) return;
    triggerSpan.offsetHeight;
    triggerSpan.classList.remove("jigts-fade-in");
    triggerSpan.classList.add("jigts-fade-out");

    await new Promise((resolve) => setTimeout(resolve, 300));

    triggerSpan.textContent = newText;
    triggerSpan.offsetHeight;
    triggerSpan.classList.remove("jigts-fade-out");
    triggerSpan.classList.add("jigts-fade-in");
  }

  /**
   * Gets the text to translate
   * @param node - The node to translate
   * @param parent - The parent element
   * @param targetLang - The target language
   * @returns The text to translate
   */
  private getTextToTranslate(node: { element: HTMLElement; text: string }, parent: HTMLElement, targetLang: string): string | null {
    if (!parent.hasAttribute(ATTRIBUTES.ORIGINAL_TEXT)) {
      const originalText = node.text?.trim();
      if (originalText) {
        parent.setAttribute(ATTRIBUTES.TRANSLATED_LANG, targetLang);
        parent.setAttribute(ATTRIBUTES.ORIGINAL_TEXT, originalText);
        // Store original font size if not already stored
        if (!parent.hasAttribute(ATTRIBUTES.ORIGINAL_FONT_SIZE)) {
          const computedStyle = window.getComputedStyle(parent);
          parent.setAttribute(ATTRIBUTES.ORIGINAL_FONT_SIZE, computedStyle.fontSize);
        }
        return originalText;
      }
    } else {
      const textToTranslate = node.text?.trim();

      /**
       * Check for this case: LOC 409
       * Here is it added as an extra measure to check if the text is already translated to the target language
       */
      if (this.currentLanguage !== targetLang) {
        parent.setAttribute(ATTRIBUTES.TRANSLATED_LANG, targetLang);
        let originalText = parent.getAttribute(ATTRIBUTES.ORIGINAL_TEXT);
        if (originalText) {
          return originalText;
        }
      }
      return textToTranslate || null;
    }
    return null;
  }

  /**
   * Calculates the font size
   * @param text - The text to calculate the font size for
   * @param originalFontSize - The original font size
   * @param originalText - The original text
   * @returns The font size
   */
  private calculateFontSize(text: string, originalFontSize: string, originalText: string): string {
    const baseFontSize = 12; // Minimum font size in pixels
    const maxFontSize = parseInt(originalFontSize); // Maximum font size is the original size
    const textLength = text.length;
    const originalLength = originalText.length;

    // Only scale down if translated text is longer than original
    if (textLength <= originalLength) {
      return originalFontSize;
    }

    /**
     * Calculate font size based on text length
     * The longer the text, the smaller the font size
     * Using logarithmic scale to make the reduction more gradual
     */
    const fontSize = Math.max(baseFontSize, Math.min(maxFontSize, maxFontSize * (1 - Math.log(textLength) / 10)));

    return `${fontSize}px`;
  }

  /**
   * Updates the loading state
   * @param isLoading - Whether the widget is loading
   */
  private updateLoadingState(isLoading: boolean): void {
    const triggerContent = this.elements.trigger?.querySelector<HTMLDivElement>(".jigts-trigger-content");
    const triggerLoading = this.elements.trigger?.querySelector<HTMLDivElement>(".jigts-trigger-loading");
    if (triggerContent && triggerLoading) {
      if (isLoading) {
        triggerContent.style.display = "none";
        triggerLoading.style.display = "flex";
      } else {
        triggerLoading.style.display = "none";
        triggerContent.style.display = "flex";
      }
    }
  }

  /**
   * Main function to translate the page
   *
   * Handles the translation of the page for multiple languages
   *
   * 1. Increments the request ID for each new translation
   * 2. Waits for the current translation to complete
   * 3. If the target language is the default page language, resets the translations
   * 4. Creates a new promise for each translation and awaits it
   *
   * @param targetLang - The target language
   */
  private async translatePage(targetLang: string): Promise<void> {
    // Increment the request ID for each new translation
    const requestId = ++this.translationRequestId;
    this.lastRequestedLanguage = targetLang;
    this.updateLoadingState(true);
    // If there's already a translation in progress, wait for it
    if (this.currentTranslationPromise) {
      await this.currentTranslationPromise;
    }
    // If target language is the default page language, restore original text
    if (targetLang === this.config.pageLanguage) {
      this.resetTranslations();
      // Only hide loader if this is the latest request
      if (requestId === this.translationRequestId) {
        this.updateLoadingState(false);
      }
      return;
    }

    // Create a new promise for this translation
    this.currentTranslationPromise = this._translatePage(targetLang);
    try {
      await this.currentTranslationPromise;
    } catch (error) {
      console.error("Translation failed:", error);
      this.resetToDefaultLanguage();
    } finally {
      if (requestId === this.translationRequestId) {
        this.currentTranslationPromise = null;
        this.updateLoadingState(false);
      }
    }
  }

  /**
   * Reset to default Page language
   * @returns
   */
  resetToDefaultLanguage(): void {
    if (this.isTranslating) {
      return;
    }
    this.resetTranslations();
    this.lastRequestedLanguage = this.config.pageLanguage;
    this.currentLanguage = this.config.pageLanguage;


    // Update UI
    const languageItems = this.widget.querySelectorAll<HTMLElement>(".jigts-language-item");
    languageItems.forEach((item) => {
      const isSelected = item.getAttribute("data-language-code") === this.config.pageLanguage;
      item.classList.toggle("jigts-selected", isSelected);
      item.setAttribute("aria-selected", isSelected.toString());
    });

    // Update localStorage preference to original language
    localStorage.setItem(LOCALSTORAGE_KEYS.PREFERRED_LANGUAGE, this.config.pageLanguage);

    // Update trigger icon
    const triggerIcon = this.elements.trigger?.querySelector(".jigts-trigger-icon");
    if (triggerIcon) {
      triggerIcon.innerHTML = this.getLanguageSVG();
    }

    // Update translation state
    this.isTranslated = false;
    this.updateResetButtonVisibility();
  }

  private async _translatePage(targetLang: string): Promise<void> {
    // Set the translating flag to true and disconnect the observer to pause DOM observation
    this.isTranslating = true;
    this.observer?.disconnect();
    try {
      // Find all translatable content nodes in the document
      const nodes = DocumentNavigator.findTranslatableContent();
      // get the visible nodes
      const visibleNodes = nodes.filter((node) => {
        const rect = node.element.getBoundingClientRect();
        return rect.height > 0 && rect.top < window.innerHeight;
      });

      const nonVisibleNodes = nodes.filter((node) => {
        const rect = node.element.getBoundingClientRect();
        return rect.height === 0 || rect.top > window.innerHeight;
      });

      const visibleBatches = DocumentNavigator.divideIntoGroups(visibleNodes, BATCH_SIZE);
      const nonVisibleBatches = DocumentNavigator.divideIntoGroups(nonVisibleNodes, BATCH_SIZE);
      // Initialize cache for storing translations
      const cache = new LocalStorageWrapper(CACHE_PREFIX);

      // Helper function to process batches
      const processBatches = async (batches: { element: HTMLElement; text: string }[][]) => {

        const allBatchNodes: { element: HTMLElement; text: string }[][] = [];
        const allBatchTexts: string[][] = [];

        batches.forEach((batch) => {
          const textsToTranslate: string[] = [];
          const batchNodes: { element: HTMLElement; text: string }[] = [];

          batch.forEach((node) => {
            const parent = node.element;
            if (!parent) return;
            const translatedLang = parent.getAttribute(ATTRIBUTES.TRANSLATED_LANG);
            // Skip nodes that are already translated to the target language
            if (parent.hasAttribute(ATTRIBUTES.ORIGINAL_TEXT) && targetLang === translatedLang) {
              return;
            }

            // Get text to translate and remove emojis
            let textToTranslate = this.getTextToTranslate(node, parent, targetLang);
            textToTranslate = removeEmojis(textToTranslate || "");
            if (textToTranslate.length === 0 || textToTranslate.length === 1) {
              return;
            }

            // Add text and node to the batch if valid
            if (textToTranslate) {
              const cacheObject = cache.getItem(cache.getPageKey(targetLang)) || {};
              const cachedTranslation = cacheObject[textToTranslate] || null;
              if (cachedTranslation) {
                // Use cached translation
                if (this.lastRequestedLanguage === targetLang) {
                  const originalText = textToTranslate;
                  const translatedText = cachedTranslation;
                  const originalFontSize = parent.getAttribute(ATTRIBUTES.ORIGINAL_FONT_SIZE) || "16px";
                  const newFontSize = this.calculateFontSize(translatedText, originalFontSize, originalText);
                  parent.style.fontSize = newFontSize;
                  parent.textContent = translatedText;
                }
                return;
              }

              textsToTranslate.push(textToTranslate.trim());
              batchNodes.push(node);
            }
          });

          if (textsToTranslate.length > 0) {
            allBatchNodes.push(batchNodes);
            allBatchTexts.push(textsToTranslate);
          }
        });

        if (allBatchTexts.length > 0) {
          const allTranslatedTexts = await Promise.all(allBatchTexts.map((texts) => this.translationService.translateBatchText(texts, targetLang)));

          // Filter out failed batches and create a mapping of successful translations
          const successfulBatches: Array<{ translations: string[]; nodes: { element: HTMLElement; text: string }[] }> = [];
          
          allTranslatedTexts.forEach((translations, batchIndex) => {
            if (translations !== null && translations.length > 0) {
              successfulBatches.push({
                translations,
                nodes: allBatchNodes[batchIndex]
              });
            }
          });

          // If no successful batches, reset to default language
          if (successfulBatches.length === 0) {
            this.updateLoadingState(false);
            this.isTranslating = false;
            this.resetToDefaultLanguage();
            return;
          }

          const batchArray: Array<{ originalText: string; translatedText: string }> = [];

          // Process successful batches
          successfulBatches.forEach(({ translations, nodes }) => {
            nodes.forEach((node, nodeIndex) => {
              const parent = node.element;
              if (parent && translations[nodeIndex]) {
                const originalText = node.text || "";
                const translatedText = translations[nodeIndex];
                const originalTextWithoutEmojis = removeEmojis(originalText);

                // Only process if we have valid text
                if (originalTextWithoutEmojis && translatedText) {
                  batchArray.push({
                    originalText: originalTextWithoutEmojis,
                    translatedText
                  });

                  // Update DOM only if this is the most recent translation request
                  if (this.lastRequestedLanguage === targetLang) {
                    const originalFontSize = parent.getAttribute(ATTRIBUTES.ORIGINAL_FONT_SIZE) || "16px";
                    const newFontSize = this.calculateFontSize(translatedText, originalFontSize, originalText);
                    parent.style.fontSize = newFontSize;
                    parent.textContent = translatedText;
                  }
                }
              }
            });
          });

          // Cache successful translations
          if (batchArray.length > 0) {
            cache.setBatchNodeTranslationsArray(targetLang, batchArray);
          }
        }

      };

      // Process both visible and non-visible batches concurrently
      await Promise.allSettled([
        processBatches(visibleBatches),
        processBatches(nonVisibleBatches)
      ]);

      // Update UI state if this is the most recent request
      if (this.lastRequestedLanguage === targetLang) {
        this.isTranslated = true;
        this.updateResetButtonVisibility();
      }
    } finally {
      // Reset translating flag and resume observing
      this.isTranslating = false;
      this.observeBody();
    }
  }

  /**
   * Updates the visibility of the reset button
   */
  private updateResetButtonVisibility(): void {
    const resetButton = this.widget.querySelector<HTMLElement>(".jigts-reset-option");
    if (resetButton) {
      resetButton.style.display = this.isTranslated ? "flex" : "none";
    }
  }

  /**
   * Resets the translations
   */
  private resetTranslations(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
    const elements = document.querySelectorAll<HTMLElement>(`[${ATTRIBUTES.ORIGINAL_TEXT}]`);
    elements.forEach((element) => {
      const textNodes = Array.from(element.childNodes).filter((node): node is Text => node.nodeType === Node.TEXT_NODE);
      if (textNodes.length > 0) {
        const originalText = element.getAttribute(ATTRIBUTES.ORIGINAL_TEXT);
        if (originalText) {
          element.textContent = originalText;
        }
      }
      // Restore original font size
      const originalFontSize = element.getAttribute(ATTRIBUTES.ORIGINAL_FONT_SIZE);
      if (originalFontSize) {
        element.style.fontSize = originalFontSize;
      }
      element.removeAttribute(ATTRIBUTES.ORIGINAL_TEXT);
      element.removeAttribute(ATTRIBUTES.TRANSLATED_LANG);
      element.removeAttribute(ATTRIBUTES.ORIGINAL_FONT_SIZE);
    });
    this.isTranslated = false;

    this.currentLanguage = this.config.pageLanguage;
    // Update lastTranslated to reflect the reset state
    const nodes = DocumentNavigator.findTranslatableContent();
    const hash = generateHashForContent(nodes);
    this.lastTranslated = {
      url: window.location.href,
      lang: this.config.pageLanguage,
      hash,
    };

    this.updateResetButtonVisibility();
    this.observeBody(); // Reconnect observer
  }

  /**
   * Adjusts the dropdown position
   */
  private adjustDropdownPosition(): void {
    const { dropdown, trigger } = this.elements;
    if (!dropdown || !trigger) return;

    const triggerRect = trigger.getBoundingClientRect();
    const dropdownRect = dropdown.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    dropdown.style.top = "";
    dropdown.style.bottom = "";
    dropdown.style.left = "";
    dropdown.style.right = "";
    dropdown.style.transform = "";

    const spaceBelow = viewportHeight - triggerRect.bottom;
    const spaceAbove = triggerRect.top;
    const spaceRight = viewportWidth - triggerRect.right;
    const spaceLeft = triggerRect.left;

    // Determine vertical position
    if (spaceBelow < dropdownRect.height && spaceAbove > spaceBelow) {
      dropdown.style.bottom = "100%";
      dropdown.style.top = "auto";
      dropdown.style.marginBottom = "0.5rem";
      dropdown.style.marginTop = "0";
    } else {
      dropdown.style.top = "100%";
      dropdown.style.bottom = "auto";
      dropdown.style.marginTop = "0.5rem";
      dropdown.style.marginBottom = "0";
    }

    // Determine horizontal position
    if (spaceRight < dropdownRect.width && spaceLeft > spaceRight) {
      dropdown.style.right = "0";
      dropdown.style.left = "auto";
    } else {
      dropdown.style.left = "0";
      dropdown.style.right = "auto";
    }

    const finalRect = dropdown.getBoundingClientRect();

    if (finalRect.right > viewportWidth) {
      dropdown.style.right = "0";
      dropdown.style.left = "auto";
    }

    if (finalRect.left < 0) {
      dropdown.style.left = "0";
      dropdown.style.right = "auto";
    }
  }

  /**
   * Sets up the event listeners
   */
  private setupEventListeners(): void {
    const { trigger, dropdown, searchInput, clearSearch, languageItems } = this.elements;

    if (!trigger || !dropdown || !searchInput || !clearSearch || !languageItems) {
      console.error("Failed to find required elements");
      return;
    }

    // Reset button functionality
    const resetButton = this.widget.querySelector<HTMLElement>(".jigts-reset-option");
    if (resetButton) {
      resetButton.addEventListener("click", () => {
        if (this.isTranslating) return;
        this.resetToDefaultLanguage();
        resetButton.classList.remove("jigts-active");
        this.isTranslated = false;
        this.updateResetButtonVisibility();
        // Reset language selector to page language
        const languageItems = this.widget.querySelectorAll<HTMLElement>(".jigts-language-item");
        languageItems.forEach((item) => {
          const isSelected = item.getAttribute("data-language-code") === this.config.pageLanguage;
          item.classList.toggle("jigts-selected", isSelected);
          item.setAttribute("aria-selected", isSelected.toString());
        });
        // Restore SVG icon
        const triggerIcon = this.elements.trigger?.querySelector(".jigts-trigger-icon");
        if (triggerIcon) {
          triggerIcon.innerHTML = this.getLanguageSVG();
        }
        // Close dropdown
        dropdown.classList.remove("jigts-open");
        trigger.setAttribute("aria-expanded", "false");
        // Remove has-translation class
        const triggerContent = trigger.querySelector<HTMLDivElement>(".jigts-trigger-content");
        if (triggerContent) triggerContent.classList.remove("jigts-has-translation");
      });
    }

    this.updateResetButtonVisibility();

    trigger.addEventListener("click", () => {
      dropdown.classList.toggle("jigts-open");
      const isOpen = dropdown.classList.contains("jigts-open");
      trigger.setAttribute("aria-expanded", isOpen.toString());
      if (isOpen) {
        this.adjustDropdownPosition();
        searchInput.focus();
      }
    });

    window.addEventListener("resize", () => {
      if (dropdown.classList.contains("jigts-open")) {
        this.adjustDropdownPosition();
      }
    });

    document.addEventListener("click", (e: MouseEvent) => {
      if (!(e.target as Element).closest(".jigts-translation-widget")) {
        if (dropdown.classList.contains("jigts-open")) {
          dropdown.classList.add("jigts-closing");
          setTimeout(() => {
            dropdown.classList.remove("jigts-open", "jigts-closing");
            trigger.setAttribute("aria-expanded", "false");
          }, 300);
        }
      }
    });

    searchInput.addEventListener("input", () => {
      const searchTerm = searchInput.value.toLowerCase();
      const hasValue = searchTerm.length > 0;
      clearSearch.classList.toggle("jigts-visible", hasValue);

      const items = this.widget.querySelectorAll<HTMLElement>(".jigts-language-item");
      const noResults = this.widget.querySelector<HTMLElement>(".jigts-no-results");
      let visibleCount = 0;

      items.forEach((item) => {
        const name = item.querySelector(".jigts-language-name")?.textContent?.toLowerCase() || "";
        const native = item.querySelector(".jigts-language-native")?.textContent?.toLowerCase() || "";
        const code = item.querySelector(".jigts-language-code")?.textContent?.toLowerCase() || "";
        const region = item.querySelector(".jigts-language-region")?.textContent?.toLowerCase() || "";

        const matches = name.includes(searchTerm) || native.includes(searchTerm) || code.includes(searchTerm) || region.includes(searchTerm);

        item.style.display = matches ? "" : "none";
        if (matches) visibleCount++;
      });

      if (noResults) {
        noResults.style.display = visibleCount === 0 ? "flex" : "none";
      }
    });

    clearSearch.addEventListener("click", () => {
      searchInput.value = "";
      clearSearch.classList.remove("jigts-visible");
      searchInput.focus();

      const items = this.widget.querySelectorAll<HTMLElement>(".jigts-language-item");
      const noResults = this.widget.querySelector<HTMLElement>(".jigts-no-results");

      items.forEach((item) => {
        item.style.display = "";
      });

      if (noResults) {
        noResults.style.display = "none";
      }
    });

    languageItems.forEach((item) => {
      item.addEventListener("click", async () => {
        languageItems.forEach((i) => {
          i.classList.remove("jigts-selected");
          i.setAttribute("aria-selected", "false");
        });

        item.classList.add("jigts-selected");
        item.setAttribute("aria-selected", "true");

        const langName = item.querySelector(".jigts-language-name")?.textContent;
        const langCode = item.getAttribute("data-language-code");

        // Close dropdown immediately
        dropdown.classList.remove("jigts-open");
        trigger.setAttribute("aria-expanded", "false");

        if (langName) {
          await this.updateTriggerText(langName);
        }

        if (langCode) {
          localStorage.setItem(LOCALSTORAGE_KEYS.PREFERRED_LANGUAGE, langCode);
        }

        const triggerIcon = this.elements.trigger?.querySelector(".jigts-trigger-icon");
        if (triggerIcon && langCode && langName) {
          triggerIcon.innerHTML = `<span class=\"jigts-lang-code\">${langCode.toUpperCase()}</span><span class=\"jigts-lang-name\">${langName}</span>`;
        }

        const triggerContent = trigger.querySelector<HTMLDivElement>(".jigts-trigger-content");
        if (langCode && langCode !== this.currentLanguage) {
          if (triggerContent) triggerContent.classList.add("jigts-has-translation");
          const triggerLoading = trigger.querySelector<HTMLDivElement>(".jigts-trigger-loading");
          if (triggerContent && triggerLoading) {
            triggerContent.style.display = "none";
            triggerLoading.style.display = "flex";
          }

          try {
            await this.translatePage(langCode);
            this.currentLanguage = langCode;
          } catch (error) {
            console.error("Translation error:", error);
            alert("An error occurred during translation. Please try again.");
          }
        } else if (triggerContent) {
          triggerContent.classList.remove("jigts-has-translation");
        }
      });
    });

    document.addEventListener("keydown", (e: KeyboardEvent) => {
      if (!dropdown.classList.contains("jigts-open")) return;

      if (e.key === "Escape") {
        dropdown.classList.remove("jigts-open");
        trigger.setAttribute("aria-expanded", "false");
        trigger.focus();
      }
    });
  }

  private scheduleTranslation() {
    if (this.translationScheduled) return;
    const currentUrl = window.location.href;
    const currentLang = this.currentLanguage;
    const nodes = DocumentNavigator.findTranslatableContent();
    const hash = generateHashForContent(nodes);
    if (
      this.lastTranslated &&
      this.lastTranslated.url === currentUrl &&
      this.lastTranslated.lang === currentLang &&
      this.lastTranslated.hash === hash
    ) {
      return;
    }
    this.translationScheduled = true;
    if (this.scheduleTimeout) clearTimeout(this.scheduleTimeout);
    this.scheduleTimeout = window.setTimeout(() => {
      this.translationScheduled = false;
      if (this.currentLanguage !== this.config.pageLanguage) {
        this.lastTranslated = { url: currentUrl, lang: currentLang, hash };
        const triggerContent = this.elements.trigger?.querySelector<HTMLDivElement>(".jigts-trigger-content");
        const triggerLoading = this.elements.trigger?.querySelector<HTMLDivElement>(".jigts-trigger-loading");
        if (triggerContent && triggerLoading) {
          triggerContent.style.display = "none";
          triggerLoading.style.display = "flex";
        }
        this.translatePage(this.currentLanguage)
          .then(() => {
            const languageItems = this.widget.querySelectorAll<HTMLElement>(".jigts-language-item");
            languageItems.forEach((item) => {
              const isSelected = item.getAttribute("data-language-code") === this.currentLanguage;
              item.classList.toggle("jigts-selected", isSelected);
              item.setAttribute("aria-selected", isSelected.toString());
            });
          })
          .catch((error) => {
            console.error("Auto-translation error:", error);
          });
      }
    }, 200);
  }

  /**
   * Public method to translate the page to a specific language
   * @param langCode The language code to translate to
   * @returns Promise that resolves when translation is complete
   */
  public async translateTo(
    langCode: string,
    onComplete?: (result: TranslationResult) => void,
    onError?: (error: Error) => void
  ): Promise<TranslationResult> {
    const startTime = Date.now();
    if (this.isTranslating) {
      console.warn("Translation already in progress");
      onError?.(new Error("Translation already in progress"));
      return {
        success: false,
        targetLanguage: langCode,
        translatedNodes: 0,
        error: "Translation already in progress",
        duration: 0,
      };
    }

    const supportedLang = languages.find((lang) => lang.code === langCode);
    if (!supportedLang) {
      onError?.(new Error(`Unsupported language code: ${langCode}`));
      return {
        success: false,
        targetLanguage: langCode,
        translatedNodes: 0,
        error: `Unsupported language code: ${langCode}`,
        duration: 0,
      };
    }

    if (langCode === this.currentLanguage) {
      onComplete?.({
        success: true,
        targetLanguage: langCode,
        translatedNodes: 0,
        duration: 0,
      });
      return {
        success: true,
        targetLanguage: langCode,
        translatedNodes: 0,
        duration: 0,
      };
    }

    try {
      localStorage.setItem(LOCALSTORAGE_KEYS.PREFERRED_LANGUAGE, langCode);
      await this.translatePage(langCode);
      // Update the current language
      this.currentLanguage = langCode;

      // Update UI to reflect the selected language
      const languageItems = this.widget.querySelectorAll<HTMLElement>(".jigts-language-item");
      for (const item of languageItems) {
        const isSelected = item.getAttribute("data-language-code") === langCode;
        item.classList.toggle("jigts-selected", isSelected);
        item.setAttribute("aria-selected", isSelected.toString());
      }

      // Update trigger text
      const triggerContent = this.elements.trigger?.querySelector<HTMLDivElement>(".jigts-trigger-content");
      if (triggerContent) {
        triggerContent.classList.add("jigts-has-translation");
        const triggerIcon = triggerContent.querySelector(".jigts-trigger-icon");
        if (triggerIcon && supportedLang) {
          triggerIcon.innerHTML = `<span class="jigts-lang-code">${supportedLang.code.toUpperCase()}</span><span class="jigts-lang-name">${supportedLang.name}</span>`;
        }
      }

      const endTime = Date.now();
      const translatedNodes = document.querySelectorAll(`[${ATTRIBUTES.TRANSLATED_LANG}]`).length;
      onComplete?.({
        success: true,
        targetLanguage: langCode,
        translatedNodes,
        duration: endTime - startTime,
      });

      // upate the localstroage pref
      return {
        success: true,
        targetLanguage: langCode,
        translatedNodes,
        duration: endTime - startTime,
      };
    } catch (error) {
      onError?.(error as Error);
      return {
        success: false,
        targetLanguage: langCode,
        translatedNodes: 0,
        error: error instanceof Error ? error.message : "Unknown error occurred",
        duration: 0,
      };
    }
  }

  /**
   * Get the current instance of TranslationWidget
   * @returns The current TranslationWidget instance or null if not initialized
   */
  public static getInstance(): TranslationWidget | null {
    return TranslationWidget.instance;
  }

  // Add this helper method to the class
  private getLanguageSVG(): string {
    return `\n            <svg class=\"jigts-languages-icon\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">\n                <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"\n                    d=\"M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129\">\n                </path>\n            </svg>\n        `;
  }
}

// Expose the translate function globally
declare global {
  interface Window {
    resetTranslation: (
      defaultLang: string,
      onComplete?: (result: Pick<TranslationResult, "success" | "targetLanguage">) => void,
      onError?: (error: Error) => void
    ) => void;
    translate: (langCode: string, onComplete?: (result: TranslationResult) => void, onError?: (error: Error) => void) => Promise<TranslationResult>;
  }
}

if (typeof window !== "undefined") {
  /**
   * Reset the translation to the default language
   * @param defaultLang The default language to reset to
   * @param onComplete Callback function that will be called when the translation is complete
   * @param onError Callback function that will be called if the translation fails
   * @returns A promise that resolves to the translation result
   */
  window.resetTranslation = (
    defaultLang: string,
    onComplete?: (result: Pick<TranslationResult, "success" | "targetLanguage">) => void,
    onError?: (error: Error) => void
  ) => {
    const instance = TranslationWidget.getInstance();
    if (!instance) {
      return;
    }
    try {
      instance.resetToDefaultLanguage();
      onComplete?.({
        success: true,
        targetLanguage: defaultLang,
      });
    } catch (error) {
      onError?.(error as Error);
    }
  };

  /**
   * @param langCode The language code to translate to
   * @param onComplete Callback function that will be called when the translation is complete
   * @param onError Callback function that will be called if the translation fails
   * @returns A promise that resolves to the translation result
   */
  window.translate = async (
    langCode: string,
    onComplete?: (result: TranslationResult) => void,
    onError?: (error: Error) => void
  ): Promise<TranslationResult> => {
    const instance = TranslationWidget.getInstance();
    if (!instance) {
      onError?.(new Error("Translation widget not initialized"));
      return {
        success: false,
        targetLanguage: langCode,
        translatedNodes: 0,
        error: "Translation widget not initialized",
        duration: 0,
      };
    }
    const startTime = Date.now();
    try {
      const result = await instance.translateTo(langCode, onComplete, onError);
      onComplete?.(result);
      return result;
    } catch (error) {
      onError?.(error as Error);
      return {
        success: false,
        targetLanguage: langCode,
        translatedNodes: 0,
        error: error instanceof Error ? error.message : "Unknown error occurred",
        duration: Date.now() - startTime,
      };
    }
  };
}
