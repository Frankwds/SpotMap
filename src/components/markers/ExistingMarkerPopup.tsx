import React from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Box, Paper, Rating, Divider, Button } from "../../components/styled";
import { Marker } from "../../api/markers/types";
import { capitalizeFirstLetter } from "../../utils/stringUtils";

interface ExistingMarkerPopupProps {
  marker: Marker;
  onDelete: (id: number) => void;
  onClose: () => void;
}

const ExistingMarkerPopup: React.FC<ExistingMarkerPopupProps> = ({
  marker,
  onClose,
}) => {
  const navigate = useNavigate();
  const handleViewDetails = () => {
    navigate(`/spot/${marker.id}`);
    onClose();
  };


  // Format type name to capitalize first letter
  const typeDisplay = marker.type ? capitalizeFirstLetter(marker.type) : "Unknown";

  return (
    <Paper>
      <Box sx={{ padding: "16px", width: "300px", minWidth: "300px" }}>
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
        
        {/* Category and Rating side by side */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
          {/* Category */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <img 
              src={`/icons/${marker.type}.svg`} 
              alt={`${marker.type} icon`} 
              width="24" 
              height="24" 
            />
            <Typography variant="body2">{typeDisplay}</Typography>
          </Box>
          
          {/* Rating - non-interactive */}
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
            <Rating
              value={marker.rating || 0}
              precision={0.5}
              readOnly
              size="small"
            />
            <Typography variant="caption">
              {marker.rating ? `${marker.rating}` : 'Not rated'}
            </Typography>
          </Box>
        </Box>
        
        {/* Description */}
        {marker.description && (
          <>
            <Divider  />
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" sx={{ 
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical"
              }}>
                {marker.description}
              </Typography>
            </Box>
          </>
        )}
        

        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
          <Typography variant="caption">
            By {marker.userName}
          </Typography>
        </Box>
        
        
        {/* Check it out button */}
        <Box sx={{ marginTop: 2 }}>
          <Button
            onClick={handleViewDetails}
            color="primary"
          >
            Check it out
          </Button>

        </Box>
      </Box>
    </Paper>
  );
};

export default ExistingMarkerPopup;

