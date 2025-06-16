import { getZIndex } from '../utils/zIndexLayers'

// MapControls kapsayıcı stilleri - Bootstrap 5 uyumlu
export const controlsContainerStyle = {
  position: 'fixed',
  top: 'clamp(10px, 2vw, 20px)', // Responsive top position
  right: 'clamp(10px, 2vw, 20px)', // Responsive right position
  zIndex: getZIndex('MAP_CONTROLS'),
  pointerEvents: 'none', // Sadece butonlar tıklanabilir olsun
  // Mobile optimizations
  WebkitUserSelect: 'none',
  userSelect: 'none'
}

// Kontrol grubu stilleri
export const controlGroupStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: 'clamp(6px, 1.5vw, 8px)', // Responsive gap
  padding: '0',
  pointerEvents: 'auto',
  // Mobile optimizations
  WebkitTapHighlightColor: 'transparent'
}

// Mobil kontrol grubu stilleri - Bootstrap responsive ile uyumlu
export const mobileControlGroupStyle = {
  ...controlGroupStyle,
  gap: '4px', // Smaller gap for mobile
  padding: '0'
}

// Tablet kontrol grubu stilleri - Bootstrap responsive ile uyumlu
export const tabletControlGroupStyle = {
  ...controlGroupStyle,
  gap: '6px', // Medium gap for tablet
  padding: '0'
} 