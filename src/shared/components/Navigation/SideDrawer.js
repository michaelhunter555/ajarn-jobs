//import "./SideDrawer.css";

import React from "react";

import { Box, Drawer } from "@mui/material";

const SideDrawer = (props) => {
  return (
    <Drawer open={props.show} onClose={props.onClick}>
      <Box
        sx={{ width: 250 }}
        role="presentation"
        onClick={props.onClick}
        onKeyDown={props.onKeyDown}
      >
        {props.children}
      </Box>
    </Drawer>
  );
};

export default SideDrawer;
