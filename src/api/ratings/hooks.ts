import { useState } from "react";
import { apiRateMarker } from "./api";

/**
 * Hook for managing marker ratings
 */
export const useRatings = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Rate a marker by ID
   */
  const rateMarker = async (id: number, rating: number): Promise<number> => {
    setIsLoading(true);
    try {
      const response = await apiRateMarker(id, rating);
      return response.meanRating;
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