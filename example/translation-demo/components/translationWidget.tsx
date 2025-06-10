"use client"
import { useEffect } from "react";  
import TranslationWidget from "translation-widget";

export default function Translation() {
  useEffect(() => {
    TranslationWidget("YOUR_PUBLIC_KEY_HERE", {
      showUI: true,
      pageLanguage: 'en',
      position: "top-right",
      autoDetectLanguage: false,
      theme: {
        baseColor: '#2563eb',
        textColor: '#ffffff'
      }
    })
  }, [])
  
  return null;
}