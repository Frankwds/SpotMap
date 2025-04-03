import { useState } from 'react';
import { CATEGORIES, Category } from '../config/appConfig';

interface UseCategoriesReturn {
  categories: Category[];
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

  return {
    categories,
    handleCheckCategory,
  };
};

export default useCategories;
