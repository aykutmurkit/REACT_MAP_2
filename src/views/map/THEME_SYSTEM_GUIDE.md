# Map Theme System Guide

Bu dokümantasyon, harita component'lerinde kullanılan dark/light theme sistemi hakkında bilgi verir.

## 🎯 Özellikler

- ✅ **Light Theme**: Açık tema (default)
- ✅ **Dark Theme**: Koyu tema  
- ✅ **Auto Theme**: Sistem tercihine göre otomatik
- ✅ **Theme Switcher Button**: Sol üstte tema değiştirme butonu
- ✅ **Map Style Switching**: Harita teması da değişiyor
- ✅ **Component Theme Support**: Tüm butonlar tema destekli

## 📁 Dosya Yapısı

```
src/views/map/
├── components/
│   └── ThemeSwitcherButton.js     # Theme switcher component
├── styles/
│   └── themeStyles.js             # Light/Dark theme styles
├── utils/
│   └── themeUtils.js              # Theme utility functions
└── redux/slices/
    └── mapSlice.js                # Theme state management
```

## 🔧 Redux State

### mapSlice.js
```javascript
const initialState = {
  mapTheme: 'light', // 'light', 'dark', 'auto'
  // ... other state
}

// Actions
setMapTheme: (state, action) => {
  state.mapTheme = action.payload
},
toggleMapTheme: (state) => {
  const themes = ['light', 'dark', 'auto']
  const currentIndex = themes.indexOf(state.mapTheme)
  const nextIndex = (currentIndex + 1) % themes.length
  state.mapTheme = themes[nextIndex]
}
```

### Actions
```javascript
import { setMapTheme, toggleMapTheme } from '../../../redux/slices/mapSlice'

// Set specific theme
dispatch(setMapTheme('dark'))

// Toggle between themes
dispatch(toggleMapTheme())
```

## 🎨 Theme Styles

### Light Theme
```javascript
export const lightTheme = {
  baseButtonStyle: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    color: '#333333',
    // ...
  },
  // ... other styles
}
```

### Dark Theme
```javascript
export const darkTheme = {
  baseButtonStyle: {
    backgroundColor: 'rgba(45, 45, 45, 0.9)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    color: '#ffffff',
    // ...
  },
  // ... other styles
}
```

### Map Themes
```javascript
export const mapThemes = {
  light: 'https://demotiles.maplibre.org/style.json',
  dark: 'https://tiles.stadiamaps.com/styles/alidade_smooth_dark.json',
  auto: null // Determined by system preference
}
```

## 🛠️ Utility Functions

### themeUtils.js
```javascript
// Get current theme
export const getCurrentTheme = (mapTheme) => {
  if (mapTheme === 'dark') return 'dark'
  if (mapTheme === 'light') return 'light'
  if (mapTheme === 'auto') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }
  return 'light'
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
```

## 🔘 Theme Switcher Button

### Kullanım
```javascript
import ThemeSwitcherButton from './ThemeSwitcherButton'

// Component içinde
React.createElement(ThemeSwitcherButton, {
  isVisible: true
})
```

### Özellikler
- **Position**: Sol üst köşe (top: 20px, left: 20px)
- **Icons**: 
  - 🌞 Light mode
  - 🌙 Dark mode  
  - ⚙️ Auto mode
- **Toggle**: Tıklayınca sırayla geçiş yapar
- **Responsive**: Theme'e göre görünümü değişir

## 🎛️ Component Theme Integration

### Button Component Örneği
```javascript
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { getThemeStyles } from 'map-import'

const MyButton = ({ size, position, onClick, isVisible = true }) => {
  const { mapTheme } = useSelector((state) => state.map)
  const themeStyles = getThemeStyles(mapTheme)
  const [isHovered, setIsHovered] = useState(false)

  const buttonStyle = {
    ...themeStyles.baseButtonStyle,
    width: size.width,
    height: size.height,
    top: position.top,
    right: position.right,
    ...(isHovered ? themeStyles.buttonHoverStyle : {})
  }

  if (!isVisible) return null

  return React.createElement('button', {
    style: buttonStyle,
    onClick: onClick,
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false)
  }, 'Button Text')
}
```

