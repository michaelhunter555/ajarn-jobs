import "./Map.css";

import React, { useEffect, useRef } from "react";

import { styled } from "@mui/material/styles";

const StyledDivImage = styled("div")(({ theme }) => ({
  width: "100%",
  height: "100%",
}));

const Map = (props) => {
  const mapRef = useRef();

  const { center, zoom } = props;

  useEffect(() => {
    const map = new window.google.maps.Map(mapRef.current, {
      center: center,
      zoom: zoom,
    });

    new window.google.maps.Marker({ position: center, map: map });
  }, [center, zoom]);

  return (
    <StyledDivImage
      ref={mapRef}
      className={`${props.className}`}
      style={props.style}
    ></StyledDivImage>
  );
};

export default Map;

/**
 * import React, { useRef, useEffect } from 'react';

import './Map.css';

const Map = props => {
  const mapRef = useRef();
  
  const { center, zoom } = props;

  useEffect(() => {
    const map = new window.google.maps.Map(mapRef.current, {
      center: center,
      zoom: zoom
    });
  
    new window.google.maps.Marker({ position: center, map: map });
  }, [center, zoom]);  

  return (
    <div
      ref={mapRef}
      className={`map ${props.className}`}
      style={props.style}
    ></div>
  );
};

export default Map;
 */
