import { createTheme, Theme, PaletteMode, colors as MuiColors } from "@mui/material";
import {
  React,
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
} from "react";

// Import fonts
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const colors = {
  black: "#000000", // Popup text, hamburger, profilemenu text WHEN lightmode
  white: "#ffffff", // Popup text, hamburger, profilemenu text WHEN darkmode
  darkBackground: "#121212",
  lightBackground: "#ffffff",
  greenButton: MuiColors.green[500], // Green button color
  redButton: MuiColors.red[500], // Red button color
};

// Create a theme with custom components and styling
export const createAppTheme = (mode: PaletteMode) =>
  createTheme({
    typography: {
      fontFamily: "Roboto, Arial, sans-serif",
      h4: {
        fontFamily: "'Brush Script MT', cursive",
        fontSize: "1.5rem",
        fontWeight: "bold",
      },
    },
    palette: {
      mode,
      primary: {
        main: colors.redButton, 
      },
      success: {
        main: colors.greenButton,
      },
      error: {
        main: colors.redButton,
      },

      text: {
        primary: mode === "light" ? colors.black : colors.white,
        secondary: mode === "light" ? colors.black : colors.white,
      },
      background: {
        paper: mode === "light" ? colors.lightBackground : colors.darkBackground,
      },
    },
  });

// Default theme
export const theme = createAppTheme("dark");

// Dark mode context
interface DarkModeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  theme: Theme;
}

export const DarkModeContext = createContext<DarkModeContextType>({
  isDarkMode: true,
  theme: theme,
});

export const useDarkMode = () => useContext(DarkModeContext);

interface DarkModeProviderProps {
  children: ReactNode;
}

export const DarkModeProvider: React.FC<DarkModeProviderProps> = ({
  children,
}) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const currentTheme = useMemo(
    () => createAppTheme(isDarkMode ? "dark" : "light"),
    [isDarkMode]
  );

  return (
    <DarkModeContext.Provider
      value={{ isDarkMode, toggleDarkMode, theme: currentTheme }}
    >
      {children}
    </DarkModeContext.Provider>
  );
};
