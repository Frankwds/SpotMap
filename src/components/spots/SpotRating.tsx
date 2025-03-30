import React, { useState } from "react";
import { 
  Box, 
  Typography, 
  Rating,
  Divider
} from "../../components/styled";
import  useMarkers from "../../hooks/useMarkers";

interface SpotRatingProps {
  spotRating: number | undefined;
  spotID: number;
}

const SpotRating: React.FC<SpotRatingProps> = ({ 
    spotRating,
    spotID,
}) => {
  const [hoverRating, setHoverRating] = useState<number | null>(-1);
  const  {rateMarker}  = useMarkers();

  
  return (
    <>
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          Rating
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Rating
            value={spotRating}
            precision={0.5}
            onChange={(_, newValue) => rateMarker(spotID, newValue? newValue : 2)}
            onChangeActive={(_, newHover) => setHoverRating(newHover)}
            size="large"
          />
          <Box sx={{ ml: 2 }}>
            <Typography variant="body2">
              {hoverRating !== -1 ? 
                `${hoverRating} ${hoverRating === 1 ? 'star' : 'stars'}` : 
                spotRating ? 
                  `${spotRating} ${spotRating === 1 ? 'star' : 'stars'}` : 
                  'Not rated yet'}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Divider/>
    </>
  );
};

export default SpotRating;