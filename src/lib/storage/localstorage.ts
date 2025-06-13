import LZString from "lz-string";

export class LocalStorageWrapper {
  private prefix: string;
  private readonly COMPRESSION_THRESHOLD = 10000;
  private readonly COMPRESSION_MARKER = "__COMPRESSED__";

  constructor(prefix = "") {
    this.prefix = prefix;
  }

  getKey(hash: string, url: string, targetLang: string): string {
    // get rid of query params
    const urlWithoutQuery = url.split("?")[0];
    // Only encode the URL, not the whole key
    return `${hash}-${encodeURIComponent(urlWithoutQuery)}-${targetLang}`;
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
    const prefixedKey = this.prefix + key;
    const item = localStorage.getItem(prefixedKey);
    if (!item) return null;

    try {
      // Check if the item is compressed
      const decompressed = item.startsWith(this.COMPRESSION_MARKER) ? this.decompress(item.slice(this.COMPRESSION_MARKER.length)) : item;
      return JSON.parse(decompressed);
    } catch (e) {
      console.error("Error parsing cached item:", e);
      return null;
    }
  }

  setItem(key: string, value: any): void {
    const prefixedKey = this.prefix + key;
    const stringified = JSON.stringify(value);

    // Use requestIdleCallback to defer compression if available
    const storeValue = () => {
      try {
        const finalValue = this.shouldCompress(stringified) ? `${this.COMPRESSION_MARKER}${this.compress(stringified)}` : stringified;
        localStorage.setItem(prefixedKey, finalValue);
      } catch (error) {
        console.error("Error storing item:", error);
        // Fallback to storing uncompressed value
        localStorage.setItem(prefixedKey, stringified);
      }
    };

    if (typeof requestIdleCallback !== "undefined") {
      requestIdleCallback(() => storeValue());
    } else {
      setTimeout(storeValue, 0);
    }
  }

  removeItem(key: string): void {
    const prefixedKey = this.prefix + key;
    localStorage.removeItem(prefixedKey);
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
