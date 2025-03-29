import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Typography, 
  Box,
  Card,
  CardContent,
  CardMedia,
  Rating
} from "../../components/styled";
import { Marker } from '../../api/types';

interface SpotCardProps {
  spot: Marker;
}

const SpotCard: React.FC<SpotCardProps> = ({ spot }) => {
  const navigate = useNavigate();
  
  const handleCardClick = () => {
    navigate(`/spot/${spot.id}`);
  };

  // Default placeholder image if imageUrl is not provided
  const imageUrl = spot.imageUrl || `/icons/${spot.type}.svg`;
  
  // Truncate description if it's too long
  const truncatedDescription = spot.description 
    ? spot.description.length > 120 
      ? `${spot.description.substring(0, 120)}...` 
      : spot.description
    : 'No description available';

  return (
    <Card 
      onClick={handleCardClick}
      sx={{ 
        cursor: 'pointer',
        '&:hover': {
          transform: 'scale(1.02)',
        },
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        margin: '0 16px 16px 0',
        p: 2,
        boxShadow: 3,
        borderRadius: 2,
        border: '1px solid #e0e0e0',
        '.& :hover': {
          boxShadow: 6,
        },
      }}
    >
      <CardMedia
        component="img"
        height="140"
        image={imageUrl}
        alt={spot.name}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          {spot.name}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Rating 
            value={spot.rating || 0} 
            readOnly 
            precision={0.5} 
            size="small" 
          />
          <Typography variant="body2" sx={{ ml: 1 }}>
            {spot.rating ? spot.rating.toFixed(1) : 'Not rated'}
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {truncatedDescription}
        </Typography>
        <Box 
          sx={{ 
            display: 'flex',
            alignItems: 'center',
            mt: 1
          }}
        >
          <img
            src={`/icons/${spot.type}.svg`}
            alt={spot.type}
            width="20"
            height="20"
            style={{ marginRight: '8px' }}
          />
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {spot.type.charAt(0).toUpperCase() + spot.type.slice(1)}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default SpotCard;