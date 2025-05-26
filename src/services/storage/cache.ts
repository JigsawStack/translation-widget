import { MAX_CACHE_SIZE } from "@/constants/default"

export class Cache {
    cache: Map<string, string[]>
    maxSize: number

    constructor(maxSize = MAX_CACHE_SIZE) {
        this.cache = new Map()
        this.maxSize = maxSize
    }

    getKey(text: string, targetLang: string) {
        return `${targetLang}:${text}`
    }

    get(text: string, targetLang: string) {
        return this.cache.get(this.getKey(text, targetLang))
    }

    set(text: string, targetLang: string, translations: string[]) {
        if (this.cache.size >= this.maxSize) {
            const firstKey = this.cache.keys().next().value
            if (firstKey) {
                this.cache.delete(firstKey)
            }
        }
        this.cache.set(this.getKey(text, targetLang), translations)
    }
}