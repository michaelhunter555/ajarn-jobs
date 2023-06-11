import React from "react";

import {
  Avatar,
  Divider,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledList = styled(List)(({ theme }) => ({
  width: "100%",
  maxWidth: 360,
  bgcolor: theme.palette.background.paper,
}));

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  "&:hover": {
    backgroundColor: "rgb(255, 251, 228)",
  },
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  border: "1px solid #e5e5e5",
  borderRadius: "6px",
}));

const FeaturedJobs = (props) => {
  return (
    <StyledList>
      <StyledListItemButton alignItems="flex-start">
        <ListItemAvatar>
          <StyledAvatar
            alt={props.id.toString()}
            src={props.logo}
            variant="square"
          />
        </ListItemAvatar>
        <Stack spacing={0}>
          <ListItemText primary={props.title} />
          <Typography variant="subtitle2" color="text.secondary">
            {props.hours}
            {"-"}
            {props.salary}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary"></Typography>
        </Stack>
      </StyledListItemButton>
      <Divider />
    </StyledList>
  );
};

export default FeaturedJobs;
