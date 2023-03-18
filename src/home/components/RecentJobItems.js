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
import { styled } from "@mui/material/styles";

const StyledList = styled(List)(({ theme }) => ({
  width: "100%",
  maxWidth: 360,
  backgroundColor: theme.palette.background.paper,
}));

const StyledAvatar = styled(Avatar)({
  border: "1px solid #e5e5e5",
  borderRadius: "6px",
});

const RecentJobItems = (props) => {
  return (
    <StyledList>
      <ListItemButton alignItems="flex-start">
        <ListItemAvatar>
          <StyledAvatar alt={props.id} src={props.logo} variant="square" />
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
    </StyledList>
  );
};

export default RecentJobItems;
