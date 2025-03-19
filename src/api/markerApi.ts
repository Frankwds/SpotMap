import { Marker, MarkerPost } from './types';
import { authFetch } from './interceptors';

const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://spotmapapi.azurewebsites.net';
// const BASE_URL = 'http://localhost:5208'
/**
 * Get all markers
 */
export const getMarkers = async (): Promise<Marker[]> => {
  const response = await authFetch(`${BASE_URL}/markers`);

  if (!response.ok) {
    throw new Error('Failed to fetch markers');
  }

  const apiMarkers: Marker[] = await response.json();
  return apiMarkers;
};

/**
 * Get a single marker by ID
 */
export const getMarkerById = async (id: number): Promise<Marker> => {
  const response = await authFetch(`${BASE_URL}/markers/${id}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch marker with ID: ${id}`);
  }

  const marker: Marker = await response.json();
  return marker;
};

/**
 * Create a new marker
 */
export const postMarker = async (marker: MarkerPost): Promise<Marker> => {
  const response = await authFetch(`${BASE_URL}/markers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(marker)
  });

  if (!response.ok) {
    throw new Error('Failed to create marker');
  }

  const newMarker: Marker = await response.json();
  return newMarker;
};

/**
 * Delete a marker by ID
 */
export const deleteMarker = async (id: number): Promise<void> => {
  const response = await authFetch(`${BASE_URL}/markers/${id}`, {
    method: 'DELETE'
  });

  if (!response.ok) {
    throw new Error(`Failed to delete marker with ID: ${id}`);
  }
};