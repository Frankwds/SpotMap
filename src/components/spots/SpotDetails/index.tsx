import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SwipeableViews from "react-swipeable-views";
import {
  Box,
  Typography,
  Paper,
  Rating,
  Button,
  Container,
  Chip,
  Divider,
  Avatar,
  IconButton,
  MobileStepper
} from "../../../components/styled";
import {
  ArrowBack,
  LocationOn,
  Person,
  KeyboardArrowLeft,
  KeyboardArrowRight
} from "@mui/icons-material";
import { MarkerDetails } from "../../../api/types";
import { useTheme } from "@mui/material";

// Sample additional images for demonstration
const sampleAdditionalImages = [
  "https://source.unsplash.com/random/800x600?sunset",
  "https://source.unsplash.com/random/800x600?mountains",
  "https://source.unsplash.com/random/800x600?beach",
];

interface SpotDetailsProps {
  spot: MarkerDetails;
}

const SpotDetails: React.FC<SpotDetailsProps> = ({ spot }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  
  // State for image slider
  const [activeStep, setActiveStep] = useState(0);

  // For demo purposes, if the spot doesn't have additionalImages, use sample ones
  const demoSpot = {
    ...spot,
    // If no image, use icon based on type
    imageUrl: spot.imageUrl || `/icons/${spot.type}.svg`,
    // For demo, add sample additional images if none present
    additionalImages: spot.additionalImages || sampleAdditionalImages
  };

  // Combine main image with additional images for the slider
  const allImages = [demoSpot.imageUrl, ...(demoSpot.additionalImages || [])].filter(Boolean);

  const maxSteps = allImages.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  const handleBackToMap = () => {
    navigate('/');
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Button 
        startIcon={<ArrowBack />} 
        onClick={handleBackToMap} 
        color="inherit"
      >
        Back to Map
      </Button>

      <Paper >
        {/* Image Slider */}
        <Box sx={{ position: "relative" }}>
          <SwipeableViews 
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={activeStep}
            onChangeIndex={handleStepChange}
            enableMouseEvents
          >
            {allImages.map((img, index) => (
              <Box
                key={index}
                sx={{
                  height: 300,
                  display: "block",
                  overflow: "hidden",
                  width: "100%",
                  backgroundImage: `url(${img})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
            ))}
          </SwipeableViews>

          {maxSteps > 1 && (
            <MobileStepper
              steps={maxSteps}
              position="static"
              activeStep={activeStep}
              sx={{
                background: "rgba(0,0,0,0.6)",
                position: "absolute",
                bottom: 0,
                width: "100%",
              }}
              nextButton={
                <IconButton
                  size="small"
                  onClick={handleNext}
                  disabled={activeStep === maxSteps - 1}
                  sx={{ color: "white" }}
                >
                  <KeyboardArrowRight />
                </IconButton>
              }
              backButton={
                <IconButton 
                  size="small" 
                  onClick={handleBack} 
                  disabled={activeStep === 0} 
                  sx={{ color: "white" }}
                >
                  <KeyboardArrowLeft />
                </IconButton>
              }
            />
          )}
        </Box>

        {/* Spot Details */}
        <Box sx={{ p: 3 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              {demoSpot.name}
            </Typography>

            <Chip label={demoSpot.type} color="primary" variant="outlined" sx={{ textTransform: "capitalize" }} />
          </Box>

          {demoSpot.rating !== undefined && (
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Rating value={demoSpot.rating} precision={0.5} readOnly />
            </Box>
          )}

          <Divider />

          {demoSpot.description && (
            <Typography variant="body1" paragraph>
              {demoSpot.description}
            </Typography>
          )}

          <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 3 }}>
            {demoSpot.position && (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <LocationOn color="primary" sx={{ mr: 1 }} />
                <Typography variant="body2">
                  {`${demoSpot.position.lat.toFixed(6)}, ${demoSpot.position.lng.toFixed(6)}`}
                </Typography>
              </Box>
            )}

            {demoSpot.userName && (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Person color="primary" sx={{ mr: 1 }} />
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Avatar >
                    {demoSpot.userName.charAt(0).toUpperCase()}
                  </Avatar>
                  <Typography variant="body2">{demoSpot.userName}</Typography>
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default SpotDetails;