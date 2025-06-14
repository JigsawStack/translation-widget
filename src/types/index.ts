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


export interface WidgetElements {
  trigger: HTMLDivElement | null;
  dropdown: HTMLDivElement | null;
  searchInput: HTMLInputElement | null;
  clearSearch: HTMLDivElement | null;
  languageItems: NodeListOf<HTMLDivElement> | null;
  loadingIndicator: HTMLDivElement | null;
}

export interface TranslationResult {
  success: boolean;
  targetLanguage: string;
  translatedNodes: number;
  error?: string;
  duration?: number;
}

export interface TranslationContent { [key: string]: string }