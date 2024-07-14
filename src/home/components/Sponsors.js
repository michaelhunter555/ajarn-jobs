import React from "react";

import { MdVerified } from "react-icons/md";
import sanitizeHtml from "sanitize-html";

import {
  Avatar,
  Box,
  Chip,
  Divider,
  IconButton,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

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

const Sponsors = (props) => {
  const sanitizedPostContent = sanitizeHtml(props.postContent, {
    allowedTags: [],
    allowedAttributes: {},
  });

  const truncatedContent =
    sanitizedPostContent.length > 80
      ? sanitizedPostContent.substring(0, 80) + "..."
      : sanitizedPostContent;

  return (
    <>
      <StyledList component="div">
        <ListItemButton component="div" alignItems="flex-start">
          <ListItemAvatar component="div">
            <StyledAvatar
              alt={props.companyId}
              src={props.contentImage}
              variant="square"
            />
          </ListItemAvatar>
          <Stack spacing={0}>
            <ListItemText
              component="div"
              primary={
                <>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Chip
                      component="div"
                      size="small"
                      label={props.category}
                      sx={{ fontSize: "11px" }}
                    />
                    <Typography
                      component="div"
                      variant="subtitle2"
                      color="text.secondary"
                      sx={{ fontSize: "11px", flexWrap: "nowrap" }}
                    >
                      {props.postDate}
                    </Typography>
                  </Stack>
                </>
              }
              secondary={
                <>
                  <Stack component="span" direction="row" alignItems="center">
                    <Typography
                      component="span"
                      variant="body1"
                      color="text.primary"
                      sx={{ fontSize: "12px" }}
                    >
                      {props.title}
                    </Typography>
                    <Tooltip
                      component="span"
                      title={`${props.name} is a ${props.userType} posting`}
                    >
                      <IconButton component="span" small="true">
                        <MdVerified style={{ color: "#66bac6" }} size={16} />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                  <Box
                    component="span"
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                    }}
                  >
                    <Typography
                      component="span"
                      variant="subtitle2"
                      color="text.secondary"
                      sx={{ fontSize: "12px" }}
                    >
                      {truncatedContent}
                    </Typography>
                  </Box>
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
