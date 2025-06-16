import React from 'react'
import { useSelector } from 'react-redux'
import { getCurrentTheme } from '../utils/themeUtils'
import ibbLogoBlack from '../assets/ibb_logo_black_50.png'
import ibbLogoWhite from '../assets/ibb_logo_white_50.png'

const MapLogoOverlay = () => {
  const { mapTheme } = useSelector((state) => state.map)

  // Theme'e göre logo seçimi
  const currentTheme = getCurrentTheme(mapTheme)
  const logoSrc = currentTheme === 'dark' ? ibbLogoBlack : ibbLogoWhite

  const containerStyle = {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: '20%', // Haritanın yatayda %20'sini kaplasın
    maxWidth: '200px',
    minWidth: '120px',
    zIndex: 500, // MapContainer (400) üzerinde, MapControls (1000) altında
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }

  const logoStyle = {
    width: '100%',
    height: 'auto',
    display: 'block',
    transition: 'opacity 0.3s ease', // Smooth theme transition
  }

  return (
    <div style={containerStyle}>
      <img src={logoSrc} alt="İBB Logo" style={logoStyle} />
    </div>
  )
}

export default MapLogoOverlay 