import React, { useContext } from "react";

import { FaChalkboardTeacher, FaSchool } from "react-icons/fa";

import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import {
  Avatar,
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import { AuthContext } from "../../shared/context/auth-context";
import { getTimeDifference } from "../../shared/util/getTimeDifference";

const UserComments = ({ usersComments, commentsIsLoading }) => {
  const auth = useContext(AuthContext);
  return (
    <>
      <Paper
        elevation={0}
        sx={{
          height: usersComments?.comments?.length === 0 ? 200 : "",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          padding: 4,
          boxSizing: "border-box",
          margin: "0 0 2rem 0",
        }}
      >
        {usersComments?.length === 0 && (
          <Typography variant="h4">No comments yet. Be the first!</Typography>
        )}
        {commentsIsLoading && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <CircularProgress />
          </Box>
        )}
        {!commentsIsLoading &&
          usersComments?.length !== 0 &&
          usersComments?.map((comment, i) => (
            <Box
              key={i}
              sx={{
                display: "flex",
                alignItems: "flex-start",
                flexDirection: "column",
                gap: "14px",
              }}
            >
              <Stack direction="row" alignItems="center" spacing={2}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Avatar
                    sx={{ height: 70, width: 70 }}
                    alt={`${comment?.userId?.name}-${comment?.userId?.userType}`}
                    src={`${process.env.REACT_APP_IMAGE}${comment?.userId?.image}`}
                  />
                </Stack>
                <Stack alignItems="flex-start">
                  <Stack direction="row" alignItems="center">
                    <Typography varaint="body1" color="text.primary">
                      {comment?.userId?.name} ·{" "}
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary">
                      {getTimeDifference(comment?.commentDate)}
                    </Typography>
                  </Stack>
                  <Chip
                    label={`${comment?.userId?.userType}
                      ${
                        comment?.userId?.userType === "teacher"
                          ? " | " + comment?.userId?.workExperience + " years"
                          : ""
                      } `}
                    icon={
                      comment?.userId?.userType === "teacher" ? (
                        <FaChalkboardTeacher />
                      ) : (
                        <FaSchool />
                      )
                    }
                  />
                </Stack>
              </Stack>

              <Typography
                dangerouslySetInnerHTML={{ __html: comment?.comment }}
              />

              <Grid container direction="row" spacing={1} alignItems="center">
                <Grid item>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Button
                      disabled={!auth.isLoggedIn}
                      endIcon={
                        <ThumbUpIcon color="action" sx={{ fontSize: 20 }} />
                      }
                    >
                      <Typography
                        color="text.secondary"
                        variant="subtitle2"
                        sx={{ fontSize: 14, fontWeight: 550 }}
                      >
                        0
                      </Typography>
                    </Button>
                  </Stack>
                </Grid>

                <Grid item>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Button
                      disabled={!auth.isLoggedIn}
                      endIcon={
                        <ThumbDownIcon color="action" sx={{ fontSize: 20 }} />
                      }
                    >
                      <Typography
                        color="text.secondary"
                        variant="subtitle2"
                        sx={{ fontSize: 14, fontWeight: 550 }}
                      >
                        0
                      </Typography>
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
              {i - usersComments?.length - 1 && (
                <Divider light sx={{ width: "100%", margin: "0.5rem 0" }} />
              )}
            </Box>
          ))}
      </Paper>
    </>
  );
};

export default UserComments;
