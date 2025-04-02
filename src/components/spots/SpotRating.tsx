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
  const [rating, setRating] = useState<number | undefined>(currentRating);
  const { rateMarker } = useRatings();

  const handleRatingChange = async (event: React.SyntheticEvent, newValue: number | null) => {
    if (newValue !== null) {
      try {
        const meanRating = await rateMarker(markerId, newValue);
        setRating(meanRating);
      } catch (error) {
        console.error('Failed to update rating:', error);
      }
    }
  };
  
  return (
    <>
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          Rating
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Rating
            value={rating}
            precision={0.5}
            onChange={handleRatingChange}
            onChangeActive={(_, newHover) => setHoverRating(newHover)}
            size="large"
          />
          <Box sx={{ ml: 2 }}>
            <Typography variant="body2">
              {hoverRating !== -1 ? 
                `${hoverRating} ${hoverRating === 1 ? 'star' : 'stars'}` : 
                rating ? 
                  `${rating} ${rating === 1 ? 'star' : 'stars'}` : 
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