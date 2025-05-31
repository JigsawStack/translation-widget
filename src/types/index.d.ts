export interface Language {
    code: string
    name: string
    native: string
    region: string
    rtl?: number
}

export interface TranslationConfig {
    pageLanguage?: string
    autoDetectLanguage?: boolean
    position?: 'top-right' | 'top-left' | 'bottom-left' | 'bottom-right'
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
