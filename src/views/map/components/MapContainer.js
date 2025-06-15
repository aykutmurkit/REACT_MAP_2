import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import maplibregl from 'maplibre-gl'
import MapLibreDraw from '@hyvilo/maplibre-gl-draw'
import { setMapCenter, setMapZoom, setMapModeText, setRealFullscreen } from '../../../redux/slices/mapSlice'
import { getDeviceTypeText, DrawHistory, calculateLineDistance, calculatePolygonArea, formatDistance, formatArea, exportGeoJSON, saveToLocalStorage, loadFromLocalStorage } from '../utils/mapUtils'
import { DrawRectangle, DrawCircle, MeasureLine, MeasurePolygon } from '../utils/customDrawModes'
import MeasurementDisplay from './MeasurementDisplay'
import { mapDivStyle, mapInfoTextStyle } from '../styles/mapStyles'

const MapContainer = () => {
  const dispatch = useDispatch()
  const { mapCenter, mapZoom, mapModeText, mapTheme } = useSelector(state => state.map)
  const mapContainer = useRef(null)
  const map = useRef(null)
  const draw = useRef(null)
  const drawHistory = useRef(new DrawHistory())
  const [isMapLoaded, setIsMapLoaded] = useState(false)
  const [measurements, setMeasurements] = useState([])
  const [showMeasurements, setShowMeasurements] = useState(false)
  const [canUndo, setCanUndo] = useState(false)
  const [canRedo, setCanRedo] = useState(false)

  useEffect(() => {
    if (map.current) return // Harita zaten başlatılmışsa çık

    // MapLibre GL haritasını başlat - SABİT STİL (theme değişmez)
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://demotiles.maplibre.org/style.json', // Sabit açık tema
      center: mapCenter,
      zoom: mapZoom,
      antialias: true,
      attributionControl: false // Attribution kontrolünü kaldır
    })

    // MapLibre GL Draw'ı başlat
    draw.current = new MapLibreDraw({
      displayControlsDefault: false,
      controls: {
        polygon: false,
        trash: false,
        line_string: false,
        point: false
      },
      modes: {
        ...MapLibreDraw.modes,
        draw_rectangle: DrawRectangle,
        draw_circle: DrawCircle,
        measure_line: MeasureLine,
        measure_polygon: MeasurePolygon
      }
    })

    // Draw'ı haritaya ekle
    map.current.addControl(draw.current)

    // Harita yüklendiğinde
    map.current.on('load', () => {
      setIsMapLoaded(true)
      console.log('MapLibre GL haritası yüklendi')
      
      // Kaydedilmiş verileri yükle
      const savedData = loadFromLocalStorage()
      if (savedData && savedData.features) {
        draw.current.set(savedData)
        drawHistory.current.push(savedData)
        updateHistoryState()
      }
    })

    // Harita hareket ettiğinde merkez koordinatları güncelle
    map.current.on('moveend', () => {
      const center = map.current.getCenter()
      dispatch(setMapCenter([center.lng, center.lat]))
    })

    // Zoom değiştiğinde güncelle
    map.current.on('zoomend', () => {
      const zoom = map.current.getZoom()
      dispatch(setMapZoom(zoom))
    })

    // Çizim olaylarını dinle
    map.current.on('draw.create', (e) => {
      console.log('Yeni özellik çizildi:', e.features)
      handleDrawChange()
      processMeasurements(e.features)
    })

    map.current.on('draw.update', (e) => {
      console.log('Özellik güncellendi:', e.features)
      handleDrawChange()
      processMeasurements(e.features)
    })

    map.current.on('draw.delete', (e) => {
      console.log('Özellik silindi:', e.features)
      handleDrawChange()
      removeMeasurements(e.features)
    })

    // Cleanup function
    return () => {
      if (map.current) {
        map.current.remove()
        map.current = null
      }
    }
  }, [])

  // Çizim değişikliklerini işle
  const handleDrawChange = () => {
    if (draw.current) {
      const data = draw.current.getAll()
      drawHistory.current.push(data)
      updateHistoryState()
      saveToLocalStorage(data)
    }
  }

  // Geçmiş durumunu güncelle
  const updateHistoryState = () => {
    setCanUndo(drawHistory.current.canUndo())
    setCanRedo(drawHistory.current.canRedo())
  }

  // Ölçümleri işle
  const processMeasurements = (features) => {
    const newMeasurements = []
    
    features.forEach(feature => {
      if (feature.properties?.isMeasurement) {
        if (feature.properties.measurementType === 'distance' && feature.geometry.type === 'LineString') {
          const distance = calculateLineDistance(feature.geometry.coordinates)
          newMeasurements.push({
            id: feature.id,
            type: 'distance',
            value: formatDistance(distance)
          })
        } else if (feature.properties.measurementType === 'area' && feature.geometry.type === 'Polygon') {
          const area = calculatePolygonArea(feature.geometry.coordinates[0])
          newMeasurements.push({
            id: feature.id,
            type: 'area',
            value: formatArea(area)
          })
        }
      }
    })

    if (newMeasurements.length > 0) {
      setMeasurements(prev => [...prev.filter(m => !newMeasurements.find(nm => nm.id === m.id)), ...newMeasurements])
      setShowMeasurements(true)
    }
  }

  // Ölçümleri kaldır
  const removeMeasurements = (features) => {
    const featureIds = features.map(f => f.id)
    setMeasurements(prev => prev.filter(m => !featureIds.includes(m.id)))
  }

  // Theme değişikliklerini dinle - SADECE BUTONLAR İÇİN
  // Harita stili değişmez, sadece buton theme'leri değişir

  // Ekran boyutu değişikliklerini dinle
  useEffect(() => {
    const handleResize = () => {
      const deviceText = getDeviceTypeText()
      dispatch(setMapModeText(deviceText))
      
      // Harita boyutunu güncelle
      if (map.current) {
        map.current.resize()
      }
    }

    // İlk yüklemede cihaz tipini ayarla
    handleResize()

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [dispatch])

  // Harici kontrol fonksiyonları
  const zoomIn = () => {
    if (map.current) {
      map.current.zoomIn()
    }
  }

  const zoomOut = () => {
    if (map.current) {
      map.current.zoomOut()
    }
  }

  const changeDrawMode = (mode) => {
    if (draw.current) {
      draw.current.changeMode(mode)
    }
  }

  const deleteAll = () => {
    if (draw.current) {
      draw.current.deleteAll()
      setMeasurements([])
      handleDrawChange()
    }
  }

  const undo = () => {
    if (drawHistory.current.canUndo()) {
      const previousState = drawHistory.current.undo()
      if (previousState && draw.current) {
        draw.current.set(previousState)
        updateHistoryState()
        saveToLocalStorage(previousState)
      }
    }
  }

  const redo = () => {
    if (drawHistory.current.canRedo()) {
      const nextState = drawHistory.current.redo()
      if (nextState && draw.current) {
        draw.current.set(nextState)
        updateHistoryState()
        saveToLocalStorage(nextState)
      }
    }
  }

  const saveDrawing = () => {
    if (draw.current) {
      const data = draw.current.getAll()
      saveToLocalStorage(data, `mapDrawData_${Date.now()}`)
      alert('Çizim kaydedildi!')
    }
  }

  const exportDrawing = () => {
    if (draw.current) {
      const data = draw.current.getAll()
      exportGeoJSON(data, `harita-cizimi-${new Date().toISOString().split('T')[0]}.geojson`)
    }
  }

  const measureDistance = () => {
    if (draw.current) {
      draw.current.changeMode('measure_line')
    }
  }

  const measureArea = () => {
    if (draw.current) {
      draw.current.changeMode('measure_polygon')
    }
  }

  // Kontrol fonksiyonlarını global olarak erişilebilir yap
  useEffect(() => {
    console.log('Setting up window.mapControls, isMapLoaded:', isMapLoaded)
    
    // Fonksiyonları her zaman kullanılabilir yap
      window.mapControls = {
        zoomIn,
        zoomOut,
        changeDrawMode,
        deleteAll,
      undo,
      redo,
      saveDrawing,
      exportDrawing,
      measureDistance,
      measureArea,
        getMap: () => map.current,
      getDraw: () => draw.current,
      getCanUndo: () => canUndo,
      getCanRedo: () => canRedo,
      isMapLoaded: () => isMapLoaded
    }
    
    console.log('window.mapControls set:', window.mapControls)
  }, [isMapLoaded, canUndo, canRedo])

  return React.createElement('div', {
    ref: mapContainer,
    style: {
      width: '100%',
      height: '100%',
      position: 'relative'
    }
  }, [
    // Harita div'i
    React.createElement('div', {
      key: 'map-div',
      ref: mapContainer,
      style: mapDivStyle
    }),
    // Ölçüm gösterimi
    showMeasurements && React.createElement(MeasurementDisplay, {
      key: 'measurements',
      measurements: measurements,
      onClose: () => setShowMeasurements(false),
      onClearMeasurement: () => {
        setMeasurements([])
        setShowMeasurements(false)
      }
    })
  ])
}

export default MapContainer 