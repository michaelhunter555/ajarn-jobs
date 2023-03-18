import React from "react";

import { styled } from "@mui/material/styles";

const StyledCard = styled("div")({
  position: "relative",
  margin: 0,
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.26)",
  borderRadius: "6px",
  padding: "10px",
  overflow: "hidden",
  background: "white",
  border: "1px solid transparent",
});

const Card = (props) => {
  return (
    <StyledCard className={`card ${props.className}`} style={props.style}>
      {props.children}
    </StyledCard>
  );
};

export default Card;
