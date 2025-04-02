import { Marker } from '../markers/types';

/**
 * Type for updating a marker
 */
export interface MarkerUpdate {
  name?: string;
  type?: string;
  description?: string;
}


/**
 * Type for detailed marker data with additional images
 */
export interface MarkerDetails extends Marker {
  additionalImages?: string[];
}


/**
 * Type for marker update response
 */
export type MarkerUpdateResponse = MarkerDetails; 