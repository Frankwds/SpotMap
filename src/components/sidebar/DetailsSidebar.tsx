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
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useDarkMode } from '../../styles/theme';

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
  const { isDarkMode, toggleDarkMode } = useDarkMode();

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
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton onClick={toggleDarkMode} size="small">
            {isDarkMode ? (
              <DarkModeIcon fontSize="small" />
            ) : (
              <LightModeIcon fontSize="small" />
            )}
          </IconButton>
          <IconButton onClick={() => onOpenChange(false)} size="small">
            <ChevronLeftIcon fontSize="small" />
          </IconButton>
        </Box>
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