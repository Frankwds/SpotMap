import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Box,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Coordinates, MarkerPost } from "../../../api/types";

interface Category {
  id: string;
  name: string;
}

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
  const [markerType, setMarkerType] = useState("kitesurf");
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const loadCategories = () => {
      const iconFiles = ["diving", "kitesurf", "skiing"];
      const categoryList = iconFiles.map((id) => {
        const name = id.charAt(0).toUpperCase() + id.slice(1);
        return { id, name };
      });
      setCategories(categoryList);
    };

    loadCategories();
  }, []);

  const handleSave = () => {
    onSave({
      position,
      name: markerName || "New Marker",
      type: markerType,
    });
    setMarkerName("");
  };

  return (
    <Paper elevation={3}>
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
          fullWidth
          variant="outlined"
          label="Name"
          value={markerName}
          onChange={(e) => setMarkerName(e.target.value)}
          placeholder="Enter marker name"
          size="small"
        />
        <FormControl fullWidth size="small">
          {/* <InputLabel id="marker-type-label">Type</InputLabel> */}
          <Select
            labelId="marker-type-label"
            value={markerType}
            label="Type"
            onChange={(e) => setMarkerType(e.target.value)}
          >
            {categories.map((category) => (
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
        <Button variant="contained" color="primary" onClick={handleSave}>
          Pin
        </Button>
      </Box>
    </Paper>
  );
};

export default PendingMarkerPopup;
