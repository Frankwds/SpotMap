import React, { useEffect, useState } from "react";
import { Box, Checkbox, FormControlLabel } from "../../components/styled";
import { Category, CATEGORIES } from "../../config/appConfig";

interface CategoryWithIcon extends Category {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

interface CategoryFilterProps {
  selectedCategories: Category[];
  onCategoryChange: (category: Category, checked: boolean) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategories,
  onCategoryChange,
}) => {
  const [categories, setCategories] = useState<CategoryWithIcon[]>([]);

  useEffect(() => {
    const importIcons = async () => {
      // Create CategoryWithIcon objects from CATEGORIES
      const categoriesWithIcons = CATEGORIES.map((category) => {
        const IconComponent = () => (
          <img
            src={`/icons/${category.id}.svg`}
            alt={`${category.name} marker`}
            width="24"
            height="24"
          />
        );
        return { ...category, icon: IconComponent };
      });
      setCategories(categoriesWithIcons);
    };

    importIcons();
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
      {categories.map((category) => (
        <FormControlLabel
          key={category.id}
          control={
            <Checkbox
              checked={selectedCategories.some(c => c.id === category.id)}
              onChange={(e) => onCategoryChange(category, e.target.checked)}
            />
          }
          label={
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <category.icon />
              {category.name}
            </Box>
          }
        />
      ))}
    </Box>
  );
};

export default CategoryFilter;
