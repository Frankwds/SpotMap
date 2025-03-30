import { API_CONFIG } from "../config/appConfig";

/**
 * Builds a complete image URL for marker images
 * 
 * This handles cases where the API returns relative paths (/uploads/markers/filename.jpg)
 * and constructs the full URL using the API base URL
 * 
 * @param imageUrl The relative or absolute image URL
 * @returns The complete image URL
 */
export const getFullImageUrl = (imageUrl: string | null | undefined): string | null => {
  if (!imageUrl || typeof imageUrl !== 'string') return null;
  
  try {
    // If it's already a full URL (starts with http:// or https://), return it as is
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      return imageUrl;
    }
    
    // If it's a relative URL (starts with /uploads/markers), append it to the API base URL
    if (imageUrl.startsWith('/uploads/images')) {
      return `${API_CONFIG.BASE_URL}${imageUrl}`;
    }
    
    // If it's another relative URL (starts with /), assume it's a frontend asset
    if (imageUrl.startsWith('/')) {
      return imageUrl;
    }
    
    // Otherwise, assume it's a relative path to uploads/markers
    return `${API_CONFIG.BASE_URL}/uploads/images/${imageUrl}`;
  } catch (error) {
    console.error("Error processing image URL:", error, "URL was:", imageUrl);
    return null;
  }
};

/**
 * Generates the URL for a marker type icon
 * @param type The marker type (diving, kitesurf, skiing, etc.)
 * @returns The URL to the icon for the given marker type
 */
export const getMarkerTypeIconUrl = (type: string): string => {
  return `/icons/${type}.svg`;
};