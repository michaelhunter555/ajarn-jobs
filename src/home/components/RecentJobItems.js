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
import sanitizeHtml from "sanitize-html";

const StyledList = styled(List)(({ theme }) => ({
  width: "100%",

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

const RecentJobItems = (props) => {
  const sanitizedDescription = sanitizeHtml(props.description, {
    allowedTags: [],
    allowedAttributes: {},
  });

  const truncatedDescription = sanitizedDescription.length > 100 ? sanitizedDescription.substring(0, 100) + "..." : sanitizedDescription;
  return (
    <StyledList>
      <ListItemButton alignItems="flex-start">
        <ListItemAvatar>
          <StyledAvatar alt={props.id} src={props.logo} variant="square" />
        </ListItemAvatar>
        <Stack spacing={0}>
          <ListItemText
            primary={
              <>
                <Typography
                  sx={{ fontSize: 13 }}
                  variant="subtitle2"
                  color="text.primary"
                >
                  {props.salary}
                </Typography>
              </>
            }
            secondary={
              <Stack>
                <Typography variant="subtitle2" color="text.secondary">

                {props.location} - {props.creationDate}
              </Typography>
                <Typography
                  sx={{ fontSize: 13 }}
                  variant="subtitle2"
                  color="text.secondary"
                  dangerouslySetInnerHTML={{ __html: truncatedDescription }}
                />
              </Stack>
            }
          />
        </Stack>
      </ListItemButton>
      <Divider />
    </StyledList>
  );
};

export default RecentJobItems;
