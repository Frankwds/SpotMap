import { useState, useEffect } from "react";
import { getMarkers, deleteMarker, postMarker } from "../api/markerApi";
import { Marker, MarkerPost, Coordinates } from "../api/types";

/**
 * Hook for managing markers state and operations
 */
const useMarkers = () => {
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
    name: string
  ) => {
    const markerData = {
      position,
      name,
    };
    await addMarker(markerData);
  };

  /**
   * Remove a marker by ID
   */
  const removeMarker = async (id: number) => {
    setIsLoading(true);
    try {
      await deleteMarker(id);
      setMarkers((prevMarkers) =>
        prevMarkers.filter((marker) => marker.id !== id)
      );
    } catch (err) {
      setError("Failed to delete marker");
      console.error("Error removing marker:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    markers,
    isLoading,
    error,
    addMarker,
    addMarkerFromCoordinates,
    removeMarker,
  };
};

export default useMarkers;
