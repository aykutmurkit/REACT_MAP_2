import React from 'react'
import { useSelector } from 'react-redux'
import { getThemeStyles } from 'map-import'
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

const BUTTON_GAP = 12
const BUTTONS_PER_ROW = 4

const CenterMenuBar = ({ isVisible, onClose, width }) => {
  const { mapTheme } = useSelector((state) => state.map)
  const themeStyles = getThemeStyles(mapTheme)

  if (!isVisible) return null

  // Menü bar stili
  const menuBarStyle = {
    position: 'absolute',
    bottom: '96px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: width,
    backgroundColor: themeStyles.baseButtonStyle.backgroundColor,
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.15)',
    zIndex: 1000,
    border: `1px solid ${themeStyles.baseButtonStyle.border.split(' ')[2]}`,
    padding: '12px',
    display: 'flex',
    flexDirection: 'column',
    gap: `${BUTTON_GAP}px`
  }

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: `1px solid ${themeStyles.baseButtonStyle.border.split(' ')[2]}`,
    paddingBottom: '8px',
    marginBottom: '8px'
  }

  const titleStyle = {
    margin: 0,
    fontSize: '16px',
    fontWeight: 'bold',
    color: themeStyles.baseButtonStyle.color
  }

  const closeButtonStyle = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: themeStyles.baseButtonStyle.color,
    padding: '4px',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }

  const buttonGridStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${BUTTONS_PER_ROW}, 1fr)`,
    gap: `${BUTTON_GAP}px`,
    padding: '4px'
  }

  const buttonStyle = {
    width: '100%',
    aspectRatio: '1',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s',
    backgroundColor: themeStyles.baseButtonStyle.backgroundColor,
    color: themeStyles.baseButtonStyle.color,
    border: themeStyles.baseButtonStyle.border,
    padding: '8px',
    gap: '4px'
  }

  const buttonTextStyle = {
    fontSize: '12px',
    textAlign: 'center',
    margin: 0,
    lineHeight: 1.2,
    color: themeStyles.baseButtonStyle.color
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
    <div style={menuBarStyle}>
      <div style={headerStyle}>
        <h3 style={titleStyle}>Menü</h3>
        <button style={closeButtonStyle} onClick={onClose} title="Kapat">
          <MdClose size={20} />
        </button>
      </div>
      <div style={buttonGridStyle}>
        {menuItems.map((item, index) => (
          <button 
            key={index} 
            style={buttonStyle}
            onClick={item.onClick}
            title={item.title}
          >
            <item.icon size={32} />
            <span style={buttonTextStyle}>{item.title}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default CenterMenuBar 