import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { getThemeStyles } from 'map-import'
import { MdApps, MdMap, MdLayers, MdPlace, MdNavigation, MdTerrain, MdSatellite, MdLocationCity, MdDirections } from 'react-icons/md'
import CenterMenuBar from './CenterMenuBar'

const BUTTON_SIZE = 40
const BUTTON_GAP = 8
const BUTTON_COUNT = 8
const CONTAINER_PADDING = 8
const CONTAINER_WIDTH = BUTTON_COUNT * BUTTON_SIZE + (BUTTON_COUNT - 1) * BUTTON_GAP + 2 * CONTAINER_PADDING

const CenterMenu = () => {
  const { mapTheme } = useSelector((state) => state.map)
  const themeStyles = getThemeStyles(mapTheme)
  const [hoveredButton, setHoveredButton] = useState(null)
  const [isMenuBarVisible, setIsMenuBarVisible] = useState(false)

  // Menü konteyner stili
  const menuContainerStyle = {
    position: 'absolute',
    bottom: 20,
    left: '50%',
    transform: 'translateX(-50%)',
    width: `${CONTAINER_WIDTH}px`,
    height: '56px',
    backgroundColor: themeStyles.baseButtonStyle.backgroundColor,
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.15)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: `0 ${CONTAINER_PADDING}px`,
    gap: `${BUTTON_GAP}px`,
    zIndex: 1000,
    border: `1px solid ${themeStyles.baseButtonStyle.border.split(' ')[2]}`
  }

  // Buton stili - box-shadow kaldırıldı
  const getButtonStyle = (buttonId) => {
    // Temel stil
    const baseStyle = {
      width: `${BUTTON_SIZE}px`,
      height: `${BUTTON_SIZE}px`,
      borderRadius: '4px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      transition: 'all 0.2s',
      margin: 0,
      backgroundColor: themeStyles.baseButtonStyle.backgroundColor,
      color: themeStyles.baseButtonStyle.color,
      border: themeStyles.baseButtonStyle.border,
      boxShadow: 'none'
    };

    // Menü butonu aktifse farklı stil
    if (buttonId === 'menu' && isMenuBarVisible) {
      return {
        ...baseStyle,
        backgroundColor: themeStyles.buttonHoverStyle.backgroundColor || '#f0f0f0',
        color: themeStyles.buttonHoverStyle.color || '#0078d4'
      };
    }

    // Hover durumunda stil
    if (hoveredButton === buttonId) {
      return {
        ...baseStyle,
        backgroundColor: themeStyles.buttonHoverStyle.backgroundColor || '#f0f0f0',
        color: themeStyles.buttonHoverStyle.color || '#0078d4'
      };
    }

    return baseStyle;
  }

  // Menü butonuna tıklandığında
  const handleMenuClick = () => {
    setIsMenuBarVisible(!isMenuBarVisible);
  }

  // Buton ikonları ve işlevleri - 8 buton, en soldaki 9 noktalı menü
  const buttons = [
    { id: 'menu', icon: MdApps, title: 'Menü', onClick: handleMenuClick },
    { id: 'map', icon: MdMap, title: 'Harita Tipi', onClick: () => console.log('Harita Tipi') },
    { id: 'layers', icon: MdLayers, title: 'Katmanlar', onClick: () => console.log('Katmanlar') },
    { id: 'place', icon: MdPlace, title: 'Yer İşaretleri', onClick: () => console.log('Yer İşaretleri') },
    { id: 'navigation', icon: MdNavigation, title: 'Navigasyon', onClick: () => console.log('Navigasyon') },
    { id: 'terrain', icon: MdTerrain, title: 'Arazi', onClick: () => console.log('Arazi') },
    { id: 'satellite', icon: MdSatellite, title: 'Uydu', onClick: () => console.log('Uydu') },
    { id: 'city', icon: MdLocationCity, title: 'Şehirler', onClick: () => console.log('Şehirler') }
  ]

  return (
    <>
      <CenterMenuBar 
        isVisible={isMenuBarVisible} 
        onClose={() => setIsMenuBarVisible(false)} 
        width={`${CONTAINER_WIDTH}px`}
      />
      <div style={menuContainerStyle}>
        {buttons.slice(0, 8).map(button => (
          <button
            key={button.id}
            style={getButtonStyle(button.id)}
            onClick={button.onClick}
            onMouseEnter={() => setHoveredButton(button.id)}
            onMouseLeave={() => setHoveredButton(null)}
            title={button.title}
          >
            <button.icon size={22} />
          </button>
        ))}
      </div>
    </>
  )
}

export default CenterMenu 