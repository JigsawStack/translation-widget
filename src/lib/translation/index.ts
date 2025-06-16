interface TranslationResponse {
  translated_text: string | string[];
  source_language?: string;
  detected_language?: string;
  confidence?: number;
}

interface TranslationError extends Error {
  status?: number;
  response?: Response;
}

export class TranslationService {
  private readonly publicKey: string;
  private readonly apiUrl = "https://api.jigsawstack.com/v1/ai/translate";

  constructor(publicKey: string) {
    this.publicKey = publicKey;
  }

  async translateBatchText(texts: string[], targetLang: string, maxRetries = 2, retryDelay = 100): Promise<string[] | null> {


    let attempt = 0;
    while (attempt < maxRetries) {
      try {
        const response = await fetch(this.apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": this.publicKey,
          },
          body: JSON.stringify({
            text: texts,
            target_language: targetLang,
          }),
        });

        if (!response.ok) {
          const error: TranslationError = new Error(`Error translating text: ${response.statusText}`);
          error.status = response.status;
          error.response = response;
          throw error;
        }

        const result = (await response.json()) as TranslationResponse;
        const translations = Array.isArray(result.translated_text) ? result.translated_text : [result.translated_text];

        return translations;
      } catch (error) {
        attempt++;
        if (attempt >= maxRetries) {
          console.error("Translation error after retries:", error);
          return null;
        }
        await new Promise((res) => setTimeout(res, retryDelay));
      }
    }
    return null;
  }
}
