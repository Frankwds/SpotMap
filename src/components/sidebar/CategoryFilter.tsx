import React, { useEffect, useState } from "react";
import { Box, Checkbox, FormControlLabel, Button, Divider } from "../../components/styled";
import { Category, CATEGORIES } from "../../config/appConfig";

interface CategoryWithIcon extends Category {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

interface CategoryFilterProps {
  handleCheckCategory: (id: string, checked: boolean) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  handleCheckCategory,
}) => {
  const [categories, setCategories] = useState<CategoryWithIcon[]>([]);

  useEffect(() => {
    const importIcons = async () => {
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

  const handleSelectAll = () => {
    categories.forEach((category) => handleCheckCategory(category.id, true));
  };

  const handleClearAll = () => {
    categories.forEach((category) => handleCheckCategory(category.id, false));
  };


  return (
    <Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
        {categories.map((category) => (
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
                <category.icon />
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
