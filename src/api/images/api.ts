import { ImageUploadResponse, ImageDeleteResponse } from './types';
import { authFetch } from '../interceptors';
import { postImageUrl, deleteImageUrl } from './urls';

/**
 * Upload an image to a marker (main image or additional)
 */
export const uploadMarkerImage = async (id: number, file: File, isMainImage: boolean): Promise<string> => {
  const formData = new FormData();
  formData.append('image', file);
  formData.append('isMainImage', isMainImage.toString());

  const response = await authFetch(postImageUrl(id), {
    method: 'POST',
    body: formData
  });

  if (!response.ok) {
    throw new Error(`Failed to upload image for marker with ID: ${id}`);
  }

  const updatedMarker: ImageUploadResponse = await response.json();
  return updatedMarker.url;
};

/**
 * Delete an image from a marker's additional images
 */
export const deleteMarkerImage = async (markerId: number, imageUrl: string): Promise<boolean> => {
  const encodedImageUrl = encodeURIComponent(imageUrl);
  const response = await authFetch(deleteImageUrl(markerId, encodedImageUrl), {
    method: 'DELETE'
  });

  if (!response.ok) {
    throw new Error(`Failed to delete image for marker with ID: ${markerId}`);
  }

  const updatedMarker: ImageDeleteResponse = await response.json();
  return updatedMarker.success;
}; 