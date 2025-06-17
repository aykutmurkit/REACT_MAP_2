import { useState } from 'react'

/**
 * Custom hook to manage all menu states
 * Centralizes state management for better maintainability
 */
export const useMenuState = () => {
  const [hoveredButton, setHoveredButton] = useState(null)
  const [isMenuBarVisible, setIsMenuBarVisible] = useState(false)
  const [showSearchBar, setShowSearchBar] = useState(false)
  const [showMapManagement, setShowMapManagement] = useState(false)
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const handleMenuClick = () => {
    setShowProfileDropdown(!showProfileDropdown)
    setIsMenuBarVisible(false)
  }

  const handleMenuBarClick = () => {
    setIsMenuBarVisible(!isMenuBarVisible)
    setShowProfileDropdown(false)
  }

  const handleManagementClick = () => {
    setShowMapManagement(!showMapManagement)
  }

  const handleLogout = () => {
    console.log('Logout clicked')
    setShowProfileDropdown(false)
  }

  const handleSearchOpen = () => {
    setShowSearchBar(true)
  }

  const handleSearchClose = () => {
    setShowSearchBar(false)
  }

  const handleManagementClose = () => {
    setShowMapManagement(false)
  }

  const handleMenuBarClose = () => {
    setIsMenuBarVisible(false)
  }

  return {
    // State
    hoveredButton,
    isMenuBarVisible,
    showSearchBar,
    showMapManagement,
    showProfileDropdown,
    searchQuery,
    
    // State setters
    setHoveredButton,
    setSearchQuery,
    
    // Handlers
    handleMenuClick,
    handleMenuBarClick,
    handleManagementClick,
    handleLogout,
    handleSearchOpen,
    handleSearchClose,
    handleManagementClose,
    handleMenuBarClose,
  }
} 