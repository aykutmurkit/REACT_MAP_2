import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { 
  MdArrowBack, 
  MdMap, 
  MdSettings, 
  MdLayers, 
  MdLocationOn, 
  MdSearch, 
  MdBookmark,
  MdHistory,
  MdShare,
  MdDownload,
  MdInfo,
  MdPalette,
  MdTerrain,
  MdPublic,
  MdSatellite,
  MdLandscape
} from 'react-icons/md'
import { getThemeStyles, getCurrentTheme } from '../utils/themeUtils'
import { setMapStyle } from '../../../redux/slices/mapSlice'
import { getZIndex } from '../utils/zIndexLayers'

const MapManagement = ({ isVisible = false, onClose }) => {
  const dispatch = useDispatch()
  const { mapTheme, mapStyle } = useSelector((state) => state.map)
  const themeStyles = getThemeStyles(mapTheme)
  const [currentScreen, setCurrentScreen] = useState('main')
  const [screenStack, setScreenStack] = useState(['main'])

  // Screen navigation functions
  const navigateToScreen = (screenName) => {
    setScreenStack([...screenStack, screenName])
    setCurrentScreen(screenName)
  }

  const navigateBack = () => {
    if (screenStack.length > 1) {
      const newStack = screenStack.slice(0, -1)
      setScreenStack(newStack)
      setCurrentScreen(newStack[newStack.length - 1])
    }
  }

  // Harita stili değiştirme fonksiyonu
  const changeMapStyle = (styleId) => {
    dispatch(setMapStyle(styleId))
    console.log(`Harita stili değiştirildi: ${styleId}`)
  }

  // Panel styles - Windows Fluent Design with Bootstrap responsive
  const panelStyle = {
    backgroundColor: 'rgba(243, 243, 243, 0.7)',
    backdropFilter: 'blur(40px) saturate(180%)',
    WebkitBackdropFilter: 'blur(40px) saturate(180%)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '12px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 1px 1px 0 rgba(255, 255, 255, 0.4)',
    transition: 'transform 0.3s ease-in-out',
    transform: isVisible ? 'translateX(0)' : 'translateX(-100%)',
    // Mobile touch optimization
    WebkitUserSelect: 'none',
    WebkitTouchCallout: 'none',
    WebkitTapHighlightColor: 'transparent',
    ...(getCurrentTheme(mapTheme) === 'dark' && {
      backgroundColor: 'rgba(32, 32, 32, 0.8)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 1px 1px 0 rgba(255, 255, 255, 0.1)'
    })
  }

  const headerStyle = {
    borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
    display: 'flex',
    alignItems: 'center',
    gap: 'clamp(8px, 2vw, 12px)', // Responsive gap
    fontFamily: '"Segoe UI", system-ui, -apple-system, sans-serif',
    fontWeight: '600',
    fontSize: 'clamp(12px, 3vw, 16px)', // More responsive font size for mobile
    color: getCurrentTheme(mapTheme) === 'dark' ? '#ffffff' : '#000000',
    // Mobile optimizations
    minHeight: '48px', // Touch-friendly header height
    WebkitUserSelect: 'none',
    userSelect: 'none'
  }

  const contentStyle = {
    flex: 1,
    overflow: 'auto',
    // Mobile scroll optimizations
    WebkitOverflowScrolling: 'touch',
    scrollbarWidth: 'thin'
  }

  const backButtonStyle = {
    borderRadius: '6px',
    border: 'none',
    backgroundColor: getCurrentTheme(mapTheme) === 'dark' 
      ? 'rgba(255, 255, 255, 0.05)' 
      : 'rgba(255, 255, 255, 0.1)',
    color: getCurrentTheme(mapTheme) === 'dark' ? '#ffffff' : '#000000',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    // Touch optimizations
    minWidth: '44px',
    minHeight: '44px',
    WebkitTapHighlightColor: 'transparent'
  }

  // Menu item styles with responsive sizing
  const getMenuItemStyle = (isActive = false) => ({
    margin: '0 0 clamp(4px, 1vw, 8px) 0', // Responsive margin
    borderRadius: '8px',
    border: 'none',
    backgroundColor: isActive 
      ? (getCurrentTheme(mapTheme) === 'dark' ? 'rgba(0, 120, 212, 0.3)' : 'rgba(0, 120, 212, 0.1)')
      : (getCurrentTheme(mapTheme) === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.1)'),
    color: getCurrentTheme(mapTheme) === 'dark' ? '#ffffff' : '#000000',
    display: 'flex',
    alignItems: 'center',
    gap: 'clamp(6px, 2vw, 12px)', // Responsive gap
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    fontSize: 'clamp(11px, 2.5vw, 14px)', // More mobile-friendly font size
    fontFamily: '"Segoe UI", system-ui, -apple-system, sans-serif',
    width: '100%',
    textAlign: 'left',
    boxShadow: isActive ? '0 2px 8px rgba(0, 120, 212, 0.2)' : '0 1px 4px rgba(0, 0, 0, 0.05)',
    // Touch optimizations
    minHeight: '44px', // Touch-friendly height
    padding: 'clamp(8px, 2vw, 12px)',
    WebkitTapHighlightColor: 'transparent',
    WebkitUserSelect: 'none',
    userSelect: 'none'
  })

  const getScreenTitle = () => {
    const titles = {
      main: 'Map Management',
      map: 'Map Settings',
      'map-styles': 'Map Styles',
      'carto-styles': 'Carto Styles',
      'mapbox-styles': 'Mapbox Styles',
      'osm-styles': 'OpenStreetMap',
      layers: 'Layers',
      location: 'Location',
      search: 'Search',
      bookmarks: 'Bookmarks',
      history: 'History',
      share: 'Share',
      downloads: 'Downloads',
      settings: 'Settings'
    }
    return titles[currentScreen] || 'Map Management'
  }

  const mainMenuItems = [
    { id: 'map', icon: MdMap, label: 'Map', action: () => navigateToScreen('map') },
    { id: 'layers', icon: MdLayers, label: 'Layers', action: () => navigateToScreen('layers') },
    { id: 'location', icon: MdLocationOn, label: 'Location', action: () => navigateToScreen('location') },
    { id: 'search', icon: MdSearch, label: 'Search', action: () => navigateToScreen('search') },
    { id: 'bookmarks', icon: MdBookmark, label: 'Bookmarks', action: () => navigateToScreen('bookmarks') },
    { id: 'history', icon: MdHistory, label: 'History', action: () => navigateToScreen('history') },
    { id: 'share', icon: MdShare, label: 'Share', action: () => navigateToScreen('share') },
    { id: 'downloads', icon: MdDownload, label: 'Downloads', action: () => navigateToScreen('downloads') },
    { id: 'settings', icon: MdSettings, label: 'Settings', action: () => navigateToScreen('settings') }
  ]

  const mapMenuItems = [
    { id: 'map-info', icon: MdInfo, label: 'Map Information', action: () => console.log('Map Info') },
    { id: 'map-styles', icon: MdPalette, label: 'Map Styles', action: () => navigateToScreen('map-styles') },
    { id: 'terrain', icon: MdTerrain, label: 'Terrain', action: () => console.log('Terrain') }
  ]

  const mapStylesItems = [
    { id: 'carto', icon: MdPublic, label: 'Carto', action: () => navigateToScreen('carto-styles') },
    { id: 'mapbox', icon: MdSatellite, label: 'Mapbox', action: () => navigateToScreen('mapbox-styles') },
    { id: 'osm', icon: MdLandscape, label: 'OpenStreetMap', action: () => navigateToScreen('osm-styles') }
  ]

  const cartoStyles = [
    { 
      id: 'carto-light', 
      label: 'Light', 
      action: () => changeMapStyle('cartoLight'),
      styleId: 'cartoLight'
    },
    { 
      id: 'carto-dark', 
      label: 'Dark', 
      action: () => changeMapStyle('cartoDark'),
      styleId: 'cartoDark'
    },
    { 
      id: 'carto-voyager', 
      label: 'Voyager', 
      action: () => changeMapStyle('cartoVoyager'),
      styleId: 'cartoVoyager'
    }
  ]

  const mapboxStyles = [
    { 
      id: 'mapbox-streets', 
      label: 'Streets', 
      action: () => changeMapStyle('mapboxStreets'),
      styleId: 'mapboxStreets'
    },
    { 
      id: 'mapbox-satellite', 
      label: 'Satellite', 
      action: () => changeMapStyle('mapboxSatellite'),
      styleId: 'mapboxSatellite'
    },
    { 
      id: 'mapbox-outdoors', 
      label: 'Outdoors', 
      action: () => changeMapStyle('mapboxOutdoors'),
      styleId: 'mapboxOutdoors'
    }
  ]

  const osmStyles = [
    { 
      id: 'osm-standard', 
      label: 'Standard', 
      action: () => changeMapStyle('openstreet'),
      styleId: 'openstreet'
    },
    { 
      id: 'osm-topo', 
      label: 'OpenTopoMap', 
      action: () => changeMapStyle('openTopoMap'),
      styleId: 'openTopoMap'
    },
    { 
      id: 'osm-alidade', 
      label: 'Alidade Smooth', 
      action: () => changeMapStyle('alidadeSmooth'),
      styleId: 'alidadeSmooth'
    }
  ]

  const renderMenuItem = (item) => {
    const isActive = item.styleId && mapStyle === item.styleId
    
    return (
      <button
        key={item.id}
        className="btn w-100 p-2 p-sm-3 mb-1 mb-sm-2"
        style={getMenuItemStyle(isActive)}
        onClick={item.action}
        onMouseEnter={(e) => {
          if (!isActive) {
            e.target.style.backgroundColor = getCurrentTheme(mapTheme) === 'dark' 
              ? 'rgba(255, 255, 255, 0.1)' 
              : 'rgba(255, 255, 255, 0.2)'
            e.target.style.transform = 'translateY(-1px)'
            e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)'
          }
        }}
        onMouseLeave={(e) => {
          if (!isActive) {
            e.target.style.backgroundColor = getCurrentTheme(mapTheme) === 'dark' 
              ? 'rgba(255, 255, 255, 0.05)' 
              : 'rgba(255, 255, 255, 0.1)'
            e.target.style.transform = 'translateY(0)'
            e.target.style.boxShadow = '0 1px 4px rgba(0, 0, 0, 0.05)'
          }
        }}
      >
        {item.icon && (
          <item.icon 
            style={{ 
              fontSize: 'clamp(16px, 3vw, 18px)', // Responsive icon size
              marginRight: 'clamp(6px, 1.5vw, 8px)' // Responsive margin
            }} 
          />
        )}
        <span style={{ fontSize: 'clamp(12px, 2vw, 14px)' }}>
          {item.label}
          {isActive && ' ✓'}
        </span>
      </button>
    )
  }

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'main':
        return mainMenuItems.map(renderMenuItem)
      case 'map':
        return mapMenuItems.map(renderMenuItem)
      case 'map-styles':
        return mapStylesItems.map(renderMenuItem)
      case 'carto-styles':
        return cartoStyles.map(renderMenuItem)
      case 'mapbox-styles':
        return mapboxStyles.map(renderMenuItem)
      case 'osm-styles':
        return osmStyles.map(renderMenuItem)
      default:
        return (
          <div 
            className="text-center p-3"
            style={{ 
              color: getCurrentTheme(mapTheme) === 'dark' ? '#ffffff' : '#666666',
              fontFamily: '"Segoe UI", system-ui, -apple-system, sans-serif',
              fontSize: 'clamp(12px, 2vw, 14px)'
            }} 
          >
            {`${getScreenTitle()} - Coming Soon`}
          </div>
        )
    }
  }

  if (!isVisible) return null

  return (
    <>
      {/* Bootstrap 5 Responsive Grid System - Panel */}
      <div className="position-fixed top-0 start-0 m-1 m-sm-2 m-md-3" style={{ zIndex: getZIndex('MAP_MANAGEMENT') }}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-sm-8 col-md-6 col-lg-4 col-xl-3">
              <div 
                className="card d-flex flex-column"
                style={{
                  ...panelStyle,
                  height: 'calc(100vh - 0.5rem)', // Smaller margin for mobile
                  minWidth: 'clamp(280px, 85vw, 320px)', // Better mobile width
                  maxWidth: 'min(320px, calc(100vw - 1rem))', // Prevent overflow
                  border: 'none'
                }}
              >
                {/* Header */}
                <div 
                  className="card-header d-flex align-items-center gap-2 gap-sm-3 p-2 p-sm-3 px-3 px-sm-4"
                  style={headerStyle}
                >
                  {currentScreen !== 'main' && (
                    <button
                      className="btn btn-sm d-flex align-items-center justify-content-center p-1"
                      style={{
                        ...backButtonStyle,
                        width: 'clamp(28px, 6vw, 32px)', // Responsive size
                        height: 'clamp(28px, 6vw, 32px)'
                      }}
                      onClick={navigateBack}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = getCurrentTheme(mapTheme) === 'dark' 
                          ? 'rgba(255, 255, 255, 0.1)' 
                          : 'rgba(255, 255, 255, 0.2)'
                        e.target.style.transform = 'scale(1.05)'
                        e.target.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.15)'
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = getCurrentTheme(mapTheme) === 'dark'
                          ? 'rgba(255, 255, 255, 0.05)'
                          : 'rgba(255, 255, 255, 0.1)'
                        e.target.style.transform = 'scale(1)'
                        e.target.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)'
                      }}
                    >
                      <MdArrowBack style={{ fontSize: 'clamp(16px, 3vw, 20px)' }} />
                    </button>
                  )}
                  <div className="fw-semibold">{getScreenTitle()}</div>
                </div>

                {/* Content */}
                <div 
                  className="card-body p-2 p-sm-3 px-3 px-sm-4"
                  style={contentStyle}
                >
                  {renderCurrentScreen()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MapManagement