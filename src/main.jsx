import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import App from './App.jsx'
import loadExternalAdScripts from './utils/loadExternalAdScripts'

// Load external ad provider scripts from the app entry point (outside components)
// This ensures the provider scripts and options are available early in the page lifecycle.
loadExternalAdScripts().catch((e) => console.warn('entry-ad-loader: startup failed', e));

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>,
)