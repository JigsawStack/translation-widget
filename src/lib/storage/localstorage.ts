import LZString from "lz-string";

export class LocalStorageWrapper {
  private prefix: string;
  private readonly COMPRESSION_THRESHOLD = 10000;
  private readonly COMPRESSION_MARKER = "__COMPRESSED__";

  constructor(prefix = "") {
    this.prefix = prefix;
  }

  getPageKey(url: string, targetLang: string): string {
    const urlWithoutQuery = url.split("?")[0];
    return `${this.prefix}page-${encodeURIComponent(urlWithoutQuery)}-${targetLang}`;
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

  getItem(key: string): any {
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

  setItem(key: string, value: any): void {
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

  // Get translation for a node from the page cache (object of node hashes)
  getNodeTranslation(nodeHash: string, url: string, targetLang: string): { o: string; t: string } | null {
    const pageKey = this.getPageKey(url, targetLang);
    const translations: { [key: string]: { o: string; t: string } } = this.getItem(pageKey) || {};
    const nodeKey = `jss-node-${nodeHash}`;
    return translations[nodeKey] || null;
  }

  // Store translation for a node in the page cache (object of node hashes)
  setNodeTranslation(nodeHash: string, url: string, targetLang: string, translation: { o: string; t: string }): void {
    const pageKey = this.getPageKey(url, targetLang);
    let translations: { [key: string]: { o: string; t: string } }[] = this.getItem(pageKey) || [];
    const nodeKey = `${nodeHash}`;
    translations.push({ [nodeKey]: translation });
    this.setItem(pageKey, translations);
  }

  setBatchNodeTranslationsArray(
    url: string,
    targetLang: string,
    batch: Array<{ [key: string]: { o: string; t: string } }>
  ): void {
    const pageKey = this.getPageKey(url, targetLang);
    const existing: Array<{ [key: string]: { o: string; t: string } }> = this.getItem(pageKey) || [];

    // Convert existing to a map for fast lookup
    const map: { [key: string]: { o: string; t: string } } = {};
    existing.forEach(obj => {
      const key = Object.keys(obj)[0];
      map[key] = obj[key];
    });

    // Add/overwrite with new batch
    batch.forEach(obj => {
      const key = Object.keys(obj)[0];
      map[key] = obj[key];
    });

    // Convert back to array of objects
    const merged = Object.keys(map).map(key => ({ [key]: map[key] }));

    this.setItem(pageKey, merged);
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    if (this.prefix) {
      for (let key in localStorage) {
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
