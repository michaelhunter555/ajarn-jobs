import React from "react";

import { MdVerified } from "react-icons/md";

import {
  Avatar,
  Divider,
  IconButton,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Stack,
  Tooltip,
} from "@mui/material";

const Sponsors = (props) => {
  return (
    <>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        <ListItemButton alignItems="flex-start">
          <ListItemAvatar>
            <Avatar
              alt={props.companyId}
              src={props.logo}
              sx={{ border: "1px solid #e5e5e5", borderRadius: "6px" }}
              variant="square"
            />
          </ListItemAvatar>
          <Stack spacing={0}>
            <ListItemText
              primary={
                <>
                  {props.company}
                  <Tooltip title={`${props.company} has been verified!`}>
                    <IconButton small="true">
                      <MdVerified style={{ color: "#85c3fd" }} size={16} />
                    </IconButton>
                  </Tooltip>
                </>
              }
              secondary={
                <>
                  {props.salary} - {props.location}
                </>
              }
            />
          </Stack>
        </ListItemButton>
        <Divider />
      </List>
    </>
  );
};

export default Sponsors;
