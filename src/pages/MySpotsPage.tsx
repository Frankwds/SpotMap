import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Typography, 
  CircularProgress, 
  AppBar, 
  Toolbar, 
  IconButton,
  Grid
} from '../components/styled';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import SpotCard from '../components/spots/SpotCard';
import MySpotsSidebar from '../components/sidebar/MySpotsSidebar';
import useUserMarkers from '../hooks/useUserMarkers';
import { useAuth } from '../context/AuthContext';
import UserMenu from '../components/auth/UserMenu';

const DRAWER_WIDTH = 280; // Match the width in MapSidebar

const MySpotsPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const { 
    userMarkers, 
    isLoading, 
    error, 
    searchTerm, 
    selectedCategories,
    handleSearch,
    handleCategoryChange
  } = useUserMarkers();

  // If user is not authenticated, redirect to the home page
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
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
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            My Spots
          </Typography>
          <UserMenu />
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <MySpotsSidebar
        open={sidebarOpen}
        onOpenChange={setSidebarOpen}
        selectedCategories={selectedCategories}
        onCategoryChange={handleCategoryChange}
        searchTerm={searchTerm}
        onSearch={handleSearch}
      />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: sidebarOpen ? `calc(100% - ${DRAWER_WIDTH}px)` : '100%',
          ml: sidebarOpen ? `${DRAWER_WIDTH}px` : 0,
          transition: (theme) =>
            theme.transitions.create(['width', 'margin'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
          mt: 8, // To account for AppBar
          height: 'calc(100vh - 64px)', // Full height minus AppBar
          overflow: 'auto',
        }}
      >
        <Container maxWidth="xl">
          {isLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
              <Typography color="error">{error}</Typography>
            </Box>
          ) : userMarkers.length === 0 ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
              <Typography variant="h5" sx={{ mb: 1 }}>
                You don't have any spots yet
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                Go to the map to create your first spot
              </Typography>
              <IconButton 
                color="primary" 
                size="large" 
                onClick={() => navigate('/')}
                sx={{ marginTop: '16px' }}
              >
                <AddIcon fontSize="large" />
              </IconButton>
            </Box>
          ) : (
            <Grid container spacing={3} sx={{ mt: 1 }}>
              {userMarkers.map((spot) => (
                <Grid sx={{ xs:12, sm:6, md:4, lg:3 }} key={spot.id}>
                  <SpotCard spot={spot} />
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      </Box>
    </Box>
  );
};

export default MySpotsPage;