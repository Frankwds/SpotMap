import { useState } from 'react';
import { CATEGORIES } from '../config/appConfig';

interface UseCategoriesReturn {
  categories: Array<{ id: string; name: string }>;
  selectedCategories: string[];
  handleCategoryChange: (category: string, checked: boolean) => void;
}

/**
 * Hook for managing category selection
 */
const useCategories = (): UseCategoriesReturn => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleCategoryChange = (category: string, checked: boolean) => {
    // Special case for when "" is passed with checked=false, this means "clear all"
    if (category === "" && !checked) {
      setSelectedCategories([]);
      return;
    }

    if (checked) {
      setSelectedCategories((prev) => [...prev, category]);
    } else {
      setSelectedCategories((prev) => prev.filter((c) => c !== category));
    }
  };

  return {
    categories: CATEGORIES,
    selectedCategories,
    handleCategoryChange,
  };
};

export default useCategories;
