/**
 * Cihaz tipini ekran genişliğine göre belirler
 * @returns {string} - 'mobile', 'tablet' veya 'desktop'
 */
export const getDeviceType = () => {
  const width = window.innerWidth
  
  if (width < 768) {
    return 'mobile'
  } else if (width < 1024) {
    return 'tablet'
  } else {
    return 'desktop'
  }
}

/**
 * Cihaz tipine göre kullanıcı dostu metin döndürür
 * @returns {string} - Cihaz tipi metni
 */
export const getDeviceTypeText = () => {
  const deviceType = getDeviceType()
  
  switch (deviceType) {
    case 'mobile':
      return 'Mobil Cihaz'
    case 'tablet':
      return 'Tablet Cihaz'
    case 'desktop':
    default:
      return 'Masaüstü Bilgisayar'
  }
}

/**
 * Cihaz tipine göre kontrol düğmesinin özelliklerini döndürür
 * @param {Object} allControls - Tüm cihaz tiplerinin kontrol yapılandırması
 * @param {string} controlName - Kontrol adı ('zoomIn', 'zoomOut', vb.)
 * @param {string} deviceType - Cihaz tipi ('mobile', 'tablet', 'desktop')
 * @returns {Object} - Cihaza özel kontrol özellikleri
 */
export const getControlPropsForDevice = (allControls, controlName, deviceType = null) => {
  const currentDeviceType = deviceType || getDeviceType()
  
  // Belirtilen cihaz tipi için kontrol yapılandırmasını al
  const deviceControls = allControls[currentDeviceType]
  const controlConfig = deviceControls?.[controlName]
  
  if (!controlConfig) {
    console.warn(`Kontrol bulunamadı: ${controlName} for ${currentDeviceType}`)
    return {
      size: { width: 48, height: 48 },
      position: { top: '20px', right: '20px' },
      isVisible: true
    }
  }
  
  return {
    size: controlConfig.size,
    position: controlConfig.position,
    isVisible: controlConfig.isVisible !== undefined ? controlConfig.isVisible : true
  }
}

/**
 * Koordinatları formatlar
 * @param {Array} coordinates - [lng, lat] formatında koordinatlar
 * @param {number} precision - Ondalık hassasiyet
 * @returns {string} - Formatlanmış koordinat metni
 */
export const formatCoordinates = (coordinates, precision = 4) => {
  if (!coordinates || coordinates.length !== 2) {
    return 'Geçersiz koordinat'
  }
  
  const [lng, lat] = coordinates
  return `${lat.toFixed(precision)}, ${lng.toFixed(precision)}`
}

/**
 * Zoom seviyesini formatlar
 * @param {number} zoom - Zoom seviyesi
 * @returns {string} - Formatlanmış zoom metni
 */
export const formatZoom = (zoom) => {
  return `Zoom: ${zoom.toFixed(1)}`
}

/**
 * Tarayıcının fullscreen API desteğini kontrol eder
 * @returns {boolean} - Fullscreen API destekleniyorsa true
 */
export const isFullscreenSupported = () => {
  return !!(
    document.fullscreenEnabled ||
    document.webkitFullscreenEnabled ||
    document.mozFullScreenEnabled ||
    document.msFullscreenEnabled
  )
}

/**
 * Elementi fullscreen yapar
 * @param {HTMLElement} element - Fullscreen yapılacak element
 * @returns {Promise} - Fullscreen işlemi promise'i
 */
export const enterFullscreen = (element) => {
  if (element.requestFullscreen) {
    return element.requestFullscreen()
  } else if (element.webkitRequestFullscreen) {
    return element.webkitRequestFullscreen()
  } else if (element.mozRequestFullScreen) {
    return element.mozRequestFullScreen()
  } else if (element.msRequestFullscreen) {
    return element.msRequestFullscreen()
  }
  return Promise.reject(new Error('Fullscreen API desteklenmiyor'))
}

/**
 * Fullscreen modundan çıkar
 * @returns {Promise} - Fullscreen çıkış işlemi promise'i
 */
