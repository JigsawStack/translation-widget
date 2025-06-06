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
    private showUI;
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
    resetToDefaultLanguage(): void;
    private _translatePage;
    private updateResetButtonVisibility;
    private resetTranslations;
    private adjustDropdownPosition;
    private setupEventListeners;
    private scheduleTranslation;
    /**
     * Public method to translate the page to a specific language
     * @param langCode The language code to translate to
     * @returns Promise that resolves when translation is complete
     */
    translateTo(langCode: string, onComplete?: (result: TranslationResult) => void, onError?: (error: Error) => void): Promise<TranslationResult>;
    /**
     * Get the current instance of TranslationWidget
     * @returns The current TranslationWidget instance or null if not initialized
     */
    static getInstance(): TranslationWidget | null;
    private getLanguageSVG;
}
declare global {
    interface Window {
        resetTranslation: (defaultLang: string, onComplete?: (result: Pick<TranslationResult, "success" | "targetLanguage">) => void, onError?: (error: Error) => void) => void;
        translate: (langCode: string, onComplete?: (result: TranslationResult) => void, onError?: (error: Error) => void) => Promise<TranslationResult>;
    }
}
export {};
