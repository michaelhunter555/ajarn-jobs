import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
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
  },
});
