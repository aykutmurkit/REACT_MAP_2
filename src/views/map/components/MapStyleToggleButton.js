import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { MdMap, MdDarkMode, MdLightMode } from 'react-icons/md'
import { getThemeStyles } from '../utils/themeUtils'
import { getControlPropsForDevice } from '../utils/mapUtils'

const MapStyleToggleButton = ({ isVisible = true }) => {
  const dispatch = useDispatch()
  const { mapStyle = 'openstreet', deviceType, mapTheme, controls } = useSelector((state) => state.map)
  const themeStyles = getThemeStyles(mapTheme)
  
  const controlProps = getControlPropsForDevice(controls, 'mapStyleToggle', deviceType)
  
  if (!isVisible || !controlProps.isVisible) {
    return null
  }

  const mapStyles = {
    openstreet: {
      name: 'OpenStreet',
      url: 'https://demotiles.maplibre.org/style.json',
      icon: <MdMap />
    },
    cartoLight: {
      name: 'Carto Light',
      url: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
      icon: <MdLightMode />
    },
    cartoDark: {
      name: 'Carto Dark', 
      url: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
      icon: <MdDarkMode />
    }
  }

  const handleClick = () => {
    const styleKeys = Object.keys(mapStyles)
    const currentIndex = styleKeys.indexOf(mapStyle)
    const nextIndex = (currentIndex + 1) % styleKeys.length
    const nextStyle = styleKeys[nextIndex]
    
    // Redux'ta mapStyle state'ini güncelle
    dispatch({ type: 'map/setMapStyle', payload: nextStyle })
    
    // Haritanın stilini değiştir
    if (window.mapControls && window.mapControls.getMap()) {
      const map = window.mapControls.getMap()
      map.setStyle(mapStyles[nextStyle].url)
    }
  }

  const getCurrentStyle = () => {
    return mapStyles[mapStyle] || mapStyles.openstreet
  }

  const buttonStyle = {
    ...themeStyles.baseButtonStyle,
    position: 'absolute',
    top: controlProps.position.top,
    right: controlProps.position.right,
    width: `${controlProps.size.width}px`,
    height: `${controlProps.size.height}px`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    zIndex: 1000,
    fontSize: '14px',
    transition: 'all 0.2s ease',
    pointerEvents: 'auto'
  }

  const hoverStyle = {
    ...buttonStyle,
    ...themeStyles.buttonHoverStyle
  }

  return (
    <div
      style={buttonStyle}
      onClick={handleClick}
      onMouseEnter={(e) => {
        Object.assign(e.target.style, hoverStyle)
      }}
      onMouseLeave={(e) => {
        Object.assign(e.target.style, buttonStyle)
      }}
      title={`Map Style: ${getCurrentStyle().name}`}
    >
      {getCurrentStyle().icon}
    </div>
  )
}

export default MapStyleToggleButton 