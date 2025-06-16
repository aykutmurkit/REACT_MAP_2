import React from 'react'
import { MdLocationOn, MdHome, MdBusiness, MdPublic } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { getThemeStyles } from 'map-import'

const MapSearchBarResult = ({ results, onResultClick, visible, width, iconColor, textColor }) => {
  const { mapTheme } = useSelector((state) => state.map)
  const themeStyles = getThemeStyles(mapTheme)
  const isLight = mapTheme === 'light'
  const isDark = mapTheme === 'dark'
  const effectiveIconColor = iconColor || (isLight ? '#222' : '#fff')
  const effectiveTextColor = textColor || (isLight ? '#222' : '#fff')
  const secondaryTextColor = isDark ? 'rgba(255,255,255,0.7)' : '#666'

  if (!visible || !results || results.length === 0) {
    return null
  }

  // Get appropriate icon based on result type
  const getIconForType = (type) => {
    switch (type) {
      case 'house':
      case 'residential':
      case 'apartments':
        return <MdHome style={{ color: effectiveIconColor }} />
      case 'commercial':
      case 'office':
      case 'retail':
      case 'industrial':
        return <MdBusiness style={{ color: effectiveIconColor }} />
      case 'country':
      case 'state':
      case 'city':
      case 'town':
        return <MdPublic style={{ color: effectiveIconColor }} />
      default:
        return <MdLocationOn style={{ color: effectiveIconColor }} />
    }
  }

  // Format address to show the most relevant parts
  const formatDisplayAddress = (result) => {
    if (!result.address) return result.name

    const { road, house_number, suburb, city, county, state, country } = result.address
    
    let mainPart = ''
    if (road) {
      mainPart = house_number ? `${road} ${house_number}` : road
    }
    
    let secondaryPart = ''
    if (city) {
      secondaryPart = suburb ? `${suburb}, ${city}` : city
    } else if (county) {
      secondaryPart = county
    }
    
    let tertiaryPart = ''
    if (state && country) {
      tertiaryPart = `${state}, ${country}`
    } else if (country) {
      tertiaryPart = country
    }
    
    const parts = [mainPart, secondaryPart, tertiaryPart].filter(part => part)
    return parts.length > 0 ? parts.join(', ') : result.name
  }

  const containerStyle = {
    maxHeight: 300,
    backgroundColor: themeStyles.baseButtonStyle.backgroundColor,
    borderRadius: 8,
    boxShadow: '0 2px 10px rgba(0,0,0,0.15)',
    overflow: 'hidden',
    border: `1px solid ${themeStyles.baseButtonStyle.border.split(' ')[2]}`,
    zIndex: 1090
  }

  const listStyle = {
    margin: 0,
    padding: 0,
    listStyle: 'none',
    maxHeight: 300,
    overflowY: 'auto'
  }

  const listItemStyle = {
    padding: '12px 16px',
    borderBottom: `1px solid ${themeStyles.baseButtonStyle.border.split(' ')[2]}`,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    transition: 'background-color 0.2s'
  }

  const iconStyle = {
    color: effectiveIconColor,
    fontSize: 20,
    flexShrink: 0
  }

  const textContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
  }

  const primaryTextStyle = {
    fontSize: 16,
    fontWeight: 500,
    color: effectiveTextColor,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }

  const secondaryTextStyle = {
    fontSize: 14,
    color: secondaryTextColor,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }

  return (
    <div className="position-fixed bottom-0 start-50 translate-middle-x" style={{ bottom: '130px', zIndex: 1090 }}>
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-auto">
            <div className="card" style={containerStyle}>
              <ul className="list-unstyled m-0" style={listStyle}>
                {results.map((result) => (
                  <li
                    key={result.id}
                    className="d-flex align-items-center p-3 border-bottom"
                    style={{ cursor: 'pointer', transition: 'background-color 0.2s' }}
                    onClick={() => onResultClick(result)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = themeStyles.buttonHoverStyle.backgroundColor || '#f5f5f5'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent'
                    }}
                  >
                    <div className="me-3" style={iconStyle}>
                      {getIconForType(result.type)}
                    </div>
                    <div className="flex-grow-1" style={textContainerStyle}>
                      <div style={primaryTextStyle}>
                        {result.address?.road || result.address?.suburb || result.address?.city || result.name.split(',')[0]}
                      </div>
                      <div style={secondaryTextStyle}>
                        {formatDisplayAddress(result)}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MapSearchBarResult 