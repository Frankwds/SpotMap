import { useState, useEffect } from "react";
import { getMyMarkers } from "../api/markers";
import { Marker } from "../api/markers/types";
import { Category } from "../config/appConfig";

/**
 * Hook for managing the current user's markers
 */
const useMyMarkers = () => {
  const [userMarkers, setUserMarkers] = useState<Marker[]>([]);
  const [filteredMarkers, setFilteredMarkers] = useState<Marker[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);

  // Fetch user markers on component mount
  useEffect(() => {
    const fetchUserMarkers = async () => {
      try {
        setIsLoading(true);
        const data = await getMyMarkers();
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
    
    filtered.filter(marker => {
      // If no category is selected, show all markers
      if (!selectedCategories || selectedCategories.length === 0) {
        return true;
      }
      
      // Check if the marker's type matches any of the selected category IDs
      return selectedCategories.some(category => category.id === marker.type);
    });
    
    setFilteredMarkers(filtered);
  }, [searchTerm, selectedCategories, userMarkers]);

  // Handle category selection
  const handleCategoryChange = (category: Category, checked: boolean) => {
    if (category.id === "") {
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

export default useMyMarkers;