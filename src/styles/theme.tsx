import { createTheme, Theme, PaletteMode } from "@mui/material";
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
        main: "#4CAF50", // Green for Pin button
      },
      secondary: {
        main: "#f44336", // Red for Unpin button
      },
      text: {
        primary: mode === "light" ? "#000000" : "#ffffff",
      },
      background: {
        paper: mode === "light" ? "#ffffff" : "#121212",
      },
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: mode === "light" ? "#ffffff" : "#121212",
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiInputBase-input": {
              color: mode === "light" ? "#000000" : "#ffffff",
            },
            "& .MuiInputLabel-root": {
              color: mode === "light" ? "#000000" : "#ffffff",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: mode === "light" ? "#000000" : "#ffffff",
              },
              "&:hover fieldset": {
                borderColor: mode === "light" ? "#000000" : "#ffffff",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#4CAF50",
              },
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            width: "100%",
            marginTop: "8px",
            fontWeight: "bold",
          },
        },
        variants: [
          {
            props: { color: "primary" },
            style: {
              backgroundColor: "#4CAF50",
              "&:hover": {
                backgroundColor: "#3d8b40",
              },
            },
          },
          {
            props: { color: "secondary" },
            style: {
              backgroundColor: "#f44336",
              "&:hover": {
                backgroundColor: "#d32f2f",
              },
            },
          },
        ],
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
  toggleDarkMode: () => {},
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
