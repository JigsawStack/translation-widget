import './index.css'
import Widget from './components/translation'

export interface TranslationWidgetConfig {
  pageLanguage?: string
  publicKey?: string
  autoDetectLanguage?: boolean
}

window.initTranslationWidget = (config: TranslationWidgetConfig = {}) => {
  try {
    // Check if container already exists
    let container = document.getElementById('translation-widget-container')
    if (!container) {
      container = document.createElement('div')
      container.id = 'translation-widget-container'
      document.body.appendChild(container)
    }

    const root = window.ReactDOM.createRoot(container)
    root.render(
      <Widget pageLanguage={config.pageLanguage || 'en'} publicKey={config.publicKey || ''} autoDetectLanguage={config.autoDetectLanguage || false} />
    )
  } catch (error) {
    console.error('Error initializing widget:', error)
  }
}
declare global {
  interface Window {
    initTranslationWidget: (config: TranslationWidgetConfig) => void
    React: typeof import('react')
    ReactDOM: typeof import('react-dom/client')
  }
} 