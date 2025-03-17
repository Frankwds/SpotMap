import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { ThemeProvider, CssBaseline } from "@mui/material";

// Import dark mode provider
import { DarkModeProvider, useDarkMode } from "./styles/theme";

// Import pages
import MapPage from "./pages/MapPage";
import SpotDetailPage from "./pages/SpotDetailPage";

// Import fonts
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const ThemedApp = () => {
  const { theme } = useDarkMode();
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <Routes>
          <Route path="/" element={<MapPage />} />
          <Route path="/spot/:id" element={<SpotDetailPage />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
};

function App() {
  return (
    <BrowserRouter>
      <DarkModeProvider>
        <ThemedApp />
      </DarkModeProvider>
    </BrowserRouter>
  );
}

export default App;
