import React from "react";

import { css, Global } from "@emotion/react";
import { createTheme } from "@mui/material";

import { useThemeToggle } from "../context/theme-context";

export const GlobalStyle = () => {
  const { isDarkMode } = useThemeToggle();
  return (
    <Global
      styles={css`
        html {
          overflow-y: scroll;
        }
        ,
        a {
          text-decoration: none;
        }
        body {
          background: ${isDarkMode ? "#000" : "#f1f3f4"};
          padding: 0;
          max-width: 90%;
          margin: 6rem auto 0;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
            "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
            "Helvetica Neue", sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
      `}
    />
  );
};

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#128cb1",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        body {
          display: flex;
          flex-direction: column;
          padding: 0;
          max-width: 90%;
          margin: 6rem auto 0;
          background-color: #ededed;
        }
      `,
    },

    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: "#61616129",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: "text.secondary",
        },
      },
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#128cb1",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        body {
          display: flex;
          flex-direction: column;
          padding: 0;
          max-width: 90%;
          margin: 6rem auto 0;
          background-color: #ededed;
        }
        /* react-draft-wysiwyg toolbar dropdowns: dark background + light text in dark mode */
        .rdw-dropdown-wrapper {
          background-color: #424242 !important;
          color: rgba(255, 255, 255, 0.87) !important;
        }
        .rdw-dropdown-wrapper .rdw-dropdown-selectedtext,
        .rdw-dropdown-wrapper .rdw-dropdown-selectedtext span,
        .rdw-dropdown-selectedtext {
          color: rgba(255, 255, 255, 0.87) !important;
        }
        .rdw-dropdown-optionwrapper {
          background-color: #424242 !important;
          border: 1px solid #616161;
        }
        .rdw-dropdownoption-default,
        .rdw-dropdown-option {
          color: rgba(255, 255, 255, 0.87) !important;
        }
        .rdw-dropdown-option:hover,
        .rdw-dropdownoption-highlighted {
          background-color: #616161;
          color: #000 !important;
        }
        .rdw-dropdownoption-active {
          background-color: #757575;
          color: #000 !important;
        }
        .rdw-dropdown-carettoclose,
        .rdw-dropdown-carettoopen {
          border-top-color: rgba(255, 255, 255, 0.87) !important;
          border-bottom-color: rgba(255, 255, 255, 0.87) !important;
        }
      `,
    },

    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: "#61616129",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: "text.secondary",
        },
      },
    },
  },
});

export { darkTheme, theme };
