import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Typography, Box, Paper } from "@mui/material";
import { Marker } from "../../../api/types";

interface ExistingMarkerPopupProps {
  marker: Marker;
  onDelete: (id: number) => void;
  onClose: () => void;
}

const ExistingMarkerPopup: React.FC<ExistingMarkerPopupProps> = ({
  marker,
  onDelete,
  onClose,
}) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/spot/${marker.id}`);
    onClose();
  };

  const handleDelete = () => {
    onDelete(marker.id);
    onClose();
  };

  return (
    <Paper elevation={3}>
      <Box sx={{ padding: "12px", maxWidth: "200px" }}>
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            marginBottom: "8px",
            cursor: "pointer",
            '&:hover': {
              textDecoration: "underline"
            }
          }}
          onClick={handleViewDetails}
        >
          {marker.name}
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleDelete}
        >
          Unpin
        </Button>
      </Box>
    </Paper>
  );
};

export default ExistingMarkerPopup;