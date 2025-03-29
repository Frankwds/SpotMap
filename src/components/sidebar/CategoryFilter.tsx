import React, { useEffect, useState } from "react";
import { Box, Checkbox, FormControlLabel } from "../../components/styled";

interface Category {
  id: string;
  name: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

interface CategoryFilterProps {
  selectedCategories: string[];
  onCategoryChange: (category: string, checked: boolean) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategories,
  onCategoryChange,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);


  useEffect(() => {
    const importIcons = async () => {
      // Manually define icons instead of using require.context
      const iconIds = ["diving", "kitesurf", "skiing"];
      const icons = iconIds.map((id) => {
        const name = id.charAt(0).toUpperCase() + id.slice(1);
        const IconComponent = () => (
          <img
            src={`/icons/${id}.svg`}
            alt={`${name} marker`}
            width="24"
            height="24"
          />
        );
        return { id, name, icon: IconComponent };
      });
      setCategories(icons);
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
              checked={selectedCategories.includes(category.id)}
              onChange={(e) => onCategoryChange(category.id, e.target.checked)}

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
