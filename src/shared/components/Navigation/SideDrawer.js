import React from "react";

import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, Drawer } from "@mui/material";

const SideDrawer = (props) => {
  return (
    <Drawer open={props.show} onClose={props.onClick}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "1rem 1rem 0 0",
        }}
      >
        <Button onClick={props.onClick} sx={{ borderRadius: "50%" }}>
          <CloseIcon
            style={{
              fontSize: 30,
            }}
          />
        </Button>
      </Box>
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
