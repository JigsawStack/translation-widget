import './index.css'
import { createRoot } from 'react-dom/client'

import TranslationWidget from './components/translation/widget'
window.initChatWidget = () => {
  const container = document.createElement('div')
  container.id = 'translation-widget-container'
  document.body.appendChild(container)

  const root = createRoot(container)
  root.render(
    <TranslationWidget />
  )
}

// Add TypeScript declaration for the global function
declare global {
  interface Window {
    initChatWidget: () => void
  }
} 