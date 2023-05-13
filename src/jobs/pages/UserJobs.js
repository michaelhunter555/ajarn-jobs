import { useContext, useEffect, useState } from "react";

import { Link as RouterLink } from "react-router-dom";

import EastIcon from "@mui/icons-material/East";
import { Box, Button, Card, Divider, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";

import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import Footer from "../../shared/components/UIElements/Footer";
import JobAdsList from "../../shared/components/UIElements/JobAdsList";
import { JobAdSkeleton } from "../../shared/components/UIElements/LoadingSkeletons";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { dummy_jobs } from "../../shared/util/DummyJobs";
import FeaturedJobsLists from "../components/FeaturedJobsLists";
import JobFilters from "../components/JobFilters";

const StyledUserJobsDiv = styled("div")({
  maxWidth: "85%",
  margin: "5rem auto",
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "15px",
});

const StyledAdJobDiv = styled("div")({
  display: "grid",
  gridColumn: "2 /4",
  textalign: "center",
  margin: "0 auto",
});

const UsersJobFilterDiv = styled("div")({
  gridColumn: "1 / 2",
});
const UserJobListDiv = styled("div")({
  gridColumn: "2 / 4",
});
const FeaturedJobListDiv = styled("div")({
  gridColumn: "4 / 5",
});

const UserJobs = () => {
  const auth = useContext(AuthContext);
  const [filter, setFilter] = useState(dummy_jobs);
  const [jobs, setJobs] = useState([]);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  //GET all jobs
  useEffect(() => {
    const getAllJobs = async () => {
      try {
        const response = await sendRequest(`${process.env.REACT_APP_JOBS}`);
        setJobs(response.jobs);
      } catch (err) {}
    };
    getAllJobs();
  }, [sendRequest]);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const filteredJobs = jobs.filter((job) => {
    return (
      (!filter.location ||
        job.location.toLowerCase().includes(filter.location.toLowerCase())) &&
      (!filter.salaryRange || job.salary.includes(filter.salaryRange)) &&
      (!filter.hours || job.hours === filter.hours)
    );
  });

  //if not filter.location or dummyjobs[lowercase][includes] + (filter[location][lowercase])

  let button;
  let actionItem;

  if (auth.isLoggedIn) {
    button = (
      <Button variant="contained" component={RouterLink} to="/job/new">
        Add a Job +
      </Button>
    );
    actionItem = (
      <Button variant="text" component={RouterLink} to="/auth">
        Learn More
      </Button>
    );
  } else if (!auth.isLoggedIn) {
    button = (
      <Button
        variant="contained"
        disabled={!auth.isLoggedIn}
        component={RouterLink}
        to="/auth"
      >
        Sign-up to create jobs! <EastIcon />
      </Button>
    );
    actionItem = (
      <Button variant="outlined" component={RouterLink} to="/auth">
        Login/Join
      </Button>
    );
  }

  const noJobs = (
    <Box>
      <Card sx={{ padding: "0 2rem" }}>
        <h2>Sorry no jobs were found for your search</h2>
        <Button component={RouterLink} to="/job/new">
          Create a job
        </Button>
      </Card>
    </Box>
  );

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <StyledUserJobsDiv>
        <StyledAdJobDiv>
          {!isLoading && (
            <Stack spacing={2} direction="row">
              {button}
              <Divider orientation="vertical" />
              {actionItem}
            </Stack>
          )}
        </StyledAdJobDiv>
        <UsersJobFilterDiv>
          {isLoading && (
            <JobAdSkeleton
              sx={{
                margin: "0 auto",
                height: 348,
                width: 360,
                borderRadius: "6px",
              }}
              variant="rectangular"
              num={1}
            />
          )}
          {!isLoading && <JobFilters onFilterChange={handleFilterChange} />}
        </UsersJobFilterDiv>

        <UserJobListDiv>
          {isLoading && (
            <JobAdSkeleton
              sx={{
                margin: "0.5rem 0 0.5rem 0",
                height: "136px",
                borderRadius: "6px",
              }}
              variant="rectangular"
              num={10}
            />
          )}
          {!isLoading && filteredJobs?.length === 0 && noJobs}
          {!isLoading && <JobAdsList job={filteredJobs} />}
        </UserJobListDiv>
        <FeaturedJobListDiv>
          {isLoading && (
            <JobAdSkeleton
              sx={{
                margin: "0.5rem 0 0.5rem 0",
                height: "70px",
                borderRadius: "6px",
              }}
              variant="rectangular"
              num={4}
            />
          )}
          {!isLoading && <FeaturedJobsLists sponsors={jobs} />}
        </FeaturedJobListDiv>
      </StyledUserJobsDiv>
      <Footer />
    </>
  );
};

export default UserJobs;
