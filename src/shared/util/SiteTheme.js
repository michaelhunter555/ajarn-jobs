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
