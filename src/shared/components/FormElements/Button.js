import React from "react";

import { Link } from "react-router-dom";

import { Button as AuthButton } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledButton = styled(AuthButton)(({ theme }) => ({
  font: "inherit",
  padding: "0.5rem 1.5rem",
  borderRadius: "4px",
  backgroundColor: theme.palette.primary.main,
  color: "white",
  cursor: "pointer",
  marginRight: "0rem",
  textDecoration: "none",
  display: "inline-block",
  "&:focus": {
    outline: "none",
  },
  "&:hover, &:active": {
    background: theme.palette.primary.dark,
    borderColor: "#43aaff",
  },
  "&.button--inverse": {
    background: "transparent",
    color: "#969696",
    "&:hover, &:active": {
      color: "white",
      background: "#3e9ec4",
    },
  },
  "&.button--danger": {
    background: "#830000",
    borderColor: "#830000",
    "&:hover, &:active": {
      background: "#f34343",
      borderColor: "#f34343",
    },
  },
  "&:disabled, &:hover:disabled, &:active:disabled": {
    background: "#ccc",
    color: "#979797",
    borderColor: "#ccc",
    cursor: "not-allowed",
  },
  "&.button--small": {
    fontSize: "0.8rem",
  },
  "&.button--big": {
    fontSize: "1.5rem",
  },
}));

const Button = (props) => {
  const { size, inverse, danger } = props;

  if (props.href) {
    return (
      <StyledButton
        className={`button--${size || "default"} ${
          inverse && "button--inverse"
        } ${danger && "button--danger"}`}
        href={props.href}
      >
        {props.children}
      </StyledButton>
    );
  }

  if (props.to) {
    return (
      <StyledButton
        className={`button--${size || "default"} ${
          inverse && "button--inverse"
        } ${danger && "button--danger"}`}
        as={Link}
        to={props.to}
        exact={props.exact}
      >
        {props.children}
      </StyledButton>
    );
  }

  return (
    <StyledButton
      className={`button--${size || "default"} ${
        inverse && "button--inverse"
      } ${danger && "button--danger"}`}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
      style={props.style}
    >
      {props.children}
    </StyledButton>
  );
};

export default Button;
