import { MarkerDetails } from './types';
import { authFetch } from './interceptors';
import { API_CONFIG } from '../config/appConfig';

const MARKERS_URL = `${API_CONFIG.BASE_URL}${API_CONFIG.MARKERS_PATH}`;

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