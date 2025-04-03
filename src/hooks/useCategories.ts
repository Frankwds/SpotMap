import { useState } from 'react';
import { CATEGORIES, Category } from '../config/appConfig';

interface UseCategoriesReturn {
  categories: Category[];
  selectedCategories: Category[];
  handleCategoryChange: (category: Category, checked: boolean) => void;
}

/**
 * Hook for managing category selection
 */
const useCategories = (): UseCategoriesReturn => {
  const [categories, setCategories] = useState<Category[]>(CATEGORIES);

  const handleCategoryChange = (category: Category, checked: boolean) => {
    // Special case for when "" is passed with checked=false, this means "clear all"
    if (category.id === "" && !checked) {
      setCategories(prev => prev.map(c => ({ ...c, checked: false })));
      return;
    }

    setCategories(prev => 
      prev.map(c => 
        c.id === category.id ? { ...c, checked } : c
      )
    );
  };

  // Get selected categories (those with checked=true)
  const selectedCategories = categories.filter(category => category.checked);

  return {
    categories,
    selectedCategories,
    handleCategoryChange,
  };
};

export default useCategories;
