import React, { useContext, useState } from "react";

import {
  FaClipboardList,
  FaClock,
  FaGraduationCap,
  FaMapMarkerAlt,
  FaMoneyBill,
} from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom";

import BusinessIcon from "@mui/icons-material/Business";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
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
import JobDataTable from "./JobDataTable";

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

const StyledBoxContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "80%",
  margin: "0rem auto",
  [theme.breakpoints.down("md")]: {
    width: "100%",
    marginBottom: "5rem",
  },
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    marginBottom: "5rem",
  },
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  height: 175,
  width: 175,
  border: "1px solid #e5e5e5",
  [theme.breakpoints.down("md")]: {
    height: 100,
    width: 100,
  },
  [theme.breakpoints.down("sm")]: {
    height: 100,
    width: 100,
  },
}));

const StyledGridContainer = styled(Grid)(({ theme }) => ({
  marginTop: 4,
  [theme.breakpoints.down("md")]: {
    justifyContent: "center",
  },
  [theme.breakpoints.down("sm")]: {
    justifyContent: "center",
  },
}));

const StyledLoadingSkeleton = styled(Skeleton)(({ theme }) => ({
  borderRadius: "15px",
  width: "100%",
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));

const StyledApplyButtonContainer = styled(Stack)(({ theme, applied }) => ({
  flexDirection: "row",
  [theme.breakpoints.down("md")]: {
    width: "100%",
    flexDirection: "column",
  },
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    flexDirection: "column",
  },
}));

