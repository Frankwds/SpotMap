import React from "react";
import {
  useMediaQuery,
} from "@mui/material";
import {
  Box,
  Drawer,
  Divider,
  IconButton, 
  Typography,
} from "../../components/styled";

import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import MapIcon from "@mui/icons-material/Map";

import CategoryFilter from "./CategoryFilter";
import SearchForm from "./SearchForm";
import { useDarkMode } from "../../styles/theme";
import { Close } from "@mui/icons-material";
import { theme } from "../../styles/theme";
import { Category } from "../../config/appConfig";

interface MapSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  handleCheckCategory: (id: string, checked: boolean) => void;
  categories: Category[];
  searchTerm: string;
  onSearch: (term: string) => void;
}

const MapSidebar: React.FC<MapSidebarProps> = ({
  open,
  onOpenChange,
  handleCheckCategory,
  categories,
  searchTerm,
  onSearch
}) => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleDrawerClose = () => {
    onOpenChange(false);
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
          <Typography variant="h6">Spot filter</Typography>
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



      <Divider />
      <Box sx={{ px: 2, pt: 2 }}>
        <SearchForm value={searchTerm} onChange={onSearch} /> 
      </Box>
      <Box sx={{ p: 2, flexGrow: 1, overflow: "auto" }}>

        <CategoryFilter
          categories={categories}
          handleCheckCategory={handleCheckCategory} 
        />
      </Box>
    </Drawer>
  );
};

export default MapSidebar;
