import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CircularProgress, Box } from "../components/styled";
import { MarkerDetails } from "../api/types";
import useMarkers from "../hooks/useMarkers";
import SpotDetails from "../components/spots/SpotDetails";
import NotFound from "../components/common/NotFound";

// Sample additional images for demonstration
const sampleAdditionalImages = [
  "https://source.unsplash.com/random/800x600?sunset",
  "https://source.unsplash.com/random/800x600?mountains",
  "https://source.unsplash.com/random/800x600?beach",
];

const SpotDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { markers, isLoading } = useMarkers();
  const [spot, setSpot] = useState<MarkerDetails | null>(null);

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

  return <SpotDetails spot={spot} />;
};

export default SpotDetailPage;