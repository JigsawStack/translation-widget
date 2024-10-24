// Language detection function
async function detectLanguage(text) {
  try {
    // This should be replaced with a proper language detection API
    const commonPatterns = {
      en: /^[a-zA-Z\s.,!?]+$/,
      es: /[áéíóúñ¿¡]/i,
      fr: /[éèêëàâçîïôûù]/i,
      de: /[äöüß]/i,
      zh: /[\u4e00-\u9fff]/,
    };

    for (const [lang, pattern] of Object.entries(commonPatterns)) {
      if (pattern.test(text)) {
        return lang;
      }
    }

    return "en"; // Default to English if no pattern matches
  } catch (error) {
    console.error("Language detection error:", error);
    return "en"; // Default to English on error
  }
}

// Translation cache implementation
class TranslationCache {
  constructor() {
    this.cache = new Map();
    this.maxSize = 1000; // Maximum number of cached translations
  }

  // Generate a unique key for the cache
  getKey(text, sourceLang, targetLang) {
    return `${sourceLang}:${targetLang}:${text}`;
  }

  // Get cached translation
  get(text, sourceLang, targetLang) {
    return this.cache.get(this.getKey(text, sourceLang, targetLang));
  }

  // Store translation in cache
  set(text, sourceLang, targetLang, translation) {
    // Remove oldest entry if cache is full
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    this.cache.set(this.getKey(text, sourceLang, targetLang), translation);
  }
}

const initializeTranslationWidget = (publicKey) => {
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
          background: #f1f5f9;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          display: none;
        }
    
        .translate-reset:hover {
          background: #e2e8f0;
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
      `;
  document.head.appendChild(style);

  // Languages configuration - expand based on your API
  const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
    { code: "zh", name: "Chinese" },
  ];

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
                (lang) => `<option value="${lang.code}">${lang.name}</option>`
              )
              .join("")}
          </select>
          <button class="translate-reset">Reset to English</button>
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
  async function translateText(text, targetLang, sourceLang = null) {
    try {
      // If source language is not provided, detect it
      if (!sourceLang) {
        sourceLang = await detectLanguage(text);
      }

      // If text is already in target language, return it as is
      if (sourceLang === targetLang) {
        return text;
      }

      // Check cache first
      const cachedTranslation = translationCache.get(
        text,
        sourceLang,
        targetLang
      );
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
      translationCache.set(text, sourceLang, targetLang, translation);

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

  // Store the current language
  let currentLanguage = "en";
  let detectedSourceLanguage = null;

  languageSelect.addEventListener("change", async function () {
    const targetLang = this.value;
    if (!targetLang || targetLang === currentLanguage) return;

    loadingIndicator.classList.add("active");
    resetButton.classList.add("active");

    try {
      const nodes = getTranslatableNodes();

      // Detect language of the first substantial text node
      if (!detectedSourceLanguage) {
        for (const node of nodes) {
          const text = node.textContent.trim();
          if (text.length > 20) {
            // Only detect language for longer text
            detectedSourceLanguage = await detectLanguage(text);
            break;
          }
        }
      }

      // Process nodes in batches
      const batchSize = 10;
      for (let i = 0; i < nodes.length; i += batchSize) {
        const batch = nodes.slice(i, i + batchSize);
        await Promise.all(
          batch.map(async (node) => {
            const parent = node.parentElement;
            if (!parent) return;

            let textToTranslate;
            let sourceLanguage;

            if (!parent.hasAttribute("data-original-text")) {
              const originalText = node.textContent.trim();
              if (originalText) {
                parent.setAttribute("data-original-text", originalText);
                parent.setAttribute(
                  "data-original-lang",
                  detectedSourceLanguage
                );
                textToTranslate = originalText;
                sourceLanguage = detectedSourceLanguage;
              }
            } else {
              if (currentLanguage !== "en" && targetLang !== "en") {
                // For translations between non-English languages, use the original text
                textToTranslate = parent.getAttribute("data-original-text");
                sourceLanguage = parent.getAttribute("data-original-lang");
              } else {
                textToTranslate = node.textContent.trim();
                sourceLanguage = currentLanguage;
              }
            }

            if (textToTranslate) {
              const translatedText = await translateText(
                textToTranslate,
                targetLang,
                sourceLanguage
              );
              node.textContent = translatedText;
            }
          })
        );
      }

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
    languageSelect.value = detectedSourceLanguage || "en";
    currentLanguage = detectedSourceLanguage || "en";
    resetButton.classList.remove("active");
  });

  // Add English as the default selected language
  languageSelect.innerHTML = `
      <option value="en">English</option>
      ${languages
        .filter((lang) => lang.code !== "en")
        .map((lang) => `<option value="${lang.code}">${lang.name}</option>`)
        .join("")}
    `;
};
