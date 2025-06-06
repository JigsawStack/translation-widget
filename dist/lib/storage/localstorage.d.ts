export declare class LocalStorageWrapper {
    private prefix;
    private readonly COMPRESSION_THRESHOLD;
    private readonly COMPRESSION_MARKER;
    constructor(prefix?: string);
    getKey(hash: string, url: string, targetLang: string): string;
    private shouldCompress;
    private compress;
    private decompress;
    getItem(key: string): any;
    setItem(key: string, value: any): void;
    removeItem(key: string): void;
    clear(): void;
    key(index: number): string | null;
    get length(): number;
}
