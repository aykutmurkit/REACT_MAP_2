# Map Component Visibility Management

Bu rehber, harita bileşenlerinin görünürlüğünü nasıl yöneteceğinizi açıklar.

## Özellikler

### 1. Centralized Import System
Tüm harita bileşenleri ve yardımcı fonksiyonlar artık `src/views/map/imports.js` dosyasından merkezi olarak yönetilmektedir.

```javascript
import {
  ZoomInButton,
  ZoomOutButton,
  DrawPolygonButton,
  MapControls,
  MapContainer,
  getControlPropsForDevice,
  controlsContainerStyle
} from '../imports'
```

### 2. Component Visibility Parameter
Tüm harita bileşenleri artık `isVisible` parametresini desteklemektedir:

```javascript
// Bileşen görünür
<ZoomInButton 
  size={size} 
  position={position} 
  onClick={handleClick}
  isVisible={true} 
/>

// Bileşen gizli
<DrawPolygonButton 
  size={size} 
  position={position} 
  onClick={handleClick}
  isVisible={false} 
/>
```

### 3. Redux Store Integration
Redux store'da her kontrol için `isVisible` özelliği bulunmaktadır:

```javascript
// Redux state örneği
controls: {
  desktop: {
    zoomIn: {
      size: { width: 48, height: 48 },
      position: { top: '28px', right: '28px' },
      isVisible: true
    },
    drawPolygon: {
      size: { width: 48, height: 48 },
      position: { top: '152px', right: '28px' },
      isVisible: false // Bu kontrol gizli
    }
  }
}
```

## Redux Actions

### setControlVisibility
Tek bir kontrolün görünürlüğünü değiştirir:

```javascript
import { setControlVisibility } from '../../../redux/slices/mapSlice'

dispatch(setControlVisibility({
  deviceType: 'desktop',
  controlName: 'drawPolygon',
  isVisible: false
}))
```

### setMultipleControlVisibility
Birden fazla kontrolün görünürlüğünü aynı anda değiştirir:

```javascript
import { setMultipleControlVisibility } from '../../../redux/slices/mapSlice'

dispatch(setMultipleControlVisibility({
  deviceType: 'desktop',
  visibilityMap: {
    drawPolygon: false,
    drawLine: false,
    drawPoint: true,
    zoomIn: true
  }
}))
```

## MapControlsManager Component

Görünürlük yönetimi için hazır bir bileşen:

```javascript
import { MapControlsManager } from '../imports'

// Kullanım
<MapControlsManager />
```

Bu bileşen şu özellikleri sunar:
- Tüm kontrolleri göster/gizle
- Çizim araçlarını toplu gizle
- Sadece temel kontrolleri göster
- Her kontrol için ayrı ayrı görünürlük ayarı

## Kullanım Örnekleri

### 1. Sadece Zoom Kontrollerini Göster
```javascript
const showOnlyZoomControls = () => {
  const visibilityMap = {}
  Object.keys(controls[deviceType]).forEach(controlName => {
    visibilityMap[controlName] = ['zoomIn', 'zoomOut'].includes(controlName)
  })
  
  dispatch(setMultipleControlVisibility({
    deviceType,
    visibilityMap
  }))
}
```

### 2. Çizim Moduna Göre Kontrolleri Ayarla
```javascript
const setDrawingMode = (mode) => {
  const drawingControls = ['drawPolygon', 'drawLine', 'drawPoint', 'drawRectangle', 'drawCircle']
  const visibilityMap = {}
  
  drawingControls.forEach(controlName => {
    visibilityMap[controlName] = mode === 'drawing'
  })
  
  dispatch(setMultipleControlVisibility({
    deviceType,
    visibilityMap
  }))
}
```

### 3. Cihaz Tipine Göre Kontrolleri Ayarla
```javascript
const setMobileOptimizedControls = () => {
  if (deviceType === 'mobile') {
    dispatch(setMultipleControlVisibility({
      deviceType: 'mobile',
      visibilityMap: {
        zoomIn: true,
        zoomOut: true,
        drawPolygon: true,
        trash: true,
        // Diğer kontroller gizli
        drawLine: false,
        drawPoint: false,
        drawRectangle: false,
        drawCircle: false,
        editMode: false,
        selectMode: false,
        measureDistance: false,
        undo: false,
        redo: false,
        save: false,
        export: false
      }
    }))
  }
}
```

## Desteklenen Kontroller

- `zoomIn` - Yakınlaştır
- `zoomOut` - Uzaklaştır
- `drawPolygon` - Çokgen Çiz
- `drawLine` - Çizgi Çiz
- `drawPoint` - Nokta Çiz
- `drawRectangle` - Dikdörtgen Çiz
- `drawCircle` - Daire Çiz
- `editMode` - Düzenleme Modu
- `selectMode` - Seçim Modu
- `measureDistance` - Mesafe Ölçümü
- `measureArea` - Alan Ölçümü (varsayılan olarak gizli)
- `undo` - Geri Al
- `redo` - İleri Al
- `save` - Kaydet
- `export` - Dışa Aktar
- `trash` - Tümünü Sil

## Notlar

- `measureArea` kontrolü varsayılan olarak gizlidir çünkü MeasureAreaButton bileşeni silinmiştir
- Tüm kontroller varsayılan olarak görünür durumdadır (measureArea hariç)
- Görünürlük ayarları cihaz tipine göre ayrı ayrı saklanır
- Bileşenler `isVisible={false}` olduğunda `null` döndürür ve DOM'da yer kaplamaz 