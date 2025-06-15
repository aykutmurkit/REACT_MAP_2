import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { MdCamera } from 'react-icons/md'
import { getThemeStyles } from 'map-import'
import { takeMapScreenshot } from '../utils/screenshotUtils'

const ScreenshotButton = ({ size, position, onClick, isVisible = true }) => {
  const { mapTheme } = useSelector((state) => state.map)
  const themeStyles = getThemeStyles(mapTheme)
  const [isHovered, setIsHovered] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = async () => {
    try {
      setIsLoading(true)
      await takeMapScreenshot()
    } catch (error) {
      console.error('Screenshot alınamadı:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const buttonStyle = {
    ...themeStyles.baseButtonStyle,
    width: size.width,
    height: size.height,
    top: position.top,
    right: position.right,
    ...(isHovered ? themeStyles.buttonHoverStyle : {}),
    ...(isLoading ? { opacity: 0.7, cursor: 'wait' } : {})
  }

  if (!isVisible) return null

  return React.createElement('button', {
    style: buttonStyle,
    onClick: handleClick,
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
    disabled: isLoading,
    title: 'Ekran Görüntüsü Al'
  }, React.createElement(MdCamera, { size: 20 }))
}

export default ScreenshotButton 