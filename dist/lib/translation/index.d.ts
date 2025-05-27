interface CacheMetrics {
    hits: number;
    misses: number;
}
export declare class TranslationService {
    private readonly publicKey;
    private readonly cache;
    private cacheMetrics;
    private readonly apiUrl;
    constructor(publicKey: string);
    getCacheMetrics(): CacheMetrics;
    resetTranslations(): void;
    translateBatchText(texts: string[], targetLang: string): Promise<string[]>;
}
export {};
