import React, { useContext, useState } from "react";

import { Link as RouterLink } from "react-router-dom";

import ElectricBoltOutlinedIcon from "@mui/icons-material/ElectricBoltOutlined";
import ForwardOutlinedIcon from "@mui/icons-material/ForwardOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PaymentsTwoToneIcon from "@mui/icons-material/PaymentsTwoTone";
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

const StyledBoxContainer = styled(Box)(({ theme, yScroll }) => ({
  padding: "0 3rem 0 0 ",
  overflowY: "auto",
  pointerEvents: "auto",
  "&::-webkit-scrollbar": {
    width: "4px",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "transparent",
    borderRadius: "4px",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    transition: "background 1s ease-in",
    background: "#8b8b8d",
  },
  "&::-webkit-scrollbar-track": {
    background: "transparent",
    borderRadius: "4px",
  },
  "&:hover": {
    "&::-webkit-scrollbar-thumb": {
      background: "#b5b5b5",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      transition: "background 1s ease-in",
      background: "#8b8b8d",
    },
    "&::-webkit-scrollbar-track": {
      background: "#f1f1f1",
    },
  },
  [theme.breakpoints.down("md")]: {
    maxWidth: "auto",
    display: "flex",
    padding: "0 0.5rem",
  },
}));

const FeaturedJobDetails = ({ job, featured, height, fontSize }) => {
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
          endIcon={<ElectricBoltOutlinedIcon />}
          size={featured ? "small" : ""}
          sx={{ borderRadius: "15px" }}
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
      <StyledBoxContainer sx={{ maxHeight: height }}>
        <Grid spacing={2} container direction="column">
          {featured && (
            <Grid
              xs={12}
              item
              sx={{ display: "flex", flexDirection: "column" }}
            >
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

              {!isPostLoading && (
                <Grid
                  container
                  direction="row"
                  spacing={0}
                  alignItems="center"
                  sx={{ marginTop: 1 }}
                >
                  {/**grid item 1 */}
                  <Grid item>
                    <Stack direction="row" spacing={1}>
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
                        <Stack
                          direction="row"
                          alignItems="center"
                          spacing={1}
                          sx={{ flexGrow: 0 }}
                        >
                          <Chip
                            label={job?.salary}
                            variant="outlined"
                            icon={
                              <PaymentsTwoToneIcon
                                style={{ color: "#1e8d41" }}
                              />
                            }
                            sx={{ fontSize: 12 }}
                          />
                          {outlinedButton}
                        </Stack>
                      </Stack>
                    </Stack>
                    <Divider light flexItem sx={{ margin: "0.5rem 0" }} />
                  </Grid>
                  {/**grid item 2 */}

                  {/**grid item 3 */}
                  {!isPostLoading && (
                    <Grid item sx={{ margin: "0 0 0 0.5rem" }}>
                      <Typography
                        color="text.secondary"
                        sx={{ fontSize: 11, fontWeight: 600 }}
                      >
                        About:
                      </Typography>
                      <Typography
                        color="text.primary"
                        variant="subtitle2"
                        sx={{ fontSize: 12 }}
                      >
                        {job?.creator?.about}
                      </Typography>
                      <Typography
                        color="text.secondary"
                        sx={{
                          fontSize: 11,
                          fontWeight: 600,
                          margin: "0.5rem 0",
                        }}
                      >
                        Specifications:
                      </Typography>
                      <JobRequirements jobSpecs={job} fontSize={fontSize} />
                      <Stack direction="column" sx={{ margin: "1rem 0" }}>
                        <Typography
                          color="text.secondary"
                          sx={{ fontSize: 11, fontWeight: 600 }}
                        >
                          Details:
                        </Typography>

                        <Chip
                          label={`Job location: ${job?.location}`}
                          size="small"
                          sx={{ borderRadius: 5 }}
                        />
                        <Typography
                          variant="body2"
                          color="text.primary"
                          dangerouslySetInnerHTML={{ __html: job?.description }}
                        />
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

              <Grid item>
                {!isPostLoading && (
                  <Paper
                    sx={{ padding: 0, borderRadius: "15px" }}
                    elevation={0}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        width: "100%",
                        flexWrap: "wrap",
                        gap: "6px",
                        marginBottom: "1rem",
                      }}
                    >
                      {job?.creator?.presence?.map((item, i) => (
                        <Chip
                          key={i}
                          clickable
                          label={item}
                          variant="outlined"
                        />
                      ))}
                      <Button
                        sx={{ borderRadius: "17px" }}
                        endIcon={<ForwardOutlinedIcon />}
                        size="small"
                        variant="outlined"
                        component={RouterLink}
                        to={`/jobs/${job?._id}`}
                      >
                        View Job{" "}
                      </Button>
                    </Box>
                  </Paper>
                )}
              </Grid>
            </Grid>
          )}

          {/**SEPEARATE - pass featured prop for featured jobs on Home*/}

          {!featured && (
            <Grid
              xs={12}
              item
              sx={{ display: "flex", flexDirection: "column" }}
            >
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

              {!isPostLoading && (
                <Grid
                  container
                  direction="row"
                  spacing={0}
                  alignItems="center"
                  sx={{ marginTop: 1 }}
                >
                  {/**grid item 1 */}
                  <Grid item>
                    <Stack direction="row" spacing={1}>
                      <Avatar
                        variant="circular"
                        src={`${process.env.REACT_APP_IMAGE}${job?.image}`}
                        sx={{
                          height: 150,
                          width: 150,
                          border: "1px solid #e5e5e5",
                        }}
                        alt={`${job?._id}--${job?.creator?.company}`}
                      />
                      <Stack direction="column">
                        <Typography variant="h4" color="text.primary">
                          {job?.title}
                        </Typography>
                        <Typography
                          sx={{ fontSize: 17 }}
                          varaint="subtitle1"
                          color="text.secondary"
                        >
                          {job?.creator?.company}
                        </Typography>
                        <Stack
                          direction="row"
                          alignItems="center"
                          spacing={1}
                          sx={{ flexGrow: 0 }}
                        >
                          <Chip
                            variant="outlined"
                            label={job?.salary}
                            icon={
                              <PaymentsTwoToneIcon
                                style={{ color: "#1e8d41" }}
                              />
                            }
                            sx={{ fontSize: 12 }}
                          />
                          <Chip
                            variant="outlined"
                            label={`${job?.location}`}
                            icon={
                              <LocationOnOutlinedIcon
                                style={{ color: "#47acbb" }}
                              />
                            }
                            sx={{ borderRadius: 5 }}
                          />
                          {outlinedButton}
                        </Stack>
                      </Stack>
                    </Stack>
                    <Divider light flexItem sx={{ margin: "0.5rem 0" }} />
                  </Grid>
                  {/**grid item 2 */}

                  {/**grid item 3 */}
                  {!isPostLoading && (
                    <Grid item sx={{ margin: "0 0 0 0.5rem" }}>
                      <Typography
                        color="text.secondary"
                        sx={{ fontSize: 14, fontWeight: 600 }}
                      >
                        About:
                      </Typography>
                      <Typography
                        color="text.primary"
                        variant="subtitle2"
                        sx={{ fontSize: 16 }}
                      >
                        {job?.creator?.about}
                      </Typography>
                      <Typography
                        color="text.secondary"
                        sx={{
                          fontSize: 14,
                          fontWeight: 600,
                          margin: "0.5rem 0",
                        }}
                      >
                        Specifications:
                      </Typography>
                      <JobRequirements fontSize={fontSize} jobSpecs={job} />
                      <Stack direction="column" sx={{ margin: "1rem 0" }}>
                        <Typography
                          color="text.secondary"
                          sx={{ fontSize: 14, fontWeight: 600 }}
                        >
                          Details:
                        </Typography>

                        <Typography
                          variant="body2"
                          color="text.primary"
                          dangerouslySetInnerHTML={{ __html: job?.description }}
                        />
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

              <Grid item>
                {!isPostLoading && (
                  <Paper
                    sx={{ padding: 0, borderRadius: "15px" }}
                    elevation={0}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        width: "100%",
                        flexWrap: "wrap",
                        gap: "6px",
                        marginBottom: "1rem",
                      }}
                    >
                      {job?.creator?.presence?.map((item, i) => (
                        <Chip
                          key={i}
                          clickable
                          label={item}
                          variant="outlined"
                        />
                      ))}
                      <Button
                        sx={{ borderRadius: "17px" }}
                        endIcon={<ForwardOutlinedIcon />}
                        size="small"
                        variant="outlined"
                        component={RouterLink}
                        to={`/jobs/${job?._id}`}
                      >
                        View Job{" "}
                      </Button>
                    </Box>
                  </Paper>
                )}
              </Grid>
            </Grid>
          )}
        </Grid>
      </StyledBoxContainer>
    </>
  );
};

export default FeaturedJobDetails;
