"use client"; 
import { useEffect } from "react";
import TranslationWidget from "translation-widget";

export default function Translation() {
  useEffect(() => {
    // TODO: Replace with your public key
    TranslationWidget("YOUR_PUBLIC_KEY_HERE", {
      showUI: true,
      pageLanguage: 'en',
      position: "top-right",
      autoDetectLanguage: false,
    });
  }, []);

  return null;
}
