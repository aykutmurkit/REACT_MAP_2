import React from 'react'
import MapPortal from './MapPortal'
import { MapContainer, MapControls, CenterMenu, MapLogoOverlay } from './imports'

const MapView = () => {
  return React.createElement(
    'div',
    {
      style: {
        position: 'relative',
        width: '100%',
        height: '100%',
      },
    },
    [
      React.createElement(MapContainer, { key: 'map-container' }),
      React.createElement(MapControls, { key: 'map-controls' }),
      React.createElement(CenterMenu, { key: 'center-menu' }),
      React.createElement(MapLogoOverlay, { key: 'map-logo-overlay' }),
    ],
  )
}

// Ana harita bileşenini dışa aktar
export default MapView

// MapPortal'ı da dışa aktar
export { MapPortal }

// Harita modülüyle alakalı genel stilleri de dışa aktarabiliriz
export * from './styles/mapStyles'
export * from './styles/buttonStyles'
export * from './styles/mapControlsStyles'
export * from './styles/drawControlStyles'

// Yardımcı fonksiyonları da dışa aktarabiliriz
export * from './utils/mapUtils'
