export declare class Cache {
    cache: Map<any, any>;
    maxSize: number;
    constructor();
    getKey(text: string, targetLang: string): string;
    set(text: string, targetLang: string, translation: string): void;
    get(text: string, targetLang: string): string | undefined;
    clear(): void;
}
