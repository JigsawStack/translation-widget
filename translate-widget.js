class TranslationCache {
  constructor() {
    this.cache = new Map();
    this.maxSize = 1000; // Maximum number of cached translations
  }

  // Generate a unique key for the cache
  getKey(text, targetLang) {
    return `${targetLang}:${text}`;
  }

  // Get cached translation
  get(text, targetLang) {
    return this.cache.get(this.getKey(text, targetLang));
  }

  // Store translation in cache
  set(text, targetLang, translation) {
    // Remove oldest entry if cache is full
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    this.cache.set(this.getKey(text, targetLang), translation);
  }
}

const initializeTranslationWidget = (publicKey, config) => {
  if (!publicKey) {
    console.error(
      "Public key is required to initialize the translation widget"
    );
    return;
  }
  // Create and inject CSS
  const style = document.createElement("style");
  style.textContent = `
        .translate-widget {
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 9999;
          font-family: Arial, sans-serif;
        }
    
        .translate-button {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: #2563eb;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        }
    
        .translate-button:hover {
          background: #1d4ed8;
        }
    
        .translate-popup {
          position: absolute;
          bottom: 60px;
          right: 0;
          background: white;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          padding: 16px;
          width: 250px;
          display: none;
        }
    
        .translate-popup.active {
          display: block;
        }
    
        .translate-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }
    
        .translate-title {
          margin: 0;
          font-size: 16px;
          font-weight: bold;
          color: #000000;
        }
    
        .translate-close {
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
        }
    
        .translate-select {
          width: 100%;
          padding: 8px;
          border: 1px solid #e2e8f0;
          border-radius: 4px;
          margin-bottom: 12px;
        }
    
        .translate-reset {
          width: 100%;
          padding: 8px;
          background: #2563eb;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          display: none;
        }
    
        .translate-reset:hover {
          background: #2563eb;
        }
    
        .translate-reset.active {
          display: block;
        }
    
        .translate-loading {
          position: fixed;
          top: 20px;
          right: 20px;
          background: #2563eb;
          color: white;
          padding: 8px 16px;
          border-radius: 4px;
          display: none;
        }
    
        .translate-loading.active {
          display: block;
        }

        .translate-target-language {
        color: #000000;
        }
      `;
  document.head.appendChild(style);

  // Languages configuration
  const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
    { code: "zh", name: "Chinese" },
  ];

  let currentLanguage = config?.defaultLanguage || "en";
  const currentLanguageLabel =
    languages.find((language) => language.code === currentLanguage)?.name ||
    "English";

  // Create widget HTML
  const widget = document.createElement("div");
  widget.className = "translate-widget";
  widget.innerHTML = `
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
            <option value="">Select Language</option>
            ${languages
              .map(
                (lang) =>
                  `<option class="translate-target-language" value="${lang.code}">${lang.name}</option>`
              )
              .join("")}
          </select>
          <button class="translate-reset">Reset to ${currentLanguageLabel} </button>
        </div>
        <div class="translate-loading">Translating...</div>
      `;

  // Add widget to page
  document.body.appendChild(widget);

  // Get elements
  const translateButton = widget.querySelector(".translate-button");
  const popup = widget.querySelector(".translate-popup");
  const closeButton = widget.querySelector(".translate-close");
  const languageSelect = widget.querySelector(".translate-select");
  const resetButton = widget.querySelector(".translate-reset");
  const loadingIndicator = widget.querySelector(".translate-loading");

  // Event listeners
  translateButton.addEventListener("click", () => {
    popup.classList.toggle("active");
  });

  closeButton.addEventListener("click", () => {
    popup.classList.remove("active");
  });

  // Initialize translation cache
  const translationCache = new TranslationCache();

  // Modified translation function with caching
  async function translateText(text, targetLang) {
    try {
      // Check cache first
      const cachedTranslation = translationCache.get(text, targetLang);
      if (cachedTranslation) {
        console.log("Retrieved from cache:", text, "->", cachedTranslation);
        return cachedTranslation;
      }

      const response = await fetch(
        "https://api.jigsawstack.com/v1/ai/translate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": publicKey,
          },
          body: JSON.stringify({ text, target_language: targetLang }),
        }
      );

      if (!response.ok) {
        throw new Error(`Error translating text: ${response.statusText}`);
      }

      const result = await response.json();
      const translation = result.translated_text;

      // Store in cache
      translationCache.set(text, targetLang, translation);

      return translation;
    } catch (error) {
      console.error("Translation error:", error);
      return text; // Return original text on error
    }
  }

  // Function to get all translatable text nodes
  function getTranslatableNodes() {
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: function (node) {
          // Skip script and style contents
          const parent = node.parentElement;
          if (!parent) return NodeFilter.FILTER_REJECT;

          if (parent.tagName === "SCRIPT" || parent.tagName === "STYLE") {
            return NodeFilter.FILTER_REJECT;
          }
          // Skip the translation widget itself
          if (parent.closest(".translate-widget")) {
            return NodeFilter.FILTER_REJECT;
          }
          // Skip empty nodes
          if (!node.textContent.trim()) {
            return NodeFilter.FILTER_REJECT;
          }
          return NodeFilter.FILTER_ACCEPT;
        },
      }
    );

    const nodes = [];
    let node;
    while ((node = walker.nextNode())) {
      nodes.push(node);
    }
    return nodes;
  }

  // Handle language selection

  languageSelect.addEventListener("change", async function () {
    const targetLang = this.value;
    if (!targetLang || targetLang === currentLanguage) return;

    loadingIndicator.classList.add("active");
    resetButton.classList.add("active");

    try {
      const nodes = getTranslatableNodes();

      // Process nodes in batches to avoid overwhelming the API
      const batchSize = 10;
      for (let i = 0; i < nodes.length; i += batchSize) {
        const batch = nodes.slice(i, i + batchSize);
        await Promise.all(
          batch.map(async (node) => {
            const parent = node.parentElement;
            if (!parent) return;

            let textToTranslate;

            // If this is the first translation, store the original English text
            if (!parent.hasAttribute("data-original-text")) {
              const originalText = node.textContent.trim();
              if (originalText) {
                parent.setAttribute("data-original-text", originalText);
                textToTranslate = originalText;
              }
            } else {
              // For subsequent translations, either use the original text
              // or translate the current text, depending on user preference
              textToTranslate = node.textContent.trim();

              // If switching from a non-English language to another non-English language,
              // use the original English text to maintain translation quality
              if (currentLanguage !== "en" && targetLang !== "en") {
                textToTranslate = parent.getAttribute("data-original-text");
              }
            }

            if (textToTranslate) {
              const translatedText = await translateText(
                textToTranslate,
                targetLang
              );
              node.textContent = translatedText;
            }
          })
        );
      }

      // Update current language
      currentLanguage = targetLang;
    } catch (error) {
      console.error("Translation error:", error);
      alert("An error occurred during translation. Please try again.");
    } finally {
      loadingIndicator.classList.remove("active");
    }
  });

  resetButton.addEventListener("click", () => {
    const elements = document.querySelectorAll("[data-original-text]");
    elements.forEach((element) => {
      const textNodes = Array.from(element.childNodes).filter(
        (node) => node.nodeType === Node.TEXT_NODE
      );
      if (textNodes.length > 0) {
        textNodes[0].textContent = element.getAttribute("data-original-text");
      }
    });
    languageSelect.value = "en";
    currentLanguage = "en";
    resetButton.classList.remove("active");
  });

  // Add English as the default selected language
  languageSelect.innerHTML = `
      <option value=${currentLanguage}>${currentLanguageLabel}</option>
      ${languages
        .filter((lang) => lang.code !== currentLanguage)
        .map((lang) => `<option value="${lang.code}">${lang.name}</option>`)
        .join("")}
    `;
};
