import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { ThemeProvider, CssBaseline } from "@mui/material";

// Import theme
import { theme } from "./styles/theme";

// Import pages
import MapPage from "./pages/MapPage";
import SpotDetailPage from "./pages/SpotDetailPage";

// Import fonts
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="App">
          <Routes>
            <Route path="/" element={<MapPage />} />
            <Route path="/spot/:id" element={<SpotDetailPage />} />
          </Routes>
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
