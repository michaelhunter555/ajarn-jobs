import React from "react";

import { styled } from "@mui/material/styles";

const MainHeaderStyles = styled("header")(({ theme, navIsScrolled }) => ({
  width: "100%",
  height: "4rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  position: "fixed",
  top: "0",
  left: "0",
  background: navIsScrolled
    ? theme.palette.background.glass
    : theme.palette.background.paper,
  boxShadow: navIsScrolled
    ? "0 2px 6px rgba(0, 0, 0, 0.26)"
    : "0 2px 6px rgba(0, 0, 0, 0.26)",
  padding: "0 1rem",
  zIndex: 11,
  border: theme.palette.background.default,
  backdropFilter: navIsScrolled ? "blur(5px)" : "none",
  WebkitBackdropFilter: navIsScrolled ? "blur(5px)" : "none",
  main: {
    marginTop: "5rem",
    [theme.breakpoints.up("md")]: {
      marginTop: 0,
    },
  },
  [theme.breakpoints.up("md")]: {
    justifyContent: "space-between",
  },
}));

const MainHeader = (props) => {
  return (
    <MainHeaderStyles navIsScrolled={props.navIsScrolled}>
      {props.children}
    </MainHeaderStyles>
  );
};

export default MainHeader;
