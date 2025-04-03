import React, { useEffect, useState } from "react";
import { Box, Checkbox, FormControlLabel, Button, Divider } from "../../components/styled";
import { Category, CATEGORIES } from "../../config/appConfig";
import useCategories from "../../hooks/useCategories";

interface CategoryFilterProps {
  handleCheckCategory: (id: string, checked: boolean) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  handleCheckCategory,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const { selectedCategories } = useCategories();
  
  useEffect(() => {
    setCategories(CATEGORIES);
  }, []);

  const handleSelectAll = () => {
    categories.forEach((category) => handleCheckCategory(category.id, true));
  };

  const handleClearAll = () => {
    categories.forEach((category) => handleCheckCategory(category.id, false));
  };

  return (
    <Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
        {selectedCategories.map((category) => (
          <FormControlLabel
            key={category.id}
            control={
              <Checkbox
                checked={category.checked}
                onChange={(e) => handleCheckCategory(category.id, e.target.checked)}
              />
            }
            label={
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <img 
                  src={category.iconPath} 
                  alt={`${category.name} marker`} 
                  width="24" 
                  height="24" 
                />
                {category.name}
              </Box>
            }
          />
        ))}
      </Box>

      <Box sx={{ my: 2 }}>
        <Divider />
      </Box>

      <Box sx={{ display: "flex", gap: 2 }}>
        <Button
          color="primary"
          onClick={handleSelectAll}
        >
          Select All
        </Button>
        <Button
          color="secondary"
          onClick={handleClearAll}
        >
          Clear
        </Button>
      </Box>
    </Box>
  );
};

export default CategoryFilter;
