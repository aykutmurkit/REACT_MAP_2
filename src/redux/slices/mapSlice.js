import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isMapFullscreen: false,
  isRealFullscreen: false,
  mapCenter: [35.0, 39.0], // Türkiye merkez koordinatları
  mapZoom: 6, // Türkiye genelini gösterecek zoom
  deviceType: 'desktop', // 'mobile', 'tablet', 'desktop'
  mapModeText: 'Desktop Mode', // Cihaz tipi metni
  mapTheme: 'light', // 'light', 'dark', 'auto'
  mapStyle: 'openstreet', // 'openstreet', 'cartoLight', 'cartoDark'
  controls: {
    mobile: {
      zoomIn: {
        size: { width: 30, height: 30 },
        position: { top: '15px', right: '15px' },
        isVisible: true
      },
      zoomOut: {
        size: { width: 30, height: 30 },
        position: { top: '45px', right: '10px' },
        isVisible: true
      },
      drawPolygon: {
        size: { width: 30, height: 30 },
        position: { top: '85px', right: '10px' },
        isVisible: true
      },
      drawLine: {
        size: { width: 30, height: 30 },
        position: { top: '120px', right: '10px' },
        isVisible: true
      },
      drawPoint: {
        size: { width: 30, height: 30 },
        position: { top: '155px', right: '10px' },
        isVisible: true
      },
      drawRectangle: {
        size: { width: 30, height: 30 },
        position: { top: '190px', right: '10px' },
        isVisible: true
      },
      drawCircle: {
        size: { width: 30, height: 30 },
        position: { top: '225px', right: '10px' },
        isVisible: true
      },
      editMode: {
        size: { width: 30, height: 30 },
        position: { top: '260px', right: '10px' },
        isVisible: true
      },
      selectMode: {
        size: { width: 30, height: 30 },
        position: { top: '295px', right: '10px' },
        isVisible: true
      },
      measureDistance: {
        size: { width: 30, height: 30 },
        position: { top: '10px', right: '45px' },
        isVisible: true
      },
      measureArea: {
        size: { width: 30, height: 30 },
        position: { top: '45px', right: '45px' },
        isVisible: false
      },
      undo: {
        size: { width: 30, height: 30 },
        position: { top: '85px', right: '45px' },
        isVisible: true
      },
      redo: {
        size: { width: 30, height: 30 },
        position: { top: '120px', right: '45px' },
        isVisible: true
      },
      save: {
        size: { width: 30, height: 30 },
        position: { top: '155px', right: '45px' },
        isVisible: true
      },
      export: {
        size: { width: 30, height: 30 },
        position: { top: '190px', right: '45px' },
        isVisible: true
      },
      trash: {
        size: { width: 30, height: 30 },
        position: { top: '330px', right: '10px' },
        isVisible: true
      },
      themeToggle: {
        size: { width: 30, height: 30 },
        position: { top: '225px', right: '45px' },
        isVisible: true
      },
      fullscreen: {
        size: { width: 30, height: 30 },
        position: { top: '10px', right: '80px' },
        isVisible: true
      },
      deviceInfo: {
        size: { width: 30, height: 30 },
        position: { top: '260px', right: '45px' },
        isVisible: true
      },
      mapStyleToggle: {
        size: { width: 30, height: 30 },
        position: { top: '297px', right: '47px' },
        isVisible: true
      },
      fps: {
        size: { width: 65, height: 30 },
        position: { top: '367px', right: '12px' },
        isVisible: true
      },
      screenshot: {
        size: { width: 30, height: 30 },
        position: { top: '407px', right: '12px' },
        isVisible: true
      }
    },
    tablet: {
      zoomIn: {
        size: { width: 30, height: 30 },
        position: { top: '15px', right: '15px' },
        isVisible: true
      },
      zoomOut: {
        size: { width: 30, height: 30 },
        position: { top: '47px', right: '12px' },
        isVisible: true
      },
      drawPolygon: {
        size: { width: 30, height: 30 },
        position: { top: '87px', right: '12px' },
        isVisible: true
      },
      drawLine: {
        size: { width: 30, height: 30 },
        position: { top: '122px', right: '12px' },
        isVisible: true
      },
      drawPoint: {
        size: { width: 30, height: 30 },
        position: { top: '157px', right: '12px' },
        isVisible: true
      },
      drawRectangle: {
        size: { width: 30, height: 30 },
        position: { top: '192px', right: '12px' },
        isVisible: true
      },
      drawCircle: {
        size: { width: 30, height: 30 },
        position: { top: '227px', right: '12px' },
        isVisible: true
      },
      editMode: {
        size: { width: 30, height: 30 },
        position: { top: '262px', right: '12px' },
        isVisible: true
      },
      selectMode: {
        size: { width: 30, height: 30 },
        position: { top: '297px', right: '12px' },
        isVisible: true
      },
      measureDistance: {
        size: { width: 30, height: 30 },
        position: { top: '12px', right: '47px' },
        isVisible: true
      },
      measureArea: {
        size: { width: 30, height: 30 },
        position: { top: '47px', right: '47px' },
        isVisible: false
      },
      undo: {
        size: { width: 30, height: 30 },
        position: { top: '87px', right: '47px' },
        isVisible: true
      },
      redo: {
        size: { width: 30, height: 30 },
        position: { top: '122px', right: '47px' },
        isVisible: true
      },
      save: {
        size: { width: 30, height: 30 },
        position: { top: '157px', right: '47px' },
        isVisible: true
      },
      export: {
        size: { width: 30, height: 30 },
        position: { top: '192px', right: '47px' },
        isVisible: true
      },
      trash: {
        size: { width: 30, height: 30 },
        position: { top: '332px', right: '12px' },
        isVisible: true
      },
      themeToggle: {
        size: { width: 30, height: 30 },
        position: { top: '227px', right: '47px' },
        isVisible: true
      },
      fullscreen: {
        size: { width: 30, height: 30 },
        position: { top: '12px', right: '82px' },
        isVisible: true
      },
      deviceInfo: {
        size: { width: 30, height: 30 },
        position: { top: '262px', right: '47px' },
        isVisible: true
      },
      mapStyleToggle: {
        size: { width: 30, height: 30 },
        position: { top: '297px', right: '47px' },
        isVisible: true
      },
      fps: {
        size: { width: 65, height: 30 },
        position: { top: '367px', right: '12px' },
        isVisible: true
      },
      screenshot: {
        size: { width: 30, height: 30 },
        position: { top: '407px', right: '12px' },
        isVisible: true
      }
    },
    desktop: {
      zoomIn: {
        size: { width: 30, height: 30 },
        position: { top: '15px', right: '15px' },
        isVisible: true
      },
      zoomOut: {
        size: { width: 30, height: 30 },
        position: { top: '50px', right: '15px' },
        isVisible: true
      },
      drawPolygon: {
        size: { width: 30, height: 30 },
        position: { top: '90px', right: '15px' },
        isVisible: true
      },
      drawLine: {
        size: { width: 30, height: 30 },
        position: { top: '125px', right: '15px' },
        isVisible: true
      },
      drawPoint: {
        size: { width: 30, height: 30 },
        position: { top: '160px', right: '15px' },
        isVisible: true
      },
      drawRectangle: {
        size: { width: 30, height: 30 },
        position: { top: '195px', right: '15px' },
        isVisible: true
      },
      drawCircle: {
        size: { width: 30, height: 30 },
        position: { top: '230px', right: '15px' },
        isVisible: true
      },
      editMode: {
        size: { width: 30, height: 30 },
        position: { top: '265px', right: '15px' },
        isVisible: true
      },
      selectMode: {
        size: { width: 30, height: 30 },
        position: { top: '300px', right: '15px' },
        isVisible: true
      },
      measureDistance: {
        size: { width: 30, height: 30 },
        position: { top: '15px', right: '50px' },
        isVisible: true
      },
      measureArea: {
        size: { width: 30, height: 30 },
        position: { top: '50px', right: '50px' },
        isVisible: false
      },
      undo: {
        size: { width: 30, height: 30 },
        position: { top: '90px', right: '50px' },
        isVisible: true
      },
      redo: {
        size: { width: 30, height: 30 },
        position: { top: '125px', right: '50px' },
        isVisible: true
      },
      save: {
        size: { width: 30, height: 30 },
        position: { top: '160px', right: '50px' },
        isVisible: true
      },
      export: {
        size: { width: 30, height: 30 },
        position: { top: '195px', right: '50px' },
        isVisible: true
      },
      trash: {
        size: { width: 30, height: 30 },
        position: { top: '335px', right: '15px' },
        isVisible: true
      },
      themeToggle: {
        size: { width: 30, height: 30 },
        position: { top: '230px', right: '50px' },
        isVisible: true
      },
      fullscreen: {
        size: { width: 30, height: 30 },
        position: { top: '15px', right: '85px' },
        isVisible: true
      },
      deviceInfo: {
        size: { width: 30, height: 30 },
        position: { top: '265px', right: '50px' },
        isVisible: true
      },
      mapStyleToggle: {
        size: { width: 30, height: 30 },
        position: { top: '300px', right: '50px' },
        isVisible: true
      },
      fps: {
        size: { width: 65, height: 30 },
        position: { top: '370px', right: '15px' },
        isVisible: true
      },
      screenshot: {
        size: { width: 30, height: 30 },
        position: { top: '410px', right: '15px' },
        isVisible: true
      }
    }
  }
}

