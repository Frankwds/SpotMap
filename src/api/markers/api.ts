import { Marker, MarkerPost } from './types';
import { authFetch } from '../interceptors';
import { getAllMarkersUrl, getMyMarkersUrl, getUserMarkersUrl, postMarkerUrl } from './urls';

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
export const getMyMarkers = async (): Promise<Marker[]> => {
  const response = await authFetch(getMyMarkersUrl());

  if (!response.ok) {
    throw new Error('Failed to fetch user markers');
  }

  const userMarkers: Marker[] = await response.json();
  return userMarkers;
};

/**
 * Get markers for a specific user
 */
export const getMarkersByUserId = async (userId: string): Promise<Marker[]> => {
  const response = await authFetch(getUserMarkersUrl(userId));

  if (!response.ok) {
    throw new Error(`Failed to fetch markers for user with ID: ${userId}`);
  }

  const userMarkers: Marker[] = await response.json();
  return userMarkers;
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
