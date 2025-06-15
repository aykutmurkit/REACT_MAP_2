import React, { useState, useEffect, useRef } from 'react'
import isbakLogo from '../assets/isbakmap.png'
import introSound from '../assets/intro-logo-sound.wav'

const MapIntroOverlay = ({ onIntroComplete }) => {
  const [animationStep, setAnimationStep] = useState(1)
  const [visible, setVisible] = useState(true)
  const audioRef = useRef(new Audio(introSound))

  // Animasyon adımlarını yönet
  useEffect(() => {
    if (!visible) return

    // Ses dosyasını çal
    audioRef.current.volume = 0.5 // Ses seviyesini %50'ye ayarla
    audioRef.current.play().catch(error => {
      console.log('Ses çalma hatası:', error)
    })

    // Adım 1: Beyaz ekran (başlangıç)
    // Adım 2: isbakmap.png göster (0.5 saniye sonra)
    // Adım 3: Beyaz ekran kaybolmaya başla (2 saniye sonra)
    // Adım 4: isbakmap.png kaybolmaya başla (5 saniye sonra)
    // Adım 5: Tamamen kaybol (7 saniye sonra)

    const timer1 = setTimeout(() => setAnimationStep(2), 500)
    const timer2 = setTimeout(() => setAnimationStep(3), 2000)
    const timer3 = setTimeout(() => setAnimationStep(4), 5000)
    const timer4 = setTimeout(() => {
      setAnimationStep(5)
      setVisible(false)
      if (onIntroComplete) onIntroComplete()
    }, 7000)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(timer4)
      // Ses dosyasını durdur ve temizle
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
  }, [visible, onIntroComplete])

  if (!visible) return null

  // Animasyon adımına göre stilleri belirle
  const getOverlayStyle = () => {
    const baseStyle = {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: '#ffffff',
      zIndex: 20000, // En üstte göster
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      transition: 'opacity 3s cubic-bezier(0.2, 0.8, 0.2, 1)'
    }

    // Adım 3'te beyaz arka plan kaybolmaya başlar
    if (animationStep >= 3) {
      baseStyle.opacity = 0
    }

    return baseStyle
  }

  const getLogoStyle = () => {
    const baseStyle = {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      maxWidth: '50%',
      maxHeight: '50%',
      opacity: 0,
      transition: 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      zIndex: 20001 // Beyaz arka planın üzerinde
    }

    // Adım 2'de logo görünür olur
    if (animationStep === 2) {
      baseStyle.opacity = 1
    }
    
    // Adım 3'te logo hala görünür
    if (animationStep === 3) {
      baseStyle.opacity = 1
    }
    
    // Adım 4'te logo kaybolmaya başlar
    if (animationStep >= 4) {
      baseStyle.opacity = 0
      baseStyle.transition = 'opacity 2s cubic-bezier(0.2, 0.8, 0.2, 1)' // Daha yumuşak ve yavaş kaybolma
    }

    return baseStyle
  }

  return (
    <>
      <div style={getOverlayStyle()} />
      <img 
        src={isbakLogo} 
        alt="ISBAK Map" 
        style={getLogoStyle()}
      />
    </>
  )
}

export default MapIntroOverlay 