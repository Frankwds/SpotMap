import React, { useState } from "react";
import SwipeableViews from "react-swipeable-views";
import {
  Box,
  Typography,
  Paper,
  Chip,
  Divider,
  Avatar,
  IconButton,
  MobileStepper
} from "../styled";
import {
  LocationOn,
  Person,
  KeyboardArrowLeft,
  KeyboardArrowRight
} from "@mui/icons-material";
import { MarkerDetails } from "../../api/marker/types";
import { theme } from "../../styles/theme";
import SpotRating from "./SpotRating";

interface SpotDetailsProps {
  spot: MarkerDetails;
}

const SpotDetails: React.FC<SpotDetailsProps> = ({ spot }) => {
  // State for image slider
  const [activeStep, setActiveStep] = useState(0);

  // For demo purposes, if the spot doesn't have additionalImages, use sample ones
  const demoSpot = {
    ...spot,
    // If no image, use icon based on type
    imageUrl: spot.imageUrl || `/icons/${spot.type}.svg`,
    // For demo, add sample additional images if none present
    additionalImages: spot.additionalImages
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

  return (
    <Box sx={{ width: '100%', maxWidth: '1200px', mx: 'auto', mt: 2 }}>
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
                  height: 400,
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
          
          <SpotRating 
            markerId={demoSpot.id}
            currentRating={demoSpot.rating}
          />
          

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
                  <Avatar>
                    {demoSpot.userName.charAt(0).toUpperCase()}
                  </Avatar>
                  <Typography variant="body2">{demoSpot.userName}</Typography>
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default SpotDetails;