export const exitFullscreen = () => {
  if (document.exitFullscreen) {
    return document.exitFullscreen()
  } else if (document.webkitExitFullscreen) {
    return document.webkitExitFullscreen()
  } else if (document.mozCancelFullScreen) {
    return document.mozCancelFullScreen()
  } else if (document.msExitFullscreen) {
    return document.msExitFullscreen()
  }
  return Promise.reject(new Error('Fullscreen API desteklenmiyor'))
}

/**
 * Şu anda fullscreen modunda olup olmadığını kontrol eder
 * @returns {boolean} - Fullscreen modundaysa true
 */
export const isCurrentlyFullscreen = () => {
  return !!(
    document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.mozFullScreenElement ||
    document.msFullscreenElement
  )
}

/**
 * Fullscreen değişiklik event'i için listener ekler
 * @param {Function} callback - Fullscreen durumu değiştiğinde çağrılacak fonksiyon
 * @returns {Function} - Event listener'ı kaldırmak için cleanup fonksiyonu
 */
export const addFullscreenChangeListener = (callback) => {
  const events = [
    'fullscreenchange',
    'webkitfullscreenchange',
    'mozfullscreenchange',
    'MSFullscreenChange'
  ]
  
  events.forEach(event => {
    document.addEventListener(event, callback)
  })
  
  // Cleanup fonksiyonu döndür
  return () => {
    events.forEach(event => {
      document.removeEventListener(event, callback)
    })
  }
}

/**
 * İki nokta arasındaki mesafeyi hesaplar (Haversine formülü)
 * @param {Array} coord1 - İlk koordinat [lng, lat]
 * @param {Array} coord2 - İkinci koordinat [lng, lat]
 * @returns {number} - Metre cinsinden mesafe
 */
export const calculateDistance = (coord1, coord2) => {
  const [lng1, lat1] = coord1
  const [lng2, lat2] = coord2
  
  const R = 6371000 // Dünya yarıçapı (metre)
  const φ1 = lat1 * Math.PI / 180
  const φ2 = lat2 * Math.PI / 180
  const Δφ = (lat2 - lat1) * Math.PI / 180
  const Δλ = (lng2 - lng1) * Math.PI / 180

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return R * c
}

/**
 * Çizgi geometrisinin toplam uzunluğunu hesaplar
 * @param {Array} coordinates - Koordinat dizisi [[lng, lat], ...]
 * @returns {number} - Metre cinsinden toplam uzunluk
 */
export const calculateLineDistance = (coordinates) => {
  if (!coordinates || coordinates.length < 2) return 0
  
  let totalDistance = 0
  for (let i = 1; i < coordinates.length; i++) {
    totalDistance += calculateDistance(coordinates[i - 1], coordinates[i])
  }
  
  return totalDistance
}

/**
 * Çokgen alanını hesaplar (Shoelace formülü)
 * @param {Array} coordinates - Koordinat dizisi [[lng, lat], ...]
 * @returns {number} - Metrekare cinsinden alan
 */
export const calculatePolygonArea = (coordinates) => {
  if (!coordinates || coordinates.length < 3) return 0
  
  // Koordinatları radyana çevir
  const coords = coordinates.map(([lng, lat]) => [
    lng * Math.PI / 180,
    lat * Math.PI / 180
  ])
  
  let area = 0
  const n = coords.length
  
  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n
    area += coords[i][0] * coords[j][1]
    area -= coords[j][0] * coords[i][1]
  }
  
  area = Math.abs(area) / 2
  
  // Radyan cinsinden alanı metrekareye çevir
  const R = 6371000 // Dünya yarıçapı (metre)
  return area * R * R
}

/**
 * Mesafeyi uygun birimde formatlar
 * @param {number} distance - Metre cinsinden mesafe
 * @returns {string} - Formatlanmış mesafe metni
 */
export const formatDistance = (distance) => {
  if (distance < 1000) {
    return `${distance.toFixed(1)} m`
  } else if (distance < 1000000) {
    return `${(distance / 1000).toFixed(2)} km`
  } else {
    return `${(distance / 1000000).toFixed(2)} Mm`
  }
}

