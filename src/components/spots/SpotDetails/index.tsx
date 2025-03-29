import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography, Paper, Container } from "../../../components/styled";
import { Marker } from "../../../api/types";

interface SpotDetailsProps {
  spot: Marker;
}

const SpotDetails: React.FC<SpotDetailsProps> = ({ spot }) => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper>
        <Typography
          variant="h4"
          sx={{ fontFamily: "'Brush Script MT', cursive" }}
        >
          {spot.name}
        </Typography>

        <Box sx={{ my: 3 }}>
          <Typography variant="body1">
            <strong>Latitude:</strong>{" "}
            {spot.position.lat}
          </Typography>
          <Typography variant="body1">
            <strong>Longitude:</strong>{" "}
            {spot.position.lng}
          </Typography>
        </Box>

        <Button
          onClick={() => navigate("/")}
        >
          Back to Map
        </Button>
      </Paper>
    </Container>
  );
};

export default SpotDetails;
