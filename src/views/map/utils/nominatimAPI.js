/**
 * Nominatim API utilities for geocoding and search functionality
 */

/**
 * Search for locations using Nominatim API
 * @param {string} query - Search query
 * @param {number} limit - Maximum number of results (default: 5)
 * @returns {Promise<Array>} - Array of search results
 */
export const searchLocations = async (query, limit = 5) => {
  if (!query || query.trim() === '') {
    return []
  }

  try {
    const params = new URLSearchParams({
      q: query,
      format: 'json',
      addressdetails: 1,
      limit: limit,
      'accept-language': 'tr'
    })

    const response = await fetch(`https://nominatim.openstreetmap.org/search?${params.toString()}`, {
      headers: {
        'User-Agent': 'ReactMapApplication/1.0'
      }
    })

    if (!response.ok) {
      throw new Error(`Nominatim API error: ${response.status}`)
    }

    const data = await response.json()
    return data.map(item => ({
      id: item.place_id,
      name: item.display_name,
      lat: parseFloat(item.lat),
      lon: parseFloat(item.lon),
      type: item.type,
      importance: item.importance,
      address: item.address
    }))
  } catch (error) {
    console.error('Error searching locations:', error)
    return []
  }
}

/**
 * Get location details by coordinates
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @returns {Promise<Object>} - Location details
 */
export const reverseGeocode = async (lat, lon) => {
  try {
    const params = new URLSearchParams({
      lat: lat,
      lon: lon,
      format: 'json',
      addressdetails: 1,
      'accept-language': 'tr'
    })

    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?${params.toString()}`, {
      headers: {
        'User-Agent': 'ReactMapApplication/1.0'
      }
    })

    if (!response.ok) {
      throw new Error(`Nominatim API error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error reverse geocoding:', error)
    return null
  }
}

/**
 * Format address details into a readable string
 * @param {Object} address - Address object from Nominatim
 * @returns {string} - Formatted address
 */
export const formatAddress = (address) => {
  if (!address) return ''
  
  const parts = []
  
  if (address.road) parts.push(address.road)
  if (address.house_number) parts.push(address.house_number)
  if (address.suburb) parts.push(address.suburb)
  if (address.city_district) parts.push(address.city_district)
  if (address.city) parts.push(address.city)
  if (address.county) parts.push(address.county)
  if (address.state) parts.push(address.state)
  if (address.country) parts.push(address.country)
  
  return parts.join(', ')
}

// Export all functions as a default object as well
const nominatimAPI = {
  searchLocations,
  reverseGeocode,
  formatAddress
}

export default nominatimAPI 