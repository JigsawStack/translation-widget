import styles from "./translation-widget.css?inline";
import { TranslationWidget } from "./widget";
import type { TranslationConfig  } from "./types";

declare global {
  interface Window {
    TranslationWidget: (publicKey: string, config?: TranslationConfig) => TranslationWidget;
  }
}

let widgetInstance: TranslationWidget | undefined;

const initializeTranslationWidget = (publicKey: string, config?: TranslationConfig): TranslationWidget => {
  if (typeof window === "undefined") {
    throw new Error("Translation widget can only be used in browser environment");
  }

  const initWidget = () => {
    if (!widgetInstance) {
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
    return undefined as unknown as TranslationWidget;
  } else {
    return initWidget();
  }
};

export default initializeTranslationWidget;