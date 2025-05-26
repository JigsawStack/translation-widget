import { MAX_CACHE_SIZE } from '../../constants'

export class TranslationCache {
    cache: Map<any, any>
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

    set(text: string, targetLang: string, translation: string) {
        if (this.cache.size >= this.maxSize) {
            const firstKey = this.cache.keys().next().value
            this.cache.delete(firstKey)
        }
        this.cache.set(this.getKey(text, targetLang), translation)
    }
}
