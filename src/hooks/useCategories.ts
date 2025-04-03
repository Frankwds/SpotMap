import { useState } from 'react';
import { CATEGORIES, Category } from '../config/appConfig';

interface UseCategoriesReturn {
  categories: Category[];
  selectedCategories: Category[];
  handleCheckCategory: (id: string, checked: boolean) => void;
}

/**
 * Hook for managing category selection
 */
const useCategories = (): UseCategoriesReturn => {
  const [categories, setCategories] = useState<Category[]>(CATEGORIES);

  const handleCheckCategory = (id: string, checked: boolean) => {

    setCategories(prev => 
      prev.map(category => 
        category.id === id ? { ...category, checked } : category
      )
    );
  };

  // Get selected categories (those with checked=true)
  const selectedCategories = categories.filter(category => category.checked);

  return {
    categories,
    selectedCategories,
    handleCheckCategory,
  };
};

export default useCategories;
