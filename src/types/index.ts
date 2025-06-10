export interface Language {
  code: string;
  name: string;
  native: string;
  rtl?: number;
  writing_system: string;
}

export interface TranslationConfig {
  pageLanguage?: string;
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  autoDetectLanguage?: boolean;
  theme?: {
    baseColor?: string;
    textColor?: string;
  };
  showUI?: boolean;
}

export interface CacheEntry {
  text: string;
  translation: string;
  timestamp: number;
}

export interface TranslationResponse {
  translated_text: string;
  source_language?: string;
  confidence?: number;
}

export interface TranslationWidgetOptions {
  publicKey: string;
  config?: TranslationConfig;
}
