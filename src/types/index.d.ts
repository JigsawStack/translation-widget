export interface Language {
    code: string
    name: string
    native: string
    rtl?: number
}

export interface TranslationConfig {
    primaryColor?: string // Not actually implemented
    pageLanguage?: string
}

export interface CacheEntry {
    text: string
    translation: string
    timestamp: number
}

export interface TranslationResponse {
    translated_text: string
    source_language?: string
    confidence?: number
}

export interface TranslationWidgetOptions {
    publicKey: string
    config?: TranslationConfig
}
