import React from "react";
import {
  useMediaQuery,
  useTheme as useMuiTheme,
} from "@mui/material";
import {
  Box,
  Drawer,
  Divider,
  IconButton, 
  Typography,
  Button,
} from "../../components/styled";

import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import MapIcon from "@mui/icons-material/Map";

import CategoryFilter from "./CategoryFilter";
import SearchForm from "./SearchForm";
import { useDarkMode } from "../../styles/theme";
import { Close } from "@mui/icons-material";

interface MySpotsSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedCategories: string[];
  onCategoryChange: (category: string, checked: boolean) => void;
  searchTerm: string;
  onSearch: (term: string) => void;
}

const MySpotsSidebar: React.FC<MySpotsSidebarProps> = ({
  open,
  onOpenChange,
  selectedCategories,
  onCategoryChange,
  searchTerm,
  onSearch
}) => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"));

  const handleDrawerClose = () => {
    onOpenChange(false);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  return (
    <Drawer
      variant={isMobile ? "temporary" : "persistent"}
      anchor="left"
      open={open}
      onClose={handleDrawerClose}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <MapIcon color="success" />
          <Typography variant="h6">My Spots</Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 1 }}>
          <IconButton onClick={toggleDarkMode} size="small">
            {isDarkMode ? (
              <DarkModeIcon fontSize="small" />
            ) : (
              <LightModeIcon fontSize="small" />
            )}
          </IconButton>
          <IconButton onClick={handleDrawerClose} size="small">
            <Close fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      <Box sx={{ px: 2, pb: 2 }}>
        <SearchForm 
          value={searchTerm} 
          onChange={handleSearchChange} 
          placeholder="Search your spots..."
        />
      </Box>

      <Divider />

      <Box sx={{ p: 2, flexGrow: 1, overflow: "auto" }}>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Categories
        </Typography>
        <CategoryFilter
          selectedCategories={selectedCategories}
          onCategoryChange={onCategoryChange}
        />
      </Box>

      <Divider />

      <Box sx={{ p: 2 }}>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            color="primary"
            onClick={() => {
              // Reset categories to empty array (show none)
              onCategoryChange("", false); // This will trigger clearing of all categories
              // Get icon files manually instead of using require.context
              const iconIds = ["diving", "kitesurf", "skiing"];
              // Add all categories
              iconIds.forEach((id) => onCategoryChange(id, true));
            }}
          >
            Select All
          </Button>
          <Button
            color="secondary"
            onClick={() => {
              // Reset categories to empty array (show all)
              onCategoryChange("", false); // This will trigger clearing
            }}>Clear</Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default MySpotsSidebar;