const JobDetails = (props) => {
  const auth = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const { applyToJob, error, clearError, isPostLoading } = useUser();
  const { job, isLoading, userAppliedAlready } = props;

  const applyToJobHandler = () => {
    applyToJob(auth.user?._id, job?._id)
      .then(() => {
        setSuccess(true);
      })
      .catch((err) => {
        setSuccess(false);
        console.log(err);
      })
      .finally(() => {
        setOpen(false);
      });
  };

  const closeSuccessHandler = () => {
    setSuccess(false);
  };

  const applyJobModalHandler = () => {
    setOpen((prev) => !prev);
  };

  const jobSpecifications = job && [
    { text: "Location", icon: <FaMapMarkerAlt />, data: job?.location },
    {
      text: "Requirements",
      icon: <FaGraduationCap />,
      data: job?.requirements,
    },
    { text: "Salary", icon: <FaMoneyBill />, data: job?.salary },
    {
      text: "Work Permit",
      icon: <FaClipboardList />,
      data: job?.workPermit ? "✅" : "⛔",
    },
    { text: "Hours", icon: <FaClock />, data: job?.hours },
  ];

  const jobInformation = job && [
    { variant: "h5", component: "h2", text: job?.title },
    {
      variant: "subtitle2",
      component: "h3",
      text: <Chip size="small" label={job?.creator?.company} />,
    },
    {
      variant: "subtitle2",
      component: "h3",
      icon: <LocationOnIcon size="inherit" />,
      text: "location " + job?.creator?.headquarters,
    },
    {
      variant: "subtitle2",
      component: "h3",
      icon: <BusinessIcon size="inherit" />,
      text: job?.creator?.companySize + " employees",
    },
    {
      variant: "subtitle2",
      component: "h3",
      icon: <VerifiedUserIcon size="inherit" />,
      text: "established in " + job?.creator?.established,
    },
  ];

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
        <StyledApplyButtonContainer
          direction="column"
          alignItems="center"
          spacing={1}
        >
          <Button
            size="small"
            sx={{ borderRadius: "17px" }}
            onClick={applyJobModalHandler}
            variant="outlined"
          >
            Apply Now
          </Button>
          {userAppliedAlready && userAppliedAlready && (
            <>
              <CheckCircleIcon style={{ color: "green" }} />
              <Typography
                sx={{ fontSize: 11 }}
                variant="subtitle2"
                color="text.secondary"
              >
                Application submitted
              </Typography>
            </>
          )}
        </StyledApplyButtonContainer>
        <Modal
          open={open}
          onClose={applyJobModalHandler}
          disableScrollLock={true}
        >
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
                    onClick={applyToJobHandler}
                    variant="contained"
                    disabled={userCantApply}
                  >
                    Apply
                  </Button>
                  <Button
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
        <Modal open={success} onClose={closeSuccessHandler}>
          <StyledBoxModal>
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <Typography>
                You have successfully Applied to this job!
              </Typography>
              <Typography>
                The employer will contact you if you are shortlisted.
              </Typography>
              <Button onClick={closeSuccessHandler}>Close</Button>
            </Stack>
          </StyledBoxModal>
        </Modal>
      </>
    );
  } else {
    outlinedButton = (
      <Stack alignItems="flex-start">
        <Button
          sx={{ borderRadius: "17px" }}
          component={RouterLink}
          to="/auth"
          variant="outlined"
        >
          login/join
        </Button>
      </Stack>
    );
  }

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <StyledBoxContainer
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "80%",
          margin: "0rem auto",
        }}
      >
        <Grid
          spacing={2}
          container
          direction="row"
          sx={{ justifyContent: "flex-start" }}
        >
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            container
            direction="column"
            justifyContent="flex-start"
            spacing={2}
          >
            {isPostLoading && (
              <StyledLoadingSkeleton
                variant="rectangular"
                sx={{
                  borderRadius: "15px",
                  marginTop: 10,
                  height: 260,
                }}
              />
            )}
            {isLoading && (
              <StyledLoadingSkeleton
                variant="rectangular"
                sx={{
                  borderRadius: "15px",
                  marginTop: 10,
                  height: 260,
                }}
              />
            )}
            {!isLoading && !isPostLoading && (
              <Paper
                elevation={0}
                sx={{ padding: 1, marginTop: 4, borderRadius: "15px" }}
              >
                <StyledGridContainer
                  container
                  direction="row"
                  spacing={1}
                  sx={{ marginTop: 0 }}
                >
                  {/**grid item 1 */}
                  <Grid item>
                    <StyledAvatar
                      variant="circular"
                      src={`${process.env.REACT_APP_IMAGE}${job?.image}`}
                      alt={`${job?.id}--${job?.creator?.company}`}
                    />
                  </Grid>
                  {/**grid item 2 */}

                  {!isLoading && !isPostLoading && (
                    <Grid item sx={{ margin: "0 0 0 0.5rem" }}>
                      {jobInformation?.map(
                        ({ variant, component, icon, text }, i) => (
                          <Stack key={i} direction="row" alignItems="center">
                            <Box>
                              <Typography
                                color="text.secondary"
                                variant={variant}
                                component={component}
                              >
                                {icon && <>{icon}</>}
                              </Typography>
                            </Box>
                            <Box>
                              <Typography
                                color="text.secondary"
                                variant={variant}
                              >
                                {text}
                              </Typography>
                            </Box>
                          </Stack>
                        )
                      )}
                      <Divider flexItem sx={{ margin: "0.5rem 0" }} />
                    </Grid>
                  )}

                  {!isLoading && !isPostLoading && (
                    <Grid
                      item
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "flex-start",
                      }}
                    >
                      {outlinedButton}
                    </Grid>
                  )}
                </StyledGridContainer>
              </Paper>
            )}
            {isPostLoading && (
              <StyledLoadingSkeleton
                variant="rectangular"
                sx={{
                  borderRadius: "15px",
                  marginTop: 4,
                  height: 177,
                }}
              />
            )}
            {isLoading && (
              <StyledLoadingSkeleton
                variant="rectangular"
                sx={{
                  borderRadius: "15px",
                  marginTop: 4,
                  height: 177,
                }}
              />
            )}
            <Grid item>
              {!isLoading && !isPostLoading && (
                <Paper sx={{ padding: 2, borderRadius: "15px" }} elevation={0}>
                  <Typography variant="h6" component="h4">
                    A little about {job?.creator?.company}:
                  </Typography>
                  <Divider variant="middle" sx={{ margin: "0 0 0.5rem 0" }} />
                  <Typography variant="subtitle1" paragraph>
                    {job?.creator?.about}
                  </Typography>
                  <Divider />

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

          <Grid item xs={12} sm={6} md={6} sx={{ marginTop: 4 }}>
            {isLoading && (
              <StyledLoadingSkeleton
                variant="rectangular"
                sx={{
                  borderRadius: "15px",
                  marginTop: 4,
                  height: 260,
                }}
              />
            )}
            {isPostLoading && (
              <StyledLoadingSkeleton
                variant="rectangular"
                sx={{
                  borderRadius: "15px",
                  marginTop: 4,
                  height: 260,
                }}
              />
            )}
            {!isLoading && !isPostLoading && (
              <JobDataTable
                modal={applyJobModalHandler}
                jobSpecifications={jobSpecifications}
              />
            )}
            <Divider sx={{ margin: "1rem auto" }} />
            {isLoading && (
              <StyledLoadingSkeleton
                variant="rectangular"
                sx={{
                  borderRadius: "15px",
                  marginTop: 1,
                  height: 177,
                }}
              />
            )}
            {isPostLoading && (
              <StyledLoadingSkeleton
                variant="rectangular"
                sx={{
                  borderRadius: "15px",
                  marginTop: 1,
                  height: 177,
                }}
              />
            )}
            {!isLoading && !isPostLoading && (
              <Paper
                elevation={0}
                sx={{ padding: "2rem", borderRadius: "17px" }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  <Typography variant="h5" component="h4">
                    {job?.title}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    paragraph
                  >
                    date posted: {job?.datePosted?.split("T")[0]}
                  </Typography>
                </Box>

                <Divider />
                <Typography
                  variant="body1"
                  dangerouslySetInnerHTML={{ __html: job?.description }}
                />
              </Paper>
            )}
          </Grid>
        </Grid>
      </StyledBoxContainer>
    </>
  );
};

export default JobDetails;
