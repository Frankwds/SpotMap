import { Marker, MarkerPost, MarkerDetails, RateMarkerResponse } from './types';
import { authFetch } from './interceptors';
import { API_CONFIG } from '../config/appConfig';

const MARKERS_URL = `${API_CONFIG.BASE_URL}${API_CONFIG.MARKERS_PATH}`;

/**
 * Get all markers
 */
export const getMarkers = async (): Promise<Marker[]> => {
  const response = await authFetch(MARKERS_URL);

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
  const response = await authFetch(`${MARKERS_URL}/user`);

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
  const response = await authFetch(`${MARKERS_URL}/${id}`);

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
  const response = await authFetch(MARKERS_URL, {
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
  const response = await authFetch(`${MARKERS_URL}/${id}`, {
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
  const response = await authFetch(`${MARKERS_URL}/${id}`, {
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

/**
 * Rate a marker
 */

export const apiRateMarker = async (id: number, rating: number): Promise<RateMarkerResponse> => {
  const response = await authFetch(`${MARKERS_URL}/${id}/rate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ rating })
  });

  if (!response.ok) {
    throw new Error(`Failed to rate marker with ID: ${id}`);
  }

  const newMeanRating: RateMarkerResponse = await response.json();
  return newMeanRating;
};

/**
 * Upload an image to a marker (main image or additional)
 */
export const uploadMarkerImage = async (id: number, file: File, isMainImage: boolean): Promise<MarkerDetails> => {
  const formData = new FormData();
  formData.append('image', file);
  formData.append('isMainImage', isMainImage.toString());

  const response = await authFetch(`${MARKERS_URL}/${id}/images`, {
    method: 'POST',
    body: formData
  });

  if (!response.ok) {
    throw new Error(`Failed to upload image for marker with ID: ${id}`);
  }

  const updatedMarker: MarkerDetails = await response.json();
  return updatedMarker;
};

/**
 * Delete an image from a marker's additional images
 */
export const deleteMarkerImage = async (markerId: number, imageUrl: string): Promise<MarkerDetails> => {
  const encodedImageUrl = encodeURIComponent(imageUrl);
  const response = await authFetch(`${MARKERS_URL}/${markerId}/images?imageUrl=${encodedImageUrl}`, {
    method: 'DELETE'
  });

  if (!response.ok) {
    throw new Error(`Failed to delete image for marker with ID: ${markerId}`);
  }

  const updatedMarker: MarkerDetails = await response.json();
  return updatedMarker;
};
