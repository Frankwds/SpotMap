import React from 'react';
import { 
  Drawer, 
  Box, 
  Typography, 
  Divider, 
  IconButton 
} from '../styled';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import InfoIcon from '@mui/icons-material/Info';

interface DetailsSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  spotId?: number;
}

const DetailsSidebar: React.FC<DetailsSidebarProps> = ({ 
  open, 
  onOpenChange,
  spotId
}) => {
  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={open}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', padding: 2, justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <InfoIcon sx={{ marginRight: 1 }} />
          <Typography variant="h6">Spot Details</Typography>
        </Box>
        <IconButton onClick={() => onOpenChange(false)}>
          <ChevronLeftIcon />
        </IconButton>
      </Box>
      
      <Divider />
      
      <Box sx={{ p: 2 }}>
        <Typography variant="body2" color="text.secondary">
          {spotId ? `Viewing spot with ID: ${spotId}` : 'No spot selected'}
        </Typography>
        
        {/* Additional sidebar content can be added here */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="body2">
            Use this sidebar to add additional functionality related to the spot details.
          </Typography>
        </Box>
      </Box>
    </Drawer>
  );
};

export default DetailsSidebar;