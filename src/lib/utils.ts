import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const getPositionClasses = (position: string) => {
  switch (position) {
    case "bottom-right": return "bottom-4 right-4"
    case "bottom-left": return "bottom-4 left-4"
    case "top-right": return "top-4 right-4"
    case "top-left": return "top-4 left-4"
    default: return "bottom-4 right-4"
  }
}

export function getTextToTranslate(
  node: Text,
  parent: HTMLElement,
  targetLang: string,
  currentLanguage: string
): string | null {
  if (!parent.hasAttribute('data-original-text')) {
      const originalText = node.textContent?.trim()
      if (originalText) {
          parent.setAttribute('data-original-text', originalText)
          return originalText
      }
  } else {
      const textToTranslate = node.textContent?.trim()
      if (currentLanguage !== 'en' && targetLang !== 'en') {
          return parent.getAttribute('data-original-text')
      }
      return textToTranslate || null
  }
  return null
}

export async function getUserLanguage(): Promise<string> {
  try {
    const response = await fetch("https://ipapi.co/json/");
    const data: UserLanguageResponse = await response.json();
    const languages = data.languages.split(",")
    const language = languages[1]
    return language || "en"
  }catch(err){  
    console.error("Error getting user language", err)
    return "en"
  }
}



interface UserLanguageResponse {
  ip: string;
  network: string;
  version: string;
  city: string;
  region: string;
  region_code: string;
  country: string;
  country_name: string;
  country_code: string;
  country_code_iso3: string;
  country_capital: string;
  country_tld: string;
  continent_code: string;
  in_eu: boolean;
  postal: string;
  latitude: number;
  longitude: number;
  timezone: string;
  utc_offset: string;
  country_calling_code: string;
  currency: string;
  currency_name: string;
  languages: string;
  country_area: number;
  country_population: number;
  asn: string;
  org: string;
}