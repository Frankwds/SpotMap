import React, { useState } from "react";
import {
  Box,
} from "../components/styled";
import { useMarkers } from "../api/markers";
import useCategories from "../hooks/useCategories";
import GoogleMapWrapper from "../components/map/GoogleMapWrapper";
import { PendingMarker } from "../api/markers/types";
import MapSidebar from "../components/sidebar/MapSidebar";
import { useAuth } from "../context/AuthContext";
import { MapMouseEvent } from "@vis.gl/react-google-maps";
import PageLayout from "../components/layout/PageLayout";

const DRAWER_WIDTH = 280;

const MapPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [pendingMarker, setPendingMarker] = useState<PendingMarker | null>(null);
  const { markers, addMarker, removeMarker } = useMarkers();
  const { selectedCategories, handleCategoryChange } = useCategories();
  const { isAuthenticated } = useAuth();

  function onMapClick(e: MapMouseEvent) {
    // Only allow placing markers if the user is logged in
    if (isAuthenticated) {
      setPendingMarker({
        position: {
          lat: e.detail.latLng?.lat || 0,
          lng: e.detail.latLng?.lng || 0,
        }
      });
    }
  }

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <MapSidebar
        open={sidebarOpen}
        onOpenChange={setSidebarOpen}
        selectedCategories={selectedCategories}
        onCategoryChange={handleCategoryChange}
      />

      <PageLayout
        title="SpotMap"
        sidebarOpen={sidebarOpen}
        sidebarWidth={DRAWER_WIDTH}
        onSidebarToggle={handleSidebarToggle}
        showBackButton={false}
      >
        <Box sx={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0, 
          mt: 8, // To account for the AppBar
          overflow: 'hidden'
        }}>
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
      </PageLayout>
    </>
  );
};

export default MapPage;