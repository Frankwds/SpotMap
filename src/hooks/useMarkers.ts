import { useState, useEffect } from "react";
import { getMarkers, deleteMarker, postMarker, getMarkerById } from "../api/markerApi";
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
   * Fetch marker by ID from the API
   */
  const fetchMarkerById = async (id: number) => {
    setIsLoading(true);
    try {
      const data = await getMarkerById(id);
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

  /**
   * Update an existing marker
   */
  const updateMarker = (updatedMarker: Marker) => {
    setMarkers(prevMarkers => 
      prevMarkers.map(marker => 
        marker.id === updatedMarker.id ? updatedMarker : marker
      )
    );
  };

  return {
    markers,
    isLoading,
    error,
    addMarker,
    addMarkerFromCoordinates,
    fetchMarkerById,
    removeMarker,
    updateMarker,
  };
};

export default useMarkers;


