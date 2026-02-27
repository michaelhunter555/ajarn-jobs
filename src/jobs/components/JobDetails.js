import React, { useContext, useState } from "react";

import PlaceIcon from "@mui/icons-material/Place";
import PunchClockIcon from "@mui/icons-material/PunchClock";
import PaymentsTwoToneIcon from "@mui/icons-material/PaymentsTwoTone";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  Grid,
  Skeleton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { AuthContext } from "../../shared/context/auth-context";
import { useInvalidateQuery } from "../../shared/hooks/invalidate-query";
import { useUser } from "../../shared/hooks/user-hook";
import { JobAbout } from "./JobAbout";
import { JobData } from "./JobData";
import { JobDescription } from "./JobDescription";
import { JobInformation } from "./JobInformation";
import OtherJobsFromEmployer from "./OtherJobsFromEmployer";

const StyledBoxContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "80%",
  margin: "2rem auto",
  [theme.breakpoints.down("md")]: {
    width: "100%",
    marginBottom: "5rem",
  },
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    marginBottom: "5rem",
  },
}));

const StyledLoadingSkeleton = styled(Skeleton)(({ theme }) => ({
  borderRadius: "15px",
  width: "100%",
  marginTop: 4,
  height: 177,
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));

const StyledHeaderContainer = styled(Box)(({ theme }) => ({
  width: "80%",
  margin: "1.5rem auto 0.5rem",
  [theme.breakpoints.down("md")]: {
    width: "100%",
    margin: "1rem auto 0.5rem",
  },
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    margin: "1rem auto 0.5rem",
  },
}));

