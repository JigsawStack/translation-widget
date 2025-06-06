import { TranslationConfig } from '../types';
interface TranslationResult {
    success: boolean;
    targetLanguage: string;
    translatedNodes: number;
    error?: string;
    duration?: number;
}
export declare class TranslationWidget {
    private config;
    private translationService;
    private currentLanguage;
    private widget;
    private elements;
    private autoDetectLanguage;
    private isTranslated;
    private userLanguage;
    private isTranslating;
    private observer;
    private translationScheduled;
    private scheduleTimeout;
    private lastTranslated;
    private static instance;
    private currentTranslationPromise;
    private lastRequestedLanguage;
    private translationRequestId;
    constructor(publicKey: string, config?: Partial<TranslationConfig>);
    private initialize;
    private getUrlParameter;
    private setupContentObserver;
    private observeBody;
    private onUrlChange;
    private setupURLObserver;
    private validateConfig;
    private createWidget;
    private getCurrentLanguageLabel;
    private createWidgetHTML;
    private createLanguageOptions;
    private updateTriggerText;
    private getTextToTranslate;
    private calculateFontSize;
    private updateLoadingState;
    private translatePage;
    private resetToDefaultLanguage;
    private _translatePage;
    private updateResetButtonVisibility;
    resetTranslations(): void;
    private adjustDropdownPosition;
    private setupEventListeners;
    private scheduleTranslation;
    /**
     * Public method to translate the page to a specific language
     * @param langCode The language code to translate to
     * @returns Promise that resolves when translation is complete
     */
    translateTo(langCode: string): Promise<void>;
    /**
     * Get the current instance of TranslationWidget
     * @returns The current TranslationWidget instance or null if not initialized
     */
    static getInstance(): TranslationWidget | null;
    private getLanguageSVG;
}
declare global {
    interface Window {
        translate: (langCode: string) => Promise<TranslationResult>;
    }
}
export {};
