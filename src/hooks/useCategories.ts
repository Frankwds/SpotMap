import { useState } from 'react';
import { CATEGORIES, Category } from '../config/appConfig';

interface UseCategoriesReturn {
  categories: Category[];
  handleCheckCategory: (id: string, checked: boolean) => void;
  searchTerm: string;
  onSearch: (term: string) => void;
}

/**
 * Hook for managing category selection
 */
const useCategories = (): UseCategoriesReturn => {
  const [categories, setCategories] = useState<Category[]>(CATEGORIES);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const handleCheckCategory = (id: string, checked: boolean) => {
    setCategories(prev => 
      prev.map(category => 
        category.id === id ? { ...category, checked } : category
      )
    );
  };

  const onSearch = (term: string) => {
    setSearchTerm(term);
  };

  return {
    categories,
    handleCheckCategory,
    searchTerm,
    onSearch,
  };
};

export default useCategories;
