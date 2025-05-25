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