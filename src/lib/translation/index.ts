import { MAX_REQUESTS_PER_SECOND } from "../../constants";

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

class RateLimiter {
  private timestamps: number[] = [];
  private pending: Promise<void> = Promise.resolve();

  constructor(
    private maxRequests: number,
    private intervalMs: number = 1000,
  ) {}

  acquire(): Promise<void> {
    this.pending = this.pending.then(() => this._acquire());
    return this.pending;
  }

  private async _acquire(): Promise<void> {
    const now = Date.now();
    this.timestamps = this.timestamps.filter((t) => now - t < this.intervalMs);

    if (this.timestamps.length < this.maxRequests) {
      this.timestamps.push(Date.now());
      return;
    }

    const waitTime = this.intervalMs - (now - this.timestamps[0]);
    await new Promise<void>((resolve) => setTimeout(resolve, waitTime));

    this.timestamps = this.timestamps.filter((t) => Date.now() - t < this.intervalMs);
    this.timestamps.push(Date.now());
  }
}

export class TranslationService {
  private readonly publicKey: string;
  private readonly apiUrl = "https://api.jigsawstack.com/v1/ai/translate";
  private readonly rateLimiter: RateLimiter;

  constructor(publicKey: string) {
    this.publicKey = publicKey;
    this.rateLimiter = new RateLimiter(MAX_REQUESTS_PER_SECOND);
  }

  async translateBatchText(texts: string[], targetLang: string, maxRetries = 2, retryDelay = 100): Promise<string[] | null> {
    await this.rateLimiter.acquire();

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
        await this.rateLimiter.acquire();
        await new Promise((res) => setTimeout(res, retryDelay));
      }
    }
    return null;
  }
}
