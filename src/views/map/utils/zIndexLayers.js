/**
 * Z-Index Layer Management System
 * 
 * Bu dosya tüm UI elementlerinin z-index değerlerini merkezi olarak yönetir.
 * Katman çakışmalarını önlemek için sistemli bir yaklaşım sağlar.
 */

// Base layers (0-999)
export const Z_INDEX_LAYERS = {
  // Map base layers
  MAP_CONTAINER: 0,
  MAP_LOGO: 100,
  
  // UI Base layers (1000-1999)
  BASE_UI: 1000,
  CENTER_MENU: 1050,
  CENTER_MENU_BAR: 1060,
  
  // Panel layers (2000-2999)
  MAP_MANAGEMENT: 2000,
  MAP_SEARCH: 2100,
  MAP_SEARCH_RESULTS: 2090,
  MAP_SIDEBAR: 2200,
  
  // Control layers (10000-10999)
  MAP_CONTROLS: 10000,
  MEASUREMENT_DISPLAY: 10100,
  DEVICE_INFO: 10200,
  FULLSCREEN_BUTTON: 10300,
  STYLE_TOGGLE: 10400,
  
  // Drawing controls (11000-11999)
  DRAW_CONTROLS: 11000,
  
  // Modal/Overlay layers (20000+)
  MODAL_OVERLAY: 20000,
  INTRO_OVERLAY: 20000,
  OUTRO_OVERLAY: 20000,
  NOTIFICATION: 25000
}

/**
 * Z-index değeri al
 * @param {string} layerName - Katman adı
 * @returns {number} Z-index değeri
 */
export const getZIndex = (layerName) => {
  return Z_INDEX_LAYERS[layerName] || Z_INDEX_LAYERS.BASE_UI
}

/**
 * Belirli bir katmanın üzerinde z-index değeri al
 * @param {string} layerName - Base katman adı
 * @param {number} offset - Üst katman ofseti (varsayılan: 1)
 * @returns {number} Z-index değeri
 */
export const getZIndexAbove = (layerName, offset = 1) => {
  return getZIndex(layerName) + offset
}

/**
 * Z-index katman bilgilerini logla (debug için)
 */
export const logZIndexLayers = () => {
  console.group('Z-Index Layers:')
  Object.entries(Z_INDEX_LAYERS).forEach(([name, value]) => {
    console.log(`${name}: ${value}`)
  })
  console.groupEnd()
} 