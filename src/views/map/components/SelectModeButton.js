import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { MdPanTool } from 'react-icons/md'
import { getThemeStyles } from 'map-import'

const SelectModeButton = ({ size, position, onClick, disabled = false, isActive = false, isVisible = true }) => {
  const { mapTheme } = useSelector((state) => state.map)
  const themeStyles = getThemeStyles(mapTheme)
  const [isHovered, setIsHovered] = useState(false)

  const handleClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    console.log('SelectModeButton clicked')
    if (!disabled && onClick) {
      onClick('simple_select')
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
    title: 'Seçim Modu',
    'aria-label': 'Şekil seçim modunu aktifleştir'
  }, React.createElement(MdPanTool, {
    size: Math.min(size.width, size.height) * 0.5
  }))
}

export default SelectModeButton 