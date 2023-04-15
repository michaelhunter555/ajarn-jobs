import { useContext, useState } from "react";

import { Link as RouterLink } from "react-router-dom";

import EastIcon from "@mui/icons-material/East";
import { Button, Divider, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";

import Card from "../../shared/components/UIElements/Card";
import Footer from "../../shared/components/UIElements/Footer";
import JobAdsList from "../../shared/components/UIElements/JobAdsList";
import { AuthContext } from "../../shared/context/auth-context";
import { dummy_jobs } from "../../shared/util/DummyJobs";
import FeaturedJobsLists from "../components/FeaturedJobsLists";
import JobFilters from "../components/JobFilters";

const StyledUserJobsDiv = styled("div")({
  maxWidth: "85%",
  margin: "0 auto",
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
const FeaturedJobListDiv = styled(Card)({
  gridColumn: "4 / 5",
  marginTop: "1rem",
});

const UserJobs = () => {
  const authCtx = useContext(AuthContext);
  const [filter, setFilter] = useState(dummy_jobs);
  //const userId = useParams().userId;
  //const loadedJobs = dummy_jobs.map((job) => (job.creator = userId));

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const filteredJobs = dummy_jobs.filter((job) => {
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

  if (authCtx.isLoggedIn) {
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
  } else if (!authCtx.isLoggedIn) {
    button = (
      <Button
        variant="contained"
        disabled={!authCtx.isLoggedIn}
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

  return (
    <>
      <StyledUserJobsDiv>
        <StyledAdJobDiv>
          <Stack spacing={2} direction="row">
            {button}
            {<Divider orientation="vertical" />}
            {actionItem}
          </Stack>
        </StyledAdJobDiv>
        <UsersJobFilterDiv>
          <JobFilters onFilterChange={handleFilterChange} />
        </UsersJobFilterDiv>
        <UserJobListDiv>
          <JobAdsList job={filteredJobs} />
        </UserJobListDiv>
        <FeaturedJobListDiv>
          <FeaturedJobsLists sponsors={dummy_jobs} />
        </FeaturedJobListDiv>
      </StyledUserJobsDiv>
      <Footer />
    </>
  );
};

export default UserJobs;
