import { RateMarkerResponse } from './types';
import { authFetch } from './interceptors';
import { API_CONFIG } from '../config/appConfig';

const MARKERS_URL = `${API_CONFIG.BASE_URL}${API_CONFIG.MARKERS_PATH}`;

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