import  React from "react"
import { useState, useRef } from "react"
import {
  Box,
  Typography,
  Paper,
  Button,
  Container,
  ThemeProvider,
  createTheme,
  CssBaseline,
  TextField,
  IconButton,
  Grid,
  Card,
  CardMedia,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Snackbar,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Tabs,
  Tab,
  FormHelperText,
} from "@mui/material"
import {
  ArrowBack,
  Delete,
  Add,
  Save,
  Cancel,
  Image as ImageIcon,
  LocationOn,
  Person,
  Upload,
  Link as LinkIcon,
} from "@mui/icons-material"

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
  additionalImages: [
    "https://picsum.photos/800/600?random=1",
    "https://picsum.photos/800/600?random=2",
    "https://picsum.photos/800/600?random=3",
  ],
}

// Available spot types
const spotTypes = ["scenic", "restaurant", "cafe", "park", "museum", "historical", "shopping", "entertainment", "other"]

// Props for our component
interface SpotEditPageProps {
  spot?: MarkerDetails
  onSave?: (updatedSpot: MarkerDetails) => void
  onCancel?: () => void
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

const SpotEditPage: React.FC<SpotEditPageProps> = ({
  spot = sampleSpotData, // Use sample data as default
  onSave = (updatedSpot) => console.log("Saved spot:", updatedSpot), // Default handler
  onCancel = () => console.log("Edit cancelled"), // Default handler
}) => {
  // Form state
  const [name, setName] = useState(spot.name)
  const [description, setDescription] = useState(spot.description || "")
  const [type, setType] = useState(spot.type)
  const [mainImage, setMainImage] = useState(spot.imageUrl)
  const [additionalImages, setAdditionalImages] = useState<string[]>(spot.additionalImages || [])
  const [newImageUrl, setNewImageUrl] = useState("")

  // File upload refs and state
  const mainFileInputRef = useRef<HTMLInputElement>(null)
  const additionalFileInputRef = useRef<HTMLInputElement>(null)
  const [addImageMethod, setAddImageMethod] = useState<"url" | "file">("file")

  // UI state
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" as "success" | "error" })
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [imageToDelete, setImageToDelete] = useState<{ index: number; isMain: boolean } | null>(null)

  // Validation
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (!name.trim()) newErrors.name = "Name is required"
    if (!mainImage.trim()) newErrors.mainImage = "Main image URL is required"
    if (name.length > 100) newErrors.name = "Name must be less than 100 characters"
    if (description.length > 1000) newErrors.description = "Description must be less than 1000 characters"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle form submission
  const handleSubmit = () => {
    if (!validateForm()) {
      setSnackbar({
        open: true,
        message: "Please fix the errors before saving",
        severity: "error",
      })
      return
    }

    const updatedSpot: MarkerDetails = {
      ...spot,
      name,
      description,
      type,
      imageUrl: mainImage,
      additionalImages: additionalImages.length > 0 ? additionalImages : undefined,
    }

    onSave(updatedSpot)
    setSnackbar({
      open: true,
      message: "Spot updated successfully!",
      severity: "success",
    })
  }

  // Handle adding a new image via URL
  const handleAddImageUrl = () => {
    if (!newImageUrl.trim()) {
      setErrors({ ...errors, newImage: "Image URL is required" })
      return
    }

    if (!newImageUrl.match(/^https?:\/\/.+\..+/)) {
      setErrors({ ...errors, newImage: "Please enter a valid URL" })
      return
    }

    setAdditionalImages([...additionalImages, newImageUrl])
    setNewImageUrl("")
    setErrors({ ...errors, newImage: "" })
  }

  // Handle file upload for main image
  const handleMainImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Check file type
    if (!file.type.startsWith("image/")) {
      setErrors({ ...errors, mainImage: "Please select an image file" })
      return
    }

    // Create a URL for the file
    const imageUrl = URL.createObjectURL(file)
    setMainImage(imageUrl)
    setErrors({ ...errors, mainImage: "" })

    // Reset the file input
    if (event.target) {
      event.target.value = ""
    }
  }

  // Handle file upload for additional images
  const handleAdditionalImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    const newImages: string[] = []
    let hasError = false

