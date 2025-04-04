import React, { useState, useMemo } from "react";
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
  const { markers, addMarker } = useMarkers();
  const { categories, handleCheckCategory, searchTerm, onSearch } = useCategories();
  const { isAuthenticated } = useAuth();

  // Filter markers based on selected categories
  const filteredMarkers = useMemo(() => {
    if (!markers) return [];
      
    return markers.filter(marker => {
      const markerName = marker.name.toLowerCase();
      const searchTermLower = searchTerm.toLowerCase();
      return markerName.includes(searchTermLower) && categories.some(category => category.id === marker.type && category.checked);
    });
  }, [markers, categories, searchTerm]);

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
        handleCheckCategory={handleCheckCategory}
        categories={categories}
        searchTerm={searchTerm}
        onSearch={onSearch}
      />

      <PageLayout
        sidebarOpen={sidebarOpen}
        sidebarWidth={DRAWER_WIDTH}
        onSidebarToggle={handleSidebarToggle}
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
            markers={filteredMarkers}
            onMapClick={onMapClick}
            onAddMarker={(markerData) => {
              addMarker(markerData);
              setPendingMarker(null);
            }}
          />
        </Box>
      </PageLayout>
    </>
  );
};

export default MapPage;