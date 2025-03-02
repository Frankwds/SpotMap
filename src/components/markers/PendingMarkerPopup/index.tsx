import React, { useState } from "react";
import { Button, TextField, Box, Paper } from "@mui/material";
import { Coordinates, MarkerPost } from "../../../api/types";

interface PendingMarkerPopupProps {
  position: Coordinates;
  onSave: (markerData: MarkerPost) => void;
  onClose: () => void;
}

const PendingMarkerPopup: React.FC<PendingMarkerPopupProps> = ({
  position,
  onSave,
  onClose,
}) => {
  const [markerName, setMarkerName] = useState("");

  const handleSave = () => {
    onSave({
      position,
      name: markerName || "New Marker",
    });
    setMarkerName("");
  };

  return (
    <Paper elevation={3}>
      <Box sx={{ padding: "12px", maxWidth: "200px" }}>
        <TextField
          fullWidth
          variant="outlined"
          label="Name"
          value={markerName}
          onChange={(e) => setMarkerName(e.target.value)}
          placeholder="Enter marker name"
          size="small"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
        >
          Pin
        </Button>
      </Box>
    </Paper>
  );
};

export default PendingMarkerPopup;