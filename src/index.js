import "./index.css";
import "animate.css";

import React from "react";

import ReactDOM from "react-dom/client";

import { ThemeProvider } from "@mui/material";

import App from "./App";
import { theme } from "./shared/util/SiteTheme";

const StyledApp = () => {
  return (
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<StyledApp />);
