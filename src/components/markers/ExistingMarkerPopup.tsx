import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Typography, Box, Paper } from "../../components/styled";
import { Marker } from "../../api/types";
import { capitalizeFirstLetter } from "../../utils/stringUtils";
import { useAuth } from "../../context/AuthContext";

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
  const { user } = useAuth();
  
  // Check if current user is the marker owner
  const isOwner = user?.id === marker.userId;

  const handleViewDetails = () => {
    navigate(`/spot/${marker.id}`);
    onClose();
  };

  const handleDelete = () => {
    onDelete(marker.id);
    onClose();
  };

  // Format type name to capitalize first letter
  const typeDisplay = marker.type ? capitalizeFirstLetter(marker.type) : "Unknown";

  return (
    <Paper >
      <Box sx={{ padding: "12px", maxWidth: "200px" }}>
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            marginBottom: "8px",
            cursor: "pointer",
            "&:hover": {
              textDecoration: "underline",
            },
          }}
          onClick={handleViewDetails}
        >
          {marker.name}
        </Typography>
        
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
          <img 
            src={`/icons/${marker.type}.svg`} 
            alt={`${marker.type} icon`} 
            width="24" 
            height="24" 
          />
          <Typography variant="body2">{typeDisplay}</Typography>
        </Box>
        
        {/* User signature */}
        { !isOwner && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
            <Typography variant="caption" >
              By {marker.userName}
            </Typography>
          </Box>
        )}
        
        {/* Only show delete button if user is the owner */}
        {isOwner && (
          <Button  
          onClick={handleDelete}
            color="secondary">
            Unpin
          </Button>
        )}
      </Box>
    </Paper>
  );
};

export default ExistingMarkerPopup;

