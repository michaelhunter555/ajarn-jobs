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
import { styled } from "@mui/material/styles";

const StyledList = styled(List)(({ theme }) => ({
  width: "100%",
  maxWidth: 360,
  backgroundColor: theme.palette.background.paper,
  borderBottom: "1px solid #e0e0e0",
  [theme.breakpoints.down("md")]: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "0 auto",
  },
  [theme.breakpoints.up("sm")]: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "0 auto",
  },
}));

const StyledAvatar = styled(Avatar)({
  border: "1px solid #e5e5e5",
  borderRadius: "6px",
});

const Sponsors = (props) => {
  return (
    <>
      <StyledList>
        <ListItemButton alignItems="flex-start">
          <ListItemAvatar>
            <StyledAvatar
              alt={props.companyId}
              src={props.contentImage}
              variant="square"
            />
          </ListItemAvatar>
          <Stack spacing={0}>
            <ListItemText
              primary={
                <>
                  {props.title}
                  <Tooltip title={`${props.name} has been verified!`}>
                    <IconButton small="true">
                      <MdVerified style={{ color: "#85c3fd" }} size={16} />
                    </IconButton>
                  </Tooltip>
                </>
              }
              secondary={
                <>
                  {props.category} - {props.postDate}
                </>
              }
            />
          </Stack>
        </ListItemButton>
        <Divider />
      </StyledList>
    </>
  );
};

export default Sponsors;
