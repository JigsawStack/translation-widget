import { TranslationWidget } from './translationWidget'
import type { TranslationConfig } from './types'

declare global {
    interface Window {
        TranslationWidget: (
            publicKey: string,
            config?: TranslationConfig
        ) => TranslationWidget
    }
}

const initializeTranslationWidget = (
    publicKey: string,
    config?: TranslationConfig
): TranslationWidget => {
    if (typeof window === 'undefined') {
        throw new Error(
            'Translation widget can only be used in browser environment'
        )
    }
    return new TranslationWidget(publicKey, config)
}

export default initializeTranslationWidget
