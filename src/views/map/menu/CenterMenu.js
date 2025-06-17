import React from 'react'
import { useSelector } from 'react-redux'
import { getThemeStyles } from 'map-import'

// Components
import Windows11Taskbar from './components/Windows11Taskbar'
import StartMenuDropdown from './components/StartMenuDropdown'
import CenterMenuBar from '../components/CenterMenuBar'
import MapSearchBar from '../components/MapSearchBar'
import MapManagement from '../components/MapManagement'

// Hooks and utilities
import { useMenuState } from './hooks/useMenuState'
import { getMenuContainerStyle, getProfileDropdownStyle, getMenuAnimationCSS } from './utils/menuStyles'
import { pinnedApps, recommendedItems, createTaskbarButtons } from './config/menuData'

/**
 * Refactored Center Menu Component
 * Modern, maintainable, and responsive Windows 11 style menu system
 * 
 * Features:
 * - Windows 11 authentic taskbar design
 * - Responsive Start Menu dropdown
 * - Modular component architecture
 * - Centralized state management
 * - Best practices implementation
 */
const CenterMenu = () => {
  // Redux state
  const { mapTheme } = useSelector((state) => state.map)
  const themeStyles = getThemeStyles(mapTheme)

  // Custom hook for menu state management
  const menuState = useMenuState()

  // Create taskbar buttons with handlers
  const taskbarButtons = createTaskbarButtons({
    handleMenuClick: menuState.handleMenuClick,
    handleMenuBarClick: menuState.handleMenuBarClick,
    handleSearchOpen: menuState.handleSearchOpen,
  })

  // Style calculations
  const menuContainerStyle = getMenuContainerStyle(themeStyles)
  const profileDropdownStyle = getProfileDropdownStyle(themeStyles, menuState.showProfileDropdown)

  return (
    <>
      {/* CSS Animations */}
      <style jsx>{getMenuAnimationCSS()}</style>

      {/* Modal Components */}
      <MapManagement 
        isVisible={menuState.showMapManagement} 
        onClose={menuState.handleManagementClose} 
      />
      
      <CenterMenuBar
        isVisible={menuState.isMenuBarVisible}
        onClose={menuState.handleMenuBarClose}
        width="auto"
      />
      
      {menuState.showSearchBar && (
        <MapSearchBar
          width="auto"
          onClose={menuState.handleSearchClose}
          backgroundColor={themeStyles.baseButtonStyle.backgroundColor}
          borderRadius={menuContainerStyle.borderRadius}
        />
      )}

      {/* Main Menu Container */}
      <div
        className="position-fixed bottom-0 start-50 translate-middle-x"
        style={{ zIndex: menuContainerStyle.zIndex }}
      >
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-auto">
              <div className="d-flex flex-column align-items-center">
                
                {/* Windows 11 Start Menu Dropdown */}
                <StartMenuDropdown
                  isVisible={menuState.showProfileDropdown}
                  profileDropdownStyle={profileDropdownStyle}
                  themeStyles={themeStyles}
                  searchQuery={menuState.searchQuery}
                  setSearchQuery={menuState.setSearchQuery}
                  pinnedApps={pinnedApps}
                  recommendedItems={recommendedItems}
                  onManagementClick={menuState.handleManagementClick}
                  onSearchOpen={menuState.handleSearchOpen}
                  onLogout={menuState.handleLogout}
                />

                {/* Windows 11 Taskbar */}
                <Windows11Taskbar
                  buttons={taskbarButtons}
                  hoveredButton={menuState.hoveredButton}
                  setHoveredButton={menuState.setHoveredButton}
                  showProfileDropdown={menuState.showProfileDropdown}
                  isMenuBarVisible={menuState.isMenuBarVisible}
                  onMenuClick={menuState.handleMenuClick}
                  onMenuBarClick={menuState.handleMenuBarClick}
                  onSearchClick={menuState.handleSearchOpen}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CenterMenu 