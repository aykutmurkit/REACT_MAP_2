import React from 'react'
import { MdSearch, MdChevronRight, MdPerson, MdPowerSettingsNew, MdExitToApp } from 'react-icons/md'

/**
 * Windows 11 Style Start Menu Dropdown
 * Responsive dropdown with search, pinned apps, recommended items, and user profile
 */
const StartMenuDropdown = ({
  isVisible,
  profileDropdownStyle,
  themeStyles,
  searchQuery,
  setSearchQuery,
  pinnedApps,
  recommendedItems,
  onManagementClick,
  onSearchOpen,
  onLogout,
}) => {
  if (!isVisible) return null

  return (
    <div
      className="mb-1 mb-sm-2 mb-md-3 mx-1 mx-sm-0"
      style={profileDropdownStyle}
    >
      <div className="p-2 p-sm-3 p-md-4">
        {/* Search Bar */}
        <div className="mb-4">
          <div className="position-relative">
            <MdSearch 
              className="position-absolute top-50 translate-middle-y ms-3"
              style={{ 
                fontSize: '16px', 
                color: themeStyles.baseButtonStyle.color,
                opacity: 0.6,
                left: '4px'
              }} 
            />
            <input
              type="text"
              placeholder="Arama yapın"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-control"
              style={{
                backgroundColor: `${themeStyles.baseButtonStyle.backgroundColor}`,
                border: `1px solid ${themeStyles.baseButtonStyle.border.split(' ')[2]}`,
                borderRadius: '8px',
                paddingLeft: '40px',
                fontSize: 'clamp(13px, 2vw, 14px)',
                color: themeStyles.baseButtonStyle.color,
                minHeight: '40px'
              }}
            />
          </div>
        </div>

        {/* Pinned Section */}
        <div className="mb-4">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <h6 className="m-0" style={{ 
              fontSize: 'clamp(13px, 2.5vw, 15px)', 
              fontWeight: '600',
              color: themeStyles.baseButtonStyle.color 
            }}>
              Sabitlenmiş
            </h6>
            <button 
              className="btn btn-link p-0 d-flex align-items-center"
              style={{ 
                fontSize: 'clamp(12px, 2vw, 13px)', 
                color: '#0078d4',
                textDecoration: 'none'
              }}
            >
              Tüm uygulamalar
              <MdChevronRight className="ms-1" style={{ fontSize: '14px' }} />
            </button>
          </div>
          
          {/* Apps Grid - Mobile Responsive */}
          <div className="row g-1 g-sm-2">
            {pinnedApps.map((app) => (
              <div key={app.id} className="col-6 col-sm-4 col-md-3 col-lg-2">
                <button
                  className="btn w-100 d-flex flex-column align-items-center p-2"
                  style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    borderRadius: '8px',
                    transition: 'all 0.2s',
                    minHeight: 'clamp(70px, 15vw, 90px)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = themeStyles.buttonHoverStyle.backgroundColor || 'rgba(0, 120, 212, 0.1)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent'
                  }}
                  onClick={() => {
                    console.log(`${app.title} clicked`)
                    if (app.id === 'management') onManagementClick()
                    if (app.id === 'search') onSearchOpen()
                  }}
                >
                  <div
                    className="rounded d-flex align-items-center justify-content-center mb-2"
                    style={{
                      width: 'clamp(32px, 7vw, 40px)',
                      height: 'clamp(32px, 7vw, 40px)',
                      backgroundColor: app.color,
                    }}
                  >
                    <app.icon 
                      style={{ 
                        fontSize: 'clamp(16px, 4vw, 20px)', 
                        color: 'white' 
                      }} 
                    />
                  </div>
                  <span 
                    style={{ 
                      fontSize: 'clamp(10px, 1.8vw, 12px)', 
                      color: themeStyles.baseButtonStyle.color,
                      textAlign: 'center',
                      lineHeight: '1.2'
                    }}
                  >
                    {app.title}
                  </span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Section */}
        <div className="mb-3">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <h6 className="m-0" style={{ 
              fontSize: 'clamp(13px, 2.5vw, 15px)', 
              fontWeight: '600',
              color: themeStyles.baseButtonStyle.color 
            }}>
              Önerilen
            </h6>
            <button 
              className="btn btn-link p-0 d-flex align-items-center"
              style={{ 
                fontSize: 'clamp(12px, 2vw, 13px)', 
                color: '#0078d4',
                textDecoration: 'none'
              }}
            >
              Daha fazla
              <MdChevronRight className="ms-1" style={{ fontSize: '14px' }} />
            </button>
          </div>
          
          {/* Recommended Items */}
          <div className="d-flex flex-column gap-1">
            {recommendedItems.map((item) => (
              <button
                key={item.id}
                className="btn d-flex align-items-center text-start p-2"
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  borderRadius: '6px',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = themeStyles.buttonHoverStyle.backgroundColor || 'rgba(0, 120, 212, 0.1)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent'
                }}
              >
                <div
                  className="rounded me-3 d-flex align-items-center justify-content-center"
                  style={{
                    width: 'clamp(24px, 5vw, 28px)',
                    height: 'clamp(24px, 5vw, 28px)',
                    backgroundColor: item.color,
                  }}
                >
                  <item.icon 
                    style={{ 
                      fontSize: 'clamp(12px, 3vw, 14px)', 
                      color: 'white' 
                    }} 
                  />
                </div>
                <div className="flex-grow-1">
                  <div 
                    style={{ 
                      fontSize: 'clamp(12px, 2vw, 13px)', 
                      color: themeStyles.baseButtonStyle.color,
                      fontWeight: '500'
                    }}
                  >
                    {item.title}
                  </div>
                  <div 
                    style={{ 
                      fontSize: 'clamp(10px, 1.8vw, 11px)', 
                      color: themeStyles.baseButtonStyle.color,
                      opacity: 0.7
                    }}
                  >
                    {item.subtitle}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* User Profile Section */}
        <div className="border-top pt-3" style={{ 
          borderColor: `${themeStyles.baseButtonStyle.border.split(' ')[2]} !important`,
          opacity: 0.3
        }}>
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-2">
              <div
                className="rounded-circle d-flex align-items-center justify-content-center"
                style={{
                  width: 'clamp(28px, 6vw, 32px)',
                  height: 'clamp(28px, 6vw, 32px)',
                  backgroundColor: '#0078d4',
                  border: '2px solid rgba(0, 120, 212, 0.2)'
                }}
              >
                <MdPerson 
                  style={{ 
                    fontSize: 'clamp(14px, 3.5vw, 16px)', 
                    color: 'white' 
                  }} 
                />
              </div>
              <span 
                style={{ 
                  fontSize: 'clamp(12px, 2vw, 13px)', 
                  color: themeStyles.baseButtonStyle.color,
                  fontWeight: '500'
                }}
              >
                Ahmet Kurtulmuş
              </span>
            </div>
            
            <button
              className="btn btn-link p-0"
              onClick={onLogout}
              style={{
                color: '#dc3545',
                textDecoration: 'none'
              }}
              title="Çıkış Yap"
            >
              <MdPowerSettingsNew style={{ fontSize: 'clamp(16px, 3.5vw, 18px)' }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StartMenuDropdown 