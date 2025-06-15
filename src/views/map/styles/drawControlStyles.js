// Çizim kontrolleri kapsayıcı stilleri
export const drawControlsContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '4px'
}

// Fluent Design çizim modu buton stilleri
export const drawModeButtonStyle = {
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
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  padding: '8px',
  pointerEvents: 'auto',
  zIndex: 10002
}

// Fluent Design aktif çizim modu buton stilleri
export const activeDrawModeButtonStyle = {
  ...drawModeButtonStyle,
  backgroundColor: '#0078D4',
  borderColor: '#0078D4',
  color: '#ffffff',
  boxShadow: '0 4px 8px rgba(0,0,0,0.16)',
  pointerEvents: 'auto',
  zIndex: 10002
}

// Fluent Design çizim modu buton hover stilleri
export const drawModeButtonHoverStyle = {
  backgroundColor: 'rgba(255,255,255,0.9)',
  borderColor: 'rgba(0,0,0,0.16)',
  boxShadow: '0 4px 8px rgba(0,0,0,0.16)'
}

// Fluent Design çöp kutusu buton stilleri
export const trashButtonStyle = {
  ...drawModeButtonStyle,
  backgroundColor: '#D13438',
  borderColor: '#D13438',
  color: '#ffffff',
  pointerEvents: 'auto',
  zIndex: 10002
}

// Fluent Design çöp kutusu buton hover stilleri
export const trashButtonHoverStyle = {
  backgroundColor: '#A4262C',
  borderColor: '#A4262C',
  boxShadow: '0 4px 8px rgba(0,0,0,0.16)'
} 