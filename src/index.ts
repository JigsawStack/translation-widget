import styles from './translation-widget.css?inline'
import { TranslationWidget } from './widget'
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

    const initWidget = () => {
        // Ensure styles are injected
        if (!document.querySelector('style[data-translation-widget]')) {
            const style = document.createElement('style')
            style.setAttribute('data-translation-widget', '')
            style.textContent = styles
            document.head.appendChild(style)
        }
        return new TranslationWidget(publicKey, config)
    }

    if (document.readyState === 'loading') {
        window.addEventListener('DOMContentLoaded', initWidget)
    } else {
        initWidget()
    }

    return initWidget()
}

export default initializeTranslationWidget
