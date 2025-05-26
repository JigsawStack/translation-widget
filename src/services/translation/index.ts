import { Cache } from '@/services/storage/cache'
import { MAX_BATCH_SIZE } from '@/constants/default'

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

interface TranslationBatch {
    texts: string[];
    targetLang: string;
    onProgress?: (translations: string[], index: number) => void;
}

export class TranslationService {
    private static instance: TranslationService | null = null
    private readonly publicKey: string
    private readonly cache: Cache
    private readonly apiUrl = 'https://api.jigsawstack.com/v1/ai/translate'

    private constructor(publicKey: string, cache: Cache) {
        this.publicKey = publicKey
        this.cache = cache
    }

    public static getInstance(publicKey: string, cache: Cache): TranslationService {
        if (!TranslationService.instance) {
            TranslationService.instance = new TranslationService(publicKey, cache)
        }
        return TranslationService.instance
    }

    resetTranslation(){
        console.log("Resetting translation here")
        const elements = document.querySelectorAll<HTMLElement>(
            '[data-original-text]'
        )

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
        onProgress?: (translations: string[], index: number) => void
    ): Promise<string[]> {
        try {
            // Split texts into smaller batches for parallel processing
            const BATCH_SIZE = MAX_BATCH_SIZE; // Adjust based on API limits
            const batches: TranslationBatch[] = [];

            for (let i = 0; i < texts.length; i += BATCH_SIZE) {
                batches.push({
                    texts: texts.slice(i, i + BATCH_SIZE),
                    targetLang,
                    onProgress: (translations, batchIndex) => {
                        if (onProgress) {
                            const allTranslations = new Array(texts.length).fill('');
                            // Fill in translations from previous batches
                            for (let j = 0; j < batchIndex; j++) {
                                const prevBatch = batches[j];
                                const startIdx = j * BATCH_SIZE;
                                prevBatch.texts.forEach((_, idx) => {
                                    allTranslations[startIdx + idx] = translations[idx];
                                });
                            }
                            // Fill in current batch translations
                            const startIdx = batchIndex * BATCH_SIZE;
                            translations.forEach((translation, idx) => {
                                allTranslations[startIdx + idx] = translation;
                            });
                            onProgress(allTranslations, batchIndex);
                        }
                    }
                });
            }

            // Process batches in parallel
            const batchResults = await Promise.all(
                batches.map(async (batch, batchIndex) => {
                    const response = await fetch(this.apiUrl, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'x-api-key': this.publicKey,
                        },
                        body: JSON.stringify({
                            text: batch.texts,
                            target_language: batch.targetLang,
                        }),
                    });

                    if (!response.ok) {
                        const error: TranslationError = new Error(
                            `Error translating text: ${response.statusText}`
                        );
                        error.status = response.status;
                        error.response = response;
                        throw error;
                    }

                    const result = (await response.json()) as TranslationResponse;
                    const translations = Array.isArray(result.translated_text)
                        ? result.translated_text
                        : [result.translated_text];

                    // Store in cache
                    // batch.texts.forEach((text, index) => {
                    //     if (translations[index]) {
                    //         // this.cache.set(text, batch.targetLang, translations);
                    //     }
                    // });

                    // Notify progress
                    if (batch.onProgress) {
                        batch.onProgress(translations, batchIndex);
                    }

                    return translations;
                })
            );

            return batchResults.flat();
        } catch (error) {
            console.error('Translation error:', error);

            if (error instanceof Error) {
                const translationError = error as TranslationError;
                if (translationError.status) {
                    console.error(`HTTP Status: ${translationError.status}`);
                }
            }

            return texts; // Return original texts on error
        }
    }

    // Helper method to process multiple batches with progress tracking
    async processMultipleBatches(
        batches: TranslationBatch[]
    ): Promise<Map<string, string[]>> {
        const results = new Map<string, string[]>();

        await Promise.all(
            batches.map(async (batch) => {
                const translations = await this.translateBatchText(
                    batch.texts,
                    batch.targetLang,
                    batch.onProgress
                );
                results.set(batch.targetLang, translations);
            })
        );

        return results;
    }
}