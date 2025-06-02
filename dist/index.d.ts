import { TranslationWidget } from './widget';
import { TranslationConfig } from './types';
declare global {
    interface Window {
        TranslationWidget: (publicKey: string, options: {
            pageLanguage: string;
            position: string;
            autoDetectLanguage: boolean;
        }, config?: TranslationConfig) => TranslationWidget;
    }
}
declare const initializeTranslationWidget: (publicKey: string, config?: TranslationConfig) => TranslationWidget;
export default initializeTranslationWidget;
