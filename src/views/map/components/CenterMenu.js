import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getThemeStyles } from 'map-import'
import { getZIndex } from '../utils/zIndexLayers'
import {
  MdApps,
  MdMap,
  MdLayers,
  MdPlace,
  MdNavigation,
  MdTerrain,
  MdSatellite,
  MdLocationCity,
  MdDirections,
  MdSearch,
  MdDashboard,
} from 'react-icons/md'
import CenterMenuBar from './CenterMenuBar'
import MapSearchBar from './MapSearchBar'
import MapManagement from './MapManagement'

const CenterMenu = () => {
  const { mapTheme } = useSelector((state) => state.map)
  const themeStyles = getThemeStyles(mapTheme)
  const [hoveredButton, setHoveredButton] = useState(null)
  const [isMenuBarVisible, setIsMenuBarVisible] = useState(false)
  const [showSearchBar, setShowSearchBar] = useState(false)
  const [showMapManagement, setShowMapManagement] = useState(false)

  // Bootstrap 5 grid responsive menu container
  const menuContainerStyle = {
    backgroundColor: themeStyles.baseButtonStyle.backgroundColor,
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.15)',
    border: `1px solid ${themeStyles.baseButtonStyle.border.split(' ')[2]}`,
    zIndex: getZIndex('CENTER_MENU'),
  }

  const handleMenuClick = () => {
    setIsMenuBarVisible(!isMenuBarVisible)
  }

  const handleManagementClick = () => {
    setShowMapManagement(!showMapManagement)
  }

  const buttons = [
    { id: 'menu', icon: MdApps, title: 'Menü', onClick: handleMenuClick },
    { id: 'map', icon: MdMap, title: 'Harita Tipi', onClick: () => console.log('Harita Tipi') },
    { id: 'layers', icon: MdLayers, title: 'Katmanlar', onClick: () => console.log('Katmanlar') },
    {
      id: 'place',
      icon: MdPlace,
      title: 'Yer İşaretleri',
      onClick: () => console.log('Yer İşaretleri'),
    },
    {
      id: 'navigation',
      icon: MdNavigation,
      title: 'Navigasyon',
      onClick: () => console.log('Navigasyon'),
    },
    { id: 'terrain', icon: MdTerrain, title: 'Arazi', onClick: () => console.log('Arazi') },
    { id: 'satellite', icon: MdSatellite, title: 'Uydu', onClick: () => console.log('Uydu') },
    { id: 'management', icon: MdDashboard, title: 'Map Management', onClick: handleManagementClick },
    { id: 'search', icon: MdSearch, title: 'Arama', onClick: () => setShowSearchBar(true) },
  ]

  return (
    <>
      <MapManagement 
        isVisible={showMapManagement} 
        onClose={() => setShowMapManagement(false)} 
      />
      <CenterMenuBar
        isVisible={isMenuBarVisible}
        onClose={() => setIsMenuBarVisible(false)}
        width="auto"
      />
      {showSearchBar && (
        <MapSearchBar
          width="auto"
          onClose={() => setShowSearchBar(false)}
          backgroundColor={themeStyles.baseButtonStyle.backgroundColor}
          borderRadius={menuContainerStyle.borderRadius}
        />
      )}

      {/* Bootstrap 5 Responsive Grid System */}
      <div
        className="position-fixed bottom-0 start-50 translate-middle-x mb-1 mb-sm-2 mb-md-3"
        style={{ zIndex: getZIndex('CENTER_MENU') }}
      >
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-auto">
              <div
                className="d-flex align-items-center justify-content-center gap-1 gap-sm-2"
                style={{
                  ...menuContainerStyle,
                  padding: 'clamp(4px, 1vw, 8px)', // Responsive padding
                  // Mobile touch optimization
                  WebkitUserSelect: 'none',
                  WebkitTouchCallout: 'none',
                  WebkitTapHighlightColor: 'transparent'
                }}
              >
                {buttons.slice(0, 9).map((button) => (
                  <button
                    key={button.id}
                    className="btn d-flex align-items-center justify-content-center"
                    style={{
                      borderRadius: '4px',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      margin: 0,
                      backgroundColor:
                        (button.id === 'menu' && isMenuBarVisible) || 
                        (button.id === 'management' && showMapManagement) || 
                        hoveredButton === button.id
                          ? themeStyles.buttonHoverStyle.backgroundColor || '#f0f0f0'
                          : themeStyles.baseButtonStyle.backgroundColor,
                      color:
                        (button.id === 'menu' && isMenuBarVisible) || 
                        (button.id === 'management' && showMapManagement) || 
                        hoveredButton === button.id
                          ? themeStyles.buttonHoverStyle.color || '#0078d4'
                          : themeStyles.baseButtonStyle.color,
                      border: themeStyles.baseButtonStyle.border,
                      boxShadow: 'none',
                      // Mobile optimizations
                      padding: 'clamp(6px, 1.5vw, 10px)',
                      minWidth: 'clamp(36px, 8vw, 48px)',
                      minHeight: 'clamp(36px, 8vw, 48px)',
                      WebkitTapHighlightColor: 'transparent',
                      WebkitUserSelect: 'none',
                      userSelect: 'none'
                    }}
                    onClick={button.onClick}
                    onMouseEnter={() => setHoveredButton(button.id)}
                    onMouseLeave={() => setHoveredButton(null)}
                    title={button.title}
                  >
                    <button.icon
                      className="d-block"
                      style={{
                        fontSize: 'clamp(14px, 3.5vw, 20px)', // Better mobile icon size
                        width: 'clamp(14px, 3.5vw, 20px)',
                        height: 'clamp(14px, 3.5vw, 20px)',
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CenterMenu 