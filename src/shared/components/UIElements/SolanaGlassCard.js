import "./SolanaGlassCard.css";

import React from "react";

const SolanaGlassCard = (props) => {
  return (
    <div
      onClick={props.onClick}
      className={`solana ${props.className}`}
      style={props.style}
    >
      {props.children}
    </div>
  );
};

export default SolanaGlassCard;
