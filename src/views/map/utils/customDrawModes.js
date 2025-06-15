import MapLibreDraw from '@hyvilo/maplibre-gl-draw'

/**
 * Dikdörtgen çizim modu
 */
export const DrawRectangle = {
  ...MapLibreDraw.modes.draw_polygon,
  
  onSetup(opts) {
    const polygon = this.newFeature({
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Polygon',
        coordinates: [[]]
      }
    })
    
    this.addFeature(polygon)
    this.clearSelectedFeatures()
    this.updateUIClasses({ mouse: 'add' })
    this.activateUIButton('polygon')
    
    this.setActionableState({
      trash: true
    })
    
    return {
      polygon,
      currentVertexPosition: 0
    }
  },
  
  onMouseDown(state, e) {
    const currentVertexPosition = state.currentVertexPosition
    if (currentVertexPosition === 0) {
      // İlk köşe
      state.polygon.updateCoordinate(`0.${currentVertexPosition}`, e.lngLat.lng, e.lngLat.lat)
      state.currentVertexPosition++
    } else if (currentVertexPosition === 1) {
      // İkinci köşe - dikdörtgeni tamamla
      const coords = state.polygon.getCoordinates()[0]
      const startPoint = coords[0]
      const endPoint = [e.lngLat.lng, e.lngLat.lat]
      
      // Dikdörtgen koordinatlarını hesapla
      const rectangleCoords = [
        startPoint,
        [endPoint[0], startPoint[1]],
        endPoint,
        [startPoint[0], endPoint[1]],
        startPoint // Kapalı polygon için
      ]
      
      state.polygon.setCoordinates([rectangleCoords])
      
      this.fireCreate([state.polygon])
      this.changeMode('simple_select', { featureIds: [state.polygon.id] })
    }
  },
  
  onMouseMove(state, e) {
    if (state.currentVertexPosition === 1) {
      const coords = state.polygon.getCoordinates()[0]
      const startPoint = coords[0]
      const currentPoint = [e.lngLat.lng, e.lngLat.lat]
      
      // Dikdörtgen koordinatlarını güncelle
      const rectangleCoords = [
        startPoint,
        [currentPoint[0], startPoint[1]],
        currentPoint,
        [startPoint[0], currentPoint[1]],
        startPoint
      ]
      
      state.polygon.setCoordinates([rectangleCoords])
    }
  },
  
  onKeyUp(state, e) {
    if (e.keyCode === 27) { // ESC
      this.deleteFeature([state.polygon.id], { silent: true })
      this.changeMode('simple_select')
    }
  }
}

/**
 * Daire çizim modu
 */
export const DrawCircle = {
  ...MapLibreDraw.modes.draw_polygon,
  
  onSetup(opts) {
    const polygon = this.newFeature({
      type: 'Feature',
      properties: {
        isCircle: true,
        center: null,
        radius: 0
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[]]
      }
    })
    
    this.addFeature(polygon)
    this.clearSelectedFeatures()
    this.updateUIClasses({ mouse: 'add' })
    this.activateUIButton('polygon')
    
    this.setActionableState({
      trash: true
    })
    
    return {
      polygon,
      currentVertexPosition: 0
    }
  },
  
  onMouseDown(state, e) {
    const currentVertexPosition = state.currentVertexPosition
    if (currentVertexPosition === 0) {
      // Merkez noktası
      state.polygon.properties.center = [e.lngLat.lng, e.lngLat.lat]
      state.currentVertexPosition++
    } else if (currentVertexPosition === 1) {
      // Yarıçapı belirle ve daireyi tamamla
      this.fireCreate([state.polygon])
      this.changeMode('simple_select', { featureIds: [state.polygon.id] })
    }
  },
  
  onMouseMove(state, e) {
    if (state.currentVertexPosition === 1 && state.polygon.properties.center) {
      const center = state.polygon.properties.center
      const currentPoint = [e.lngLat.lng, e.lngLat.lat]
      
      // Yarıçapı hesapla (basit Euclidean mesafe)
      const radius = Math.sqrt(
        Math.pow(currentPoint[0] - center[0], 2) + 
        Math.pow(currentPoint[1] - center[1], 2)
      )
      
      state.polygon.properties.radius = radius
      
      // Daire koordinatlarını oluştur
      const circleCoords = this.createCircleCoordinates(center, radius)
      state.polygon.setCoordinates([circleCoords])
    }
  },
  
  onKeyUp(state, e) {
    if (e.keyCode === 27) { // ESC
      this.deleteFeature([state.polygon.id], { silent: true })
      this.changeMode('simple_select')
    }
  },
  
  createCircleCoordinates(center, radius, steps = 64) {
    const coords = []
    for (let i = 0; i <= steps; i++) {
      const angle = (i / steps) * 2 * Math.PI
      const x = center[0] + radius * Math.cos(angle)
      const y = center[1] + radius * Math.sin(angle)
      coords.push([x, y])
    }
    return coords
  }
}

