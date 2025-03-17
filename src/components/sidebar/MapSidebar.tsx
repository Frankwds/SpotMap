import React from "react";
import {
  Box,
  Drawer,
  Divider,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme as useMuiTheme,
  Button,
} from "@mui/material";

import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import MapIcon from "@mui/icons-material/Map";

import CategoryFilter from "./CategoryFilter";
import SearchForm from "./SearchForm";
import { useDarkMode } from "../../styles/theme";
import { Close } from "@mui/icons-material";

const DRAWER_WIDTH = 280;

interface MapSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedCategories: string[];
  onCategoryChange: (category: string, checked: boolean) => void;
}

const MapSidebar: React.FC<MapSidebarProps> = ({
  open,
  onOpenChange,
  selectedCategories,
  onCategoryChange,
}) => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"));

  const handleDrawerClose = () => {
    onOpenChange(false);
  };

  return (
    <Drawer
      sx={{
        "& .MuiDrawer-paper": {
          width: DRAWER_WIDTH,
          boxSizing: "border-box",
          border: "none",
          boxShadow: 3,
        },
      }}
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
          <MapIcon color="primary" />
          <Typography variant="h6">Map Filters</Typography>
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
        <SearchForm />
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
            variant="contained"
            color="secondary"
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
            variant="contained"
            color="primary"
            onClick={() => {
              // Reset categories to empty array (show all)
              onCategoryChange("", false); // This will trigger clearing
            }}
          >
            Clear
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default MapSidebar;
