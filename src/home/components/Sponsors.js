import React from "react";

import { MdVerified } from "react-icons/md";

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
        <ListItemButton component="div" alignItems="flex-start">
          <ListItemAvatar>
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
                      size="small"
                      label={props.category}
                      sx={{ fontSize: "11px" }}
                    />
                  </Stack>
                </>
              }
              secondary={
                <>
                  <Stack direction="row" alignItems="center">
                    <Typography
                      variant="body1"
                      color="text.primary"
                      sx={{ fontSize: "12px" }}
                    >
                      {props.title}
                    </Typography>
                    <Tooltip title={`${props.name} has been verified!`}>
                      <IconButton small="true">
                        <MdVerified style={{ color: "#85c3fd" }} size={16} />
                      </IconButton>
                    </Tooltip>
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      sx={{ fontSize: "11px" }}
                    >
                      {props.postDate}
                    </Typography>
                  </Stack>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      sx={{ fontSize: "12px" }}
                    >
                      {props.postContent}
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
