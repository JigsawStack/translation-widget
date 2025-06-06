import styles from "./translation-widget.css?inline";
import { TranslationWidget } from "./widget";
import type { TranslationConfig } from "./types";

declare global {
  interface Window {
    TranslationWidget: (
      publicKey: string,
      options: {
        pageLanguage?: string;
        position?: string;
        autoDetectLanguage?: boolean;
        theme?: {
          baseColor?: string;
          textColor?: string;
        };
      },
      config?: TranslationConfig
    ) => TranslationWidget;
  }
}

let widgetInstance: TranslationWidget | undefined;

const initializeTranslationWidget = (publicKey: string, config?: TranslationConfig): TranslationWidget => {
  if (typeof window === "undefined") {
    throw new Error("Translation widget can only be used in browser environment");
  }

  const initWidget = () => {
    if (!widgetInstance) {
      // Ensure styles are injected
      if (!document.querySelector("style[data-translation-widget]")) {
        const style = document.createElement("style");
        style.setAttribute("data-translation-widget", "");
        style.textContent = styles;
        document.head.appendChild(style);
      }
      widgetInstance = new TranslationWidget(publicKey, config);
    }
    return widgetInstance;
  };

  if (document.readyState === "loading") {
    window.addEventListener("DOMContentLoaded", initWidget);
    return undefined as unknown as TranslationWidget; // Widget will be created after DOMContentLoaded
  }
  return initWidget();
};

export default initializeTranslationWidget;
