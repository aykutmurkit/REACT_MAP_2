import React from 'react'
import { useSelector } from 'react-redux'
import ibbLogo from '../assets/ibb.png'

const MapLogoOverlay = () => {
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
    alignItems: 'center'
  }

  const logoStyle = {
    width: '100%',
    height: 'auto',
    display: 'block'
  }

  return (
    <div style={containerStyle}>
      <img 
        src={ibbLogo} 
        alt="İBB Logo" 
        style={logoStyle}
      />
    </div>
  )
}

export default MapLogoOverlay 