/**
 * Alanı uygun birimde formatlar
 * @param {number} area - Metrekare cinsinden alan
 * @returns {string} - Formatlanmış alan metni
 */
export const formatArea = (area) => {
  if (area < 10000) {
    return `${area.toFixed(1)} m²`
  } else if (area < 1000000) {
    return `${(area / 10000).toFixed(2)} ha`
  } else {
    return `${(area / 1000000).toFixed(2)} km²`
  }
}

/**
 * GeoJSON verilerini dosya olarak indirir
 * @param {Object} geojson - GeoJSON objesi
 * @param {string} filename - Dosya adı
 */
export const exportGeoJSON = (geojson, filename = 'map-data.geojson') => {
  const dataStr = JSON.stringify(geojson, null, 2)
  const dataBlob = new Blob([dataStr], { type: 'application/json' })
  
  const link = document.createElement('a')
  link.href = URL.createObjectURL(dataBlob)
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  
  URL.revokeObjectURL(link.href)
}

/**
 * Dosyadan GeoJSON verilerini okur
 * @param {File} file - Dosya objesi
 * @returns {Promise<Object>} - GeoJSON objesi
 */
export const importGeoJSON = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    
    reader.onload = (e) => {
      try {
        const geojson = JSON.parse(e.target.result)
        resolve(geojson)
      } catch (error) {
        reject(new Error('Geçersiz GeoJSON formatı'))
      }
    }
    
    reader.onerror = () => {
      reject(new Error('Dosya okuma hatası'))
    }
    
    reader.readAsText(file)
  })
}

/**
 * Çizim verilerini localStorage'a kaydeder
 * @param {Object} data - Kaydedilecek veri
 * @param {string} key - Storage anahtarı
 */
export const saveToLocalStorage = (data, key = 'mapDrawData') => {
  try {
    localStorage.setItem(key, JSON.stringify(data))
    return true
  } catch (error) {
    console.error('LocalStorage kaydetme hatası:', error)
    return false
  }
}

/**
 * localStorage'dan çizim verilerini yükler
 * @param {string} key - Storage anahtarı
 * @returns {Object|null} - Yüklenen veri veya null
 */
export const loadFromLocalStorage = (key = 'mapDrawData') => {
  try {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : null
  } catch (error) {
    console.error('LocalStorage yükleme hatası:', error)
    return null
  }
}

/**
 * Çizim geçmişini yönetir
 */
export class DrawHistory {
  constructor(maxSize = 50) {
    this.history = []
    this.currentIndex = -1
    this.maxSize = maxSize
  }

  /**
   * Yeni bir durum ekler
   * @param {Object} state - Kaydedilecek durum
   */
  push(state) {
    // Mevcut pozisyondan sonraki tüm geçmişi sil
    this.history = this.history.slice(0, this.currentIndex + 1)
    
    // Yeni durumu ekle
    this.history.push(JSON.parse(JSON.stringify(state)))
    this.currentIndex++
    
    // Maksimum boyutu aş
    if (this.history.length > this.maxSize) {
      this.history.shift()
      this.currentIndex--
    }
  }

  /**
   * Geri alma işlemi
   * @returns {Object|null} - Önceki durum veya null
   */
  undo() {
    if (this.canUndo()) {
      this.currentIndex--
      return JSON.parse(JSON.stringify(this.history[this.currentIndex]))
    }
    return null
  }

  /**
   * İleri alma işlemi
   * @returns {Object|null} - Sonraki durum veya null
   */
  redo() {
    if (this.canRedo()) {
      this.currentIndex++
      return JSON.parse(JSON.stringify(this.history[this.currentIndex]))
    }
    return null
  }

  /**
   * Geri alma yapılabilir mi?
   * @returns {boolean}
   */
  canUndo() {
    return this.currentIndex > 0
  }

  /**
   * İleri alma yapılabilir mi?
   * @returns {boolean}
   */
  canRedo() {
    return this.currentIndex < this.history.length - 1
  }

  /**
   * Geçmişi temizle
   */
  clear() {
    this.history = []
    this.currentIndex = -1
  }
} 