import React, { useRef, useEffect, useState } from 'react'
import { MdClose, MdSearch } from 'react-icons/md'
import nominatimService from '../utils/nominatimService'
import MapSearchBarResult from './MapSearchBarResult'
import { useSelector } from 'react-redux'
import { getThemeStyles } from 'map-import'

const CONTAINER_HEIGHT = 56

const MapSearchBar = ({ width, onClose, backgroundColor, borderRadius }) => {
  const inputRef = useRef(null)
  const [visible, setVisible] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [showResults, setShowResults] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const searchTimeoutRef = useRef(null)
  const { mapTheme } = useSelector((state) => state.map)
  const themeStyles = getThemeStyles(mapTheme)

  // Color logic for theme: light = black, dark = white
  const isLight = mapTheme === 'light'
  const isDark = mapTheme === 'dark'
  const mainColor = isLight ? '#222' : '#fff'

  useEffect(() => {
    setTimeout(() => setVisible(true), 10)
    if (inputRef.current) {
      inputRef.current.focus()
    }
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClose()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current)
      }
    }
    // eslint-disable-next-line
  }, [])

  const handleClose = () => {
    setVisible(false)
    setShowResults(false)
    setTimeout(() => onClose(), 200)
  }

  const handleSearch = async (searchQuery) => {
    setQuery(searchQuery)
    
    // Clear previous timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
    }
    
    if (!searchQuery || searchQuery.trim() === '') {
      setResults([])
      setShowResults(false)
      return
    }
    
    // Debounce search to avoid too many API calls
    searchTimeoutRef.current = setTimeout(async () => {
      setIsSearching(true)
      const searchResults = await nominatimService.searchLocations(searchQuery)
      setResults(searchResults)
      setShowResults(true)
      setIsSearching(false)
    }, 300)
  }

  const handleResultClick = (result) => {
    // Access the map instance through the global mapControls object
    const map = window.mapControls?.getMap()
    
    if (map) {
      // Fly to the selected location
      map.flyTo({
        center: [result.lon, result.lat],
        zoom: 15,
        essential: true
      })
      
      // Close the search bar after a short delay
      setTimeout(() => {
        handleClose()
      }, 500)
    }
  }

  const containerStyle = {
    background: backgroundColor || 'rgba(255,255,255,0.95)',
    borderRadius: borderRadius || 8,
    boxShadow: '0 2px 10px rgba(0,0,0,0.15)',
    border: '1px solid #e0e0e0',
    height: `${CONTAINER_HEIGHT}px`,
    opacity: visible ? 1 : 0,
    transform: `translateY(${visible ? '0' : '-20px'})`,
    transition: 'opacity 0.2s, transform 0.2s',
    zIndex: 1100
  }

  const inputStyle = {
    flex: 1,
    border: 'none',
    outline: 'none',
    fontSize: 20,
    background: 'transparent',
    color: mainColor,
    height: '100%',
    padding: '0 16px',
    borderRadius: borderRadius || 8,
    boxSizing: 'border-box',
  }

  const closeBtnStyle = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: mainColor,
    fontSize: 28,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    marginRight: 8,
  }

  const searchIconStyle = {
    color: mainColor,
    fontSize: 24,
    marginLeft: 12,
  }

  const loadingIndicatorStyle = {
    width: 20,
    height: 20,
    borderRadius: '50%',
    border: '2px solid #f3f3f3',
    borderTop: `2px solid ${mainColor}`,
    animation: 'spin 1s linear infinite',
    marginLeft: 12,
  }

  return (
    <>
      <div className="position-fixed bottom-0 start-50 translate-middle-x mb-5" style={{ zIndex: 1100 }}>
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-auto">
              <div className="d-flex align-items-center" style={containerStyle}>
                {isSearching ? (
                  <div style={loadingIndicatorStyle} className="ms-3" />
                ) : (
                  <MdSearch style={searchIconStyle} className="ms-3" />
                )}
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Haritada ara..."
                  style={inputStyle}
                  className="map-search-bar-input flex-grow-1"
                  value={query}
                  onChange={(e) => handleSearch(e.target.value)}
                />
                <button 
                  className="btn btn-sm me-2" 
                  style={closeBtnStyle} 
                  onClick={handleClose} 
                  title="Kapat"
                >
                  <MdClose />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MapSearchBarResult 
        results={results}
        onResultClick={handleResultClick}
        visible={showResults && results.length > 0}
        width="auto"
        iconColor={mainColor}
        textColor={mainColor}
      />
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .map-search-bar-input::placeholder {
          color: ${mainColor} !important;
          opacity: 1;
        }
      `}</style>
    </>
  )
}

export default MapSearchBar 