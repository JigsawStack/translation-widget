import { TranslationWidget } from './widget';
import { TranslationConfig } from './types';
declare global {
    interface Window {
        TranslationWidget: (publicKey: string, config?: TranslationConfig) => TranslationWidget;
    }
}
declare const initializeTranslationWidget: (publicKey: string, config?: TranslationConfig) => TranslationWidget;
export { TranslationWidget };
export default initializeTranslationWidget;
