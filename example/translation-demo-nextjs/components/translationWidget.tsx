"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    TranslationWidget: (
      publicKey: string,
      config?: {
        pageLanguage?: string;
        position?: string;
        autoDetectLanguage?: boolean;
        theme?: {
          baseColor: string;
          textColor: string;
        };
        showUI?: boolean;
      }
    ) => void;
  }
}

export default function TranslationWidgetComponent() {
  useEffect(() => {
    console.log('[TranslationComponent] Component mounted, initializing widget...');
    
    const script = document.createElement("script");
    script.src =
      "http://localhost:5173/dist/index.min.js";
    script.defer = true;

    const initWidget = () => {
      console.log('[TranslationComponent] Script loaded, initializing widget...');
      if (window.TranslationWidget) {
        try {
          window.TranslationWidget("pk_76d6674725fc3ea59bfe2f92df7b93d3dd3f6c91f95094646d7acd9bb7637cadedbd4b9a4639ada7f3d595eefce673bd2a86208d2a6e3897ed15aad53a26c845024ulDmEIG5veahhct2gA", {
            // configuration options
          });
          console.log('[TranslationComponent] Widget initialized successfully');
        } catch (error) {
          console.error('[TranslationComponent] Failed to initialize widget:', error);
        }
      } else {
        console.error('[TranslationComponent] TranslationWidget not found on window');
      }
    };

    script.onload = () => {
      console.log('[TranslationComponent] Script onload triggered');
      if (document.readyState === "complete") {
        console.log('[TranslationComponent] Document ready, calling initWidget');
        initWidget();
      } else {
        console.log('[TranslationComponent] Document not ready, adding load listener');
        window.addEventListener("load", initWidget);
      }
    };

    script.onerror = (error) => {
      console.error('[TranslationComponent] Script failed to load:', error);
    };

    console.log('[TranslationComponent] Appending script to body...');
    document.body.appendChild(script);

    return () => {
      console.log('[TranslationComponent] Component unmounting, cleaning up...');
      window.removeEventListener("load", initWidget);
      
      try {
        console.log('[TranslationComponent] Attempting to remove script...');
        console.log('[TranslationComponent] Script element:', script);
        console.log('[TranslationComponent] Script parent:', script.parentNode);
        console.log('[TranslationComponent] Script in parent:', script.parentNode?.contains?.(script));
        
        if (script.parentNode) {
          script.parentNode.removeChild(script);
          console.log('[TranslationComponent] Script removed successfully');
        } else {
          console.log('[TranslationComponent] Script has no parent, cannot remove');
        }
      } catch (error) {
        console.error('[TranslationComponent] Failed to remove script:', error);
        console.error('[TranslationComponent] Error details:', {
          error: error,
          scriptExists: !!script,
          parentExists: !!script.parentNode,
          scriptParent: script.parentNode,
          scriptInParent: script.parentNode?.contains?.(script)
        });
      }
    };
  }, []);

  return null;
}