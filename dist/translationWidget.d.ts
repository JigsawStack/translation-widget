import { TranslationConfig } from './types';
export declare class TranslationWidget {
    private config;
    private translationService;
    private currentLanguage;
    private widget;
    private elements;
    constructor(publicKey: string, config?: Partial<TranslationConfig>);
    private initialize;
    private validateConfig;
    private createWidget;
    private getCurrentLanguageLabel;
    private createWidgetHTML;
    private createLanguageOptions;
    private setupEventListeners;
    private translatePage;
    private processBatch;
    private getTextToTranslate;
}
