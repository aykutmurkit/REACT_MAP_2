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
        size: { width: 26, height: 26 },
        position: { top: '12px', right: '12px' },
        isVisible: true
      },
      zoomOut: {
        size: { width: 26, height: 26 },
        position: { top: '42px', right: '12px' },
        isVisible: true
      },
      drawPolygon: {
        size: { width: 26, height: 26 },
        position: { top: '72px', right: '12px' },
        isVisible: true
      },
      drawLine: {
        size: { width: 26, height: 26 },
        position: { top: '102px', right: '12px' },
        isVisible: true
      },
      drawPoint: {
        size: { width: 26, height: 26 },
        position: { top: '132px', right: '12px' },
        isVisible: true
      },
      drawRectangle: {
        size: { width: 26, height: 26 },
        position: { top: '162px', right: '12px' },
        isVisible: true
      },
      drawCircle: {
        size: { width: 26, height: 26 },
        position: { top: '192px', right: '12px' },
        isVisible: true
      },
      editMode: {
        size: { width: 26, height: 26 },
        position: { top: '222px', right: '12px' },
        isVisible: true
      },
      selectMode: {
        size: { width: 26, height: 26 },
        position: { top: '252px', right: '12px' },
        isVisible: true
      },
      measureDistance: {
        size: { width: 26, height: 26 },
        position: { top: '12px', right: '42px' },
        isVisible: true
      },
      measureArea: {
        size: { width: 26, height: 26 },
        position: { top: '42px', right: '42px' },
        isVisible: false
      },
      undo: {
        size: { width: 26, height: 26 },
        position: { top: '72px', right: '42px' },
        isVisible: true
      },
      redo: {
        size: { width: 26, height: 26 },
        position: { top: '102px', right: '42px' },
        isVisible: true
      },
      save: {
        size: { width: 26, height: 26 },
        position: { top: '132px', right: '42px' },
        isVisible: true
      },
      export: {
        size: { width: 26, height: 26 },
        position: { top: '162px', right: '42px' },
        isVisible: true
      },
      trash: {
        size: { width: 26, height: 26 },
        position: { top: '282px', right: '12px' },
        isVisible: true
      },
      themeToggle: {
        size: { width: 26, height: 26 },
        position: { top: '192px', right: '42px' },
        isVisible: true
      },
      fullscreen: {
        size: { width: 26, height: 26 },
        position: { top: '12px', right: '72px' },
        isVisible: true
      },
      deviceInfo: {
        size: { width: 26, height: 26 },
        position: { top: '222px', right: '42px' },
        isVisible: true
      },
      mapStyleToggle: {
        size: { width: 26, height: 26 },
        position: { top: '252px', right: '42px' },
        isVisible: true
      },
      fps: {
        size: { width: 55, height: 26 },
        position: { top: '312px', right: '12px' },
        isVisible: true
      },
      screenshot: {
        size: { width: 26, height: 26 },
        position: { top: '342px', right: '12px' },
        isVisible: true
      }
    },
    tablet: {
      zoomIn: {
        size: { width: 28, height: 28 },
        position: { top: '15px', right: '15px' },
        isVisible: true
      },
      zoomOut: {
        size: { width: 28, height: 28 },
        position: { top: '47px', right: '15px' },
        isVisible: true
      },
      drawPolygon: {
        size: { width: 28, height: 28 },
        position: { top: '79px', right: '15px' },
        isVisible: true
      },
      drawLine: {
        size: { width: 28, height: 28 },
        position: { top: '111px', right: '15px' },
        isVisible: true
      },
      drawPoint: {
        size: { width: 28, height: 28 },
        position: { top: '143px', right: '15px' },
        isVisible: true
      },
      drawRectangle: {
        size: { width: 28, height: 28 },
        position: { top: '175px', right: '15px' },
        isVisible: true
      },
      drawCircle: {
        size: { width: 28, height: 28 },
        position: { top: '207px', right: '15px' },
        isVisible: true
      },
      editMode: {
        size: { width: 28, height: 28 },
        position: { top: '239px', right: '15px' },
        isVisible: true
      },
      selectMode: {
        size: { width: 28, height: 28 },
        position: { top: '271px', right: '15px' },
        isVisible: true
      },
      measureDistance: {
        size: { width: 28, height: 28 },
        position: { top: '15px', right: '47px' },
        isVisible: true
      },
      measureArea: {
        size: { width: 28, height: 28 },
        position: { top: '47px', right: '47px' },
        isVisible: false
      },
      undo: {
        size: { width: 28, height: 28 },
        position: { top: '79px', right: '47px' },
        isVisible: true
      },
      redo: {
        size: { width: 28, height: 28 },
        position: { top: '111px', right: '47px' },
        isVisible: true
      },
      save: {
        size: { width: 28, height: 28 },
        position: { top: '143px', right: '47px' },
        isVisible: true
      },
      export: {
        size: { width: 28, height: 28 },
        position: { top: '175px', right: '47px' },
        isVisible: true
      },
      trash: {
        size: { width: 28, height: 28 },
        position: { top: '303px', right: '15px' },
        isVisible: true
      },
      themeToggle: {
        size: { width: 28, height: 28 },
        position: { top: '207px', right: '47px' },
        isVisible: true
      },
      fullscreen: {
        size: { width: 28, height: 28 },
        position: { top: '15px', right: '79px' },
        isVisible: true
      },
      deviceInfo: {
        size: { width: 28, height: 28 },
        position: { top: '239px', right: '47px' },
        isVisible: true
      },
      mapStyleToggle: {
        size: { width: 28, height: 28 },
        position: { top: '271px', right: '47px' },
        isVisible: true
      },
      fps: {
        size: { width: 60, height: 28 },
        position: { top: '335px', right: '15px' },
        isVisible: true
      },
      screenshot: {
        size: { width: 28, height: 28 },
        position: { top: '367px', right: '15px' },
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
        position: { top: '85px', right: '15px' },
        isVisible: true
      },
      drawLine: {
        size: { width: 30, height: 30 },
        position: { top: '120px', right: '15px' },
        isVisible: true
      },
      drawPoint: {
        size: { width: 30, height: 30 },
        position: { top: '155px', right: '15px' },
        isVisible: true
      },
      drawRectangle: {
        size: { width: 30, height: 30 },
        position: { top: '190px', right: '15px' },
        isVisible: true
      },
      drawCircle: {
        size: { width: 30, height: 30 },
        position: { top: '225px', right: '15px' },
        isVisible: true
      },
      editMode: {
        size: { width: 30, height: 30 },
        position: { top: '260px', right: '15px' },
        isVisible: true
      },
      selectMode: {
        size: { width: 30, height: 30 },
        position: { top: '295px', right: '15px' },
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
        position: { top: '85px', right: '50px' },
        isVisible: true
      },
      redo: {
        size: { width: 30, height: 30 },
        position: { top: '120px', right: '50px' },
        isVisible: true
      },
      save: {
        size: { width: 30, height: 30 },
        position: { top: '155px', right: '50px' },
        isVisible: true
      },
      export: {
        size: { width: 30, height: 30 },
        position: { top: '190px', right: '50px' },
        isVisible: true
      },
      trash: {
        size: { width: 30, height: 30 },
        position: { top: '330px', right: '15px' },
        isVisible: true
      },
      themeToggle: {
        size: { width: 30, height: 30 },
        position: { top: '225px', right: '50px' },
        isVisible: true
      },
      fullscreen: {
        size: { width: 30, height: 30 },
        position: { top: '15px', right: '85px' },
        isVisible: true
      },
      deviceInfo: {
        size: { width: 30, height: 30 },
        position: { top: '260px', right: '50px' },
        isVisible: true
      },
      mapStyleToggle: {
        size: { width: 30, height: 30 },
        position: { top: '295px', right: '50px' },
        isVisible: true
      },
      fps: {
        size: { width: 65, height: 30 },
        position: { top: '365px', right: '15px' },
        isVisible: true
      },
      screenshot: {
        size: { width: 30, height: 30 },
        position: { top: '400px', right: '15px' },
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