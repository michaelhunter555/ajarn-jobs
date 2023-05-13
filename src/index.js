import "./index.css";
import "animate.css";

import React from "react";

import ReactDOM from "react-dom/client";

import { styled } from "@mui/material/styles";

import App from "./App";

const StyledApp = () => {
  return (
    <>
      <GlobalStyles>
        <App />
      </GlobalStyles>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<StyledApp />);

const GlobalStyles = styled("div")(({ theme }) => ({
  a: {
    textDecoration: "none",
  },
  body: {
    maxWidth: "90%",
    margin: "5rem auto",
    marginTop: "5rem",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
    backgroundColor: "#f9f9f9",
  },
  "::webkit-scrollbar-track": {
    backgroundColor: "#f5f5f5",
    borderRadius: "4px",
  },
  "::webkit-scrollbar-thumb": {
    backgroundColor: "#c1c1c1",
    borderRadius: "4px",
  },
  "::webkit-scrollbar-thumb:hover": {
    backgroundColor: "#a1a1a1",
  },
  "::webkit-scrollbar-corner": {
    backgroundColor: "#f5f5f5",
  },
  code: {
    fontFamily:
      "source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace",
  },
}));
