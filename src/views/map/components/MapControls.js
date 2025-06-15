import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import {
  ZoomInButton,
  ZoomOutButton,
  DrawPolygonButton,
  DrawLineButton,
  DrawPointButton,
  DrawRectangleButton,
  DrawCircleButton,
  EditModeButton,
  SelectModeButton,
  MeasureDistanceButton,
  UndoButton,
  RedoButton,
  SaveButton,
  ExportButton,
  DeleteAllButton,
  ThemeToggleButton,
  FullscreenButton,
  DeviceInfoButton,
  MapStyleToggleButton,
  FpsButton,
  getControlPropsForDevice,
  controlsContainerStyle
} from '../imports'
import { ScreenshotButton } from 'map-import'

const MapControls = () => {
  const { controls } = useSelector((state) => state.map)
  const [activeDrawMode, setActiveDrawMode] = useState(null)
  const [canUndo, setCanUndo] = useState(false)
  const [canRedo, setCanRedo] = useState(false)

  // Undo/Redo durumunu güncelle
  useEffect(() => {
    const updateHistoryState = () => {
      if (window.mapControls) {
        setCanUndo(window.mapControls.getCanUndo())
        setCanRedo(window.mapControls.getCanRedo())
      }
    }

    updateHistoryState()
    const interval = setInterval(updateHistoryState, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleZoomIn = () => {
    console.log('Zoom In clicked')
    if (window.mapControls && window.mapControls.isMapLoaded && window.mapControls.isMapLoaded()) {
      window.mapControls.zoomIn()
    } else {
      console.warn('Map not loaded yet')
    }
  }

  const handleZoomOut = () => {
    console.log('Zoom Out clicked')
    if (window.mapControls && window.mapControls.isMapLoaded && window.mapControls.isMapLoaded()) {
      window.mapControls.zoomOut()
    } else {
      console.warn('Map not loaded yet')
    }
  }

  const handleDrawModeChange = (mode) => {
    console.log('Draw mode change:', mode)
    if (window.mapControls && window.mapControls.isMapLoaded && window.mapControls.isMapLoaded()) {
      window.mapControls.changeDrawMode(mode)
      setActiveDrawMode(mode)
    } else {
      console.warn('Map not loaded yet')
    }
  }

  const handleDeleteAll = () => {
    console.log('Delete All clicked')
    if (window.mapControls && window.mapControls.isMapLoaded && window.mapControls.isMapLoaded()) {
      window.mapControls.deleteAll()
      setActiveDrawMode(null)
    } else {
      console.warn('Map not loaded yet')
    }
  }

  const handleUndo = () => {
    console.log('Undo clicked')
    if (window.mapControls && canUndo) {
      window.mapControls.undo()
    }
  }

  const handleRedo = () => {
    console.log('Redo clicked')
    if (window.mapControls && canRedo) {
      window.mapControls.redo()
    }
  }

  const handleSave = () => {
    console.log('Save clicked')
    if (window.mapControls) {
      window.mapControls.saveDrawing()
    }
  }

  const handleExport = () => {
    console.log('Export clicked')
    if (window.mapControls) {
      window.mapControls.exportDrawing()
    }
  }

  const handleMeasureDistance = () => {
    console.log('Measure Distance clicked')
    if (window.mapControls && window.mapControls.isMapLoaded && window.mapControls.isMapLoaded()) {
      window.mapControls.measureDistance()
      setActiveDrawMode('measure_line')
    } else {
      console.warn('Map not loaded yet')
    }
  }

  const handleMeasureArea = () => {
    console.log('Measure Area clicked')
    if (window.mapControls && window.mapControls.isMapLoaded && window.mapControls.isMapLoaded()) {
      window.mapControls.measureArea()
      setActiveDrawMode('measure_polygon')
    } else {
      console.warn('Map not loaded yet')
    }
  }

  const getControlProps = (controlName) => {
    return getControlPropsForDevice(controls, controlName)
  }

  return React.createElement('div', {
    style: controlsContainerStyle
  }, [
    // Zoom Controls
    React.createElement(ZoomInButton, {
      key: 'zoom-in',
      size: getControlProps('zoomIn').size,
      position: getControlProps('zoomIn').position,
      onClick: handleZoomIn,
      isVisible: getControlProps('zoomIn').isVisible
    }),
    
    React.createElement(ZoomOutButton, {
      key: 'zoom-out',
      size: getControlProps('zoomOut').size,
      position: getControlProps('zoomOut').position,
      onClick: handleZoomOut,
      isVisible: getControlProps('zoomOut').isVisible
    }),
    
    // Drawing Mode Buttons
    React.createElement(DrawPolygonButton, {
      key: 'draw-polygon',
      size: getControlProps('drawPolygon').size,
      position: getControlProps('drawPolygon').position,
      onClick: handleDrawModeChange,
      isActive: activeDrawMode === 'draw_polygon',
      isVisible: getControlProps('drawPolygon').isVisible
    }),
    
    React.createElement(DrawLineButton, {
      key: 'draw-line',
      size: getControlProps('drawLine').size,
      position: getControlProps('drawLine').position,
      onClick: handleDrawModeChange,
      isActive: activeDrawMode === 'draw_line_string',
      isVisible: getControlProps('drawLine').isVisible
    }),
    
    React.createElement(DrawPointButton, {
      key: 'draw-point',
      size: getControlProps('drawPoint').size,
      position: getControlProps('drawPoint').position,
      onClick: handleDrawModeChange,
      isActive: activeDrawMode === 'draw_point',
      isVisible: getControlProps('drawPoint').isVisible
    }),
    
    React.createElement(DrawRectangleButton, {
      key: 'draw-rectangle',
      size: getControlProps('drawRectangle').size,
      position: getControlProps('drawRectangle').position,
      onClick: handleDrawModeChange,
      isActive: activeDrawMode === 'draw_rectangle',
      isVisible: getControlProps('drawRectangle').isVisible
    }),
    
    React.createElement(DrawCircleButton, {
      key: 'draw-circle',
      size: getControlProps('drawCircle').size,
      position: getControlProps('drawCircle').position,
      onClick: handleDrawModeChange,
      isActive: activeDrawMode === 'draw_circle',
      isVisible: getControlProps('drawCircle').isVisible
    }),
    
    React.createElement(EditModeButton, {
      key: 'edit-mode',
      size: getControlProps('editMode').size,
      position: getControlProps('editMode').position,
      onClick: handleDrawModeChange,
      isActive: activeDrawMode === 'direct_select',
      isVisible: getControlProps('editMode').isVisible
    }),
    
    React.createElement(SelectModeButton, {
      key: 'select-mode',
      size: getControlProps('selectMode').size,
      position: getControlProps('selectMode').position,
      onClick: handleDrawModeChange,
      isActive: activeDrawMode === 'simple_select',
      isVisible: getControlProps('selectMode').isVisible
    }),
    
    // Measurement Buttons
    React.createElement(MeasureDistanceButton, {
      key: 'measure-distance',
      size: getControlProps('measureDistance').size,
      position: getControlProps('measureDistance').position,
      onClick: handleMeasureDistance,
      isActive: activeDrawMode === 'measure_line',
      isVisible: getControlProps('measureDistance').isVisible
    }),
    

    
    // Action Buttons
    React.createElement(UndoButton, {
      key: 'undo',
      size: getControlProps('undo').size,
      position: getControlProps('undo').position,
      onClick: handleUndo,
      disabled: !canUndo,
      isVisible: getControlProps('undo').isVisible
    }),
    
    React.createElement(RedoButton, {
      key: 'redo',
      size: getControlProps('redo').size,
      position: getControlProps('redo').position,
      onClick: handleRedo,
      disabled: !canRedo,
      isVisible: getControlProps('redo').isVisible
    }),
    
    React.createElement(SaveButton, {
      key: 'save',
      size: getControlProps('save').size,
      position: getControlProps('save').position,
      onClick: handleSave,
      isVisible: getControlProps('save').isVisible
    }),
    
    React.createElement(ExportButton, {
      key: 'export',
      size: getControlProps('export').size,
      position: getControlProps('export').position,
      onClick: handleExport,
      isVisible: getControlProps('export').isVisible
    }),
    
    // Delete Button
    React.createElement(DeleteAllButton, {
      key: 'delete-all',
      size: getControlProps('trash').size,
      position: getControlProps('trash').position,
      onClick: handleDeleteAll,
      isVisible: getControlProps('trash').isVisible
    }),
    
    // Theme Toggle Button
    React.createElement(ThemeToggleButton, {
      key: 'theme-toggle',
      size: getControlProps('themeToggle').size,
      position: getControlProps('themeToggle').position,
      isVisible: getControlProps('themeToggle').isVisible
    }),
    
    // Map Style Toggle Button
    React.createElement(MapStyleToggleButton, {
      key: 'map-style-toggle',
      size: getControlProps('mapStyleToggle').size,
      position: getControlProps('mapStyleToggle').position,
      isVisible: getControlProps('mapStyleToggle').isVisible
    }),
    
    // FPS Button
    React.createElement(FpsButton, {
      key: 'fps',
      size: getControlProps('fps').size,
      position: getControlProps('fps').position,
      isVisible: getControlProps('fps').isVisible
    }),
    
    // Fullscreen Button
    React.createElement(FullscreenButton, {
      key: 'fullscreen',
      size: getControlProps('fullscreen').size,
      position: getControlProps('fullscreen').position,
      isVisible: getControlProps('fullscreen').isVisible
    }),
    
    // Device Info Button
    React.createElement(DeviceInfoButton, {
      key: 'device-info',
      size: getControlProps('deviceInfo').size,
      position: getControlProps('deviceInfo').position,
      isVisible: getControlProps('deviceInfo').isVisible
    }),

    // Screenshot Button
    React.createElement(ScreenshotButton, {
      key: 'screenshot',
      size: getControlProps('screenshot').size,
      position: getControlProps('screenshot').position,
      isVisible: getControlProps('screenshot').isVisible
    })
  ])
}

export default MapControls 