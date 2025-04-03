import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Typography, 
  CircularProgress,
  Grid,
  IconButton
} from '../components/styled';
import AddIcon from '@mui/icons-material/Add';

import SpotCard from '../components/spots/SpotCard';
import { useAuth } from '../context/AuthContext';
import PageLayout from '../components/layout/PageLayout';
import MapSidebar from '../components/sidebar/MapSidebar';
import useCategories from '../hooks/useCategories';
import { useMyMarkers } from '../api';

const DRAWER_WIDTH = 280; // Match the width in MapSidebar

const MySpotsPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { categories, handleCheckCategory, searchTerm, onSearch } = useCategories();
  const { markers, isLoading, error } = useMyMarkers();

  // Filter markers based on selected categories
  const filteredMarkers = useMemo(() => {
    if (!markers) return [];
      
    return markers.filter(marker => {
      const markerName = marker.name.toLowerCase();
      const searchTermLower = searchTerm.toLowerCase();
      return markerName.includes(searchTermLower) && categories.some(category => category.id === marker.type && category.checked);
    });
  }, [markers, categories, searchTerm]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
          <CircularProgress />
        </Box>
      );
    } 
    
    if (error) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
          <Typography color="error">{error}</Typography>
        </Box>
      );
    } 
    
    if (markers.length === 0) {
      return (
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
      );
    }
    
    return (
      <Grid container spacing={3} sx={{ mt: 1 }}>
        {filteredMarkers.map((spot) => (
          <Grid sx={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={spot.id}>
            <SpotCard spot={spot} />
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <>
      <MapSidebar
        open={sidebarOpen}
        onOpenChange={setSidebarOpen}
        handleCheckCategory={handleCheckCategory}
        searchTerm={searchTerm}
        onSearch={onSearch}
        categories={categories}
      />
      
      <PageLayout
        sidebarOpen={sidebarOpen}
        sidebarWidth={DRAWER_WIDTH}
        onSidebarToggle={handleSidebarToggle}
      >
        <Container maxWidth="xl">
          {renderContent()}
        </Container>
      </PageLayout>
    </>
  );
};

export default MySpotsPage;