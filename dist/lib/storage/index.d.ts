export declare class TranslationCache {
    cache: Map<any, any>;
    maxSize: number;
    constructor(maxSize?: number);
    getKey(text: string, targetLang: string): string;
    get(text: string, targetLang: string): any;
    set(text: string, targetLang: string, translation: string): void;
}
