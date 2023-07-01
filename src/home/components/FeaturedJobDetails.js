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

  const jobSpecifications = [
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

  const jobInformation = [
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
        <Button
          size="small"
          sx={{ borderRadius: "17px" }}
          onClick={applyJobModalHandler}
          variant="outlined"
        >
          Apply Now
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
        variant="outlined"
      >
        login/join
      </Button>
    );
  }

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <Box
        sx={{
          display: "flex",
          width: "100%",
          margin: "0 auto",
          padding: "0.5rem",
        }}
      >
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
                  <Stack direction="row" alignItems="center" spacing={2}>
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
                        sx={{ fontSize: 11 }}
                        varaint="subtitle1"
                        color="text.secondary"
                      >
                        {job?.creator?.company}
                      </Typography>
                      <Typography
                        sx={{ fontSize: 11 }}
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
                    <Chip label={job?.location} size="small" />
                    <Typography>{job?.description}</Typography>
                    <Typography>{job?.creator?.about}</Typography>
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
      </Box>
    </>
  );
};

export default FeaturedJobDetails;
