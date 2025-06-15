import React from 'react'
import { useSelector } from 'react-redux'
import { MdDesktopWindows, MdTabletMac, MdPhoneIphone } from 'react-icons/md'
import { getThemeStyles } from '../utils/themeUtils'
import { getControlPropsForDevice } from '../utils/mapUtils'

const DeviceInfoButton = ({ isVisible = true }) => {
  const { deviceType, mapTheme, controls } = useSelector((state) => state.map)
  const themeStyles = getThemeStyles(mapTheme)
  
  const controlProps = getControlPropsForDevice(controls, 'deviceInfo', deviceType)
  
  if (!isVisible || !controlProps.isVisible) {
    return null
  }

  const getDeviceIcon = () => {
    switch (deviceType) {
      case 'mobile':
        return <MdPhoneIphone />
      case 'tablet':
        return <MdTabletMac />
      case 'desktop':
      default:
        return <MdDesktopWindows />
    }
  }

  const getDeviceText = () => {
    switch (deviceType) {
      case 'mobile':
        return 'Mobile'
      case 'tablet':
        return 'Tablet'
      case 'desktop':
      default:
        return 'Desktop'
    }
  }

  const buttonStyle = {
    ...themeStyles.baseButtonStyle,
    position: 'absolute',
    top: controlProps.position.top,
    right: controlProps.position.right,
    width: `${controlProps.size.width}px`,
    height: `${controlProps.size.height}px`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'default',
    zIndex: 1000,
    fontSize: '14px',
    transition: 'all 0.2s ease',
    pointerEvents: 'auto'
  }

  const hoverStyle = {
    ...buttonStyle,
    ...themeStyles.buttonHoverStyle
  }

  return (
    <div
      style={buttonStyle}
      onMouseEnter={(e) => {
        Object.assign(e.target.style, hoverStyle)
      }}
      onMouseLeave={(e) => {
        Object.assign(e.target.style, buttonStyle)
      }}
      title={`Device: ${getDeviceText()}`}
    >
      {getDeviceIcon()}
    </div>
  )
}

export default DeviceInfoButton 