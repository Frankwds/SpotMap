import React, { useState } from "react";
import { 
  Box, 
  Typography, 
  Rating,
  Divider
} from "../../components/styled";
import { useRatings } from "../../api/ratings";

interface SpotRatingProps {
  markerId: number;
  currentRating: number | undefined;
}

const SpotRating: React.FC<SpotRatingProps> = ({
  markerId,
  currentRating,
}) => {
  const [hoverRating, setHoverRating] = useState<number | null>(-1);
  const { rateMarker } = useRatings();

  
  return (
    <>
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          Rating
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Rating
            value={currentRating}
            precision={0.5}
            onChange={(_, newValue) => rateMarker(markerId, newValue? newValue : 2)}
            onChangeActive={(_, newHover) => setHoverRating(newHover)}
            size="large"
          />
          <Box sx={{ ml: 2 }}>
            <Typography variant="body2">
              {hoverRating !== -1 ? 
                `${hoverRating} ${hoverRating === 1 ? 'star' : 'stars'}` : 
                currentRating ? 
                  `${currentRating} ${currentRating === 1 ? 'star' : 'stars'}` : 
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