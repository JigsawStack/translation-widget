"use client"
import { useEffect } from "react";  
import TranslationWidget from "translation-widget";
/**
 * We also support commonjs require('translation-widget')
 * 
 * Example:
 *    const translationWidget = require('translation-widget')
 * 
 */
export default function Translation() {
  useEffect(() => {
    TranslationWidget(process.env.NEXT_PUBLIC_TRANSLATION_WIDGET_PUBLIC_KEY!, {
      showUI: true,
      pageLanguage: 'en',
      position: "top-right",
      autoDetectLanguage: false,
    })
  }, [])
  
  return null;
}