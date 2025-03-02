import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CircularProgress, Box } from "@mui/material";
import { Marker } from "../../api/types";
import useMarkers from "../../hooks/useMarkers";
import SpotDetails from "../../components/spots/SpotDetails";
import NotFound from "../../components/common/NotFound";

const SpotDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { markers, isLoading } = useMarkers();
  const [spot, setSpot] = useState<Marker | null>(null);

  useEffect(() => {
    if (id && markers) {
      const spotId = parseInt(id, 10);
      const foundSpot = markers.find(marker => marker.id === spotId);
      setSpot(foundSpot || null);
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