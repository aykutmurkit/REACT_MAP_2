import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { MdLightMode, MdDarkMode, MdSettingsBrightness } from 'react-icons/md'
import { toggleMapTheme } from '../../../redux/slices/mapSlice'
import { getThemeStyles } from 'map-import'

const ThemeToggleButton = ({ size, position, disabled = false, isVisible = true }) => {
  const dispatch = useDispatch()
  const { mapTheme } = useSelector((state) => state.map)
  const themeStyles = getThemeStyles(mapTheme)
  const [isHovered, setIsHovered] = useState(false)

  const handleClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (!disabled) {
      dispatch(toggleMapTheme())
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

  const getIcon = () => {
    switch (mapTheme) {
      case 'light':
        return MdLightMode
      case 'dark':
        return MdDarkMode
      case 'auto':
        return MdSettingsBrightness
      default:
        return MdLightMode
    }
  }

  const getTitle = () => {
    switch (mapTheme) {
      case 'light':
        return 'Açık Tema (Koyu temaya geç)'
      case 'dark':
        return 'Koyu Tema (Otomatik temaya geç)'
      case 'auto':
        return 'Otomatik Tema (Açık temaya geç)'
      default:
        return 'Tema Değiştir'
    }
  }

  if (!isVisible) {
    return null
  }

  const buttonStyle = {
    ...themeStyles.baseButtonStyle,
    width: size.width,
    height: size.height,
    top: position.top,
    right: position.right,
    ...(isHovered && !disabled ? themeStyles.buttonHoverStyle : {}),
    ...(disabled ? { opacity: 0.5, cursor: 'not-allowed' } : {})
  }

  const IconComponent = getIcon()

  return React.createElement('button', {
    style: buttonStyle,
    onClick: handleClick,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    disabled,
    title: getTitle(),
    'aria-label': getTitle()
  }, React.createElement(IconComponent, {
    size: Math.min(size.width, size.height) * 0.5
  }))
}

export default ThemeToggleButton 