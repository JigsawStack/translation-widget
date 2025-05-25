import './index.css'
import TranslationWidget from './components/translation/widget'

console.log('Translation widget script loaded')

window.initTranslationWidget = () => {
  console.log('Initializing translation widget')
  try {
    // Check if container already exists
    let container = document.getElementById('translation-widget-container')
    if (!container) {
      container = document.createElement('div')
      container.id = 'translation-widget-container'
      document.body.appendChild(container)
    }
    console.log('Container created and appended')

    // Use the global React and ReactDOM
    const root = window.ReactDOM.createRoot(container)
    root.render(
      window.React.createElement(TranslationWidget)
    )
    console.log('Widget rendered')
  } catch (error) {
    console.error('Error initializing widget:', error)
  }
}

// Auto-initialize the widget
console.log('Attempting to auto-initialize widget')
window.initTranslationWidget()

// Add TypeScript declaration for the global function
declare global {
  interface Window {
    initTranslationWidget: () => void
    React: typeof import('react')
    ReactDOM: typeof import('react-dom/client')
  }
} 