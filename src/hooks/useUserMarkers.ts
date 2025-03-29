import { useState, useEffect } from "react";
import { getUserMarkers } from "../api/markerApi";
import { Marker } from "../api/types";

/**
 * Hook for managing the current user's markers
 */
const useUserMarkers = () => {
  const [userMarkers, setUserMarkers] = useState<Marker[]>([]);
  const [filteredMarkers, setFilteredMarkers] = useState<Marker[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Fetch user markers on component mount
  useEffect(() => {
    const fetchUserMarkers = async () => {
      try {
        setIsLoading(true);
        const data = await getUserMarkers();
        setUserMarkers(data);
        setFilteredMarkers(data);
      } catch (err) {
        setError("Failed to fetch your spots");
        console.error("Error fetching user markers:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserMarkers();
  }, []);

  // Filter markers based on search term and selected categories
  useEffect(() => {
    let filtered = userMarkers;
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        marker => 
          marker.name.toLowerCase().includes(term) || 
          (marker.description && marker.description.toLowerCase().includes(term))
      );
    }
    
    // Filter by categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(marker => 
        selectedCategories.includes(marker.type)
      );
    }
    
    setFilteredMarkers(filtered);
  }, [searchTerm, selectedCategories, userMarkers]);

  // Handle category selection
  const handleCategoryChange = (category: string, checked: boolean) => {
    if (category === "") {
      // Clear all categories
      setSelectedCategories([]);
      return;
    }

    if (checked) {
      setSelectedCategories(prev => [...prev, category]);
    } else {
      setSelectedCategories(prev => prev.filter(cat => cat !== category));
    }
  };

  // Handle search term change
  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return {
    userMarkers: filteredMarkers,
    isLoading,
    error,
    searchTerm,
    selectedCategories,
    handleSearch,
    handleCategoryChange
  };
};

export default useUserMarkers;