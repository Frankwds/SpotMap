import { createTheme } from "@mui/material";

// Import fonts
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

// Create a theme with custom components and styling
export const theme = createTheme({
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h4: {
      fontFamily: "'Brush Script MT', cursive",
      fontSize: "1.5rem",
      fontWeight: "bold",
    },
  },
  palette: {
    mode: "dark",
    primary: {
      main: "#4CAF50", // Green for Pin button
    },
    secondary: {
      main: "#f44336", // Red for Unpin button
    },
    text: {
      primary: "#000000", // Black text for popups
    },
    background: {
      paper: "#ffffff", // White background for popups
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#ffffff",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-input": {
            color: "#000000",
          },
          "& .MuiInputLabel-root": {
            color: "#000000",
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#000000",
            },
            "&:hover fieldset": {
              borderColor: "#000000",
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
