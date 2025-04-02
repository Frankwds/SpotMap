import { useState } from "react";
import { updateMarkerDetails } from "./api";
import { MarkerUpdate, MarkerUpdateResponse } from "./types";

/**
 * Hook for managing a single marker's state and operations
 */
export const useMarker = (markerId: number) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Update the marker's details
   */
  const editMarker = async (markerData: MarkerUpdate): Promise<MarkerUpdateResponse> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const updatedMarker = await updateMarkerDetails(markerId, markerData);
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
    isLoading,
    error,
    editMarker,
  };
}; 