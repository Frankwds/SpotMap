import { useState } from "react";
import { apiRateMarker } from "./api";
import { RateMarkerResponse } from "./types";

/**
 * Hook for managing marker ratings
 */
export const useRatings = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Rate a marker by ID
   */
  const rateMarker = async (id: number, rating: number): Promise<RateMarkerResponse> => {
    setIsLoading(true);
    try {
      const updatedRating = await apiRateMarker(id, rating);
      return updatedRating;
    } catch (err) {
      setError("Failed to rate marker");
      console.error("Error rating marker:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    rateMarker,
  };
}; 