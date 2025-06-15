// Fluent Design buton stilleri
export const baseButtonStyle = {
  backgroundColor: 'rgba(255,255,255,0.8)',
  backdropFilter: 'blur(30px)',
  WebkitBackdropFilter: 'blur(30px)',
  border: '1px solid rgba(0,0,0,0.12)',
  borderRadius: '4px',
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '14px',
  fontWeight: '600',
  color: '#212121',
  boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
  transition: 'background-color 150ms ease-in-out, box-shadow 150ms ease-in-out',
  position: 'absolute',
  outline: 'none',
  userSelect: 'none',
  touchAction: 'manipulation',
  WebkitTapHighlightColor: 'transparent',
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  padding: '8px',
  pointerEvents: 'auto',
  zIndex: 10002
}

// Fluent Design hover stilleri
export const buttonHoverStyle = {
  backgroundColor: 'rgba(255,255,255,0.9)',
  borderColor: 'rgba(0,0,0,0.16)',
  boxShadow: '0 4px 8px rgba(0,0,0,0.16)'
}

// Fluent Design active stilleri
export const buttonActiveStyle = {
  backgroundColor: 'rgba(255,255,255,0.6)',
  borderColor: 'rgba(0,0,0,0.2)',
  boxShadow: '0 1px 2px rgba(0,0,0,0.16)'
}

// Buton focus stilleri
export const buttonFocusStyle = {
  outline: '2px solid #0078d4',
  outlineOffset: '2px'
}

// Buton disabled stilleri
export const buttonDisabledStyle = {
  backgroundColor: '#f3f2f1',
  borderColor: '#e1dfdd',
  color: '#a19f9d',
  cursor: 'not-allowed',
  boxShadow: 'none'
}

// Fluent Design primary buton stilleri
export const primaryButtonStyle = {
  ...baseButtonStyle,
  backgroundColor: '#0078D4',
  borderColor: '#0078D4',
  color: '#ffffff'
}

// Fluent Design primary hover stilleri
export const primaryButtonHoverStyle = {
  backgroundColor: '#106EBE',
  borderColor: '#106EBE',
  boxShadow: '0 4px 8px rgba(0,0,0,0.16)'
}

// Fluent Design danger buton stilleri
export const dangerButtonStyle = {
  ...baseButtonStyle,
  backgroundColor: '#D13438',
  borderColor: '#D13438',
  color: '#ffffff'
}

// Fluent Design danger hover stilleri
export const dangerButtonHoverStyle = {
  backgroundColor: '#A4262C',
  borderColor: '#A4262C',
  boxShadow: '0 4px 8px rgba(0,0,0,0.16)'
}

// Zoom buton özel stilleri
export const zoomButtonStyle = {
  ...baseButtonStyle,
  fontWeight: '600'
}

// Çizim buton özel stilleri
export const drawButtonStyle = {
  ...baseButtonStyle
}

// Aktif çizim buton stilleri
export const activeDrawButtonStyle = {
  ...baseButtonStyle,
  backgroundColor: '#0078d4',
  borderColor: '#0078d4',
  color: '#ffffff',
  boxShadow: '0 2px 8px rgba(0, 120, 212, 0.3)'
}

// Mobil buton stilleri
export const mobileButtonStyle = {
  ...baseButtonStyle,
  fontSize: '18px',
  boxShadow: '0 3px 6px rgba(0, 0, 0, 0.15)'
}

// Tablet buton stilleri
export const tabletButtonStyle = {
  ...baseButtonStyle,
  fontSize: '17px',
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.12)'
} 