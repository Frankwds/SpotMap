/**
 * Types for map coordinates
 */
export interface Coordinates {
  lat: number;
  lng: number;
}

/**
 * Type for marker data (from API and internal use)
 */
export interface Marker {
  id: number;
  name: string;
  position: Coordinates;
  type: string;
  userId?: string;
  userName?: string;
  imageUrl?: string;
  description?: string;
  rating?: number;
}

/**
 * Type for adding a new marker
 */
export interface MarkerPost {
  position: Coordinates;
  name: string;
  type: string;
}

/**
 * Map marker interfaces
 */
export interface PendingMarker {
  position: Coordinates;
  type?: string;
} 