import { MAX_CACHE_SIZE } from "../../constants";
export class Cache{
    cache: Map<any, any>
    maxSize: number

    constructor() {
        this.cache = new Map()
        this.maxSize = MAX_CACHE_SIZE
    }

    getKey(text: string, targetLang: string): string {
        return `${text}-${targetLang}`
    }

    set(text: string, targetLang: string, translation: string) {
        const key = this.getKey(text, targetLang)
        this.cache.set(key, translation)
    }

    get(text: string, targetLang: string): string | undefined {
        const key = this.getKey(text, targetLang)
        return this.cache.get(key)
    }

    clear() {
        this.cache.clear()
    }
}