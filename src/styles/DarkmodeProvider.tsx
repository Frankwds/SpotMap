// This file is kept for compatibility but is no longer used.
// The dark mode functionality has been moved to src/styles/theme.tsx
// Please import DarkModeProvider and useDarkMode from there instead.

import React, { ReactNode } from "react";
import { DarkModeProvider as ActualDarkModeProvider, useDarkMode } from "./theme";

interface SidebarThemeProviderProps {
  children: ReactNode;
}

// This component is only kept for backward compatibility
const SidebarThemeProvider: React.FC<SidebarThemeProviderProps> = ({
  children,
}) => {
  return <ActualDarkModeProvider>{children}</ActualDarkModeProvider>;
};

// For backward compatibility
export const useTheme = useDarkMode;

export default SidebarThemeProvider;
