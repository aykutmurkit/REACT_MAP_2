import { lightTheme, darkTheme, mapThemes } from '../styles/themeStyles'

// Get current theme based on mapTheme setting
export const getCurrentTheme = (mapTheme) => {
  if (mapTheme === 'dark') {
    return 'dark'
  } else if (mapTheme === 'light') {
    return 'light'
  } else if (mapTheme === 'auto') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }
  return 'light' // default
}

// Get theme styles
export const getThemeStyles = (mapTheme) => {
  const currentTheme = getCurrentTheme(mapTheme)
  return currentTheme === 'dark' ? darkTheme : lightTheme
}

// Get map style URL
export const getMapStyleUrl = (mapTheme) => {
  const currentTheme = getCurrentTheme(mapTheme)
  if (mapTheme === 'auto') {
    return currentTheme === 'dark' ? mapThemes.dark : mapThemes.light
  }
  return mapThemes[mapTheme] || mapThemes.light
} 