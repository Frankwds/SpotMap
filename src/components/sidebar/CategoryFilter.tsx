import React, { useState } from "react";
import { 
  Box, 
  Checkbox, 
  FormControlLabel, 
  Button, 
  Divider,
  List,
  ListItemButton,
  ListItemText,
  Collapse
} from "../../components/styled";
import { Category } from "../../config/appConfig";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

interface CategoryFilterProps {
  handleCheckCategory: (id: string, checked: boolean) => void;
  categories: Category[];
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  handleCheckCategory,
  categories,
}) => {
  const [open, setOpen] = useState(true);

  const handleSelectAll = () => {
    categories.forEach((category) => handleCheckCategory(category.id, true));
  };

  const handleClearAll = () => {
    categories.forEach((category) => handleCheckCategory(category.id, false));
  };

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Box>
      <ListItemButton onClick={handleClick}>
        <ListItemText primary="Spot types" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout={150}>
        <List component="div" disablePadding>
          {categories.map((category) => (
            <ListItemButton key={category.id} sx={{ pl: 4 }}>
              <FormControlLabel
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
            </ListItemButton>
          ))}
          
          <Box sx={{ my: 2 }}>
            <Divider />
          </Box>

          <Box sx={{ display: "flex", gap: 2}}>
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
        </List>
      </Collapse>
    </Box>
  );
};

export default CategoryFilter;
