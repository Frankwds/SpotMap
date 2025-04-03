import { useState } from 'react';
import { CATEGORIES, Category } from '../config/appConfig';
interface UseCategoriesReturn {
  categories: Array<{ id: string; name: string }>;
  selectedCategories: Category[];
  handleCategoryChange: (category: Category, checked: boolean) => void;
}

/**
 * Hook for managing category selection
 */
const useCategories = (): UseCategoriesReturn => {
  const [selectedCategories, setSelectedCategories] = useState<Category[]>(CATEGORIES);

  const handleCategoryChange = (category: Category, checked: boolean) => {
    // Special case for when "" is passed with checked=false, this means "clear all"
    if (category.id === "" && !checked) {
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
