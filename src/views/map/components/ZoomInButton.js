import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { MdAdd } from 'react-icons/md'
import { getThemeStyles } from 'map-import'

const ZoomInButton = ({ size, position, onClick, disabled = false, isVisible = true }) => {
  const { mapTheme } = useSelector((state) => state.map)
  const themeStyles = getThemeStyles(mapTheme)
  const [isHovered, setIsHovered] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  const handleClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
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
    setIsActive(false)
  }

  const handleMouseDown = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (!disabled) {
      setIsActive(true)
    }
  }

  const handleMouseUp = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsActive(false)
  }

  const handleFocus = () => {
    setIsFocused(true)
  }

  const handleBlur = () => {
    setIsFocused(false)
  }

  // Dinamik stil oluştur
  const buttonStyle = {
    ...themeStyles.baseButtonStyle,
    width: size.width,
    height: size.height,
    top: position.top,
    right: position.right,
    ...(isHovered && !disabled ? themeStyles.buttonHoverStyle : {}),
    ...(isActive && !disabled ? themeStyles.buttonActiveStyle : {}),
    ...(isFocused ? themeStyles.buttonFocusStyle : {}),
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
    onMouseDown: handleMouseDown,
    onMouseUp: handleMouseUp,
    onFocus: handleFocus,
    onBlur: handleBlur,
    disabled,
    title: 'Yakınlaştır',
    'aria-label': 'Haritayı yakınlaştır'
  }, React.createElement(MdAdd, {
    size: Math.min(size.width, size.height) * 0.5
  }))
}

export default ZoomInButton 