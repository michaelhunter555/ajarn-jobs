import React, { useContext, useState } from "react";

import { Link as RouterLink } from "react-router-dom";

import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  Modal,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { AuthContext } from "../../shared/context/auth-context";
import { useUser } from "../../shared/hooks/user-hook";
import JobRequirements from "./JobRequirements";

const StyledBoxModal = styled(Paper)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  height: "auto",
  bgcolor: "background.paper",
  border: "2px solid #fff",
  borderRadius: "15px",
  boxShadow: 24,
  padding: 14,
});

const StyledBoxContainer = styled(Box)({
  padding: "0 3rem 0 0 ",
  overflowY: "auto",
  maxHeight: 370,
  pointerEvents: "auto",
  "&::-webkit-scrollbar": {
    width: "8px",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "#b5b5b5",
    borderRadius: "4px",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: "#8b8b8d",
  },
  "&::-webkit-scrollbar-track": {
    background: "#f1f1f1",
    borderRadius: "4px",
  },
});

const FeaturedJobDetails = ({ job, isLoading }) => {
  const auth = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const { applyToJob, error, clearError, isPostLoading } = useUser();

  const applyToJobHandler = () => {
    applyToJob(auth.user?._id, job?._id);
    setOpen(false);
  };

  const applyJobModalHandler = () => {
    setOpen((prev) => !prev);
  };

  let userCantApply = true;

  if (
    auth.user?.resume &&
    auth.user?.coverLetter &&
    auth.user?.userType !== "employer"
  ) {
    userCantApply = false;
  }

  let outlinedButton;

  if (auth.isLoggedIn) {
    outlinedButton = (
      <>
        <Button
          size="small"
          sx={{ borderRadius: "17px" }}
          onClick={applyJobModalHandler}
          variant="contained"
        >
          Apply
        </Button>
        <Modal open={open} onClose={applyJobModalHandler}>
          <StyledBoxModal>
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={12} sm={9} md={6} sx={{ marginBottom: 5 }}>
                <Typography>
                  You're about to apply to {job?.creator?.company}'s job for{" "}
                  {job?.title}.
                </Typography>

                <Typography color="text.secondary" variant="subtitle2">
                  You currently{" "}
                  {auth.user?.resume?.length > 0
                    ? "have a resume"
                    : "don't have a resume "}{" "}
                  on file.{" "}
                  {auth.user?.resume?.length > 0 ? "✅" : "Please add one.⛔"}
                </Typography>
                <Typography color="text.secondary" variant="subtitle2">
                  You currently{" "}
                  {auth.user?.coverLetter
                    ? "have a cover letter"
                    : "don't have a cover letter "}{" "}
                  on file. {auth.user?.coverLetter ? "✅" : "Please add one.⛔"}
                </Typography>

                {auth.user?.userType === "employer" && (
                  <Typography color="text.secondary" variant="subtitle2">
                    You're registered as an {auth.user?.userType}.You can not
                    apply to jobs. ⛔
                  </Typography>
                )}

                {auth.user?.coverLetter && auth.user?.resume && (
                  <Typography
                    sx={{ marginTop: "1rem" }}
                    color="text.secondary"
                    variant="subtitle2"
                  >
                    You may apply to this job!
                  </Typography>
                )}
              </Grid>

              <Grid
                item
                xs={12}
                sm={9}
                md={6}
                sx={{ display: "flex", flexDirection: "row" }}
                alignItems="center"
                justifyContent="space-between"
              >
                <Stack spacing={2} direction="row">
                  <Button
                    size="small"
                    onClick={applyToJobHandler}
                    variant="contained"
                    disabled={userCantApply}
                  >
                    Apply
                  </Button>
                  <Button
                    size="small"
                    onClick={() => setOpen(false)}
                    color="error"
                    variant="outlined"
                  >
                    close
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </StyledBoxModal>
        </Modal>
      </>
    );
  } else {
    outlinedButton = (
      <Button
        size="small"
        sx={{ borderRadius: "17px" }}
        component={RouterLink}
        to="/auth"
        variant="contained"
      >
        login/join
      </Button>
    );
  }

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <StyledBoxContainer>
        <Grid spacing={2} container direction="column">
          <Grid xs={12} item sx={{ display: "flex", flexDirection: "column" }}>
            {isPostLoading && (
              <Skeleton
                variant="rectangular"
                sx={{
                  borderRadius: "15px",
                  marginTop: 10,
                  height: 260,
                  width: 692,
                }}
              />
            )}
            {isLoading && (
              <Skeleton
                variant="rectangular"
                sx={{
                  borderRadius: "15px",
                  marginTop: 10,
                  height: 260,
                  width: 692,
                }}
              />
            )}
            {!isLoading && !isPostLoading && (
              <Grid
                container
                direction="row"
                spacing={0}
                alignItems="center"
                sx={{ marginTop: 1 }}
              >
                {/**grid item 1 */}
                <Grid item>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-evenly"
                  >
                    <Avatar
                      variant="circular"
                      src={`${process.env.REACT_APP_IMAGE}${job?.image}`}
                      sx={{
                        height: 55,
                        width: 55,
                        border: "1px solid #e5e5e5",
                      }}
                      alt={`${job?._id}--${job?.creator?.company}`}
                    />
                    <Stack direction="column">
                      <Typography>{job?.title}</Typography>
                      <Typography
                        sx={{ fontSize: 12 }}
                        varaint="subtitle1"
                        color="text.secondary"
                      >
                        {job?.creator?.company}
                      </Typography>
                      <Typography
                        sx={{ fontSize: 12 }}
                        varaint="subtitle1"
                        color="text.secondary"
                      >
                        {job?.salary}
                      </Typography>
                    </Stack>
                    <Stack justifyContent="flex-end">{outlinedButton}</Stack>
                  </Stack>
                  <Divider light flexItem sx={{ margin: "0.5rem 0" }} />
                </Grid>
                {/**grid item 2 */}

                {/**grid item 3 */}
                {!isLoading && !isPostLoading && (
                  <Grid item sx={{ margin: "0 0 0 0.5rem" }}>
                    <Typography
                      color="text.primary"
                      variant="subtitle2"
                      sx={{ fontSize: 12 }}
                    >
                      {job?.creator?.about}
                    </Typography>
                    <JobRequirements jobSpecs={job} />
                    <Stack direction="column" sx={{ margin: "1rem 0" }}>
                      <Typography variant="h5" color="text.secondary">
                        Details
                      </Typography>
                      <Chip
                        label={`Job location: ${job?.location}`}
                        size="small"
                        sx={{ borderRadius: 0 }}
                      />
                      <Typography>{job?.description}</Typography>
                    </Stack>
                  </Grid>
                )}
              </Grid>
            )}
            {isPostLoading && (
              <Skeleton
                variant="rectangular"
                sx={{
                  borderRadius: "15px",
                  marginTop: 4,
                  height: 177,
                  width: 692,
                }}
              />
            )}
            {isLoading && (
              <Skeleton
                variant="rectangular"
                sx={{
                  borderRadius: "15px",
                  marginTop: 4,
                  height: 177,
                  width: 692,
                }}
              />
            )}
            <Grid item>
              {!isLoading && !isPostLoading && (
                <Paper sx={{ padding: 0, borderRadius: "15px" }} elevation={0}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      width: "100%",
                      flexWrap: "wrap",
                    }}
                  >
                    {job?.creator?.presence?.map((item, i) => (
                      <Chip
                        key={i}
                        clickable
                        label={item}
                        variant="outlined"
                        sx={{ margin: "1rem 8px 8px 0" }}
                      />
                    ))}
                  </Box>
                </Paper>
              )}
            </Grid>
          </Grid>
        </Grid>
      </StyledBoxContainer>
    </>
  );
};

export default FeaturedJobDetails;
