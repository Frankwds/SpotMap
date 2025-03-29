/**
 * Types for map coordinates
 */
export interface Coordinates {
  lat: number;
  lng: number;
}

/**
 * User type returned by the API
 */
export interface MarkerUser {
  id: string;
  name: string;
  email?: string;
  picture?: string;
}

/**
 * Type for marker data (from API and internal use)
 */
export interface Marker {
  id: number;
  name: string;
  position: Coordinates;
  type: string;
  user?: MarkerUser;
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
