import { useState, useEffect } from "react";
import { getMarkers, getMyMarkers, getMarkersByUserId, postMarker } from "./api";
import { Marker, MarkerPost, Coordinates} from "./types";

/**
 * Hook for managing markers state and operations
 */
export const useMarkers = () => {
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch markers on component mount
  useEffect(() => {
    const fetchMarkers = async () => {
      try {
        const data = await getMarkers();
        setMarkers(data);
      } catch (err) {
        setError("Failed to fetch markers");
        console.error("Error fetching markers:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMarkers();
  }, []);
      
  /**
   * Add a new marker
   */
  const addMarker = async (marker: MarkerPost) => {
    setIsLoading(true);
    try {
      const newMarker = await postMarker(marker);
      setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
    } catch (err) {
      setError("Failed to add marker");
      console.error("Error adding marker:", err);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Add marker from coordinates and name
   */
  const addMarkerFromCoordinates = async (
    position: Coordinates,
    name: string,
    type: string
  ) => {
    const markerData = {
      position,
      name,
      type,
    };
    await addMarker(markerData);
  };

  return {
    markers,
    isLoading,
    error,
    addMarker,
    addMarkerFromCoordinates,
  };
};

/**
 * Hook for managing current user's markers
 */
export const useMyMarkers = () => {
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserMarkers = async () => {
      try {
        const data = await getMyMarkers();
        setMarkers(data);
      } catch (err) {
        setError("Failed to fetch user markers");
        console.error("Error fetching user markers:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserMarkers();
  }, []);

  return {
    markers,
    isLoading,
    error,
  };
};

/**
 * Hook for fetching a list of another user's markers
 */
export const useUserMarkersById = (userId: string) => {
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserMarkers = async () => {
      try {
        const data = await getMarkersByUserId(userId);
        setMarkers(data);
      } catch (err) {
        setError(`Failed to fetch markers for user ${userId}`);
        console.error("Error fetching user markers:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserMarkers();
  }, [userId]);

  return {
    markers,
    isLoading,
    error,
  };
};


