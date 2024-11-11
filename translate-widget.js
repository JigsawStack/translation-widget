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

  const primaryColor = config?.primaryColor || "#2563eb";

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
          background: ${primaryColor};
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        }
    
        .translate-button:hover {
          background: ${primaryColor};
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
          background: ${primaryColor};
          border: none;
          border-radius: 4px;
          cursor: pointer;
          display: none;
        }
    
        .translate-reset:hover {
          background: ${primaryColor};
        }
    
        .translate-reset.active {
          display: block;
        }
    
        .translate-loading {
          position: fixed;
          top: 20px;
          right: 20px;
          background: ${primaryColor};
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

  let currentLanguage = config?.pageLanguage || "en";

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

  async function translateBatchText(text, targetLang) {
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

          // Skip elements with notranslate class
          if (parent.closest(".notranslate")) {
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

      // Process nodes in larger batches since we're using batch translation
      const batchSize = 10; // Increased batch size since we're doing bulk translation

      for (let i = 0; i < nodes.length; i += batchSize) {
        const batch = nodes.slice(i, i + batchSize);

        // Prepare arrays for batch translation
        const textsToTranslate = [];
        const batchNodes = [];

        // Collect texts and nodes for translation
        batch.forEach((node) => {
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
            textToTranslate = node.textContent.trim();

            // If switching from a non-English language to another non-English language,
            // use the original English text to maintain translation quality
            if (currentLanguage !== "en" && targetLang !== "en") {
              textToTranslate = parent.getAttribute("data-original-text");
            }
          }

          if (textToTranslate) {
            textsToTranslate.push(textToTranslate);
            batchNodes.push(node);
          }
        });

        // Perform batch translation
        if (textsToTranslate.length > 0) {
          const translatedTexts = await translateBatchText(
            textsToTranslate,
            targetLang
          );

          // Update nodes with translated text
          translatedTexts.forEach((translatedText, index) => {
            batchNodes[index].textContent = translatedText;
          });
        }
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

const languages = [
  { code: "aa", name: "Afar" },
  { code: "ab", name: "Abkhazian" },
  { code: "af", name: "Afrikaans" },
  { code: "ak", name: "Akan" },
  { code: "am", name: "Amharic" },
  { code: "an", name: "Aragonese" },
  { code: "ar", name: "Arabic" },
  { code: "as", name: "Assamese" },
  { code: "av", name: "Avar" },
  { code: "ay", name: "Aymara" },
  { code: "az", name: "Azerbaijani" },
  { code: "ba", name: "Bashkir" },
  { code: "be", name: "Belarusian" },
  { code: "bg", name: "Bulgarian" },
  { code: "bh", name: "Bihari" },
  { code: "bi", name: "Bislama" },
  { code: "bm", name: "Bambara" },
  { code: "bn", name: "Bengali" },
  { code: "bo", name: "Tibetan" },
  { code: "br", name: "Breton" },
  { code: "bs", name: "Bosnian" },
  { code: "ca", name: "Catalan" },
  { code: "ce", name: "Chechen" },
  { code: "ch", name: "Chamorro" },
  { code: "co", name: "Corsican" },
  { code: "cr", name: "Cree" },
  { code: "cs", name: "Czech" },
  { code: "cu", name: "Old Church Slavonic / Old Bulgarian" },
  { code: "cv", name: "Chuvash" },
  { code: "cy", name: "Welsh" },
  { code: "da", name: "Danish" },
  { code: "de", name: "German" },
  { code: "dv", name: "Divehi" },
  { code: "dz", name: "Dzongkha" },
  { code: "ee", name: "Ewe" },
  { code: "el", name: "Greek" },
  { code: "en", name: "English" },
  { code: "eo", name: "Esperanto" },
  { code: "es", name: "Spanish" },
  { code: "et", name: "Estonian" },
  { code: "eu", name: "Basque" },
  { code: "fa", name: "Persian" },
  { code: "ff", name: "Peul" },
  { code: "fi", name: "Finnish" },
  { code: "fj", name: "Fijian" },
  { code: "fo", name: "Faroese" },
  { code: "fr", name: "French" },
  { code: "fy", name: "West Frisian" },
  { code: "ga", name: "Irish" },
  { code: "gd", name: "Scottish Gaelic" },
  { code: "gl", name: "Galician" },
  { code: "gn", name: "Guarani" },
  { code: "gu", name: "Gujarati" },
  { code: "gv", name: "Manx" },
  { code: "ha", name: "Hausa" },
  { code: "he", name: "Hebrew" },
  { code: "hi", name: "Hindi" },
  { code: "ho", name: "Hiri Motu" },
  { code: "hr", name: "Croatian" },
  { code: "ht", name: "Haitian" },
  { code: "hu", name: "Hungarian" },
  { code: "hy", name: "Armenian" },
  { code: "hz", name: "Herero" },
  { code: "ia", name: "Interlingua" },
  { code: "id", name: "Indonesian" },
  { code: "ie", name: "Interlingue" },
  { code: "ig", name: "Igbo" },
  { code: "ii", name: "Sichuan Yi" },
  { code: "ik", name: "Inupiak" },
  { code: "io", name: "Ido" },
  { code: "is", name: "Icelandic" },
  { code: "it", name: "Italian" },
  { code: "iu", name: "Inuktitut" },
  { code: "ja", name: "Japanese" },
  { code: "jv", name: "Javanese" },
  { code: "ka", name: "Georgian" },
  { code: "kg", name: "Kongo" },
  { code: "ki", name: "Kikuyu" },
  { code: "kj", name: "Kuanyama" },
  { code: "kk", name: "Kazakh" },
  { code: "kl", name: "Greenlandic" },
  { code: "km", name: "Cambodian" },
  { code: "kn", name: "Kannada" },
  { code: "ko", name: "Korean" },
  { code: "kr", name: "Kanuri" },
  { code: "ks", name: "Kashmiri" },
  { code: "ku", name: "Kurdish" },
  { code: "kv", name: "Komi" },
  { code: "kw", name: "Cornish" },
  { code: "ky", name: "Kirghiz" },
  { code: "la", name: "Latin" },
  { code: "lb", name: "Luxembourgish" },
  { code: "lg", name: "Ganda" },
  { code: "li", name: "Limburgian" },
  { code: "ln", name: "Lingala" },
  { code: "lo", name: "Laotian" },
  { code: "lt", name: "Lithuanian" },
  { code: "lu", name: "Luba-Katanga" },
  { code: "lv", name: "Latvian" },
  { code: "mg", name: "Malagasy" },
  { code: "mh", name: "Marshallese" },
  { code: "mi", name: "Maori" },
  { code: "mk", name: "Macedonian" },
  { code: "ml", name: "Malayalam" },
  { code: "mn", name: "Mongolian" },
  { code: "mo", name: "Moldovan" },
  { code: "mr", name: "Marathi" },
  { code: "ms", name: "Malay" },
  { code: "mt", name: "Maltese" },
  { code: "my", name: "Burmese" },
  { code: "na", name: "Nauruan" },
  { code: "nb", name: "Norwegian Bokmål" },
  { code: "nd", name: "North Ndebele" },
  { code: "ne", name: "Nepali" },
  { code: "ng", name: "Ndonga" },
  { code: "nl", name: "Dutch" },
  { code: "nn", name: "Norwegian Nynorsk" },
  { code: "no", name: "Norwegian" },
  { code: "nr", name: "South Ndebele" },
  { code: "nv", name: "Navajo" },
  { code: "ny", name: "Chichewa" },
  { code: "oc", name: "Occitan" },
  { code: "oj", name: "Ojibwa" },
  { code: "om", name: "Oromo" },
  { code: "or", name: "Oriya" },
  { code: "os", name: "Ossetian / Ossetic" },
  { code: "pa", name: "Panjabi / Punjabi" },
  { code: "pi", name: "Pali" },
  { code: "pl", name: "Polish" },
  { code: "ps", name: "Pashto" },
  { code: "pt", name: "Portuguese" },
  { code: "qu", name: "Quechua" },
  { code: "rm", name: "Raeto Romance" },
  { code: "rn", name: "Kirundi" },
  { code: "ro", name: "Romanian" },
  { code: "ru", name: "Russian" },
  { code: "rw", name: "Rwandi" },
  { code: "sa", name: "Sanskrit" },
  { code: "sc", name: "Sardinian" },
  { code: "sd", name: "Sindhi" },
  { code: "se", name: "Northern Sami" },
  { code: "sg", name: "Sango" },
  { code: "sh", name: "Serbo-Croatian" },
  { code: "si", name: "Sinhalese" },
  { code: "sk", name: "Slovak" },
  { code: "sl", name: "Slovenian" },
  { code: "sm", name: "Samoan" },
  { code: "sn", name: "Shona" },
  { code: "so", name: "Somalia" },
  { code: "sq", name: "Albanian" },
  { code: "sr", name: "Serbian" },
  { code: "ss", name: "Swati" },
  { code: "st", name: "Southern Sotho" },
  { code: "su", name: "Sundanese" },
  { code: "sv", name: "Swedish" },
  { code: "sw", name: "Swahili" },
  { code: "ta", name: "Tamil" },
  { code: "te", name: "Telugu" },
  { code: "tg", name: "Tajik" },
  { code: "th", name: "Thai" },
  { code: "ti", name: "Tigrinya" },
  { code: "tk", name: "Turkmen" },
  { code: "tl", name: "Tagalog / Filipino" },
  { code: "tn", name: "Tswana" },
  { code: "to", name: "Tonga" },
  { code: "tr", name: "Turkish" },
  { code: "ts", name: "Tsonga" },
  { code: "tt", name: "Tatar" },
  { code: "tw", name: "Twi" },
  { code: "ty", name: "Tahitian" },
  { code: "ug", name: "Uyghur" },
  { code: "uk", name: "Ukrainian" },
  { code: "ur", name: "Urdu" },
  { code: "uz", name: "Uzbek" },
  { code: "ve", name: "Venda" },
  { code: "vi", name: "Vietnamese" },
  { code: "vo", name: "Volapük" },
  { code: "wa", name: "Walloon" },
  { code: "wo", name: "Wolof" },
  { code: "xh", name: "Xhosa" },
  { code: "yi", name: "Yiddish" },
  { code: "yo", name: "Yoruba" },
  { code: "za", name: "Zhuang" },
  { code: "zh", name: "Chinese" },
  { code: "zu", name: "Zulu" },
];
