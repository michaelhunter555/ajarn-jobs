import React from 'react';

const SolanaGlassStyles = {
  ".solana": {
    position: "relative",
    border: "1px solid rgba(216, 216, 216, 0.5)",
    backgroundColor: "#4b6cb7",
    color: "#4d4d4d",
    fontSize: "16px",
    fontWeight: "bold",
    padding: "10px 20px",
    borderRadius: "6px",
    overflow: "hidden",
    boxShadow: "0px 0px 20px rgba(255, 255, 255, 0.5)",
    background:
      "linear-gradient(135deg, hsla(0, 0%, 100%, 0.15), hsla(0, 0%, 100%, 0.1125) 9.37%, hsla(0, 0%, 100%, 0.0375) 54.69%, hsla(0, 0%, 100%, 0.0394911) 66.15%, hsla(0, 0%, 100%, 0.15))",
  },
  ".solana::after": {
    content: '""',
    position: "absolute",
    top: "0",
    left: "-200%",
    width: "200%",
    height: "100%",
    transform: "skewX(-20deg)",
    backgroundImage:
      "linear-gradient(90deg, transparent, rgba(98, 250, 255, 0.219), transparent)",
    animation: "shine 2s infinite alternate",
    animationTimingFunction: "cubic-bezier(0, 0.6, 0.5, 0.4)",
  },
  "@keyframes shine": {
    "0%": {
      left: "-200%",
    },
    "60%": {
      left: "100%",
    },
    "100%": {
      left: "100%",
    },
  },
  ".home-column__urgent-container": {
    margin: "0 auto",
    maxWidth: "70%",
    backgroundColor: "white",
    border: "1px solid rgba(100, 100, 100, 0.26)",
  },
};

const SolanaGlassCard = (props) => {
  return (
    <div
      onClick={props.onClick}
      className={`solana ${props.className}`}
      style={{ ...SolanaGlassStyles["solana"], ...props.style }}
    >
      {props.children}
    </div>
  );
};

export default SolanaGlassCard;
