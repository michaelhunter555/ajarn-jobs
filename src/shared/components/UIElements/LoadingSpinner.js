import "./LoadingSpinner.css";

import React from "react";

const LoadingSpinnerStyle = {
  "lds-dual-ring": {
    display: "inline-block",
    width: "64px",
    height: "64px",
  },
  ".lds-dual-ring:after": {
    content: " ",
    display: "block",
    width: "46px",
    height: "46px",
    margin: "1px",
    borderRadius: "50%",
    border: "5px solid #510077",
    borderColor: "#510077 transparent #510077 transparent",
    animation: "lds-dual-ring 1.2s linear infinite",
  },
  ".loading-spinner__overlay": {
    height: "100%",
    width: "100%",
    position: "absolute",
    top: "0",
    left: "0",
    background: "rgba(255, 255, 255, 0.9)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  "@keyframes lds-dual-ring": {
    "0%": {
      transform: "rotate(0deg)",
    },
    "100%": {
      transform: "rotate(360deg)",
    },
  },
};

const LoadingSpinner = (props) => {
  return (
    <div className={`${props.asOverlay && "loading-spinner__overlay"}`}>
      <div className="lds-dual-ring"></div>
    </div>
  );
};

export default LoadingSpinner;
