import "./Avatar.css";

import React from "react";

import { styled } from "@mui/material/styles";

const StyledAvatar = styled("div")({
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  "&:img": {
    display: "block",
    borderRadius: "50%",
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
});

const Avatar = (props) => {
  return (
    <StyledAvatar className={`${props.className}`} style={props.style}>
      <img
        src={props.image}
        alt={props.alt}
        style={{ width: props.width, height: props.width }}
      />
    </StyledAvatar>
  );
};

export default Avatar;
