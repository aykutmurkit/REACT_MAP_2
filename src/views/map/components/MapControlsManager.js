import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setControlVisibility, setMultipleControlVisibility } from '../../../redux/slices/mapSlice'

const MapControlsManager = () => {
  const dispatch = useDispatch()
  const { controls, deviceType } = useSelector((state) => state.map)

  const toggleControlVisibility = (controlName) => {
    const currentVisibility = controls[deviceType][controlName]?.isVisible || false
    dispatch(setControlVisibility({
      deviceType,
      controlName,
      isVisible: !currentVisibility
    }))
  }

  const showAllControls = () => {
    const visibilityMap = {}
    Object.keys(controls[deviceType]).forEach(controlName => {
      visibilityMap[controlName] = true
    })
    dispatch(setMultipleControlVisibility({
      deviceType,
      visibilityMap
    }))
  }

  const hideAllDrawingControls = () => {
    const drawingControls = ['drawPolygon', 'drawLine', 'drawPoint', 'drawRectangle', 'drawCircle']
    const visibilityMap = {}
    drawingControls.forEach(controlName => {
      visibilityMap[controlName] = false
    })
    dispatch(setMultipleControlVisibility({
      deviceType,
      visibilityMap
    }))
  }

  const showOnlyBasicControls = () => {
    const basicControls = ['zoomIn', 'zoomOut', 'drawPolygon', 'trash']
    const visibilityMap = {}
    Object.keys(controls[deviceType]).forEach(controlName => {
      visibilityMap[controlName] = basicControls.includes(controlName)
    })
    dispatch(setMultipleControlVisibility({
      deviceType,
      visibilityMap
    }))
  }

  const controlNames = Object.keys(controls[deviceType] || {})

  return React.createElement('div', {
    style: {
      position: 'absolute',
      top: '20px',
      left: '20px',
      background: 'rgba(255, 255, 255, 0.9)',
      padding: '16px',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      zIndex: 1000,
      maxWidth: '300px'
    }
  }, [
    React.createElement('h3', {
      key: 'title',
      style: { margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600' }
    }, 'Harita Kontrol Yöneticisi'),

    React.createElement('div', {
      key: 'buttons',
      style: { marginBottom: '12px' }
    }, [
      React.createElement('button', {
        key: 'show-all',
        onClick: showAllControls,
        style: {
          margin: '2px',
          padding: '4px 8px',
          fontSize: '12px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          background: '#f5f5f5',
          cursor: 'pointer'
        }
      }, 'Tümünü Göster'),

      React.createElement('button', {
        key: 'hide-drawing',
        onClick: hideAllDrawingControls,
        style: {
          margin: '2px',
          padding: '4px 8px',
          fontSize: '12px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          background: '#f5f5f5',
          cursor: 'pointer'
        }
      }, 'Çizim Araçlarını Gizle'),

      React.createElement('button', {
        key: 'basic-only',
        onClick: showOnlyBasicControls,
        style: {
          margin: '2px',
          padding: '4px 8px',
          fontSize: '12px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          background: '#f5f5f5',
          cursor: 'pointer'
        }
      }, 'Sadece Temel Kontroller')
    ]),

    React.createElement('div', {
      key: 'controls-list',
      style: { fontSize: '12px' }
    }, controlNames.map(controlName => 
      React.createElement('div', {
        key: controlName,
        style: {
          display: 'flex',
          alignItems: 'center',
          marginBottom: '4px',
          padding: '2px 0'
        }
      }, [
        React.createElement('input', {
          key: 'checkbox',
          type: 'checkbox',
          checked: controls[deviceType][controlName]?.isVisible || false,
          onChange: () => toggleControlVisibility(controlName),
          style: { marginRight: '8px' }
        }),
        React.createElement('label', {
          key: 'label',
          style: { cursor: 'pointer', fontSize: '11px' },
          onClick: () => toggleControlVisibility(controlName)
        }, controlName)
      ])
    ))
  ])
}

export default MapControlsManager 