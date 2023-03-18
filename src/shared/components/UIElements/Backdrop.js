import React from "react";
import ReactDOM from "react-dom";

import { styled } from "@mui/material/styles";

const StyledBackdrop = styled("div")({
  position: "fixed",
  top: "0",
  left: "0",
  width: "100%",
  height: "100vh",
  background: "rgba(0, 0, 0, 0.75)",
  zIndex: "10",
});

const Backdrop = (props) => {
  return ReactDOM.createPortal(
    <StyledBackdrop
      className="backdrop"
      onClick={props.onClick}
    ></StyledBackdrop>,
    document.getElementById("backdrop-hook")
  );
};

export default Backdrop;
