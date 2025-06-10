"use client"
import { useEffect } from "react";  
import TranslationWidget from "translation-widget";

export default function Translation() {
  useEffect(() => {
    TranslationWidget("pk_08d1531ce8b8514370919b231693f636c19cb94acd4af8584b25bf2154cab4636fc8a990af0060bf7d1a9b9951c2da8b4f9dcecbdf1aa5ea6ffff17d0c150724024GZYEBwvT6YB8tv5Ass", {
      showUI: true,
      pageLanguage: 'en',
      position: "top-right",
      autoDetectLanguage: false,
    })
  }, [])
  
  return null;
}