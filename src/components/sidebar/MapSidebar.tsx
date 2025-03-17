import React, { useState } from "react";
import { 
  Box, 
  Drawer, 
  Divider, 
  IconButton, 
  Typography, 
  useMediaQuery, 
  useTheme as useMuiTheme 
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import MapIcon from "@mui/icons-material/Map";

import CategoryFilter from "./CategoryFilter";
import SearchForm from "./SearchForm";
import { useTheme } from "./SidebarThemeProvider";

const DRAWER_WIDTH = 280;

interface MapSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MapSidebar: React.FC<MapSidebarProps> = ({ open, onOpenChange }) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const { isDarkMode, toggleTheme } = useTheme();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"));

  const handleDrawerClose = () => {
    onOpenChange(false);
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories((prev) => [...prev, category]);
    } else {
      setSelectedCategories((prev) => prev.filter((c) => c !== category));
    }
  };

  return (
    <Drawer
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
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
          <IconButton onClick={toggleTheme} size="small">
            {isDarkMode ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
          </IconButton>
          <IconButton onClick={handleDrawerClose} size="small">
            <ChevronLeftIcon fontSize="small" />
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
        <CategoryFilter selectedCategories={selectedCategories} onCategoryChange={handleCategoryChange} />
      </Box>

      <Divider />

      <Box sx={{ p: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton size="small" color="primary">
            Reset Filters
          </IconButton>
          <IconButton size="small" color="primary">
            Apply Filters
          </IconButton>
        </Box>
      </Box>
    </Drawer>
  );
};

export default MapSidebar;