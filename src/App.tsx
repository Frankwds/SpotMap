import React, { useState } from "react";
import "./App.css";
import GoogleMaps from "./lib/googlemaps/GoogleMaps";
import useMarkers from "./hooks/useMarkers";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

// Import fonts
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

// Create a theme
const theme = createTheme({
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
  palette: {
    mode: 'dark',
    primary: {
      main: '#4CAF50',
    },
    secondary: {
      main: '#f44336',
    },
  },
});

function App() {
  const [pendingMarker, setPendingMarker] = useState<{ position: { lat: number, lng: number } } | null>(null);
  const { markers, addMarker, removeMarker } = useMarkers();

  function OnMapClick(e: any) {
    setPendingMarker({
      position: { lat: e.detail.latLng.lat, lng: e.detail.latLng.lng }
    });
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <GoogleMaps
          pendingMarker={pendingMarker}
          markers={markers}
          onMapClick={OnMapClick}
          removeMarker={removeMarker}
          addMarker={(markerData) => {
            addMarker(markerData);
            setPendingMarker(null);
          }}
        />
      </div>
    </ThemeProvider>
  );
}

export default App;
