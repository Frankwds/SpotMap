import React, { useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  useTheme,
  Stack,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import useMarkers from "../../hooks/useMarkers";
import GoogleMapWrapper from "../../components/map/GoogleMapWrapper";
import { MapClickEvent, PendingMarker } from "../../api/types";
import MapSidebar from "../../components/sidebar/MapSidebar";
import UserMenu from "../../components/auth/UserMenu";

const DRAWER_WIDTH = 280;

const MapPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [pendingMarker, setPendingMarker] = useState<PendingMarker>();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const { markers, addMarker, removeMarker } = useMarkers();
  const theme = useTheme();

  function onMapClick(e: MapClickEvent) {
    setPendingMarker({
      position: e.detail.latLng,
    });
  }

  const handleCategoryChange = (category: string, checked: boolean) => {
    // Special case for when "" is passed with checked=false, this means "clear all"
    if (category === "" && !checked) {
      setSelectedCategories([]);
      return;
    }

    if (checked) {
      setSelectedCategories((prev) => [...prev, category]);
    } else {
      setSelectedCategories((prev) => prev.filter((c) => c !== category));
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
      }}
    >
      <MapSidebar
        open={sidebarOpen}
        onOpenChange={setSidebarOpen}
        selectedCategories={selectedCategories}
        onCategoryChange={handleCategoryChange}
      />

      <Box>
        <AppBar
          position="fixed"
          sx={{
            width: sidebarOpen ? `calc(100% - ${DRAWER_WIDTH}px)` : "100%",
            ml: sidebarOpen ? `${DRAWER_WIDTH}px` : 0,
            transition: theme.transitions.create(["margin", "width"], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              edge="start"
              sx={{ mr: 2, ...(sidebarOpen && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>

            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
              SpotMap
            </Typography>
            
            <Stack direction="row" spacing={2} alignItems="center">
              <UserMenu />
            </Stack>
          </Toolbar>
        </AppBar>

        <Box>
          <GoogleMapWrapper
            pendingMarker={pendingMarker}
            markers={markers || []}
            onMapClick={onMapClick}
            onRemoveMarker={removeMarker}
            onAddMarker={(markerData) => {
              addMarker(markerData);
              setPendingMarker(null);
            }}
            selectedCategories={selectedCategories}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default MapPage;
