import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import { getThemeStyles } from 'map-import'

const MapSidebar = () => {
  const { mapTheme } = useSelector((state) => state.map)
  const themeStyles = getThemeStyles(mapTheme)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [activeTab, setActiveTab] = useState('info')
  const [isToggleHovered, setIsToggleHovered] = useState(false)

  // Cihaz tipini algıla
  const getDeviceType = () => {
    const width = window.innerWidth
    if (width < 768) return 'mobile'
    if (width < 1024) return 'tablet'
    return 'desktop'
  }

  const [deviceType, setDeviceType] = useState(getDeviceType())

  // Pencere boyutu değiştiğinde cihaz tipini güncelle
  React.useEffect(() => {
    const handleResize = () => {
      setDeviceType(getDeviceType())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Sidebar genişliğini cihaz tipine göre ayarla
  const getSidebarWidth = () => {
    if (isCollapsed) return '0px'
    if (deviceType === 'mobile') return 'calc(100% - 40px)'
    return 'calc(25% - 40px)'
  }

  // Animasyon ayarları
  const transitionDuration = '0.35s'
  const transitionTiming = 'cubic-bezier(.4,0,.2,1)'

  const sidebarWidth = getSidebarWidth()
  const isSidebarVisible = !isCollapsed

  const sidebarStyle = {
    position: 'absolute',
    top: 20,
    left: 20,
    height: 'calc(100% - 40px)',
    width: sidebarWidth,
    backgroundColor: themeStyles.baseButtonStyle.backgroundColor,
    boxShadow: '2px 0 16px rgba(0, 0, 0, 0.12)',
    zIndex: 1000,
    transition: `width ${transitionDuration} ${transitionTiming}, opacity ${transitionDuration} ${transitionTiming}`,
    flexDirection: 'column',
    overflow: 'hidden',
    borderRadius: '4px',
    border: `1.5px solid ${themeStyles.baseButtonStyle.border.split(' ')[2]}`,
    opacity: isSidebarVisible ? 1 : 0,
    pointerEvents: isSidebarVisible ? 'auto' : 'none',
    display: 'flex',
  }

  // Dikey aç/kapa butonu stili
  const verticalToggleStyle = {
    ...themeStyles.baseButtonStyle,
    width: '30px',
    height: 'calc(100% - 40px)',
    position: 'absolute',
    top: 20,
    left: `calc(${sidebarWidth} + 32px)`,
    borderRadius: '4px',
    zIndex: 1100,
    transition: `left ${transitionDuration} ${transitionTiming}, background 0.2s`,
    outline: 'none',
    boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
    marginLeft: '12px',
    marginRight: '0px',
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    ...(isToggleHovered ? themeStyles.buttonHoverStyle : {})
  }

  const iconStyle = {
    color: themeStyles.baseButtonStyle.color,
    fontSize: 28,
    margin: 0,
    padding: 0,
    display: 'block',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    transition: 'transform 0.2s'
  }

  const tabsContainerStyle = {
    display: 'flex',
    borderBottom: `1px solid ${themeStyles.baseButtonStyle.border.split(' ')[2]}`,
    backgroundColor: themeStyles.baseButtonStyle.backgroundColor,
    borderTopLeftRadius: '4px',
    borderTopRightRadius: '4px',
    marginBottom: 0
  }

  const tabStyle = (tab) => ({
    padding: '10px 15px',
    cursor: 'pointer',
    borderBottom: tab === activeTab
      ? `2px solid ${themeStyles.buttonHoverStyle.backgroundColor || '#0078d4'}`
      : 'none',
    color: tab === activeTab
      ? themeStyles.buttonHoverStyle.color || '#0078d4'
      : themeStyles.baseButtonStyle.color,
    flex: 1,
    textAlign: 'center',
    fontWeight: tab === activeTab ? 'bold' : 'normal',
    background: 'none',
    borderRadius: '4px'
  })

  const contentStyle = {
    padding: 20,
    overflowY: 'auto',
    flex: 1,
    color: themeStyles.baseButtonStyle.color,
    borderBottomLeftRadius: '4px',
    borderBottomRightRadius: '4px',
    background: 'none'
  }

  // Örnek içerik bileşenleri
  const InfoContent = () => (
    <div>
      <h3>Harita Bilgileri</h3>
      <p>Bu harita, MapLibre GL ve MapLibre Draw kullanılarak oluşturulmuştur.</p>
      <p>Sağ taraftaki kontrol butonlarını kullanarak çeşitli çizim ve ölçüm işlemleri yapabilirsiniz.</p>
      <div style={{ marginTop: '20px', padding: '10px', backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: '8px' }}>
        <h4>Özellikler</h4>
        <ul>
          <li>Çokgen, çizgi, nokta, dikdörtgen ve daire çizimi</li>
          <li>Mesafe ve alan ölçümü</li>
          <li>Otomatik birim dönüşümü</li>
          <li>Geri alma ve ileri alma</li>
          <li>GeoJSON dışa aktarma</li>
        </ul>
      </div>
    </div>
  )

  const DataContent = () => (
    <div>
      <h3>Veri Paneli</h3>
      <div style={{ marginBottom: '15px' }}>
        <h4>Çizim İstatistikleri</h4>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
          <span>Çokgenler:</span>
          <span>3</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
          <span>Çizgiler:</span>
          <span>2</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
          <span>Noktalar:</span>
          <span>5</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
          <span>Toplam Alan:</span>
          <span>1.25 km²</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Toplam Mesafe:</span>
          <span>3.7 km</span>
        </div>
      </div>
      <button style={{
        padding: '8px 12px',
        backgroundColor: themeStyles.buttonHoverStyle.backgroundColor || '#0078d4',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        width: '100%'
      }}>
        Verileri Yenile
      </button>
    </div>
  )

  const SettingsContent = () => (
    <div>
      <h3>Ayarlar</h3>
      <div style={{ marginBottom: '15px' }}>
        <h4>Harita Ayarları</h4>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Yakınlaştırma Seviyesi</label>
          <input type="range" min="1" max="20" defaultValue="10" style={{ width: '100%' }} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Harita Stili</label>
          <select style={{ width: '100%', padding: '5px' }}>
            <option>Standart</option>
            <option>Uydu</option>
            <option>Topografik</option>
          </select>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <input type="checkbox" id="grid" />
          <label htmlFor="grid" style={{ marginLeft: '5px' }}>Izgara Göster</label>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input type="checkbox" id="labels" defaultChecked />
          <label htmlFor="labels" style={{ marginLeft: '5px' }}>Etiketleri Göster</label>
        </div>
      </div>
    </div>
  )

  // Sadece daraltılmış durumda değilse içeriği göster
  const renderContent = () => {
    if (isCollapsed) return null
    return (
      <>
        <div style={tabsContainerStyle}>
          <div style={tabStyle('info')} onClick={() => setActiveTab('info')}>Bilgi</div>
          <div style={tabStyle('data')} onClick={() => setActiveTab('data')}>Veriler</div>
          <div style={tabStyle('settings')} onClick={() => setActiveTab('settings')}>Ayarlar</div>
        </div>
        <div style={contentStyle}>
          {activeTab === 'info' && <InfoContent />}
          {activeTab === 'data' && <DataContent />}
          {activeTab === 'settings' && <SettingsContent />}
        </div>
      </>
    )
  }

  return (
    <>
      <div style={sidebarStyle}>
        {renderContent()}
      </div>
      <button 
        style={verticalToggleStyle} 
        onClick={() => setIsCollapsed(!isCollapsed)}
        title={isCollapsed ? "Aç" : "Kapat"}
        onMouseEnter={() => setIsToggleHovered(true)}
        onMouseLeave={() => setIsToggleHovered(false)}
      >
        {isCollapsed
          ? <MdChevronRight style={iconStyle} />
          : <MdChevronLeft style={iconStyle} />}
      </button>
    </>
  )
}

export default MapSidebar 