import React, { createContext, useContext, useState, ReactNode } from "react";

interface SidebarThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const SidebarThemeContext = createContext<SidebarThemeContextType>({
  isDarkMode: true,
  toggleTheme: () => {},
});

export const useTheme = () => useContext(SidebarThemeContext);

interface SidebarThemeProviderProps {
  children: ReactNode;
}

const SidebarThemeProvider: React.FC<SidebarThemeProviderProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <SidebarThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </SidebarThemeContext.Provider>
  );
};

export default SidebarThemeProvider;