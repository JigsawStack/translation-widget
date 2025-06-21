"use client";
import { useEffect } from "react";

export default function Translation() {
  useEffect(() => {
    if (typeof window === "undefined" || process.env.NEXT_PUBLIC_NODE_ENV === "development") return;

    import("translation-widget").then(({ default: TranslationWidget }) => {
      console.log("translation widget loaded");
      TranslationWidget(process.env.NEXT_PUBLIC_TRANSLATION_WIDGET_PUBLIC_KEY!, {
        showUI: true,
        pageLanguage: "en",
        position: "top-right",
        autoDetectLanguage: false,
      });
    });
  }, []);

  return null;
}

