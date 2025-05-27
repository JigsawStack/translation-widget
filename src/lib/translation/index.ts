import { Cache } from "../storage/cache"

interface TranslationResponse {
    translated_text: string | string[]
    source_language?: string
    detected_language?: string
    confidence?: number
}

interface TranslationError extends Error {
    status?: number
    response?: Response
}

interface CacheMetrics {
    hits: number
    misses: number
}

export class TranslationService {
    private readonly publicKey: string
    private readonly cache: Cache
    private cacheMetrics: CacheMetrics = { hits: 0, misses: 0 }
    // Todo: convert this to use sdk instead of api
    private readonly apiUrl = 'https://api.jigsawstack.com/v1/ai/translate'

    constructor(publicKey: string) {
        this.publicKey = publicKey
        this.cache = new Cache()
    }

    getCacheMetrics(): CacheMetrics {
        return { ...this.cacheMetrics }
    }

    resetTranslations(): void {
        const elements = document.querySelectorAll<HTMLElement>('[data-original-text]')
        elements.forEach(element => {
            const textNodes = Array.from(element.childNodes).filter(
                (node): node is Text => node.nodeType === Node.TEXT_NODE
            )
            if (textNodes.length > 0) {
                const originalText = element.getAttribute('data-original-text')
                if (originalText) {
                    textNodes[0].textContent = originalText
                }
            }
        })
    }

    async translateBatchText(
        texts: string[],
        targetLang: string
    ): Promise<string[]> {
        try {
            const cached_translations = texts.map(text => this.cache.get(text, targetLang))
            
            // Track cache hits and misses
            cached_translations.forEach(translation => {
                if (translation === undefined) {
                    this.cacheMetrics.misses++
                } else {
                    this.cacheMetrics.hits++
                }
            })
           
            if (!cached_translations.includes(undefined)) {
                console.log(`Cache metrics - Hits: ${this.cacheMetrics.hits}, Misses: ${this.cacheMetrics.misses}`)
                return cached_translations as string[]
            }

            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': this.publicKey,
                },
                body: JSON.stringify({
                    text: texts,
                    target_language: targetLang,
                }),
            })

            if (!response.ok) {
                const error: TranslationError = new Error(
                    `Error translating text: ${response.statusText}`
                )
                error.status = response.status
                error.response = response
                throw error
            }

            const result = (await response.json()) as TranslationResponse
            const translations = Array.isArray(result.translated_text)
                ? result.translated_text
                : [result.translated_text]

            texts.forEach((text, index) => {
                if(translations[index]) {
                    this.cache.set(text, targetLang, translations[index])
                }
            })

            console.log(`Cache metrics - Hits: ${this.cacheMetrics.hits}, Misses: ${this.cacheMetrics.misses}`)
            return translations
        } catch (error) {
            console.error('Translation error:', error)

            // Log additional error details if available
            if (error instanceof Error) {
                const translationError = error as TranslationError
                if (translationError.status) {
                    console.error(`HTTP Status: ${translationError.status}`)
                }
            }

            return texts // Return original texts on error
        }
    }

}
