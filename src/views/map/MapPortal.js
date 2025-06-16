import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toggleMapFullscreen, setRealFullscreen } from '../../redux/slices/mapSlice'
import { 
  MapContainer, 
  MapControls, 
  CenterMenu, 
  MapLogoOverlay, 
  MapIntroOverlay,
  MapOutroOverlay,
  MapManagement 
} from './imports'
import { portalOverlayStyle, mapContainerStyle } from './styles/mapStyles'
import { 
  isFullscreenSupported, 
  enterFullscreen, 
  exitFullscreen, 
  isCurrentlyFullscreen, 
  addFullscreenChangeListener 
} from './utils/mapUtils'

const MapPortal = () => {
  const dispatch = useDispatch()
  const { isMapFullscreen, isRealFullscreen } = useSelector(state => state.map)
  const fullscreenContainerRef = useRef(null)
  const [showIntro, setShowIntro] = useState(true)
  const [showOutro, setShowOutro] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isIntroVisible, setIsIntroVisible] = useState(true)

  const handleClose = async () => {
    try {
      // Outro animasyonunu başlat
      setShowOutro(true)
      
      // Animasyon tamamlandıktan sonra fullscreen'den çık ve harita modunu kapat
      setTimeout(async () => {
        if (isCurrentlyFullscreen()) {
          await exitFullscreen()
        }
        dispatch(toggleMapFullscreen())
      }, 1000)
    } catch (error) {
      console.warn('Fullscreen çıkış hatası:', error)
      dispatch(toggleMapFullscreen())
    }
  }

  // handleClose fonksiyonunu global olarak erişilebilir yap
  useEffect(() => {
    window.mapPortal = {
      handleClose
    }
    return () => {
      delete window.mapPortal
    }
  }, [])

  const handleOverlayClick = (e) => {
    // Sadece overlay'e tıklandığında kapat, harita alanına tıklandığında kapatma
    if (e.target === e.currentTarget) {
      handleClose()
    }
  }

  const handleKeyDown = (e) => {
    // ESC tuşu ile kapatma
    if (e.key === 'Escape') {
      handleClose()
    }
  }

  const handleIntroComplete = () => {
    setShowIntro(false)
  }

  const handleOutroComplete = () => {
    setShowOutro(false)
  }

  useEffect(() => {
    if (isMapFullscreen) {
      document.addEventListener('keydown', handleKeyDown)
      // Body scroll'unu engelle
      document.body.style.overflow = 'hidden'
      
      // Fullscreen API'sini dene
      if (isFullscreenSupported() && fullscreenContainerRef.current) {
        enterFullscreen(fullscreenContainerRef.current)
          .then(() => {
            dispatch(setRealFullscreen(true))
          })
          .catch((error) => {
            console.warn('Fullscreen başlatma hatası:', error)
          })
      }
    } else {
      document.removeEventListener('keydown', handleKeyDown)
      // Body scroll'unu geri aç
      document.body.style.overflow = 'auto'
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'auto'
    }
  }, [isMapFullscreen, dispatch])

  // Fullscreen değişikliklerini dinle
  useEffect(() => {
    const cleanup = addFullscreenChangeListener(() => {
      const isFullscreen = isCurrentlyFullscreen()
      dispatch(setRealFullscreen(isFullscreen))
      
      // Eğer fullscreen dışına çıkıldıysa (F11 veya ESC ile)
      if (!isFullscreen && isMapFullscreen) {
        handleClose()
      }
    })

    return cleanup
  }, [dispatch, isMapFullscreen])

  // MapPortal açıldığında intro'yu sıfırla
  useEffect(() => {
    if (isMapFullscreen) {
      setShowIntro(true)
      setShowOutro(false)
    }
  }, [isMapFullscreen])

  if (!isMapFullscreen) {
    return null
  }

  const portalContent = React.createElement('div', {
    ref: fullscreenContainerRef,
    style: portalOverlayStyle,
    onClick: handleOverlayClick
  }, [
    // Intro overlay
    showIntro && React.createElement(MapIntroOverlay, {
      key: 'intro-overlay',
      onIntroComplete: handleIntroComplete
    }),
    
    // Outro overlay
    showOutro && React.createElement(MapOutroOverlay, {
      key: 'outro-overlay',
      visible: showOutro,
      onOutroComplete: handleOutroComplete
    }),
    
    // Harita kapsayıcısı
    React.createElement('div', {
      key: 'map-container',
      style: mapContainerStyle,
      onClick: (e) => e.stopPropagation() // Harita alanına tıklandığında overlay click'ini engelle
    }, [
      // Harita bileşeni
      React.createElement(MapContainer, { key: 'map' }),
      
      // Harita kontrolleri
      React.createElement(MapControls, { key: 'controls' }),
      React.createElement(CenterMenu, { key: 'center-menu' }),
      React.createElement(MapLogoOverlay, { key: 'map-logo-overlay' }),
      
      // Map Management Panel (overlay)
      React.createElement(MapManagement, { key: 'map-management' })
    ])
  ])

  return ReactDOM.createPortal(portalContent, document.body)
}

export default MapPortal 