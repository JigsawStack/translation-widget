interface CacheMetrics {
    hits: number;
    misses: number;
}
export declare class TranslationService {
    private readonly publicKey;
    private cacheMetrics;
    private readonly apiUrl;
    constructor(publicKey: string);
    getCacheMetrics(): CacheMetrics;
    translateBatchText(texts: string[], targetLang: string, maxRetries?: number, retryDelay?: number): Promise<string[]>;
}
export {};
