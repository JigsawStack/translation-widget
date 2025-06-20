"use client"; 
import { useEffect } from "react";
import TranslationWidget from "translation-widget";

export default function Translation() {
  useEffect(() => {
    console.log("TranslationWidget", process.env.NEXT_PUBLIC_TRANSLATION_WIDGET_PUBLIC_KEY);
    TranslationWidget(process.env.NEXT_PUBLIC_TRANSLATION_WIDGET_PUBLIC_KEY!, {
      showUI: true,
      pageLanguage: 'en',
      position: 'top-right',
      autoDetectLanguage: false,
    });
  }, []);

  return null;
}