    // Process each file
    Array.from(files).forEach((file) => {
      if (!file.type.startsWith("image/")) {
        hasError = true
        return
      }

      // Create a URL for the file
      const imageUrl = URL.createObjectURL(file)
      newImages.push(imageUrl)
    })

    if (hasError) {
      setErrors({ ...errors, newImage: "One or more files are not valid images" })
    } else {
      setAdditionalImages([...additionalImages, ...newImages])
      setErrors({ ...errors, newImage: "" })
    }

    // Reset the file input
    if (event.target) {
      event.target.value = ""
    }
  }

  // Handle image deletion confirmation
  const confirmDeleteImage = (index: number, isMain: boolean) => {
    setImageToDelete({ index, isMain })
    setDeleteDialogOpen(true)
  }

  // Handle actual image deletion
  const handleDeleteImage = () => {
    if (imageToDelete === null) return

    if (imageToDelete.isMain) {
      // If deleting main image, replace with first additional image or empty string
      if (additionalImages.length > 0) {
        setMainImage(additionalImages[0])
        setAdditionalImages(additionalImages.slice(1))
      } else {
        setMainImage("")
      }
    } else {
      // Delete from additional images
      setAdditionalImages(additionalImages.filter((_, i) => i !== imageToDelete.index))
    }

    setDeleteDialogOpen(false)
    setImageToDelete(null)
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
          <Button startIcon={<ArrowBack />} onClick={onCancel} variant="outlined">
            Cancel
          </Button>
          <Button startIcon={<Save />} onClick={handleSubmit} variant="contained" color="primary">
            Save Changes
          </Button>
        </Box>

        <Paper elevation={6} sx={{ borderRadius: 2, p: 3, mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Edit Spot Details
          </Typography>

          <Divider sx={{ my: 2 }} />

          {/* Basic Information */}
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Spot Name"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={!!errors.name}
                helperText={errors.name}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="type-select-label">Spot Type</InputLabel>
                <Select
                  labelId="type-select-label"
                  value={type}
                  label="Spot Type"
                  onChange={(e) => setType(e.target.value)}
                >
                  {spotTypes.map((type) => (
                    <MenuItem key={type} value={type} sx={{ textTransform: "capitalize" }}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>


            <Grid item xs={12}>
              <TextField
                label="Description"
                fullWidth
                multiline
                rows={8} // Doubled from 4 to 8
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                error={!!errors.description}
                helperText={errors.description}
                sx={{ "& .MuiInputBase-root": { minHeight: "200px" } }} // Make it taller
              />
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          {/* Image Management */}
          <Typography variant="h6" gutterBottom>
            Manage Images
          </Typography>

          {/* Main Image */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" gutterBottom>
              Main Image
            </Typography>

            <Box sx={{ mb: 2 }}>
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                ref={mainFileInputRef}
                onChange={handleMainImageUpload}
              />
              <Button
                variant="contained"
                startIcon={<Upload />}
                onClick={() => mainFileInputRef.current?.click()}
                sx={{ mb: 2 }}
              >
                Upload Image
              </Button>

              {errors.mainImage && (
                <FormHelperText error sx={{ ml: 1 }}>
                  {errors.mainImage}
                </FormHelperText>
              )}
            </Box>

            {mainImage && (
              <Card
                sx={{
                  maxWidth: 500, // Increased from 345
                  position: "relative",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 8px 16px rgba(0,0,0,0.4)",
                  },
                }}
              >
                <Box sx={{ position: "relative", pt: "66%" /* Taller aspect ratio */ }}>
                  <CardMedia
                    component="img"
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    image={mainImage}
                    alt="Main spot image"
                    onError={(e) => {
                      ;(e.target as HTMLImageElement).src = "https://via.placeholder.com/600x400?text=Invalid+Image+URL"
                    }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      bgcolor: "rgba(0,0,0,0.6)",
                      borderRadius: "50%",
                    }}
                  >
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => confirmDeleteImage(0, true)}
                      disabled={!mainImage}
                      sx={{
                        color: "#fff",
                        "&:hover": {
                          bgcolor: "error.main",
                          color: "#fff",
                        },
                      }}
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                </Box>
              </Card>
            )}
          </Box>

          {/* Additional Images */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" gutterBottom>
              Additional Images
            </Typography>

            <Box sx={{ mb: 2 }}>
              <Tabs value={addImageMethod} onChange={(_, newValue) => setAddImageMethod(newValue)} sx={{ mb: 2 }}>
                <Tab icon={<Upload />} label="Upload File" value="file" />
                <Tab icon={<LinkIcon />} label="Image URL" value="url" />
              </Tabs>

              {addImageMethod === "file" ? (
                <Box>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    style={{ display: "none" }}
                    ref={additionalFileInputRef}
                    onChange={handleAdditionalImageUpload}
                  />
                  <Button
                    variant="contained"
                    startIcon={<Upload />}
                    onClick={() => additionalFileInputRef.current?.click()}
                  >
                    Upload Images
                  </Button>
                  <Typography variant="caption" sx={{ display: "block", mt: 1, color: "text.secondary" }}>
                    You can select multiple images at once
                  </Typography>
                </Box>
              ) : (
                <Box sx={{ display: "flex" }}>
                  <TextField
                    label="Add Image URL"
                    fullWidth
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    error={!!errors.newImage}
                    helperText={errors.newImage}
                    sx={{ mr: 1 }}
                  />
                  <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={handleAddImageUrl}
                    sx={{ minWidth: "120px" }}
                  >
                    Add
                  </Button>
                </Box>
              )}
            </Box>

            <Grid container spacing={3}>
              {additionalImages.map((img, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      transition: "transform 0.2s, box-shadow 0.2s",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: "0 8px 16px rgba(0,0,0,0.4)",
                      },
                      width:"250px",
                    }}
                  >
                    <Box sx={{ position: "relative", pt: "66%" /* Taller aspect ratio */ }}>
                      <CardMedia
                        component="img"
                        sx={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                        image={img}
                        alt={`Additional image ${index + 1}`}
                        onError={(e) => {
                          ;(e.target as HTMLImageElement).src =
                            "https://via.placeholder.com/600x400?text=Invalid+Image+URL"
                        }}
                      />
                      <Box
                        sx={{
                          position: "absolute",
                          top: 8,
                          right: 8,
                          bgcolor: "rgba(0,0,0,0.6)",
                          borderRadius: "50%",
                        }}
                      >
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => confirmDeleteImage(index, false)}
                          sx={{
                            color: "#fff",
                            "&:hover": {
                              bgcolor: "error.main",
                              color: "#fff",
                            },
                          }}
                        >
                          <Delete />
                        </IconButton>
                      </Box>
                    </Box>
                  </Card>
                </Grid>
              ))}

              {additionalImages.length === 0 && (
                <Grid item xs={12}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      p: 4,
                      border: "1px dashed rgba(255, 255, 255, 0.3)",
                      borderRadius: 1,
                    }}
                  >
                    <ImageIcon sx={{ fontSize: 48, color: "text.secondary", mb: 2 }} />
                    <Typography color="text.secondary">No additional images yet</Typography>
                    <Typography variant="caption" color="text.secondary">
                      Upload images or add image URLs above
                    </Typography>
                  </Box>
                </Grid>
              )}
            </Grid>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Location & User Information moved to bottom */}
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Location & User Information
          </Typography>

          <Box sx={{ mb: 3, p: 2, bgcolor: "background.default", borderRadius: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <LocationOn color="primary" sx={{ mr: 1 }} />
                  <Typography variant="body2">
                    {`${spot.position.lat.toFixed(6)}, ${spot.position.lng.toFixed(6)}`}
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Person color="primary" sx={{ mr: 1 }} />
                  <Typography variant="body2">{spot.userName || "Anonymous"}</Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Paper>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button variant="outlined" color="error" startIcon={<Cancel />} onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" startIcon={<Save />} onClick={handleSubmit}>
            Save Changes
          </Button>
        </Box>
      </Container>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>

      {/* Delete confirmation dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Delete Image</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {imageToDelete?.isMain
              ? "Are you sure you want to delete the main image? If you have additional images, the first one will become the main image."
              : "Are you sure you want to delete this image?"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteImage} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  )
}

export default SpotEditPage

