import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import 'core-js'

// MapLibre GL CSS dosyalarını import et
import 'maplibre-gl/dist/maplibre-gl.css'
import '@hyvilo/maplibre-gl-draw/dist/maplibre-gl-draw.css'

import App from './App'
import store from './redux/store'
import './i18n'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
