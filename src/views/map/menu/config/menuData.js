import {
  MdApps,
  MdMap,
  MdLayers,
  MdPlace,
  MdNavigation,
  MdTerrain,
  MdSatellite,
  MdLocationCity,
  MdDirections,
  MdSearch,
  MdDashboard,
  MdPerson,
  MdLogout,
  MdSettings,
  MdGpsFixed,
  MdPhoto,
  MdFolder,
  MdBrightness6,
  MdSave,
  MdDownload,
  MdHistory,
  MdChevronRight,
  MdPowerSettingsNew,
} from 'react-icons/md'

/**
 * Menu configuration data
 * Centralizes all menu items, buttons, and data for better maintainability
 */

// Pinned apps for the Start Menu grid
export const pinnedApps = [
  { id: 'map-layers', icon: MdLayers, title: 'Katmanlar', color: '#0078d4' },
  { id: 'map-styles', icon: MdMap, title: 'Harita Stilleri', color: '#107C10' },
  { id: 'location', icon: MdGpsFixed, title: 'Konum', color: '#FF8C00' },
  { id: 'terrain', icon: MdTerrain, title: 'Arazi', color: '#8B4513' },
  { id: 'satellite', icon: MdSatellite, title: 'Uydu', color: '#2F4F4F' },
  { id: 'navigation', icon: MdNavigation, title: 'Navigasyon', color: '#4169E1' },
  { id: 'bookmarks', icon: MdPlace, title: 'Yer İşaretleri', color: '#DC143C' },
  { id: 'screenshots', icon: MdPhoto, title: 'Ekran Görüntüleri', color: '#9932CC' },
  { id: 'management', icon: MdDashboard, title: 'Yönetim', color: '#FF6347' },
  { id: 'settings', icon: MdSettings, title: 'Ayarlar', color: '#708090' },
  { id: 'themes', icon: MdBrightness6, title: 'Temalar', color: '#FFD700' },
  { id: 'search', icon: MdSearch, title: 'Arama', color: '#20B2AA' },
]

// Recommended items for the Start Menu
export const recommendedItems = [
  {
    id: 'recent-save',
    icon: MdSave,
    title: 'Son Kaydedilen Harita',
    subtitle: '2 saat önce',
    color: '#0078d4'
  },
  {
    id: 'export-data',
    icon: MdDownload,
    title: 'Veri Dışa Aktarımı',
    subtitle: '5 saat önce',
    color: '#107C10'
  },
  {
    id: 'map-history',
    icon: MdHistory,
    title: 'Harita Geçmişi',
    subtitle: 'Dün',
    color: '#FF8C00'
  },
  {
    id: 'shared-maps',
    icon: MdFolder,
    title: 'Paylaşılan Haritalar',
    subtitle: '3 gün önce',
    color: '#9932CC'
  },
]

// Taskbar buttons configuration
export const createTaskbarButtons = (handlers) => [
  { 
    id: 'menu', 
    icon: MdApps, 
    title: 'Uygulama Menüsü', 
    onClick: handlers.handleMenuClick 
  },
  { 
    id: 'menubar', 
    icon: MdDashboard, 
    title: 'Araç Menüsü', 
    onClick: handlers.handleMenuBarClick 
  },
  { 
    id: 'map', 
    icon: MdMap, 
    title: 'Harita Tipi', 
    onClick: () => console.log('Harita Tipi') 
  },
  { 
    id: 'layers', 
    icon: MdLayers, 
    title: 'Katmanlar', 
    onClick: () => console.log('Katmanlar') 
  },
  {
    id: 'place',
    icon: MdPlace,
    title: 'Yer İşaretleri',
    onClick: () => console.log('Yer İşaretleri'),
  },
  {
    id: 'navigation',
    icon: MdNavigation,
    title: 'Navigasyon',
    onClick: () => console.log('Navigasyon'),
  },
  { 
    id: 'terrain', 
    icon: MdTerrain, 
    title: 'Arazi', 
    onClick: () => console.log('Arazi') 
  },
  { 
    id: 'satellite', 
    icon: MdSatellite, 
    title: 'Uydu', 
    onClick: () => console.log('Uydu') 
  },
  { 
    id: 'search', 
    icon: MdSearch, 
    title: 'Arama', 
    onClick: handlers.handleSearchOpen 
  },
] 