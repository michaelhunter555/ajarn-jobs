import React from "react";

import ReactDOM from "react-dom/client";

import { CssBaseline } from "@mui/material";

import App from "./App";
////import { theme, selectPalette } from "./shared/util/SiteTheme";
import { ThemeToggleProvider } from "./shared/context/theme-context";
import { GlobalStyle } from "./shared/util/SiteTheme";

const StyledApp = () => {
  return (
    <ThemeToggleProvider>
      <CssBaseline />
      <GlobalStyle />
      <App />
    </ThemeToggleProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<StyledApp />);