/**
 * Ölçüm çizgisi modu
 */
export const MeasureLine = {
  ...MapLibreDraw.modes.draw_line_string,
  
  onSetup(opts) {
    const line = this.newFeature({
      type: 'Feature',
      properties: {
        isMeasurement: true,
        measurementType: 'distance'
      },
      geometry: {
        type: 'LineString',
        coordinates: []
      }
    })
    
    this.addFeature(line)
    this.clearSelectedFeatures()
    this.updateUIClasses({ mouse: 'add' })
    this.activateUIButton('line')
    
    this.setActionableState({
      trash: true
    })
    
    return {
      line,
      currentVertexPosition: 0
    }
  },
  
  onClick(state, e) {
    const coords = state.line.getCoordinates()
    coords.push([e.lngLat.lng, e.lngLat.lat])
    state.line.setCoordinates(coords)
    state.currentVertexPosition++
    
    if (state.currentVertexPosition > 1) {
      this.updateUIClasses({ mouse: 'pointer' })
    }
  },
  
  onMouseMove(state, e) {
    const coords = state.line.getCoordinates()
    if (coords.length > 0) {
      const newCoords = [...coords, [e.lngLat.lng, e.lngLat.lat]]
      state.line.setCoordinates(newCoords)
    }
  },
  
  onKeyUp(state, e) {
    if (e.keyCode === 27) { // ESC
      this.deleteFeature([state.line.id], { silent: true })
      this.changeMode('simple_select')
    } else if (e.keyCode === 13) { // Enter
      this.fireCreate([state.line])
      this.changeMode('simple_select', { featureIds: [state.line.id] })
    }
  }
}

/**
 * Ölçüm alanı modu
 */
export const MeasurePolygon = {
  ...MapLibreDraw.modes.draw_polygon,
  
  onSetup(opts) {
    const polygon = this.newFeature({
      type: 'Feature',
      properties: {
        isMeasurement: true,
        measurementType: 'area'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[]]
      }
    })
    
    this.addFeature(polygon)
    this.clearSelectedFeatures()
    this.updateUIClasses({ mouse: 'add' })
    this.activateUIButton('polygon')
    
    this.setActionableState({
      trash: true
    })
    
    return {
      polygon,
      currentVertexPosition: 0
    }
  },
  
  onClick(state, e) {
    const coords = state.polygon.getCoordinates()[0]
    coords.push([e.lngLat.lng, e.lngLat.lat])
    state.polygon.setCoordinates([coords])
    state.currentVertexPosition++
    
    if (state.currentVertexPosition > 2) {
      this.updateUIClasses({ mouse: 'pointer' })
    }
  },
  
  onMouseMove(state, e) {
    const coords = state.polygon.getCoordinates()[0]
    if (coords.length > 0) {
      const newCoords = [...coords, [e.lngLat.lng, e.lngLat.lat]]
      state.polygon.setCoordinates([newCoords])
    }
  },
  
  onKeyUp(state, e) {
    if (e.keyCode === 27) { // ESC
      this.deleteFeature([state.polygon.id], { silent: true })
      this.changeMode('simple_select')
    } else if (e.keyCode === 13 && state.currentVertexPosition > 2) { // Enter
      // Polygon'u kapat
      const coords = state.polygon.getCoordinates()[0]
      coords.push(coords[0]) // İlk noktayı ekleyerek kapat
      state.polygon.setCoordinates([coords])
      
      this.fireCreate([state.polygon])
      this.changeMode('simple_select', { featureIds: [state.polygon.id] })
    }
  }
} 