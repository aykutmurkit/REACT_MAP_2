import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { MdTimeline } from 'react-icons/md'
import { getThemeStyles } from 'map-import'

const DrawLineButton = ({ size, position, onClick, disabled = false, isActive = false, isVisible = true }) => {
  const { mapTheme } = useSelector((state) => state.map)
  const themeStyles = getThemeStyles(mapTheme)
  const [isHovered, setIsHovered] = useState(false)

  const handleClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    console.log('DrawLineButton clicked')
    if (!disabled && onClick) {
      onClick('draw_line_string')
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

  if (!isVisible) {
    return null
  }

  return React.createElement('button', {
    style: buttonStyle,
    onClick: handleClick,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    disabled,
    title: 'Çizgi Çiz',
    'aria-label': 'Çizgi çizim modunu aktifleştir'
  }, React.createElement(MdTimeline, {
    size: Math.min(size.width, size.height) * 0.5
  }))
}

export default DrawLineButton 