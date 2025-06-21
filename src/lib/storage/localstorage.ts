import LZString from "lz-string";
import type { TranslationContent } from "../../types";

export class LocalStorageWrapper {
  private prefix: string;
  private readonly COMPRESSION_THRESHOLD = 100000;
  private readonly COMPRESSION_MARKER = "__COMPRESSED__";

  constructor(prefix = "") {
    this.prefix = prefix;
  }

  getPageKey(targetLang: string): string {
    return `${this.prefix}-${targetLang}`;
  }

  private shouldCompress(value: string): boolean {
    return value.length > this.COMPRESSION_THRESHOLD;
  }

  private compress(value: string): string {
    try {
      return LZString.compressToBase64(value);
    } catch (error) {
      console.error("Compression failed:", error);
      return value;
    }
  }

  private decompress(value: string): string {
    try {
      return LZString.decompressFromBase64(value) || value;
    } catch (error) {
      console.error("Decompression failed:", error);
      return value;
    }
  }

  getItem(key: string): TranslationContent | null {
    const item = localStorage.getItem(key);
    if (!item) return null;

    try {
      const decompressed = item.startsWith(this.COMPRESSION_MARKER) ? this.decompress(item.slice(this.COMPRESSION_MARKER.length)) : item;
      return JSON.parse(decompressed);
    } catch (e) {
      console.error("Error parsing cached item:", e);
      return null;
    }
  }

  setItem(key: string, value: TranslationContent): void {
    const stringified = JSON.stringify(value);
    const storeValue = () => {
      try {
        const finalValue = this.shouldCompress(stringified) ? `${this.COMPRESSION_MARKER}${this.compress(stringified)}` : stringified;
        localStorage.setItem(key, finalValue);
      } catch (error) {
        console.error("Error storing item:", error);
        localStorage.setItem(key, stringified);
      }
    };
    if (typeof requestIdleCallback !== "undefined") {
      requestIdleCallback(() => storeValue());
    } else {
      setTimeout(storeValue, 0);
    }
  }

  // Get translation for a node from the page cache (object of originalText)
  getNodeTranslation(originalText: string, targetLang: string): string | null {
    const pageKey = this.getPageKey(targetLang);
    const translations: TranslationContent = this.getItem(pageKey) || {};
    return translations[originalText] || null;
  }

  // Store translation for a node in the page cache (object of originalText)
  setNodeTranslation(originalText: string, targetLang: string, translatedText: string): void {
    const pageKey = this.getPageKey(targetLang);
    const translations: TranslationContent = this.getItem(pageKey) || {};
    translations[originalText] = translatedText;
    this.setItem(pageKey, translations);
  }

  setBatchNodeTranslationsArray(targetLang: string, batch: Array<{ originalText: string; translatedText: string }>): void {
    const pageKey = this.getPageKey(targetLang);
    const existing: TranslationContent = this.getItem(pageKey) || {};

    // Add/overwrite with new batch
    for (const { originalText, translatedText } of batch) {
      existing[originalText] = translatedText;
    }

    this.setItem(pageKey, existing);
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    if (this.prefix) {
      for (const key in localStorage) {
        if (key.startsWith(this.prefix)) {
          localStorage.removeItem(key);
        }
      }
    } else {
      localStorage.clear();
    }
  }

  key(index: number): string | null {
    return localStorage.key(index);
  }

  get length(): number {
    return localStorage.length;
  }
}
