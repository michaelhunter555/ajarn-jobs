import React, { createContext, useContext, useState } from "react";

import { ThemeProvider } from "@mui/material/styles";

import { darkTheme, theme } from "../util/SiteTheme";

const ThemeToggleContext = createContext();

export const useThemeToggle = () => useContext(ThemeToggleContext);

export const ThemeToggleProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <ThemeToggleContext.Provider value={{ isDarkMode, toggleTheme }}>
      <ThemeProvider theme={isDarkMode ? darkTheme : theme}>
        {children}
      </ThemeProvider>
    </ThemeToggleContext.Provider>
  );
};
