
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

export class TranslationService {
    private readonly publicKey: string
    // Todo: convert this to use sdk instead of api
    private readonly apiUrl = 'https://api.jigsawstack.com/v1/ai/translate'

    constructor(publicKey: string) {
        this.publicKey = publicKey
    }

    async translateBatchText(
        texts: string[],
        targetLang: string
    ): Promise<string[]> {
        try {
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
