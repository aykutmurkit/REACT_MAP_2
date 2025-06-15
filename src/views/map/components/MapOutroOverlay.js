import React, { useState, useEffect } from 'react'
import isbakLogoWhite from '../assets/isbak-logo-white.png'

const MapOutroOverlay = ({ visible, onOutroComplete }) => {
  const [opacity, setOpacity] = useState(0)

  useEffect(() => {
    if (!visible) {
      setOpacity(0)
      return
    }

    // Ekranı yavaşça karart
    setOpacity(1)

    // Animasyon tamamlandıktan sonra callback'i çağır
    const timer = setTimeout(() => {
      if (onOutroComplete) onOutroComplete()
    }, 1000) // 1 saniye sonra tamamlanacak

    return () => {
      clearTimeout(timer)
    }
  }, [visible, onOutroComplete])

  if (!visible) return null

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#000000',
        opacity: opacity,
        zIndex: 20000,
        transition: 'opacity 1s cubic-bezier(0.2, 0.8, 0.2, 1)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }} 
    >
      <img 
        src={isbakLogoWhite} 
        alt="ISBAK" 
        style={{
          maxWidth: '50%',
          maxHeight: '50%',
          opacity: opacity,
          transition: 'opacity 1s cubic-bezier(0.2, 0.8, 0.2, 1)'
        }}
      />
    </div>
  )
}

export default MapOutroOverlay 