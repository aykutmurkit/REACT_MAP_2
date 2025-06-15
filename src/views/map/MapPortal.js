import React, { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toggleMapFullscreen, setRealFullscreen } from '../../redux/slices/mapSlice'
import { MapContainer, MapControls, MapSidebar, CenterMenu } from './imports'
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

  const handleClose = async () => {
    try {
      if (isCurrentlyFullscreen()) {
        await exitFullscreen()
      }
    } catch (error) {
      console.warn('Fullscreen çıkış hatası:', error)
    }
    dispatch(toggleMapFullscreen())
  }

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
      
      // Eğer fullscreen dışına çıkıldıysa harita modunu da kapat
      if (!isFullscreen && isMapFullscreen) {
        dispatch(toggleMapFullscreen())
      }
    })

    return cleanup
  }, [dispatch, isMapFullscreen])

  if (!isMapFullscreen) {
    return null
  }

  const portalContent = React.createElement('div', {
    ref: fullscreenContainerRef,
    style: portalOverlayStyle,
    onClick: handleOverlayClick
  }, [
    // Harita kapsayıcısı
    React.createElement('div', {
      key: 'map-container',
      style: mapContainerStyle,
      onClick: (e) => e.stopPropagation() // Harita alanına tıklandığında overlay click'ini engelle
    }, [
      // Harita bileşeni
      React.createElement(MapSidebar, { key: 'map-sidebar' }),
      React.createElement(MapContainer, { key: 'map' }),
      
      // Harita kontrolleri
      React.createElement(MapControls, { key: 'controls' }),
      React.createElement(CenterMenu, { key: 'center-menu' })
    ])
  ])

  return ReactDOM.createPortal(portalContent, document.body)
}

export default MapPortal 