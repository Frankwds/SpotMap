/**
 * Application configuration
 */

// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_BASE_URL || 'https://spotmapapi.azurewebsites.net',
  AUTH_PATH: '/api/auth',
  MARKERS_PATH: '/api/markers',
};

// Google Maps Configuration
export const MAPS_CONFIG = {
  API_KEY: process.env.REACT_APP_GOOGLE_API_KEY || '',
  MAP_ID: '64b9cff6747cc800',
  DEFAULT_CENTER: { lat: 63.429, lng: 10.392 },
  DEFAULT_ZOOM: 9,
};

// Category Configuration
export const CATEGORIES = [
  { id: 'diving', name: 'Diving' },
  { id: 'kitesurf', name: 'Kitesurf' },
  { id: 'skiing', name: 'Skiing' },
];
