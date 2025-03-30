import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  CircularProgress, 
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography 
} from "../components/styled";
import { MarkerDetails } from "../api/types";
import useMarkers from "../hooks/useMarkers";
import SpotDetails from "../components/spots/SpotDetails";
import NotFound from "../components/common/NotFound";
import DetailsSidebar from "../components/sidebar/DetailsSidebar";
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useTheme } from "@mui/material";
import UserMenu from "../components/auth/UserMenu";

// Sample additional images for demonstration
const sampleAdditionalImages = [
  "https://source.unsplash.com/random/800x600?sunset",
  "https://source.unsplash.com/random/800x600?mountains",
  "https://source.unsplash.com/random/800x600?beach",
];

const DRAWER_WIDTH = 280;

const SpotDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const theme = useTheme();
  const { markers, isLoading } = useMarkers();
  const [spot, setSpot] = useState<MarkerDetails | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (id && markers) {
      const spotId = parseInt(id, 10);
      const foundSpot = markers.find(marker => marker.id === spotId);
      
      if (foundSpot) {
        // Convert to MarkerDetails and add sample additional images for demo
        const markerDetails: MarkerDetails = {
          ...foundSpot,
          additionalImages: sampleAdditionalImages
        };
        setSpot(markerDetails);
      } else {
        setSpot(null);
      }
    }
  }, [id, markers]);

  const handleBackClick = () => {
    navigate('/');
  };

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!spot) {
    return <NotFound message="Spot not found" />;
  }

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <DetailsSidebar 
        open={sidebarOpen} 
        onOpenChange={setSidebarOpen}
        spotId={spot.id}
      />

      {/* Main Content */}
      <Box sx={{ flexGrow: 1 }}>
        {/* App Bar */}
        <AppBar
          position="fixed"
          sx={{
            width: sidebarOpen ? `calc(100% - ${DRAWER_WIDTH}px)` : '100%',
            ml: sidebarOpen ? `${DRAWER_WIDTH}px` : 0,
            zIndex: (theme) => theme.zIndex.drawer + 1,
            transition: (theme) =>
              theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
              }),
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleSidebarToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <IconButton 
              color="inherit" 
              edge="start" 
              onClick={handleBackClick}
              sx={{ mr: 2 }}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6">
              {spot.name}
            </Typography>
            <Box sx={{ flexGrow: 1 }}></Box>
            <UserMenu />
          </Toolbar>
        </AppBar>

        {/* Main Content - Spot Details */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: sidebarOpen ? `calc(100% - ${DRAWER_WIDTH}px)` : '100%',
            ml: sidebarOpen ? `${DRAWER_WIDTH}px` : 0,
            transition: theme.transitions.create(['width', 'margin'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
            mt: 8, // To account for AppBar
            height: 'calc(100vh - 64px)', // Full height minus AppBar
            overflow: 'auto',
          }}
        >
          <SpotDetails spot={spot} />
        </Box>
      </Box>
    </Box>
  );
};

export default SpotDetailPage;