## 🗺️ Map Theme Integration

### MapContainer.js
```javascript
import { getMapStyleUrl } from '../utils/themeUtils'

const MapContainer = () => {
  const { mapTheme } = useSelector(state => state.map)

  // Initial map creation
  useEffect(() => {
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: getMapStyleUrl(mapTheme), // Theme-aware style
      center: mapCenter,
      zoom: mapZoom,
      antialias: true
    })
  }, [])

  // Listen for theme changes
  useEffect(() => {
    if (map.current && isMapLoaded) {
      const newStyleUrl = getMapStyleUrl(mapTheme)
      map.current.setStyle(newStyleUrl)
    }
  }, [mapTheme, isMapLoaded])
}
```

## 📋 Güncellenmiş Component'ler

### Theme Destekli Component'ler
- ✅ `ZoomInButton.js`
- ✅ `ZoomOutButton.js` 
- ✅ `DrawPolygonButton.js`
- ✅ `DrawLineButton.js`
- ✅ `DrawPointButton.js`
- ✅ `DrawRectangleButton.js`
- ✅ `DrawCircleButton.js`
- ✅ `EditModeButton.js`
- ✅ `SelectModeButton.js`
- ✅ `MeasureDistanceButton.js`
- ✅ `UndoButton.js`
- ✅ `RedoButton.js`
- ✅ `SaveButton.js`
- ✅ `ExportButton.js`
- ✅ `DeleteAllButton.js`

### Yeni Component'ler
- ✅ `ThemeSwitcherButton.js`

## 🚀 Kullanım Örnekleri

### 1. Theme State'ini Okuma
```javascript
import { useSelector } from 'react-redux'

const { mapTheme } = useSelector((state) => state.map)
// mapTheme: 'light' | 'dark' | 'auto'
```

### 2. Theme Değiştirme
```javascript
import { useDispatch } from 'react-redux'
import { setMapTheme, toggleMapTheme } from '../../../redux/slices/mapSlice'

const dispatch = useDispatch()

// Specific theme set
dispatch(setMapTheme('dark'))

// Toggle between themes
dispatch(toggleMapTheme())
```

### 3. Theme Styles Kullanma
```javascript
import { getThemeStyles } from 'map-import'

const { mapTheme } = useSelector((state) => state.map)
const themeStyles = getThemeStyles(mapTheme)

const buttonStyle = {
  ...themeStyles.baseButtonStyle,
  // custom overrides
}
```

### 4. Auto Theme Detection
```javascript
// Auto mode'da sistem tercihini kontrol etme
const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches

// Auto theme için listener
useEffect(() => {
  if (mapTheme === 'auto') {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => {
      // Theme değişikliği algılandı
    }
    
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }
}, [mapTheme])
```

## 🎯 Theme Switching Flow

```
User clicks ThemeSwitcherButton
         ↓
dispatch(toggleMapTheme())
         ↓
Redux state updates: mapTheme
         ↓
Components re-render with new theme
         ↓
Map style changes automatically
```

## 🔧 Avantajlar

### 1. **Centralized Theme Management**
- Tek yerden theme kontrolü
- Redux state ile senkronize

### 2. **Automatic Map Style Switching**
- Harita teması otomatik değişiyor
- Light/Dark map styles

### 3. **System Preference Support**
- Auto mode ile sistem tercihini takip
- `prefers-color-scheme` media query

### 4. **Component Consistency**
- Tüm butonlar aynı theme sistemini kullanıyor
- Tutarlı görünüm

### 5. **Performance Optimized**
- Utility functions ile minimal re-render
- Efficient theme switching

## 📊 Özet

- ✅ **3 Theme Mode**: Light, Dark, Auto
- ✅ **Theme Switcher**: Sol üst köşede buton
- ✅ **Map Integration**: Harita teması da değişiyor
- ✅ **15+ Component**: Tüm butonlar theme destekli
- ✅ **Redux Integration**: Centralized state management
- ✅ **Auto Detection**: Sistem tercihini takip
- ✅ **Performance**: Optimized theme switching

Bu sistem sayesinde kullanıcılar tercih ettikleri tema ile harita uygulamasını kullanabilirler! 🎉 