"use client"; 
import { useEffect } from "react";
import TranslationWidget, { Position } from "translation-widget";

export default function Translation() {
  useEffect(() => {
    TranslationWidget(process.env.NEXT_PUBLIC_TRANSLATION_WIDGET_PUBLIC_KEY!, {
      showUI: true,
      pageLanguage: 'en',
      position: Position.TopRight,
      autoDetectLanguage: false,
    });
  }, []);

  return null;
}
