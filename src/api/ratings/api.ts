import { RateMarkerResponse } from './types';
import { authFetch } from '../interceptors';
import { rateMarkerUrl } from './urls';

/**
 * Rate a marker
 */
export const apiRateMarker = async (id: number, rating: number): Promise<RateMarkerResponse> => {
  const response = await authFetch(rateMarkerUrl(id), {
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