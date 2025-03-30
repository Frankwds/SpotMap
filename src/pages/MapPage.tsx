import React, { useState } from "react";
import { useTheme } from "@mui/material";
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Stack,
} from "../components/styled";
import MenuIcon from "@mui/icons-material/Menu";
import useMarkers from "../hooks/useMarkers";
import useCategories from "../hooks/useCategories";
import GoogleMapWrapper from "../components/map/GoogleMapWrapper";
import { PendingMarker } from "../api/types";
import MapSidebar from "../components/sidebar/MapSidebar";
import UserMenu from "../components/auth/UserMenu";
import { useAuth } from "../context/AuthContext";
import { MapMouseEvent } from "@vis.gl/react-google-maps";

const DRAWER_WIDTH = 280;

const MapPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [pendingMarker, setPendingMarker] = useState<PendingMarker | null>(null);
  const { markers, addMarker, removeMarker } = useMarkers();
  const { selectedCategories, handleCategoryChange } = useCategories();
  const { isAuthenticated } = useAuth();
  const theme = useTheme();

  function onMapClick(e: MapMouseEvent) {
    // Only allow placing markers if the user is logged in
    if (isAuthenticated) {
      setPendingMarker({
        position:  {
          lat: e.detail.latLng?.lat || 0,
          lng: e.detail.latLng?.lng || 0,
        }
      });
    }
  }

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
              // sx={{ mr: 2, ...(sidebarOpen && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>

            <Typography 
            
            variant="h6"  >
              SpotMap
            </Typography>
            <Box sx={{ flexGrow: 1 }}></Box>
            
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
