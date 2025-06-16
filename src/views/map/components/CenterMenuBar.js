import React from 'react'
import { useSelector } from 'react-redux'
import { getThemeStyles } from 'map-import'
import { getZIndex } from '../utils/zIndexLayers'
import {
  MdMap,
  MdLayers,
  MdPlace,
  MdNavigation,
  MdTerrain,
  MdSatellite,
  MdLocationCity,
  MdDirections,
  MdClose,
  MdMyLocation,
  MdSearch,
  MdFilterList,
  MdSettings,
  MdInfo,
  MdHelp,
  MdBookmark,
  MdHistory,
  MdFavorite,
  MdShare,
  MdPrint,
  MdDownload,
  MdUpload,
  MdDelete,
  MdEdit,
  MdZoomIn,
  MdZoomOut,
  MdCenterFocusStrong,
  MdLocationOn,
  MdRoute
} from 'react-icons/md'

const CenterMenuBar = ({ isVisible, onClose, width }) => {
  const { mapTheme } = useSelector((state) => state.map)
  const themeStyles = getThemeStyles(mapTheme)

  if (!isVisible) return null

  // Bootstrap 5 responsive menu bar
  const menuBarStyle = {
    backgroundColor: themeStyles.baseButtonStyle.backgroundColor,
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.15)',
    border: `1px solid ${themeStyles.baseButtonStyle.border.split(' ')[2]}`,
    zIndex: getZIndex('CENTER_MENU_BAR')
  }

  const headerStyle = {
    borderBottom: `1px solid ${themeStyles.baseButtonStyle.border.split(' ')[2]}`,
    color: themeStyles.baseButtonStyle.color
  }

  const closeButtonStyle = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: themeStyles.baseButtonStyle.color,
    padding: '4px',
    borderRadius: '4px'
  }

  const buttonStyle = {
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    backgroundColor: themeStyles.baseButtonStyle.backgroundColor,
    color: themeStyles.baseButtonStyle.color,
    border: themeStyles.baseButtonStyle.border,
    aspectRatio: '1',
    minHeight: 'clamp(50px, 12vw, 70px)',
    WebkitTapHighlightColor: 'transparent',
    WebkitUserSelect: 'none',
    userSelect: 'none'
  }

  const buttonTextStyle = {
    fontSize: 'clamp(9px, 2vw, 11px)',
    color: themeStyles.baseButtonStyle.color,
    marginTop: '2px',
    WebkitUserSelect: 'none',
    userSelect: 'none'
  }

  const menuItems = [
    { icon: MdMap, title: 'Harita Tipi', onClick: () => console.log('Harita Tipi') },
    { icon: MdLayers, title: 'Katmanlar', onClick: () => console.log('Katmanlar') },
    { icon: MdPlace, title: 'Yer İşaretleri', onClick: () => console.log('Yer İşaretleri') },
    { icon: MdNavigation, title: 'Navigasyon', onClick: () => console.log('Navigasyon') },
    { icon: MdTerrain, title: 'Arazi', onClick: () => console.log('Arazi') },
    { icon: MdSatellite, title: 'Uydu', onClick: () => console.log('Uydu') },
    { icon: MdLocationCity, title: 'Şehirler', onClick: () => console.log('Şehirler') },
    { icon: MdDirections, title: 'Yol Tarifi', onClick: () => console.log('Yol Tarifi') },
    { icon: MdMyLocation, title: 'Konumum', onClick: () => console.log('Konumum') },
    { icon: MdSearch, title: 'Arama', onClick: () => console.log('Arama') },
    { icon: MdFilterList, title: 'Filtreler', onClick: () => console.log('Filtreler') },
    { icon: MdSettings, title: 'Ayarlar', onClick: () => console.log('Ayarlar') },
    { icon: MdInfo, title: 'Bilgi', onClick: () => console.log('Bilgi') },
    { icon: MdHelp, title: 'Yardım', onClick: () => console.log('Yardım') },
    { icon: MdBookmark, title: 'Yer İmi', onClick: () => console.log('Yer İmi') },
    { icon: MdHistory, title: 'Geçmiş', onClick: () => console.log('Geçmiş') },
    { icon: MdZoomIn, title: 'Yakınlaştır', onClick: () => console.log('Yakınlaştır') },
    { icon: MdZoomOut, title: 'Uzaklaştır', onClick: () => console.log('Uzaklaştır') },
    { icon: MdCenterFocusStrong, title: 'Merkeze Al', onClick: () => console.log('Merkeze Al') },
    { icon: MdRoute, title: 'Rota', onClick: () => console.log('Rota') }
  ]

  return (
    <div className="position-fixed bottom-0 start-50 translate-middle-x mb-4 mb-sm-5" style={{ zIndex: getZIndex('CENTER_MENU_BAR') }}>
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-6">
            <div className="card" style={menuBarStyle}>
              {/* Header */}
              <div className="card-header d-flex justify-content-between align-items-center p-2 p-sm-3" style={headerStyle}>
                <h5 
                  className="card-title mb-0 fw-bold" 
                  style={{ fontSize: 'clamp(14px, 3vw, 18px)' }}
                >
                  Menü
                </h5>
                <button 
                  className="btn btn-sm" 
                  style={closeButtonStyle} 
                  onClick={onClose} 
                  title="Kapat"
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = 'rgba(0,0,0,0.1)'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent'
                  }}
                >
                  <MdClose style={{ fontSize: 'clamp(16px, 4vw, 20px)' }} />
                </button>
              </div>
              
              {/* Grid Content */}
              <div className="card-body p-2 p-sm-3">
                <div className="row g-1 g-sm-2">
                  {menuItems.map((item, index) => (
                    <div key={index} className="col-6 col-sm-4 col-md-3">
                      <button 
                        className="btn w-100 d-flex flex-column align-items-center justify-content-center p-1 p-sm-2"
                        style={buttonStyle}
                        onClick={item.onClick}
                        title={item.title}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = themeStyles.buttonHoverStyle?.backgroundColor || '#f0f0f0'
                          e.target.style.color = themeStyles.buttonHoverStyle?.color || '#0078d4'
                          e.target.style.transform = 'translateY(-2px)'
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = themeStyles.baseButtonStyle.backgroundColor
                          e.target.style.color = themeStyles.baseButtonStyle.color
                          e.target.style.transform = 'translateY(0)'
                        }}
                      >
                        <item.icon style={{ fontSize: 'clamp(20px, 5vw, 28px)' }} />
                        <small className="text-center mt-1" style={buttonTextStyle}>
                          {item.title}
                        </small>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CenterMenuBar 