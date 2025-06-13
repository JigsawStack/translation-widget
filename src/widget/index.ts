import { TranslationService } from "../lib/translation/index";
import { DocumentNavigator } from "../lib/dom";
import { languages } from "../constants/languages";
import { BATCH_SIZE, DEFAULT_CONFIG } from "../constants";
import type { Language, TranslationConfig, WidgetElements, TranslationResult } from "../types";
import widgetTemplate from "../templates/html/widget.html?raw";
import { generateHashForContent, generateNodeHash, getUserLanguage, removeEmojis } from "../utils/utils";
import { CACHE_PREFIX } from "../constants";
import { LocalStorageWrapper } from "../lib/storage/localstorage";



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

  constructor(publicKey: string, config: Partial<TranslationConfig> = {}) {

    const allowedPositions = ["top-right", "top-left", "bottom-left", "bottom-right"] as const;

    let safeConfig = { ...DEFAULT_CONFIG, ...config };
    
    if (safeConfig.position && !allowedPositions.includes(safeConfig.position)) {
      console.warn(`Invalid position '${safeConfig.position}' passed to TranslationWidget. Falling back to 'top-right'.`);
      safeConfig.position = "top-right";
    }

    this.config = safeConfig as Required<TranslationConfig>;

    if (!publicKey) {
      throw new Error("Public key is required to initialize the translation widget");
    }

    if (publicKey.startsWith("sk_")) {
      throw new Error("Please use public api key for security reasons. You can get one from https://jigsawstack.com");
    }

    if (!publicKey.startsWith("pk_")) {
      throw new Error("Please use proper api key. You can get one from https://jigsawstack.com");
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

  private initialize(): void {
    if (!this.validateConfig()) return;

    const urlLang = this.getUrlParameter("lang");

    let initialLang = this.config.pageLanguage;

    if (urlLang) {
      const supportedLang = languages.find((lang) => lang.code === urlLang);
      if (supportedLang) {
        initialLang = urlLang;
      }
    } else if (localStorage.getItem("jss-pref")) {
      initialLang = localStorage.getItem("jss-pref") as string;
    } else if (this.autoDetectLanguage) {
      initialLang = this.userLanguage;
    } else if (!this.config.pageLanguage) {
      const htmlTag = document.querySelector("html");
      if (htmlTag && htmlTag.getAttribute("lang")) {
        initialLang = htmlTag.getAttribute("lang") as string;
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

  private getUrlParameter(name: string): string | null {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  }

  private setupContentObserver(): void {
    this.observer = new MutationObserver(() => {
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
      characterData: true,
    });
  }

  private onUrlChange = () => {
    this.scheduleTranslation();
  };

  private setupURLObserver(): void {
    const historyMethods = ["pushState", "replaceState"] as const;

    historyMethods.forEach((method) => {
      const original = history[method];
      history[method] = function (state: any, title: string, url?: string | URL | null) {
        const result = original.call(this, state, title, url);
        window.dispatchEvent(new Event(method));
        return result;
      };
      window.addEventListener(method, this.onUrlChange);
    });

    // Also listen for popstate events (browser back/forward)
    window.addEventListener("popstate", this.onUrlChange);
  }

  private validateConfig(): boolean {
    if (!this.translationService) {
      console.error("Translation service is required to initialize the translation widget");
      return false;
    }
    return true;
  }

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

    // Cache element references
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

  private getCurrentLanguageLabel(): string {
    return languages.find((language: Language) => language.code === this.currentLanguage)?.native || "English";
  }

  private createWidgetHTML(currentLanguageLabel: string): string {
    const languageOptions = this.createLanguageOptions();
    const languageCount = languages.length;
    return widgetTemplate
      .replace("{{languageOptions}}", languageOptions)
      .replace("{{currentLanguageLabel}}", currentLanguageLabel)
      .replace("{{languageCount}}", languageCount.toString());
  }

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

  private async updateTriggerText(newText: string): Promise<void> {
    const triggerSpan = this.elements.trigger?.querySelector("span");
    if (!triggerSpan) return;

    // Force a reflow to ensure the animation plays
    triggerSpan.offsetHeight;

    // Start fade out
    triggerSpan.classList.remove("jigts-fade-in");
    triggerSpan.classList.add("jigts-fade-out");

    // Wait for fade out
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Update text
    triggerSpan.textContent = newText;

    // Force a reflow
    triggerSpan.offsetHeight;

    // Start fade in
    triggerSpan.classList.remove("jigts-fade-out");
    triggerSpan.classList.add("jigts-fade-in");
  }

    private getTextToTranslate(node: { element: HTMLElement; text: string }, parent: HTMLElement, targetLang: string): string | null {
    if (!parent.hasAttribute("data-original-text")) {
      const originalText = node.text?.trim();
      if (originalText) {
        parent.setAttribute("data-translated-lang", targetLang);
        parent.setAttribute("data-original-text", originalText);
        // Store original font size if not already stored
        if (!parent.hasAttribute("data-original-font-size")) {
          const computedStyle = window.getComputedStyle(parent);
          parent.setAttribute("data-original-font-size", computedStyle.fontSize);
        }
        return originalText;
      }
    } else {
      const textToTranslate = node.text?.trim();
      if (this.currentLanguage !== "en" && targetLang !== "en") {
        parent.setAttribute("data-translated-lang", targetLang);
        return parent.getAttribute("data-original-text");
      }
      return textToTranslate || null;
    }
    return null;
  }

  private calculateFontSize(text: string, originalFontSize: string, originalText: string): string {
    const baseFontSize = 12; // Minimum font size in pixels
    const maxFontSize = parseInt(originalFontSize); // Maximum font size is the original size
    const textLength = text.length;
    const originalLength = originalText.length;

    // Only scale down if translated text is longer than original
    if (textLength <= originalLength) {
      return originalFontSize;
    }

    // Calculate font size based on text length
    // The longer the text, the smaller the font size
    // We use a logarithmic scale to make the reduction more gradual
    const fontSize = Math.max(baseFontSize, Math.min(maxFontSize, maxFontSize * (1 - Math.log(textLength) / 10)));

    return `${fontSize}px`;
  }

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
      // If translation fails, reset to default language
      this.resetToDefaultLanguage();
    } finally {
      // Only hide loader if this is the latest request
      if (requestId === this.translationRequestId) {
        this.currentTranslationPromise = null;
        this.updateLoadingState(false);
      }
    }
  }

  resetToDefaultLanguage(): void {
    if (this.isTranslating) {
      return;
    }
    // Reset translations
    this.resetTranslations();

    // Update language states
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
    localStorage.setItem("jss-pref", this.config.pageLanguage);

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
      // Divide nodes into batches for processing
      const batches = DocumentNavigator.divideIntoGroups(nodes, BATCH_SIZE);

      // Initialize cache for storing translations
      const cache = new LocalStorageWrapper(CACHE_PREFIX);

      // Arrays to store nodes and texts for each batch
      const allBatchNodes: { element: HTMLElement; text: string }[][] = [];
      const allBatchTexts: string[][] = [];
      const allBatchNodeHashes: string[][] = [];

      // Prepare batches by filtering nodes that need translation
      batches.forEach((batch) => {
        const textsToTranslate: string[] = [];
        const batchNodes: { element: HTMLElement; text: string }[] = [];
        const batchNodeHashes: string[] = [];

        batch.forEach((node) => {
          const parent = node.element;
          if (!parent) return;
          const translatedLang = parent.getAttribute("data-translated-lang");

          // Skip nodes that are already translated to the target language
          if (parent.hasAttribute("data-original-text") && targetLang === translatedLang) {
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
            const nodeHash = generateNodeHash(textToTranslate);
            const cachedTranslation = cache.getNodeTranslation(nodeHash, window.location.href, targetLang);

            if (cachedTranslation) {
              // Use cached translation
              if (this.lastRequestedLanguage === targetLang) {
                const originalText = cachedTranslation.o;
                const translatedText = cachedTranslation.t;
                const originalFontSize = parent.getAttribute("data-original-font-size") || "16px";
                const newFontSize = this.calculateFontSize(translatedText, originalFontSize, originalText);
                parent.style.fontSize = newFontSize;
                parent.textContent = translatedText;
              }
              return;
            }

            textsToTranslate.push(textToTranslate.trim());
            batchNodes.push(node);
            batchNodeHashes.push(nodeHash);
          }
        });

        if (textsToTranslate.length > 0) {
          allBatchNodes.push(batchNodes);
          allBatchTexts.push(textsToTranslate);
          allBatchNodeHashes.push(batchNodeHashes);
        }
      });

      // If no nodes need translation, we're done
      if (allBatchTexts.length === 0) {
        if (this.lastRequestedLanguage === targetLang) {
          this.isTranslated = true;
          this.updateResetButtonVisibility();
        }
        return;
      }

      // Translate all batches in parallel
      const allTranslatedTexts = await Promise.all(
        allBatchTexts.map((texts) => this.translationService.translateBatchText(texts, targetLang))
      );

      // Process translated batches
      allTranslatedTexts.forEach((translations, batchIndex) => {
        const batchNodes = allBatchNodes[batchIndex];
        const batchNodeHashes = allBatchNodeHashes[batchIndex];

        batchNodes.forEach((node, nodeIndex) => {
          const parent = node.element;
          if (parent) {
            const originalText = node.text;
            const translatedText = translations[nodeIndex];
            const nodeHash = batchNodeHashes[nodeIndex];

            // Cache the translation
            cache.setNodeTranslation(nodeHash, window.location.href, targetLang, {
              o: originalText,
              t: translatedText
            });

            // Update DOM if this is the most recent request
            if (this.lastRequestedLanguage === targetLang) {
              const originalFontSize = parent.getAttribute("data-original-font-size") || "16px";
              const newFontSize = this.calculateFontSize(translatedText, originalFontSize, originalText);
              parent.style.fontSize = newFontSize;
              parent.textContent = translatedText;
            }
          }
        });
      });

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

  private updateResetButtonVisibility(): void {
    const resetButton = this.widget.querySelector<HTMLElement>(".jigts-reset-option");
    if (resetButton) {
      resetButton.style.display = this.isTranslated ? "flex" : "none";
    }
  }

  private resetTranslations(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
    const elements = document.querySelectorAll<HTMLElement>("[data-original-text]");
    elements.forEach((element) => {
      const textNodes = Array.from(element.childNodes).filter((node): node is Text => node.nodeType === Node.TEXT_NODE);
      if (textNodes.length > 0) {
        const originalText = element.getAttribute("data-original-text");
        if (originalText) {
          element.innerHTML = originalText;
        }
      }
      // Restore original font size
      const originalFontSize = element.getAttribute("data-original-font-size");
      if (originalFontSize) {
        element.style.fontSize = originalFontSize;
      }
      element.removeAttribute("data-original-text");
      element.removeAttribute("data-translated-lang");
      element.removeAttribute("data-original-font-size");
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
          localStorage.setItem("jss-pref", langCode);
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
      localStorage.setItem("jss-pref", langCode);
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
      const translatedNodes = document.querySelectorAll("[data-translated-lang]").length;
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
