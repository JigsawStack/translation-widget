
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
    private cacheMetrics: CacheMetrics = { hits: 0, misses: 0 }
    // Todo: convert this to use sdk instead of api
    private readonly apiUrl = 'https://api.jigsawstack.com/v1/ai/translate'

    constructor(publicKey: string) {
        this.publicKey = publicKey
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
        targetLang: string,
    ): Promise<string[]> {
        try {


            // await new Promise(resolve => setTimeout(resolve, 60000 * 5))
           
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

            // Cache the translations
            // this.cache.setItem(key, translations)

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
