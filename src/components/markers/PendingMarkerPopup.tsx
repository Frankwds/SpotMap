import React, { useState } from "react";
import {  
  Paper,
  FormControl,
  Box,
  MenuItem,InputLabel, TextField, Button, Select } from "../../components/styled";
import { Coordinates, MarkerPost } from "../../api/markers/types";
import { CATEGORIES } from "../../config/appConfig";

interface PendingMarkerPopupProps {
  position: Coordinates;
  onSave: (markerData: MarkerPost) => void;
  onClose: () => void;
}

const PendingMarkerPopup: React.FC<PendingMarkerPopupProps> = ({
  position,
  onSave,
}) => {
  const [markerName, setMarkerName] = useState("");
  const [markerType, setMarkerType] = useState("");

  const handleSave = () => {
    onSave({
      position,
      name: markerName || "New Marker",
      type: markerType,
    });
    setMarkerName("");
  };

  return (
    <Paper>
      <Box
        sx={{
          padding: "12px",
          maxWidth: "250px",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <TextField
          label="Name"
          value={markerName}
          onChange={(e) => setMarkerName(e.target.value)}
          placeholder="Enter marker name"
        />
        <FormControl   >
          <InputLabel>Category</InputLabel>
          <Select
            value={markerType}
            label="Category"
            onChange={(e) => setMarkerType(e.target.value)}
          >
            {CATEGORIES.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <img
                    src={`/icons/${category.id}.svg`}
                    alt={category.name}
                    width="24"
                    height="24"
                  />
                  {category.name}
                </Box>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button  onClick={handleSave}>
          Pin
        </Button>
      </Box>
    </Paper>
  );
};

export default PendingMarkerPopup;
