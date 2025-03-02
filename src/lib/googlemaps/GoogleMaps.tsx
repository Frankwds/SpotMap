import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import { type Marker, MarkerPost } from "../../api/types";
import { Button, TextField, Typography, Box, Paper } from "@mui/material";

const api_key = process.env.REACT_APP_GOOGLE_API_KEY || "";
const mapId = "64b9cff6747cc800";

type props = {
  pendingMarker: {
    position: { lat: number; lng: number };
  } | null;
  markers?: Marker[];
  onMapClick: (e: any) => void;
  removeMarker: (id: number) => void;
  addMarker: (marker: MarkerPost) => void;
};

const GoogleMaps = ({
  onMapClick,
  removeMarker,
  addMarker,
  pendingMarker,
  markers,
}: props) => {
  const navigate = useNavigate();
  const [openInfoWindow, setOpenInfoWindow] = useState<
    number | "pending" | null
  >(null);
  const [newMarkerName, setNewMarkerName] = useState("");

  return (
    <APIProvider apiKey={api_key}>
      <Map
        colorScheme="DARK"
        mapId={mapId}
        style={{ width: "100vw", height: "100vh" }}
        defaultCenter={{ lat: 63.429, lng: 10.392 }}
        defaultZoom={9}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
        onClick={onMapClick}
      >
        {pendingMarker && (
          <>
            <AdvancedMarker
              position={pendingMarker.position}
              clickable={true}
              onClick={() => setOpenInfoWindow("pending")}
            />
            {openInfoWindow === "pending" && (
              <InfoWindow
                position={pendingMarker.position}
                onCloseClick={() => setOpenInfoWindow(null)}
              >
                <Paper elevation={3}>
                  <Box sx={{ padding: "12px", maxWidth: "200px" }}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      label="Name"
                      value={newMarkerName}
                      onChange={(e) => setNewMarkerName(e.target.value)}
                      placeholder="Enter marker name"
                      size="small"
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        addMarker({
                          latitude: pendingMarker.position.lat,
                          longitude: pendingMarker.position.lng,
                          name: newMarkerName,
                        });
                        setOpenInfoWindow(null);
                        setNewMarkerName("New Marker");
                      }}
                    >
                      Pin
                    </Button>
                  </Box>
                </Paper>
              </InfoWindow>
            )}
          </>
        )}

        {markers?.map((marker) => (
          <React.Fragment key={marker.id}>
            <AdvancedMarker
              position={{ lat: marker.latitude, lng: marker.longitude }}
              clickable={true}
              onClick={() => setOpenInfoWindow(marker.id)}
            />
            {openInfoWindow === marker.id && (
              <InfoWindow
                position={{ lat: marker.latitude, lng: marker.longitude }}
                onCloseClick={() => setOpenInfoWindow(null)}
              >
                <Paper elevation={3}>
                  <Box sx={{ padding: "12px", maxWidth: "200px" }}>
                    <Typography
                      variant="h4"
                      sx={{
                        textAlign: "center",
                        marginBottom: "8px",
                        cursor: "pointer",
                        '&:hover': {
                          textDecoration: "underline"
                        }
                      }}
                      onClick={() => {
                        navigate(`/spot/${marker.id}`);
                        setOpenInfoWindow(null);
                      }}
                    >
                      {marker.name}
                    </Typography>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => {
                        removeMarker(marker.id);
                        setOpenInfoWindow(null);
                      }}
                    >
                      Unpin
                    </Button>
                  </Box>
                </Paper>
              </InfoWindow>
            )}
          </React.Fragment>
        ))}
      </Map>
    </APIProvider>
  );
};

export default GoogleMaps;
