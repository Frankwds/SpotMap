import { Marker, MarkerPost, MarkerDetails } from './types';
import { authFetch } from '../interceptors';
import { getAllMarkersUrl, getMyMarkersUrl, getMarkerByIdUrl, postMarkerUrl, deleteMarkerUrl, updateMarkerUrl } from './urls';

/**
 * Get all markers
 */
export const getMarkers = async (): Promise<Marker[]> => {
  const response = await authFetch(getAllMarkersUrl());

  if (!response.ok) {
    throw new Error('Failed to fetch markers');
  }

  const apiMarkers: Marker[] = await response.json();
  return apiMarkers;
};

/**
 * Get markers for the current user
 */
export const getUserMarkers = async (): Promise<Marker[]> => {
  const response = await authFetch(getMyMarkersUrl());

  if (!response.ok) {
    throw new Error('Failed to fetch user markers');
  }

  const userMarkers: Marker[] = await response.json();
  return userMarkers;
};

/**
 * Get a single marker by ID with full details
 */
export const getMarkerById = async (id: number): Promise<MarkerDetails> => {
  const response = await authFetch(getMarkerByIdUrl(id));

  if (!response.ok) {
    throw new Error(`Failed to fetch marker with ID: ${id}`);
  }

  const marker: MarkerDetails = await response.json();
  return marker;
};

/**
 * Create a new marker
 */
export const postMarker = async (marker: MarkerPost): Promise<Marker> => {
  const response = await authFetch(postMarkerUrl(), {
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
  const response = await authFetch(deleteMarkerUrl(id), {
    method: 'DELETE'
  });

  if (!response.ok) {
    throw new Error(`Failed to delete marker with ID: ${id}`);
  }
};

/**
 * Update an existing marker
 */
export const updateMarker = async (id: number, markerData: Partial<MarkerDetails>): Promise<MarkerDetails> => {
  const response = await authFetch(updateMarkerUrl(id), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(markerData)
  });

  if (!response.ok) {
    throw new Error(`Failed to update marker with ID: ${id}`);
  }

  const updatedMarker: MarkerDetails = await response.json();
  return updatedMarker;
};
