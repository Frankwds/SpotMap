import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { 
  CircularProgress, 
  Box
} from "../components/styled";
import { useMarker } from "../api/marker/hooks";
import SpotDetails from "../components/spots/SpotDetails";
import NotFound from "../components/common/NotFound";
import DetailsSidebar from "../components/sidebar/DetailsSidebar";
import PageLayout from "../components/layout/PageLayout";

// Sample additional images for demonstration
const sampleAdditionalImages = [
  "https://picsum.photos/200/300",
  "https://picsum.photos/200/300",
  "https://picsum.photos/200/300",
];

const DRAWER_WIDTH = 280;

const SpotDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const spotId = id ? parseInt(id, 10) : 0;
  const { marker, isLoading, fetchMarker } = useMarker(spotId);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (spotId) {
      fetchMarker()
        .then(fetchedMarker => {
          // Add sample additional images for demo
          if (fetchedMarker) {
            fetchedMarker.additionalImages = sampleAdditionalImages;
          }
        })
        .catch(error => {
          console.error("Error fetching marker:", error);
        });
    }
  }, [spotId, fetchMarker]);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!marker) {
    return <NotFound message="Spot not found" />;
  }

  return (
    <>
      <DetailsSidebar 
        open={sidebarOpen} 
        onOpenChange={setSidebarOpen}
        spotId={marker.id}
      />
      
      <PageLayout
        sidebarOpen={sidebarOpen}
        sidebarWidth={DRAWER_WIDTH}
        onSidebarToggle={handleSidebarToggle}
      >
        <SpotDetails spot={marker} />
      </PageLayout>
    </>
  );
};

export default SpotDetailPage;