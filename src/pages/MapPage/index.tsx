import React, { useState } from "react";
import { Box, AppBar, Toolbar, IconButton, Typography, useTheme } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import useMarkers from "../../hooks/useMarkers";
import GoogleMapWrapper from "../../components/map/GoogleMapWrapper";
import { MapClickEvent, PendingMarker } from "../../api/types";
import MapSidebar from "../../components/sidebar/MapSidebar";
import SidebarThemeProvider from "../../components/sidebar/SidebarThemeProvider";

const DRAWER_WIDTH = 280;

const MapPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [pendingMarker, setPendingMarker] = useState<PendingMarker | null>(null);
  const { 
    markers, 
    addMarker, 
    removeMarker 
  } = useMarkers();
  const theme = useTheme();

  function onMapClick(e: MapClickEvent) {
    setPendingMarker({
      position: e.detail.latLng,
    });
  }

  return (
    <SidebarThemeProvider>
      <Box sx={{ display: "flex", height: "100vh", width: "100vw", overflow: "hidden" }}>
        <MapSidebar open={sidebarOpen} onOpenChange={setSidebarOpen} />
        
        <Box
          sx={{
            flexGrow: 1,
            transition: theme.transitions.create("margin", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
            marginLeft: 0,
            ...(sidebarOpen && {
              transition: theme.transitions.create("margin", {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
              }),
              marginLeft: `${DRAWER_WIDTH}px`,
            }),
          }}
        >
          <AppBar
            position="fixed"
            sx={{
              width: sidebarOpen ? `calc(100% - ${DRAWER_WIDTH}px)` : "100%",
              ml: sidebarOpen ? `${DRAWER_WIDTH}px` : 0,
              transition: theme.transitions.create(["margin", "width"], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
              }),
              bgcolor: "background.paper",
              color: "text.primary",
              boxShadow: 1,
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
              <Typography variant="h6" noWrap component="div">
                SpotMap
              </Typography>
            </Toolbar>
          </AppBar>

          <Box
            component="main"
            sx={{
              height: "100vh",
              pt: "64px", // Height of AppBar
              boxSizing: "border-box",
            }}
          >
            <GoogleMapWrapper
              pendingMarker={pendingMarker}
              markers={markers || []}
              onMapClick={onMapClick}
              onRemoveMarker={removeMarker}
              onAddMarker={(markerData) => {
                addMarker(markerData);
                setPendingMarker(null);
              }}
            />
          </Box>
        </Box>
      </Box>
    </SidebarThemeProvider>
  );
};

export default MapPage;