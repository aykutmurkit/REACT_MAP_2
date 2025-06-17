import React from 'react'
import { MdSearch } from 'react-icons/md'
import { getZIndex } from '../../utils/zIndexLayers'

/**
 * Windows 11 Style Taskbar Component
 * Responsive taskbar with Start button, search, apps, and system tray
 */
const Windows11Taskbar = ({
  buttons,
  hoveredButton,
  setHoveredButton,
  showProfileDropdown,
  isMenuBarVisible,
  onMenuClick,
  onMenuBarClick,
  onSearchClick,
}) => {
  return (
    <div
      className="mb-1 mb-sm-2 mb-md-3 mx-1 mx-sm-0"
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        padding: 'clamp(3px, 0.8vw, 6px)',
        backdropFilter: 'blur(30px)',
        WebkitBackdropFilter: 'blur(30px)',
        WebkitUserSelect: 'none',
        WebkitTouchCallout: 'none',
        WebkitTapHighlightColor: 'transparent',
        zIndex: getZIndex('CENTER_MENU'),
        minHeight: 'clamp(44px, 10vw, 56px)',
        maxWidth: '100vw',
        overflow: 'hidden'
      }}
    >
      <div className="d-flex align-items-center justify-content-between">
        {/* Left Group - Essential Controls */}
        <div className="d-flex align-items-center" style={{ gap: 'clamp(2px, 0.5vw, 4px)' }}>
          {/* Start Button */}
          <button
            className="btn d-flex align-items-center justify-content-center"
            style={{
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'all 0.15s',
              margin: 0,
              backgroundColor: showProfileDropdown 
                ? 'rgba(0, 120, 212, 0.1)' 
                : hoveredButton === 'menu'
                ? 'rgba(0, 0, 0, 0.05)'
                : 'transparent',
              border: 'none',
              boxShadow: 'none',
              padding: 'clamp(6px, 1.5vw, 8px)',
              minWidth: 'clamp(36px, 8vw, 44px)',
              minHeight: 'clamp(36px, 8vw, 44px)',
              WebkitTapHighlightColor: 'transparent'
            }}
            onClick={onMenuClick}
            onMouseEnter={() => setHoveredButton('menu')}
            onMouseLeave={() => setHoveredButton(null)}
            title="Başlat"
          >
            <div className="d-grid" style={{ 
              gridTemplateColumns: '1fr 1fr', 
              gap: '1px',
              width: 'clamp(12px, 3vw, 16px)',
              height: 'clamp(12px, 3vw, 16px)'
            }}>
              <div style={{ backgroundColor: '#0078d4', borderRadius: '1px' }}></div>
              <div style={{ backgroundColor: '#0078d4', borderRadius: '1px' }}></div>
              <div style={{ backgroundColor: '#0078d4', borderRadius: '1px' }}></div>
              <div style={{ backgroundColor: '#0078d4', borderRadius: '1px' }}></div>
            </div>
          </button>

          {/* Search Box - Responsive */}
          <div
            className="position-relative d-none d-sm-block"
            style={{
              minWidth: 'clamp(100px, 20vw, 160px)',
              maxWidth: 'clamp(140px, 30vw, 220px)'
            }}
          >
            <button
              className="btn w-100 d-flex align-items-center text-start"
              style={{
                backgroundColor: hoveredButton === 'searchbox' 
                  ? 'rgba(255, 255, 255, 0.9)' 
                  : 'rgba(255, 255, 255, 0.7)',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                borderRadius: '20px',
                padding: 'clamp(4px, 1vw, 6px) clamp(8px, 2vw, 12px)',
                minHeight: 'clamp(28px, 6vw, 36px)',
                transition: 'all 0.15s',
                fontSize: 'clamp(10px, 2vw, 13px)',
                color: '#666',
                boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)'
              }}
              onClick={onSearchClick}
              onMouseEnter={() => setHoveredButton('searchbox')}
              onMouseLeave={() => setHoveredButton(null)}
              title="Arama yapın"
            >
              <MdSearch 
                className="me-1" 
                style={{ 
                  fontSize: 'clamp(12px, 2.5vw, 14px)',
                  color: '#666',
                  flexShrink: 0
                }} 
              />
              <span 
                className="d-none d-md-inline"
                style={{ 
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}
              >
                Arama
              </span>
            </button>
          </div>

          {/* Mobile Search Icon */}
          <button
            className="btn d-flex align-items-center justify-content-center d-sm-none"
            style={{
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'all 0.15s',
              margin: 0,
              backgroundColor: hoveredButton === 'search'
                ? 'rgba(0, 0, 0, 0.05)'
                : 'transparent',
              border: 'none',
              boxShadow: 'none',
              padding: 'clamp(6px, 1.5vw, 8px)',
              minWidth: 'clamp(36px, 8vw, 44px)',
              minHeight: 'clamp(36px, 8vw, 44px)',
              WebkitTapHighlightColor: 'transparent'
            }}
            onClick={onSearchClick}
            onMouseEnter={() => setHoveredButton('search')}
            onMouseLeave={() => setHoveredButton(null)}
            title="Arama"
          >
            <MdSearch style={{
              fontSize: 'clamp(14px, 3.5vw, 18px)',
              color: '#444'
            }} />
          </button>

          {/* Task View */}
          <button
            className="btn d-flex align-items-center justify-content-center"
            style={{
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'all 0.15s',
              margin: 0,
              backgroundColor: hoveredButton === 'taskview'
                ? 'rgba(0, 0, 0, 0.05)'
                : 'transparent',
              border: 'none',
              boxShadow: 'none',
              padding: 'clamp(6px, 1.5vw, 8px)',
              minWidth: 'clamp(36px, 8vw, 44px)',
              minHeight: 'clamp(36px, 8vw, 44px)',
              WebkitTapHighlightColor: 'transparent'
            }}
            onClick={onMenuBarClick}
            onMouseEnter={() => setHoveredButton('taskview')}
            onMouseLeave={() => setHoveredButton(null)}
            title="Görev görünümü"
          >
            <div className="d-flex flex-column" style={{ gap: '1px' }}>
              <div className="d-flex" style={{ gap: '1px' }}>
                <div style={{
                  width: 'clamp(4px, 1vw, 6px)',
                  height: 'clamp(3px, 0.8vw, 4px)',
                  backgroundColor: '#444',
                  borderRadius: '0.5px'
                }}></div>
                <div style={{
                  width: 'clamp(4px, 1vw, 6px)',
                  height: 'clamp(3px, 0.8vw, 4px)',
                  backgroundColor: '#444',
                  borderRadius: '0.5px'
                }}></div>
              </div>
              <div className="d-flex" style={{ gap: '1px' }}>
                <div style={{
                  width: 'clamp(4px, 1vw, 6px)',
                  height: 'clamp(3px, 0.8vw, 4px)',
                  backgroundColor: isMenuBarVisible ? '#0078d4' : '#444',
                  borderRadius: '0.5px'
                }}></div>
                <div style={{
                  width: 'clamp(4px, 1vw, 6px)',
                  height: 'clamp(3px, 0.8vw, 4px)',
                  backgroundColor: '#444',
                  borderRadius: '0.5px'
                }}></div>
              </div>
            </div>
          </button>
        </div>

        {/* Center Group - App Icons (Hidden on small mobile) */}
        <div 
          className="d-none d-md-flex align-items-center" 
          style={{ gap: '2px' }}
        >
          {buttons.slice(2, 6).map((button) => (
            <button
              key={button.id}
              className="btn d-flex align-items-center justify-content-center position-relative"
              style={{
                borderRadius: '6px',
                cursor: 'pointer',
                transition: 'all 0.15s',
                margin: 0,
                backgroundColor: hoveredButton === button.id
                  ? 'rgba(0, 0, 0, 0.05)'
                  : 'transparent',
                border: 'none',
                boxShadow: 'none',
                padding: 'clamp(6px, 1.5vw, 8px)',
                minWidth: 'clamp(36px, 8vw, 44px)',
                minHeight: 'clamp(36px, 8vw, 44px)',
                WebkitTapHighlightColor: 'transparent'
              }}
              onClick={button.onClick}
              onMouseEnter={() => setHoveredButton(button.id)}
              onMouseLeave={() => setHoveredButton(null)}
              title={button.title}
            >
              <button.icon
                style={{
                  fontSize: 'clamp(14px, 3.5vw, 18px)',
                  color: '#444',
                  opacity: 0.9
                }}
              />
              
              {/* Running indicator dot */}
              <div
                className="position-absolute bottom-0 start-50 translate-middle-x"
                style={{
                  width: '3px',
                  height: '3px',
                  backgroundColor: '#0078d4',
                  borderRadius: '50%',
                  marginBottom: '-1px',
                  opacity: Math.random() > 0.7 ? 1 : 0
                }}
              />
            </button>
          ))}
        </div>

        {/* Right Group - System Tray */}
        <div className="d-flex align-items-center" style={{ gap: '1px' }}>
          {/* Widgets - Hidden on mobile */}
          <button
            className="btn d-flex align-items-center justify-content-center d-none d-lg-flex"
            style={{
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'all 0.15s',
              margin: 0,
              backgroundColor: hoveredButton === 'widgets'
                ? 'rgba(0, 0, 0, 0.05)'
                : 'transparent',
              border: 'none',
              boxShadow: 'none',
              padding: 'clamp(4px, 1vw, 6px)',
              minWidth: 'clamp(28px, 6vw, 36px)',
              minHeight: 'clamp(28px, 6vw, 36px)',
              WebkitTapHighlightColor: 'transparent'
            }}
            onMouseEnter={() => setHoveredButton('widgets')}
            onMouseLeave={() => setHoveredButton(null)}
            title="Widgets"
          >
            <div style={{
              fontSize: 'clamp(10px, 2.5vw, 12px)',
              color: '#444',
              fontWeight: 'bold'
            }}>
              22°
            </div>
          </button>

          {/* System Icons - Simplified on mobile */}
          <button
            className="btn d-flex align-items-center justify-content-center d-none d-sm-flex"
            style={{
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'all 0.15s',
              margin: 0,
              backgroundColor: hoveredButton === 'notifications'
                ? 'rgba(0, 0, 0, 0.05)'
                : 'transparent',
              border: 'none',
              boxShadow: 'none',
              padding: 'clamp(4px, 1vw, 6px)',
              minWidth: 'clamp(28px, 6vw, 36px)',
              minHeight: 'clamp(28px, 6vw, 36px)',
              WebkitTapHighlightColor: 'transparent'
            }}
            onMouseEnter={() => setHoveredButton('notifications')}
            onMouseLeave={() => setHoveredButton(null)}
            title="Bildirimler"
          >
            <div className="d-flex align-items-center" style={{ gap: '1px' }}>
              <div style={{
                width: '2px',
                height: 'clamp(6px, 1.5vw, 8px)',
                backgroundColor: '#666',
                borderRadius: '1px'
              }}></div>
              <div style={{
                width: '2px',
                height: 'clamp(8px, 2vw, 10px)',
                backgroundColor: '#666',
                borderRadius: '1px'
              }}></div>
              <div style={{
                width: '2px',
                height: 'clamp(5px, 1.2vw, 7px)',
                backgroundColor: '#666',
                borderRadius: '1px'
              }}></div>
            </div>
          </button>

          {/* Date/Time - Compact on mobile */}
          <button
            className="btn d-flex flex-column align-items-center justify-content-center text-center"
            style={{
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'all 0.15s',
              margin: 0,
              backgroundColor: hoveredButton === 'datetime'
                ? 'rgba(0, 0, 0, 0.05)'
                : 'transparent',
              border: 'none',
              boxShadow: 'none',
              padding: 'clamp(3px, 0.8vw, 5px)',
              minWidth: 'clamp(32px, 7vw, 44px)',
              minHeight: 'clamp(28px, 6vw, 36px)',
              WebkitTapHighlightColor: 'transparent'
            }}
            onMouseEnter={() => setHoveredButton('datetime')}
            onMouseLeave={() => setHoveredButton(null)}
            title="Tarih ve saat"
          >
            <div style={{
              fontSize: 'clamp(8px, 1.8vw, 10px)',
              color: '#444',
              fontWeight: '600',
              lineHeight: 1
            }}>
              11:11
            </div>
            <div 
              className="d-none d-sm-block"
              style={{
                fontSize: 'clamp(6px, 1.3vw, 8px)',
                color: '#666',
                lineHeight: 1
              }}
            >
              10/20
            </div>
          </button>

          {/* Show Desktop - Thinner on mobile */}
          <button
            className="btn"
            style={{
              borderRadius: '0 6px 6px 0',
              cursor: 'pointer',
              transition: 'all 0.15s',
              margin: 0,
              backgroundColor: hoveredButton === 'desktop'
                ? 'rgba(0, 0, 0, 0.05)'
                : 'transparent',
              border: 'none',
              borderLeft: '1px solid rgba(0,0,0,0.1)',
              boxShadow: 'none',
              padding: 0,
              width: 'clamp(4px, 1vw, 6px)',
              minHeight: 'clamp(28px, 6vw, 36px)',
              WebkitTapHighlightColor: 'transparent'
            }}
            onMouseEnter={() => setHoveredButton('desktop')}
            onMouseLeave={() => setHoveredButton(null)}
            title="Masaüstünü göster"
          >
          </button>
        </div>
      </div>
    </div>
  )
}

export default Windows11Taskbar 