const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    toggleMapFullscreen: (state) => {
      state.isMapFullscreen = !state.isMapFullscreen
    },
    setRealFullscreen: (state, action) => {
      state.isRealFullscreen = action.payload
    },
    setMapCenter: (state, action) => {
      state.mapCenter = action.payload
    },
    setMapZoom: (state, action) => {
      state.mapZoom = action.payload
    },
    setDeviceType: (state, action) => {
      state.deviceType = action.payload
    },
    setMapModeText: (state, action) => {
      state.mapModeText = action.payload
    },
    updateControlPositions: (state, action) => {
      const { deviceType, controls } = action.payload
      if (state.controls[deviceType]) {
        state.controls[deviceType] = { ...state.controls[deviceType], ...controls }
      }
    },
    setControlVisibility: (state, action) => {
      const { deviceType, controlName, isVisible } = action.payload
      if (state.controls[deviceType] && state.controls[deviceType][controlName]) {
        state.controls[deviceType][controlName].isVisible = isVisible
      }
    },
    setMultipleControlVisibility: (state, action) => {
      const { deviceType, visibilityMap } = action.payload
      if (state.controls[deviceType]) {
        Object.keys(visibilityMap).forEach(controlName => {
          if (state.controls[deviceType][controlName]) {
            state.controls[deviceType][controlName].isVisible = visibilityMap[controlName]
          }
        })
      }
    },
    setMapTheme: (state, action) => {
      state.mapTheme = action.payload
    },
    toggleMapTheme: (state) => {
      const themes = ['light', 'dark', 'auto']
      const currentIndex = themes.indexOf(state.mapTheme)
      const nextIndex = (currentIndex + 1) % themes.length
      state.mapTheme = themes[nextIndex]
    },
    setMapStyle: (state, action) => {
      state.mapStyle = action.payload
    }
  }
})

export const {
  toggleMapFullscreen,
  setRealFullscreen,
  setMapCenter,
  setMapZoom,
  setDeviceType,
  setMapModeText,
  updateControlPositions,
  setControlVisibility,
  setMultipleControlVisibility,
  setMapTheme,
  toggleMapTheme,
  setMapStyle
} = mapSlice.actions

export default mapSlice.reducer 