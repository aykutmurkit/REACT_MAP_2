import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { MdRedo } from 'react-icons/md'
import { getThemeStyles } from 'map-import'

const RedoButton = ({ size, position, onClick, disabled = false, isVisible = true }) => {
  const { mapTheme } = useSelector((state) => state.map)
  const themeStyles = getThemeStyles(mapTheme)
  const [isHovered, setIsHovered] = useState(false)

  const handleClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    console.log('RedoButton clicked')
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
    ...themeStyles.baseButtonStyle,
    width: size.width,
    height: size.height,
    top: position.top,
    right: position.right,
    ...(isHovered && !disabled ? themeStyles.buttonHoverStyle : {}),
    ...(disabled ? { opacity: 0.5, cursor: 'not-allowed' } : {})
  }

  return React.createElement('button', {
    style: buttonStyle,
    onClick: handleClick,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    disabled,
    title: 'İleri Al',
    'aria-label': 'Son geri alınan işlemi tekrarla'
  }, React.createElement(MdRedo, {
    size: Math.min(size.width, size.height) * 0.5
  }))
}

export default RedoButton 