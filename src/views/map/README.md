# MapLibre Draw Gelişmiş Harita Bileşeni

Bu proje, MapLibre GL ve MapLibre Draw kullanarak gelişmiş harita çizim ve ölçüm özellikleri sunar.

## 🚀 Özellikler

### Temel Çizim Modları
- **Çokgen Çizimi** - Karmaşık alanlar çizin
- **Çizgi Çizimi** - Yollar ve sınırlar çizin  
- **Nokta Ekleme** - Önemli konumları işaretleyin
- **Dikdörtgen Çizimi** - Hızlı alan seçimi
- **Daire Çizimi** - Dairesel alanlar oluşturun

### Düzenleme Modları
- **Düzenleme Modu** - Mevcut şekilleri düzenleyin
- **Seçim Modu** - Şekilleri seçin ve yönetin

### Ölçüm Araçları
- **Mesafe Ölçümü** - Çizgiler ve yolların uzunluğunu ölçün
- **Alan Ölçümü** - Çokgenlerin alanını hesaplayın
- **Otomatik Birim Dönüşümü** - m, km, m², ha, km² otomatik dönüşüm
- **Gerçek Zamanlı Gösterim** - Ölçüm sonuçlarını canlı görün

### Geçmiş Yönetimi
- **Geri Al (Undo)** - Son 50 işlemi geri alın
- **İleri Al (Redo)** - Geri alınan işlemleri tekrar yapın
- **Otomatik Kaydetme** - LocalStorage ile otomatik kayıt

### Veri Yönetimi
- **Kaydetme** - Çizimleri yerel olarak kaydedin
- **GeoJSON Dışa Aktarma** - Standart GeoJSON formatında indirin
- **Otomatik Yedekleme** - Tarayıcı kapanırsa bile veriler korunur

### Responsive Tasarım
- **Mobil Uyumlu** - Tüm cihazlarda çalışır
- **Fluent Design** - Modern Microsoft Fluent UI tasarımı
- **Dokunmatik Destek** - Tablet ve telefon dostu

## 🎮 Kullanım

### Temel Çizim
1. Sağ taraftaki araç çubuğundan bir çizim modu seçin
2. Harita üzerinde tıklayarak çizim yapın
3. ESC tuşu ile çizimi iptal edin
4. Enter tuşu ile çizimi tamamlayın (çizgi ve çokgen için)

### Ölçüm Yapma
1. **Mesafe Ölçümü**: Mesafe ölçüm butonuna tıklayın, harita üzerinde çizgi çizin
2. **Alan Ölçümü**: Alan ölçüm butonuna tıklayın, harita üzerinde çokgen çizin
3. Ölçüm sonuçları sol üst köşede görüntülenir

### Düzenleme
1. **Seçim Modu**: Şekilleri seçmek için kullanın
2. **Düzenleme Modu**: Seçili şekillerin köşelerini düzenleyin
3. Şekilleri sürükleyerek taşıyın

### Veri Yönetimi
- **Kaydet**: Mevcut çizimleri yerel depolamaya kaydedin
- **Dışa Aktar**: GeoJSON dosyası olarak indirin
- **Geri Al/İleri Al**: Değişiklikleri geri alın veya tekrarlayın

## 🛠️ Teknik Detaylar

### Kullanılan Teknolojiler
- **MapLibre GL JS** - Açık kaynak harita kütüphanesi
- **@hyvilo/maplibre-gl-draw** - Çizim işlevselliği
- **React** - UI bileşenleri
- **Redux Toolkit** - Durum yönetimi
- **Fluent Design System** - UI tasarımı

### Dosya Yapısı
```
src/views/map/
├── components/
│   ├── MapContainer.js          # Ana harita bileşeni
│   ├── MapControls.js           # Kontrol düğmeleri
│   ├── DrawControl.js           # Çizim kontrolleri
│   ├── MeasurementDisplay.js    # Ölçüm sonuçları
│   ├── ZoomInButton.js          # Yakınlaştırma
│   └── ZoomOutButton.js         # Uzaklaştırma
├── utils/
│   ├── mapUtils.js              # Yardımcı fonksiyonlar
│   └── customDrawModes.js       # Özel çizim modları
├── styles/
│   ├── mapStyles.js             # Harita stilleri
│   ├── drawControlStyles.js     # Çizim kontrol stilleri
│   ├── mapControlsStyles.js     # Genel kontrol stilleri
│   └── buttonStyles.js          # Düğme stilleri
├── MapPortal.js                 # Tam ekran portal
└── index.js                     # Ana export
```

### Özel Çizim Modları

#### DrawRectangle
- İki tıklama ile dikdörtgen çizimi
- Gerçek zamanlı önizleme
- ESC ile iptal

#### DrawCircle  
- Merkez ve yarıçap ile daire çizimi
- 64 noktalı smooth daire
- Özellik olarak merkez ve yarıçap bilgisi

#### MeasureLine
- Mesafe ölçümü için özel çizgi modu
- Haversine formülü ile doğru mesafe hesabı
- Otomatik birim dönüşümü

#### MeasurePolygon
- Alan ölçümü için özel çokgen modu
- Shoelace formülü ile alan hesabı
- Gerçek coğrafi alan hesaplaması

### Ölçüm Algoritmaları

#### Mesafe Hesaplama (Haversine)
```javascript
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
```

#### Alan Hesaplama (Shoelace)
```javascript
let area = 0
for (let i = 0; i < n; i++) {
  const j = (i + 1) % n
  area += coords[i][0] * coords[j][1]
  area -= coords[j][0] * coords[i][1]
}
area = Math.abs(area) / 2 * R * R
```

## 🎨 Fluent Design Entegrasyonu

### CSS Değişkenleri
```css
:root {
  --fd-space-xs: 4px;
  --fd-space-sm: 8px;
  --fd-space-md: 16px;
  --fd-accent: #0078D4;
  --fd-bg-light: rgba(255,255,255,0.6);
  --fd-blur: 30px;
  --fd-shadow-2: 0 4px 8px rgba(0,0,0,0.16);
}
```

### Acrylic Efektler
- Backdrop blur ile cam efekti
- Şeffaf arka planlar
- Depth ile katmanlı görünüm

### Responsive Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

## 📱 Cihaz Desteği

### Mobil Cihazlar
- 40x40px düğme boyutu
- Dokunmatik optimizasyonu
- Kompakt düzen

### Tablet
- 44x44px düğme boyutu
- Orta seviye yoğunluk
- Hibrit etkileşim

### Masaüstü
- 48x48px düğme boyutu
- Mouse hover efektleri
- Tam özellik seti

## 🔧 Yapılandırma

### Redux Store
```javascript
controls: {
  mobile: { /* mobil konfigürasyonu */ },
  tablet: { /* tablet konfigürasyonu */ },
  desktop: { /* masaüstü konfigürasyonu */ }
}
```

### Kontrol Pozisyonları
Her kontrol için:
- `size`: { width, height }
- `position`: { top, right }

## 🚀 Gelecek Özellikler

- [ ] GPX/KML import/export
- [ ] Çoklu katman desteği  
- [ ] Özel marker'lar
- [ ] Koordinat sistemi dönüşümü
- [ ] Offline harita desteği
- [ ] Çizim şablonları
- [ ] Toplu düzenleme araçları
- [ ] Gelişmiş ölçüm araçları (açı, eğim)

## 📄 Lisans

Bu proje CoreUI PRO lisansı altında geliştirilmiştir. 