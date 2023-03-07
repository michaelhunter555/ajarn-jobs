import "./GlassCard.css";

import React from "react";

const GlassCard = (props) => {
  return (
    <div className={`glass-card ${props.className}`} style={props.style}>
      {props.children}
    </div>
  );
};

export default GlassCard;
