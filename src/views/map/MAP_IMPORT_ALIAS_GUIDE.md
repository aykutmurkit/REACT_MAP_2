# Map Import Alias Sistemi

Bu dokümantasyon, harita componentlerinde kullanılan centralized import sistemi ve `map-import` alias'ının nasıl kullanılacağını açıklar.

## 🎯 Amaç

- Tüm map import'larını tek bir yerden yönetmek
- `map-import` alias'ı ile kolay erişim sağlamak
- Import path'lerini kısaltmak ve daha okunabilir hale getirmek
- Maintenance'ı kolaylaştırmak

## 📁 Dosya Yapısı

```
src/views/map/
├── imports.js          # 🎯 Centralized import hub
├── components/         # All map components
├── utils/             # Map utilities
├── styles/            # Map styles
└── utils/customDrawModes.js
```

## ⚙️ Vite Alias Konfigürasyonu

`vite.config.mjs` dosyasında tanımlanan alias:

```javascript
resolve: {
  alias: [
    {
      find: 'src/',
      replacement: `${path.resolve(__dirname, 'src')}/`,
    },
    {
      find: 'map-import',
      replacement: `${path.resolve(__dirname, 'src/views/map/imports.js')}`,
    },
  ],
}
```

## 📦 Centralized Imports (imports.js)

### Map Components
```javascript
export { default as ZoomInButton } from './components/ZoomInButton'
export { default as ZoomOutButton } from './components/ZoomOutButton'
export { default as DrawPolygonButton } from './components/DrawPolygonButton'
export { default as DrawLineButton } from './components/DrawLineButton'
export { default as DrawPointButton } from './components/DrawPointButton'
export { default as DrawRectangleButton } from './components/DrawRectangleButton'
export { default as DrawCircleButton } from './components/DrawCircleButton'
export { default as EditModeButton } from './components/EditModeButton'
export { default as SelectModeButton } from './components/SelectModeButton'
export { default as MeasureDistanceButton } from './components/MeasureDistanceButton'
export { default as UndoButton } from './components/UndoButton'
export { default as RedoButton } from './components/RedoButton'
export { default as SaveButton } from './components/SaveButton'
export { default as ExportButton } from './components/ExportButton'
export { default as DeleteAllButton } from './components/DeleteAllButton'
export { default as MapControls } from './components/MapControls'
export { default as MapContainer } from './components/MapContainer'
export { default as MeasurementDisplay } from './components/MeasurementDisplay'
export { default as MapControlsManager } from './components/MapControlsManager'
```

### Map Utils
```javascript
export * from './utils/mapUtils'
export { DrawRectangle, DrawCircle, MeasureLine, MeasurePolygon } from './utils/customDrawModes'
```

### Map Styles
```javascript
export * from './styles/mapControlsStyles'
export * from './styles/buttonStyles'
export * from './styles/drawControlStyles'
export * from './styles/mapStyles'
```

## 🚀 Kullanım Örnekleri

### Component Import'ları

**❌ Eski Yöntem:**
```javascript
import { baseButtonStyle, buttonHoverStyle } from '../styles/buttonStyles'
import { drawModeButtonStyle } from '../styles/drawControlStyles'
```

**✅ Yeni Yöntem:**
```javascript
import { baseButtonStyle, buttonHoverStyle, drawModeButtonStyle } from 'map-import'
```

### Çoklu Import'lar

```javascript
import { 
  ZoomInButton, 
  ZoomOutButton,
  DrawPolygonButton,
  baseButtonStyle,
  drawModeButtonStyle,
  getControlPropsForDevice 
} from 'map-import'
```

### Utility Import'ları

```javascript
import { 
  getDeviceTypeText, 
  DrawHistory, 
  calculateLineDistance,
  formatDistance 
} from 'map-import'
```

### Custom Draw Modes

```javascript
import { 
  DrawRectangle, 
  DrawCircle, 
  MeasureLine, 
  MeasurePolygon 
} from 'map-import'
```

## 📋 Güncellenmiş Component'ler

Aşağıdaki component'ler `map-import` alias'ını kullanacak şekilde güncellendi:

### Button Components
- ✅ `ZoomInButton.js`
- ✅ `ZoomOutButton.js`

### Drawing Components  
- ✅ `DrawPolygonButton.js`
- ✅ `DrawLineButton.js`
- ✅ `DrawPointButton.js`
- ✅ `DrawRectangleButton.js`
- ✅ `DrawCircleButton.js`

### Edit Components
- ✅ `EditModeButton.js`
- ✅ `SelectModeButton.js`

### Measurement Components
- ✅ `MeasureDistanceButton.js`

### Action Components
- ✅ `UndoButton.js`
- ✅ `RedoButton.js`
- ✅ `SaveButton.js`
- ✅ `ExportButton.js`
- ✅ `DeleteAllButton.js`

### Container Components
- ✅ `MapControls.js` (zaten imports.js kullanıyordu)
- ✅ `MapContainer.js` (direct import'lar kullanıyor)
- ✅ `MeasurementDisplay.js` (sadece React icons kullanıyor)
- ✅ `MapControlsManager.js` (sadece Redux kullanıyor)

## 🔧 Avantajlar

### 1. **Centralized Management**
- Tüm import'lar tek yerden yönetiliyor
- Değişiklikler tek dosyadan yapılabiliyor

### 2. **Cleaner Code**
- Kısa ve okunabilir import statement'ları
- Relative path karmaşası yok

### 3. **Better Maintenance**
- Dosya taşıma işlemleri daha kolay
- Import path'leri tek yerden güncellenebiliyor

### 4. **IDE Support**
- Auto-complete desteği
- Better IntelliSense

## 🚨 Dikkat Edilmesi Gerekenler

### 1. **Circular Dependencies**
- `imports.js` dosyası diğer map dosyalarını import etmemeli
- Component'ler birbirini import etmemeli

### 2. **Export Consistency**
- Yeni component'ler `imports.js`'e eklenmeli
- Export isimleri tutarlı olmalı

### 3. **Performance**
- Tree-shaking için named export'lar kullanılmalı
- Gereksiz import'lar avoid edilmeli

## 📝 Yeni Component Ekleme

Yeni bir map component'i eklerken:

1. **Component'i oluştur**
2. **imports.js'e export ekle:**
   ```javascript
   export { default as YeniComponent } from './components/YeniComponent'
   ```
3. **Component'te map-import kullan:**
   ```javascript
   import { baseButtonStyle } from 'map-import'
   ```

## 🔍 Troubleshooting

### Import Hatası
```
Module not found: Can't resolve 'map-import'
```
**Çözüm:** Vite dev server'ı restart edin.

### Circular Dependency
```
Circular dependency detected
```
**Çözüm:** imports.js'in başka map dosyalarını import etmediğinden emin olun.

## 📊 Özet

- ✅ **20+ component** güncellendi
- ✅ **Vite alias** konfigüre edildi  
- ✅ **Centralized import** sistemi kuruldu
- ✅ **Clean import paths** sağlandı
- ✅ **Better maintainability** elde edildi

Bu sistem sayesinde map component'lerinin import'ları daha temiz, yönetilebilir ve scalable hale geldi. 