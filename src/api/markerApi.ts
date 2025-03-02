import { Marker, MarkerPost } from './types';

const BASE_URL = 'https://spotmapapi.azurewebsites.net';

/**
 * Get all markers
 */
export const getMarkers = async (): Promise<Marker[]> => {
  const response = await fetch(`${BASE_URL}/markers`);

  if (!response.ok) {
    throw new Error('Failed to fetch markers');
  }

  return response.json();
};

/**
 * Get a single marker by ID
 */
export const getMarkerById = async (id: number): Promise<Marker> => {
  const response = await fetch(`${BASE_URL}/markers/${id}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch marker with ID: ${id}`);
  }

  return response.json();
};

/**
 * Create a new marker
 */
export const postMarker = async (marker: MarkerPost): Promise<Marker> => {
  const response = await fetch(`${BASE_URL}/markers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(marker)
  });

  if (!response.ok) {
    throw new Error('Failed to create marker');
  }

  return response.json();
};

/**
 * Delete a marker by ID
 */
export const deleteMarker = async (id: number): Promise<void> => {
  const response = await fetch(`${BASE_URL}/markers/${id}`, {
    method: 'DELETE'
  });

  if (!response.ok) {
    throw new Error(`Failed to delete marker with ID: ${id}`);
  }
};