import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { 
  CircularProgress, 
  Box
} from "../components/styled";
import { MarkerDetails } from "../api/types";
import useMarkers from "../hooks/useMarkers";
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
  const { markers, isLoading } = useMarkers();
  const [spot, setSpot] = useState<MarkerDetails | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (id && markers) {
      const spotId = parseInt(id, 10);
      const foundSpot = markers.find(marker => marker.id === spotId);
      
      if (foundSpot) {
        // Convert to MarkerDetails and add sample additional images for demo
        const markerDetails: MarkerDetails = {
          ...foundSpot,
          additionalImages: sampleAdditionalImages
        };
        setSpot(markerDetails);
      } else {
        setSpot(null);
      }
    }
  }, [id, markers]);

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

  if (!spot) {
    return <NotFound message="Spot not found" />;
  }

  return (
    <>
      <DetailsSidebar 
        open={sidebarOpen} 
        onOpenChange={setSidebarOpen}
        spotId={spot.id}
      />
      
      <PageLayout
        title={spot.name}
        sidebarOpen={sidebarOpen}
        sidebarWidth={DRAWER_WIDTH}
        onSidebarToggle={handleSidebarToggle}
        showBackButton={true}
      >
        <SpotDetails spot={spot} />
      </PageLayout>
    </>
  );
};

export default SpotDetailPage;