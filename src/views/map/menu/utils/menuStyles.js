import { getZIndex } from '../../utils/zIndexLayers'

/**
 * Menu styling utilities
 * Centralizes style calculations and responsive design
 */

/**
 * Get menu container styles
 * @param {Object} themeStyles - Theme styles from Redux
 * @returns {Object} Style object for menu container
 */
export const getMenuContainerStyle = (themeStyles) => ({
  backgroundColor: themeStyles.baseButtonStyle.backgroundColor,
  borderRadius: '8px',
  boxShadow: '0 2px 10px rgba(0,0,0,0.15)',
  border: `1px solid ${themeStyles.baseButtonStyle.border.split(' ')[2]}`,
  zIndex: getZIndex('CENTER_MENU'),
})

/**
 * Get Windows 11 Start Menu dropdown styles
 * @param {Object} themeStyles - Theme styles from Redux
 * @param {boolean} showProfileDropdown - Dropdown visibility state
 * @returns {Object} Style object for profile dropdown
 */
export const getProfileDropdownStyle = (themeStyles, showProfileDropdown) => ({
  backgroundColor: themeStyles.baseButtonStyle.backgroundColor,
  borderRadius: '12px',
  boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
  border: `1px solid ${themeStyles.baseButtonStyle.border.split(' ')[2]}`,
  zIndex: getZIndex('CENTER_MENU') + 10,
  width: '100%',
  minHeight: 'clamp(450px, 60vh, 600px)',
  animation: showProfileDropdown
    ? 'slideUpFadeIn 0.3s ease-out'
    : 'slideDownFadeOut 0.3s ease-in',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
})

/**
 * CSS keyframes for menu animations
 * @returns {string} CSS string with keyframe definitions
 */
export const getMenuAnimationCSS = () => `
  @keyframes slideUpFadeIn {
    from {
      opacity: 0;
      transform: translateY(20px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
  
  @keyframes slideDownFadeOut {
    from {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
    to {
      opacity: 0;
      transform: translateY(20px) scale(0.95);
    }
  }
`

/**
 * Get responsive button styles
 * @param {boolean} isHovered - Button hover state
 * @param {boolean} isActive - Button active state
 * @returns {Object} Style object for responsive buttons
 */
export const getResponsiveButtonStyle = (isHovered = false, isActive = false) => ({
  borderRadius: '6px',
  cursor: 'pointer',
  transition: 'all 0.15s',
  margin: 0,
  backgroundColor: isActive 
    ? 'rgba(0, 120, 212, 0.1)' 
    : isHovered
    ? 'rgba(0, 0, 0, 0.05)'
    : 'transparent',
  border: 'none',
  boxShadow: 'none',
  padding: 'clamp(6px, 1.5vw, 8px)',
  minWidth: 'clamp(36px, 8vw, 44px)',
  minHeight: 'clamp(36px, 8vw, 44px)',
  WebkitTapHighlightColor: 'transparent'
})

/**
 * Get Windows 11 glass effect styles
 * @returns {Object} Style object for glass effect
 */
export const getGlassEffectStyle = () => ({
  backgroundColor: 'rgba(255, 255, 255, 0.85)',
  backdropFilter: 'blur(30px)',
  WebkitBackdropFilter: 'blur(30px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
})

/**
 * Get responsive icon size
 * @param {string} size - Size variant ('small', 'medium', 'large')
 * @returns {string} Clamp CSS value for responsive icon sizing
 */
export const getResponsiveIconSize = (size = 'medium') => {
  const sizes = {
    small: 'clamp(12px, 3vw, 16px)',
    medium: 'clamp(14px, 3.5vw, 18px)',
    large: 'clamp(16px, 4vw, 20px)',
  }
  return sizes[size] || sizes.medium
}

/**
 * Get responsive spacing
 * @param {string} type - Spacing type ('gap', 'padding', 'margin')
 * @param {string} size - Size variant ('small', 'medium', 'large')
 * @returns {string} Clamp CSS value for responsive spacing
 */
export const getResponsiveSpacing = (type = 'gap', size = 'medium') => {
  const spacings = {
    gap: {
      small: 'clamp(1px, 0.3vw, 2px)',
      medium: 'clamp(2px, 0.5vw, 4px)',
      large: 'clamp(4px, 1vw, 8px)',
    },
    padding: {
      small: 'clamp(3px, 0.8vw, 6px)',
      medium: 'clamp(6px, 1.5vw, 8px)',
      large: 'clamp(8px, 2vw, 12px)',
    },
    margin: {
      small: 'clamp(1px, 0.3vw, 2px)',
      medium: 'clamp(2px, 0.5vw, 4px)',
      large: 'clamp(4px, 1vw, 8px)',
    }
  }
  return spacings[type]?.[size] || spacings.gap.medium
} 