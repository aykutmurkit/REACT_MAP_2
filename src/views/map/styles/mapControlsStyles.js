// MapControls kapsayıcı stilleri
export const controlsContainerStyle = {
  position: 'absolute',
  top: 0,
  right: 0,
  zIndex: 10001,
  pointerEvents: 'none' // Sadece butonlar tıklanabilir olsun
}

// Kontrol grubu stilleri
export const controlGroupStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  padding: '20px',
  pointerEvents: 'auto'
}

// Mobil kontrol grubu stilleri
export const mobileControlGroupStyle = {
  ...controlGroupStyle,
  gap: '10px',
  padding: '20px'
}

// Tablet kontrol grubu stilleri
export const tabletControlGroupStyle = {
  ...controlGroupStyle,
  gap: '9px',
  padding: '20px'
} 