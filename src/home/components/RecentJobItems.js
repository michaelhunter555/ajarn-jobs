import React from "react";

import {
  Avatar,
  Divider,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Stack,
} from "@mui/material";

const RecentJobItems = (props) => {
  // logo, id, salary, location, hours;

  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <ListItemButton alignItems="flex-start">
        <ListItemAvatar>
          <Avatar
            alt={props.id}
            src={props.logo}
            sx={{ border: "1px solid #e5e5e5", borderRadius: "6px" }}
            variant="square"
          />
        </ListItemAvatar>
        <Stack spacing={0}>
          <ListItemText
            primary={props.salary}
            secondary={
              <>
                {props.location} - {props.creationDate}
              </>
            }
          />
        </Stack>
      </ListItemButton>
      <Divider />
    </List>
  );
};

export default RecentJobItems;
