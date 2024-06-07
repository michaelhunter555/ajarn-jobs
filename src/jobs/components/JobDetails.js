import React, { useContext, useState } from "react";

import { Box, Divider, Grid, Skeleton } from "@mui/material";
import { styled } from "@mui/material/styles";

import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { AuthContext } from "../../shared/context/auth-context";
import { useUser } from "../../shared/hooks/user-hook";
import { JobAbout } from "./JobAbout";
import { JobData } from "./JobData";
import { JobDescription } from "./JobDescription";
import { JobInformation } from "./JobInformation";

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
              <JobData applyJobModalHandler={applyJobModalHandler} job={job} />
            )}
            <Divider variant="inset" sx={{ margin: "1rem auto" }} />
            {isLoading && <StyledLoadingSkeleton variant="rectangular" />}
            {isPostLoading && <StyledLoadingSkeleton variant="rectangular" />}
            {!isLoading && !isPostLoading && <JobDescription job={job} />}
          </Grid>
        </Grid>
      </StyledBoxContainer>
    </>
  );
};

export default JobDetails;
