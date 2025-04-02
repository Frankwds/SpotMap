import { MarkerDetails } from '../markers/types';

/**
 * Type for updating a marker
 */
export interface MarkerUpdate {
  name?: string;
  type?: string;
  description?: string;
}

/**
 * Type for marker update response
 */
export type MarkerUpdateResponse = MarkerDetails; 