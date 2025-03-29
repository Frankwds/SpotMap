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

const colors = {
  PRIMARY: "#4CAF50",
  PRIMARY_DARK: "#3d8b40",
  SECONDARY: "#f44336",
  SECONDARY_DARK: "#d32f2f",
  BLACK: "#000000",
  WHITE: "#ffffff",
  DARK_BACKGROUND: "#121212",
  LIGHT_BACKGROUND: "#ffffff",
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
        main: colors.PRIMARY, 
      },
      secondary: {
        main: colors.SECONDARY, 
      },
      text: {
        primary: mode === "light" ? colors.BLACK : colors.WHITE,
      },
      background: {
        paper: mode === "light" ? colors.LIGHT_BACKGROUND : colors.DARK_BACKGROUND,
      },
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: mode === "light" ? colors.LIGHT_BACKGROUND : colors.DARK_BACKGROUND,
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiInputBase-input": {
              color: mode === "light" ? colors.BLACK : colors.WHITE,
            },
            "& .MuiInputLabel-root": {
              color: mode === "light" ? colors.BLACK : colors.WHITE,
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: mode === "light" ? colors.BLACK : colors.WHITE,
              },
              "&:hover fieldset": {
                borderColor: mode === "light" ? colors.BLACK : colors.WHITE,
              },
              "&.Mui-focused fieldset": {
                borderColor: colors.PRIMARY,
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
              backgroundColor: colors.PRIMARY,
              "&:hover": {
                backgroundColor: colors.PRIMARY_DARK,
              },
            },
          },
          {
            props: { color: "secondary" },
            style: {
              backgroundColor: colors.SECONDARY,
              "&:hover": {
                backgroundColor: colors.SECONDARY_DARK,
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