const JobDetails = (props) => {
  const auth = useContext(AuthContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const { invalidateQuery } = useInvalidateQuery();
  const { applyToJob, error, clearError, isPostLoading } = useUser();
  const { job, isLoading, userAppliedAlready, otherJobs, otherJobsCount } = props;

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
    invalidateQuery("userApplications");
  };

  const closeSuccessHandler = () => {
    setSuccess(false);
  };

  const applyJobModalHandler = () => {
    setOpen((prev) => !prev);
  };

  let userCantApply;

  if (
    auth.user?.resume &&
    auth.user?.coverLetter &&
    auth.user?.userType !== "employer"
  ) {
    userCantApply = false;
  } else {
    userCantApply = true;
  }

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <StyledHeaderContainer>
        {(isLoading || isPostLoading) && (
          <Skeleton
            variant="rectangular"
            sx={{ borderRadius: 4, height: { xs: 180, sm: 190, md: 200 } }}
          />
        )}
        {!isLoading && !isPostLoading && (
          <Card
            variant="outlined"
            sx={{
              borderRadius: 4,
              overflow: "hidden",
              backgroundColor: "background.paper",
            }}
          >
            {/* Cover band (LinkedIn-ish header feel) */}
            <Box
              sx={{
                height: { xs: 64, sm: 72, md: 84 },
                background:
                  "linear-gradient(135deg, rgba(18,140,177,0.20), rgba(255,162,162,0.18))",
                borderBottom: "1px solid",
                borderColor: "divider",
              }}
            />
            <CardContent sx={{ pt: 2, pb: 2.25 }}>
              <Grid
                container
                spacing={2}
                alignItems="flex-start"
                justifyContent="space-between"
              >
                {/* Logo / image */}
                <Grid item xs={12} sm="auto">
                  <Stack
                    direction="row"
                    spacing={1.5}
                    alignItems="center"
                    sx={{
                      mt: { xs: -6.5, sm: -7.5, md: -8.5 },
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={job?.image}
                      alt={job?._id}
                      sx={{
                        width: { xs: 64, sm: 76, md: 84 },
                        height: { xs: 64, sm: 76, md: 84 },
                        borderRadius: 3,
                        objectFit: "cover",
                        border: "1px solid",
                        borderColor: "divider",
                        bgcolor: "background.paper",
                      }}
                    />
                    {isMobile && (
                      <Stack spacing={0.25} sx={{ minWidth: 0 }}>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 950,
                            lineHeight: 1.1,
                            wordBreak: "break-word",
                          }}
                        >
                          {job?.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {job?.creator?.company}
                        </Typography>
                      </Stack>
                    )}
                  </Stack>
                </Grid>

                {/* Title + meta */}
                <Grid item xs={12} sm md={7}>
                  <Stack spacing={1}>
                    {!isMobile && (
                      <Stack spacing={0.25}>
                        <Typography
                          variant="h5"
                          sx={{
                            fontWeight: 950,
                            lineHeight: 1.1,
                            wordBreak: "break-word",
                          }}
                        >
                          {job?.title}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                          {job?.creator?.company}
                        </Typography>
                      </Stack>
                    )}

                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                      {job?.jobType === "featured" && (
                        <Chip
                          size="small"
                          label="Featured"
                          sx={{
                            fontWeight: 800,
                            borderRadius: 2,
                            bgcolor: "rgba(250,234,146,0.85)",
                          }}
                        />
                      )}
                      {userAppliedAlready && (
                        <Chip
                          size="small"
                          color="success"
                          label="Applied"
                          sx={{ fontWeight: 800, borderRadius: 2 }}
                        />
                      )}
                      {job?.location && (
                        <Chip
                          size="small"
                          variant="outlined"
                          icon={<PlaceIcon sx={{ fontSize: 18 }} />}
                          label={job.location}
                        />
                      )}
                      {job?.salary && (
                        <Chip
                          size="small"
                          variant="outlined"
                          icon={<PaymentsTwoToneIcon sx={{ fontSize: 18 }} />}
                          label={job.salary}
                        />
                      )}
                      {job?.hours && (
                        <Chip
                          size="small"
                          variant="outlined"
                          icon={<PunchClockIcon sx={{ fontSize: 18 }} />}
                          label={job.hours}
                        />
                      )}
                    </Stack>

                    {userCantApply && auth?.user?.userType !== "employer" && (
                      <Typography variant="body2" color="text.secondary">
                        To apply, add both a resume and cover letter to your profile.
                      </Typography>
                    )}
                  </Stack>
                </Grid>

                {/* Actions */}
                <Grid item xs={12} sm="auto" md={3}>
                  <Stack
                    direction={{ xs: "row", sm: "column" }}
                    spacing={1}
                    justifyContent={{ xs: "flex-start", sm: "center" }}
                    sx={{ height: "100%" }}
                  >
                    <Button
                      variant="contained"
                      onClick={applyJobModalHandler}
                      disabled={
                        auth?.user?.userType === "employer" ||
                        userAppliedAlready ||
                        userCantApply
                      }
                      fullWidth={!isMobile}
                    >
                      Apply
                    </Button>
                    <Button
                      variant="outlined"
                      component="a"
                      href="#job-description"
                      fullWidth={!isMobile}
                    >
                      Read more
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        )}
      </StyledHeaderContainer>

      <StyledBoxContainer>
        <Grid spacing={2} container direction="row">
          <Grid item xs={12} sm={6} md={6}>
            {isPostLoading && <StyledLoadingSkeleton variant="rectangular" />}
            {isLoading && <StyledLoadingSkeleton variant="rectangular" />}
            {!isLoading && !isPostLoading && (
              <JobInformation
                open={open}
                isLoading={isLoading}
                isPostLoading={isPostLoading}
                job={job}
                applyJobModalHandler={applyJobModalHandler}
                applyToJobHandler={applyToJobHandler}
                closeJob={() => setOpen(false)}
                onSuccess={success}
                closeSuccess={closeSuccessHandler}
                appliedAlready={userAppliedAlready}
                cantApply={userCantApply}
              />
            )}
            {isPostLoading && <StyledLoadingSkeleton variant="rectangular" />}
            {isLoading && <StyledLoadingSkeleton variant="rectangular" />}

            <Grid item>
              {!isLoading && !isPostLoading && <JobAbout job={job} />}
            </Grid>
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            {isLoading && <StyledLoadingSkeleton variant="rectangular" />}
            {isPostLoading && <StyledLoadingSkeleton variant="rectangular" />}
            {!isLoading && !isPostLoading && (
              <JobData
                appliedAlready={userAppliedAlready}
                applyJobModalHandler={applyJobModalHandler}
                job={job}
              />
            )}
            <Divider variant="inset" sx={{ margin: "1rem auto" }} />
            {isLoading && <StyledLoadingSkeleton variant="rectangular" />}
            {isPostLoading && <StyledLoadingSkeleton variant="rectangular" />}
            {!isLoading && !isPostLoading && (
              <Box id="job-description">
                <JobDescription job={job} />
              </Box>
            )}
          </Grid>
        </Grid>
        
      </StyledBoxContainer>
      <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
        {/* Other Jobs from Same Employer */}
        {!isLoading && !isPostLoading && otherJobs && otherJobs.length > 0 && (
          <OtherJobsFromEmployer 
            otherJobs={otherJobs}
            otherJobsCount={otherJobsCount}
            currentJobId={job?._id}
          />
        )}
      </Box>
    </>
  );
};

export default JobDetails;
