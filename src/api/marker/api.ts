import { authFetch } from '../interceptors';
import { updateMarkerUrl, getMarkerByIdUrl, deleteMarkerUrl } from './urls';
import { MarkerUpdate, MarkerUpdateResponse, MarkerDetails} from './types';

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