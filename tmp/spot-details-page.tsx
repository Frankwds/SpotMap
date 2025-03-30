import React from "react"
import { useState } from "react"
import {
  Box,
  Typography,
  Paper,
  Rating,
  Button,
  Container,
  ThemeProvider,
  createTheme,
  CssBaseline,
  MobileStepper,
  IconButton,
  Avatar,
  Chip,
  Divider,
} from "@mui/material"
import { ArrowBack, LocationOn, Person, KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material"
import SwipeableViews from "react-swipeable-views"

// Using the provided types
interface Coordinates {
  lat: number
  lng: number
}

interface Marker {
  id: number
  name: string
  position: Coordinates
  type: string
  userId?: string
  userName?: string
  imageUrl: string
  description?: string
  rating?: number
}

interface MarkerDetails extends Marker {
  additionalImages?: string[]
}

// Sample data for demonstration
const sampleSpotData: MarkerDetails = {
  id: 1,
  name: "Sunset Viewpoint",
  position: { lat: 37.7749, lng: -122.4194 },
  type: "scenic",
  userId: "user123",
  userName: "AdventureSeeker",
  imageUrl: "https://picsum.photos/800/600",
  description:
    "A beautiful spot to watch the sunset over the city skyline. Perfect for photography enthusiasts and romantic evenings.",
  rating: 4.5,
  additionalImages: [
    "https://picsum.photos/800/600?random=1",
    "https://picsum.photos/800/600?random=2",
    "https://picsum.photos/800/600?random=3",
  ],
}

// Props for our component
interface SpotDetailsPageProps {
  spot?: MarkerDetails
  onBackToMap?: () => void
}

// Create dark theme
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9",
    },
    secondary: {
      main: "#f48fb1",
    },
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
  },
})

const SpotDetailsPage: React.FC<SpotDetailsPageProps> = ({
  spot = sampleSpotData, // Use sample data as default
  onBackToMap = () => console.log("Back to map clicked"), // Default handler
}) => {
  // State for image slider
  const [activeStep, setActiveStep] = useState(0)

  // Combine main image with additional images for the slider
  const allImages = [spot.imageUrl, ...(spot.additionalImages || [])].filter(Boolean)

  const maxSteps = allImages.length

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleStepChange = (step: number) => {
    setActiveStep(step)
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Button startIcon={<ArrowBack />} onClick={onBackToMap} variant="contained" sx={{ mb: 3 }}>
          Back to Map
        </Button>

        <Paper
          elevation={6}
          sx={{
            borderRadius: 2,
            overflow: "hidden",
            mb: 4,
          }}
        >
          {/* Image Slider */}
          <Box sx={{ position: "relative" }}>
            <SwipeableViews axis="x" index={activeStep} onChangeIndex={handleStepChange} enableMouseEvents>
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
                  <IconButton size="small" onClick={handleBack} disabled={activeStep === 0} sx={{ color: "white" }}>
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
                {spot.name}
              </Typography>

              <Chip label={spot.type} color="primary" variant="outlined" sx={{ textTransform: "capitalize" }} />
            </Box>

            {spot.rating !== undefined && (
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Rating value={spot.rating} precision={0.5} readOnly />
                <Typography variant="body2" sx={{ ml: 1 }}>
                  ({spot.rating.toFixed(1)})
                </Typography>
              </Box>
            )}

            <Divider sx={{ my: 2 }} />

            {spot.description && (
              <Typography variant="body1" paragraph>
                {spot.description}
              </Typography>
            )}

            <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 3 }}>
              {spot.position && (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <LocationOn color="primary" sx={{ mr: 1 }} />
                  <Typography variant="body2">
                    {`${spot.position.lat.toFixed(6)}, ${spot.position.lng.toFixed(6)}`}
                  </Typography>
                </Box>
              )}

              {spot.userName && (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Person color="primary" sx={{ mr: 1 }} />
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Avatar sx={{ width: 24, height: 24, mr: 1, fontSize: "0.875rem" }}>
                      {spot.userName.charAt(0).toUpperCase()}
                    </Avatar>
                    <Typography variant="body2">{spot.userName}</Typography>
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  )
}

export default SpotDetailsPage

