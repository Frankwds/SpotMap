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
 * Map event types
 */
export interface MapClickEvent {
  detail: {
    latLng: Coordinates;
  };
}

/**
 * Map marker interfaces
 */
export interface PendingMarker {
  position: Coordinates;
  type?: string;
}
