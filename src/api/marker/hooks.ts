import { useState } from "react";
import { updateMarkerDetails, getMarkerById, deleteMarker } from "./api";
import { MarkerUpdate, MarkerUpdateResponse, MarkerDetails } from "./types";

/**
 * Hook for managing a single marker's state and operations
 */
export const useMarker = (markerId: number) => {
  const [marker, setMarker] = useState<MarkerDetails | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetch marker by ID from the API
   */
  const fetchMarker = async (): Promise<MarkerDetails> => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getMarkerById(markerId);
      setMarker(data);
      return data;
    } catch (err) {
      setError("Failed to fetch marker");
      console.error("Error fetching marker:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Remove a marker by ID
   */
  const removeMarker = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      await deleteMarker(markerId);
      setMarker(null);
    } catch (err) {
      setError("Failed to delete marker");
      console.error("Error removing marker:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Update the marker's details
   */
  const editMarker = async (markerData: MarkerUpdate): Promise<MarkerUpdateResponse> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const updatedMarker = await updateMarkerDetails(markerId, markerData);
      setMarker(updatedMarker);
      return updatedMarker;
    } catch (err) {
      setError("Failed to update marker");
      console.error("Error updating marker:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    marker,
    isLoading,
    error,
    fetchMarker,
    removeMarker,
    editMarker,
  };
}; 