import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { MdStraighten } from 'react-icons/md'
import { getThemeStyles } from 'map-import'

const MeasureDistanceButton = ({ size, position, onClick, disabled = false, isActive = false, isVisible = true }) => {
  const { mapTheme } = useSelector((state) => state.map)
  const themeStyles = getThemeStyles(mapTheme)
  const [isHovered, setIsHovered] = useState(false)

  const handleClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    console.log('MeasureDistanceButton clicked')
    if (!disabled && onClick) {
      onClick()
    }
  }

  const handleMouseEnter = () => {
    if (!disabled) {
      setIsHovered(true)
    }
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  const buttonStyle = {
    ...(isActive ? themeStyles.activeDrawModeButtonStyle : themeStyles.drawModeButtonStyle),
    width: size.width,
    height: size.height,
    top: position.top,
    right: position.right,
    ...(isHovered && !disabled ? themeStyles.drawModeButtonHoverStyle : {}),
    ...(disabled ? { opacity: 0.5, cursor: 'not-allowed' } : {})
  }

  return React.createElement('button', {
    style: buttonStyle,
    onClick: handleClick,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    disabled,
    title: 'Mesafe Ölç',
    'aria-label': 'Mesafe ölçüm modunu aktifleştir'
  }, React.createElement(MdStraighten, {
    size: Math.min(size.width, size.height) * 0.5
  }))
}

export default MeasureDistanceButton 