import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { MdFullscreen, MdFullscreenExit } from 'react-icons/md'
import { toggleMapFullscreen } from '../../../redux/slices/mapSlice'
import { getThemeStyles } from '../utils/themeUtils'
import { getControlPropsForDevice } from '../utils/mapUtils'

const FullscreenButton = ({ isVisible = true }) => {
  const dispatch = useDispatch()
  const { isMapFullscreen, deviceType, mapTheme } = useSelector((state) => state.map)
  const themeStyles = getThemeStyles(mapTheme)
  
  const { controls } = useSelector((state) => state.map)
  const controlProps = getControlPropsForDevice(controls, 'fullscreen', deviceType)
  
  if (!isVisible || !controlProps.isVisible) {
    return null
  }

  const handleClick = () => {
    dispatch(toggleMapFullscreen())
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
    cursor: 'pointer',
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
      onClick={handleClick}
      onMouseEnter={(e) => {
        Object.assign(e.target.style, hoverStyle)
      }}
      onMouseLeave={(e) => {
        Object.assign(e.target.style, buttonStyle)
      }}
      title={isMapFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
    >
      {isMapFullscreen ? <MdFullscreenExit /> : <MdFullscreen />}
    </div>
  )
}

export default FullscreenButton 