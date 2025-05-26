import { TranslationCache } from '../storage';
export declare class TranslationService {
    private readonly publicKey;
    private readonly cache;
    private readonly apiUrl;
    constructor(publicKey: string, cache: TranslationCache);
    translateBatchText(texts: string[], targetLang: string): Promise<string[]>;
}
