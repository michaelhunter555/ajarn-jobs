import { useContext, useState } from "react";

import { Link as RouterLink } from "react-router-dom";

import EastIcon from "@mui/icons-material/East";
import { Box, Button, Card, Divider, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useQuery } from "@tanstack/react-query";

import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import Footer from "../../shared/components/UIElements/Footer";
import JobAdsList from "../../shared/components/UIElements/JobAdsList";
import { JobAdSkeleton } from "../../shared/components/UIElements/LoadingSkeletons";
import TeflBanner from "../../shared/components/UIElements/TeflBanner";
import { AuthContext } from "../../shared/context/auth-context";
import { useJob } from "../../shared/hooks/jobs-hook";
import { dummy_jobs } from "../../shared/util/DummyJobs";
import FeaturedJobsLists from "../components/FeaturedJobsLists";
import JobFilters from "../components/JobFilters";

const StyledUserJobsDiv = styled("div")(({ theme }) => ({
  maxWidth: "85%",
  margin: "0 auto 3rem",
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "15px",
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "100%",
    gridAutoColumns: "auto",
  },
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "100%",
    gridAutoColumns: "auto",
  },
}));

const StyledAdJobDiv = styled("div")(({ theme }) => ({
  display: "grid",
  gridColumn: "2 /4",
  textalign: "center",
  margin: "0 auto",
  [theme.breakpoints.down("md")]: {
    gridColumn: 1,
    gridRow: 1,
  },
  [theme.breakpoints.down("sm")]: {
    gridColumn: 1,
    gridRow: 1,
  },
}));

const UsersJobFilterDiv = styled("div")(({ theme }) => ({
  gridColumn: "1 / 2",
  [theme.breakpoints.down("md")]: {
    gridColumn: 1,
    gridRow: 2,
  },
  [theme.breakpoints.down("sm")]: {
    gridColumn: 1,
    gridRow: 2,
  },
}));

const UserJobListDiv = styled("div")(({ theme }) => ({
  gridColumn: "2 / 4",
  [theme.breakpoints.down("md")]: {
    gridColumn: 1,
    gridRow: 4,
  },
  [theme.breakpoints.down("sm")]: {
    gridColumn: 1,
    gridRow: 4,
  },
}));

const FeaturedJobListDiv = styled("div")(({ theme }) => ({
  gridColumn: "4 / 5",
  [theme.breakpoints.down("md")]: {
    gridColumn: 1,
    gridRow: 3,
  },
  [theme.breakpoints.down("sm")]: {
    gridColumn: 1,
    gridRow: 3,
  },
}));

const UserJobs = () => {
  const auth = useContext(AuthContext);
  const [filter, setFilter] = useState(dummy_jobs);
  const { clearError } = useJob();

  const getAllJobs = async (jobs) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_JOBS}`);
      const data = await response.json();
      return data.jobs;
    } catch (err) {
      console.log("There was an error retrieving jobs data" + err);
    }
  };

  const {
    data: jobs,
    isLoading,
    error,
  } = useQuery(["jobs"], () => getAllJobs());

  // const { data: jobs } = useQuery(["jobs"], async () => {
  //   const response = await client.query(`${process.env.REACT_APP_JOBS}`);
  //   return response.jobs;
  // });

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const filteredJobs = jobs?.filter((job) => {
    return (
      (!filter.location ||
        job.location.toLowerCase().includes(filter.location.toLowerCase())) &&
      (!filter.salaryRange || job.salary.includes(filter.salaryRange)) &&
      (!filter.hours || job.hours === filter.hours)
    );
  });

  console.log("AUTH_OBJ-JOBS:", auth.user);

  //if not filter.location or dummyjobs[lowercase][includes] + (filter[location][lowercase])

  let button;
  let actionItem;

  if (auth.isLoggedIn && auth.user?.userType === "employer") {
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
          {!isLoading && (
            <Stack>
              <TeflBanner />
            </Stack>
          )}
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
          {!isLoading && <JobAdsList job={filteredJobs} />}
          {!isLoading && filteredJobs?.length === 0 && noJobs}
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
