import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getThemeStyles } from 'map-import'

const FpsButton = ({ size, position, isVisible = true }) => {
  const { mapTheme } = useSelector((state) => state.map)
  const themeStyles = getThemeStyles(mapTheme)
  const [isHovered, setIsHovered] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [fps, setFps] = useState(0)

  // FPS hesaplama
  useEffect(() => {
    let frameCount = 0
    let lastTime = performance.now()
    let frameId

    const countFrames = () => {
      const now = performance.now()
      frameCount++
      
      if (now - lastTime >= 1000) {
        setFps(Math.round(frameCount * 1000 / (now - lastTime)))
        frameCount = 0
        lastTime = now
      }
      
      frameId = requestAnimationFrame(countFrames)
    }

    frameId = requestAnimationFrame(countFrames)
    
    return () => {
      cancelAnimationFrame(frameId)
    }
  }, [])

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setIsActive(false)
  }

  const handleMouseDown = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsActive(true)
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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    whiteSpace: 'nowrap',
    ...(isHovered ? themeStyles.buttonHoverStyle : {}),
    ...(isActive ? themeStyles.buttonActiveStyle : {}),
    ...(isFocused ? themeStyles.buttonFocusStyle : {})
  }

  // FPS değeri için stil
  const fpsTextStyle = {
    fontSize: '14px',
    fontWeight: 'bold',
    display: 'inline-block'
  }

  if (!isVisible) {
    return null
  }

  return React.createElement('button', {
    style: buttonStyle,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onMouseDown: handleMouseDown,
    onMouseUp: handleMouseUp,
    onFocus: handleFocus,
    onBlur: handleBlur,
    title: 'FPS Gösterimi',
    'aria-label': 'FPS Gösterimi'
  }, 
    React.createElement('span', {
      style: fpsTextStyle
    }, `${fps} FPS`)
  )
}

export default FpsButton 