import { TranslationWidget } from './translationWidget';
import { TranslationConfig } from './types';
declare global {
    interface Window {
        TranslationWidget: (publicKey: string, config?: TranslationConfig) => TranslationWidget;
    }
}
declare const initializeTranslationWidget: (publicKey: string, config?: TranslationConfig) => TranslationWidget;
export default initializeTranslationWidget;
