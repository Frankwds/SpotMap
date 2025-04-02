import { authFetch } from '../interceptors';
import { updateMarkerUrl } from './urls';
import { MarkerUpdate, MarkerUpdateResponse } from './types';

/**
 * Update a marker's details
 */
export const updateMarkerDetails = async (id: number, markerData: MarkerUpdate): Promise<MarkerUpdateResponse> => {
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

  const updatedMarker: MarkerUpdateResponse = await response.json();
  return updatedMarker;
}; 