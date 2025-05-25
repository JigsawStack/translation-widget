"use client"

import { useState } from "react"
import TranslationWidget from "./components/translation/widget"

export default function App() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>Open</button>
      <TranslationWidget />
    </div>
  )
}