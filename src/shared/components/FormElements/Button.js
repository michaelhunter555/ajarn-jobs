import "./Button.css";

import React from "react";

import { Link } from "react-router-dom";

// const StyledButton = styled("button")(({ theme, inverse, danger, size }) => ({
//   font: "inherit",
//   border: "1px solid #a7a7a7",
//   borderRadius: "4px",
//   backgroundColor: inverse
//     ? "transparent"
//     : danger
//     ? theme.palette.error.main
//     : "#36c7cc",
//   "&:hover,active:": inverse
//     ? "#3e9ec4"
//     : danger
//     ? theme.palette.error.dark
//     : "#167f92",
//   color: inverse ? "#969696" : "white",
//   "&:hover,active": {
//     color: inverse ? "white" : "",
//   },
//   fontSize: size === "big" ? "1.5rem" : "0.8rem",
//   cursor: "pointer",
//   marginRight: "0rem",
//   textDecoration: "none",
//   display: "inline-block",
//   "&:disabled,&:hover:disabled,&:active:disable": {
//     background: "#ccc",
//     color: "#979797",
//     borderColor: "#ccc",
//     cursor: "not-allowed",
//   },
//   "&:focus": {
//     display: "none",
//   },
// }));

const Button = (props) => {
  if (props.href) {
    return (
      <a
        className={`button button--${props.size || "default"} ${
          props.inverse && "button--inverse"
        } ${props.danger && "button--danger"}`}
        href={props.href}
      >
        {props.children}
      </a>
    );
  }
  if (props.to) {
    return (
      <Link
        to={props.to}
        exact={props.exact}
        className={`button button--${props.size || "default"} ${
          props.inverse && "button--inverse"
        } ${props.danger && "button--danger"}`}
      >
        {props.children}
      </Link>
    );
  }
  return (
    <button
      className={`button button--${props.size || "default"} ${
        props.inverse && "button--inverse"
      } ${props.danger && "button--danger"}`}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
      style={props.style}
    >
      {props.children}
    </button>
  );
};

export default Button;
