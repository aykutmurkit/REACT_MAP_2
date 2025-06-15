// Theme Styles for Map Components
export const lightTheme = {
  // Button Styles
  baseButtonStyle: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    borderRadius: '6px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
    transition: 'all 0.2s ease',
    zIndex: 1000,
    color: '#333333',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    pointerEvents: 'auto'
  },
  
  buttonHoverStyle: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
    transform: 'translateY(-1px)'
  },
  
  buttonActiveStyle: {
    backgroundColor: 'rgba(240, 240, 240, 0.9)',
    transform: 'translateY(0px)',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)'
  },
  
  buttonFocusStyle: {
    outline: '2px solid #0078D4',
    outlineOffset: '2px'
  },

  // Draw Mode Button Styles
  drawModeButtonStyle: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    borderRadius: '6px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
    transition: 'all 0.2s ease',
    zIndex: 1000,
    color: '#333333',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    pointerEvents: 'auto'
  },
  
  activeDrawModeButtonStyle: {
    backgroundColor: 'rgba(0, 120, 212, 0.9)',
    color: '#ffffff',
    border: '1px solid rgba(0, 120, 212, 0.3)',
    boxShadow: '0 2px 8px rgba(0, 120, 212, 0.3)'
  },
  
  drawModeButtonHoverStyle: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
    transform: 'translateY(-1px)'
  },

  // Trash Button Styles
  trashButtonStyle: {
    position: 'absolute',
    backgroundColor: 'rgba(220, 53, 69, 0.7)',
    border: '1px solid rgba(220, 53, 69, 0.3)',
    borderRadius: '6px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 2px 8px rgba(220, 53, 69, 0.3)',
    transition: 'all 0.2s ease',
    zIndex: 1000,
    color: '#ffffff',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    pointerEvents: 'auto'
  },
  
  trashButtonHoverStyle: {
    backgroundColor: 'rgba(200, 35, 51, 0.95)',
    boxShadow: '0 4px 12px rgba(220, 53, 69, 0.4)',
    transform: 'translateY(-1px)'
  }
}

export const darkTheme = {
  // Button Styles
  baseButtonStyle: {
    position: 'absolute',
    backgroundColor: 'rgba(45, 45, 45, 0.7)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '6px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.4)',
    transition: 'all 0.2s ease',
    zIndex: 1000,
    color: '#ffffff',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    pointerEvents: 'auto'
  },
  
  buttonHoverStyle: {
    backgroundColor: 'rgba(55, 55, 55, 0.95)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
    transform: 'translateY(-1px)'
  },
  
  buttonActiveStyle: {
    backgroundColor: 'rgba(35, 35, 35, 0.9)',
    transform: 'translateY(0px)',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.4)'
  },
  
  buttonFocusStyle: {
    outline: '2px solid #0078D4',
    outlineOffset: '2px'
  },

  // Draw Mode Button Styles
  drawModeButtonStyle: {
    position: 'absolute',
    backgroundColor: 'rgba(45, 45, 45, 0.7)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '6px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.4)',
    transition: 'all 0.2s ease',
    zIndex: 1000,
    color: '#ffffff',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    pointerEvents: 'auto'
  },
  
  activeDrawModeButtonStyle: {
    backgroundColor: 'rgba(0, 120, 212, 0.9)',
    color: '#ffffff',
    border: '1px solid rgba(0, 120, 212, 0.3)',
    boxShadow: '0 2px 8px rgba(0, 120, 212, 0.4)'
  },
  
  drawModeButtonHoverStyle: {
    backgroundColor: 'rgba(55, 55, 55, 0.95)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
    transform: 'translateY(-1px)'
  },

  // Trash Button Styles
  trashButtonStyle: {
    position: 'absolute',
    backgroundColor: 'rgba(220, 53, 69, 0.7)',
    border: '1px solid rgba(220, 53, 69, 0.3)',
    borderRadius: '6px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 2px 8px rgba(220, 53, 69, 0.4)',
    transition: 'all 0.2s ease',
    zIndex: 1000,
    color: '#ffffff',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    pointerEvents: 'auto'
  },
  
  trashButtonHoverStyle: {
    backgroundColor: 'rgba(200, 35, 51, 0.95)',
    boxShadow: '0 4px 12px rgba(220, 53, 69, 0.5)',
    transform: 'translateY(-1px)'
  }
}

// Map Themes
export const mapThemes = {
  light: 'https://demotiles.maplibre.org/style.json',
  dark: 'https://tiles.stadiamaps.com/styles/alidade_smooth_dark.json',
  auto: null // Will be determined by system preference
}

// Theme Switcher Button Style
export const themeSwitcherStyle = {
  position: 'absolute',
  top: '20px',
  left: '20px',
  backgroundColor: 'rgba(255, 255, 255, 0.7)',
  border: '1px solid rgba(0, 0, 0, 0.1)',
  borderRadius: '6px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
  transition: 'all 0.2s ease',
  zIndex: 1001,
  width: '48px',
  height: '48px',
  color: '#333333',
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  pointerEvents: 'auto'
}

export const themeSwitcherDarkStyle = {
  ...themeSwitcherStyle,
  backgroundColor: 'rgba(45, 45, 45, 0.7)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  color: '#ffffff',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.4)',
  pointerEvents: 'auto'
} 