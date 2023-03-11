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

const styles = {
  container: {
    width: "100%",
    maxWidth: 360,
    bgcolor: "background.paper",
  },
  button: {
    "&:hover": {
      backgroundColor: "rgb(255, 251, 228)",
    },
  },
};

const FeaturedJobs = (props) => {
  return (
    <List sx={styles.container}>
      <ListItemButton sx={styles.button} alignItems="flex-start">
        <ListItemAvatar>
          <Avatar
            alt={props.id}
            src={props.logo}
            sx={{ border: "1px solid #e5e5e5", borderRadius: "6px" }}
            variant="square"
          />
        </ListItemAvatar>
        <Stack spacing={0}>
          <ListItemText primary={props.company} />
        </Stack>
      </ListItemButton>
      <Divider />
    </List>
  );
};

export default FeaturedJobs;
