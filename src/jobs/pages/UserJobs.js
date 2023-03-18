import { useState } from "react";

import { Link as RouterLink } from "react-router-dom";

import { Button, Divider, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";

import Logo from "../../logo.svg";
//import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import Footer from "../../shared/components/UIElements/Footer";
//import JobLists from "../components/JobLists";
import JobAdsList from "../../shared/components/UIElements/JobAdsList";
import FeaturedJobsLists from "../components/FeaturedJobsLists";
import JobFilters from "../components/JobFilters";

const dummy_jobs = [
  {
    id: 1,
    title: "English Teacher",
    location: "Bangkok",
    salary: "30,000 - 50,000 THB/month",
    requirements: "Bachelor's degree, TEFL certification",
    description: "Teach English to primary and secondary students in Bangkok.",
    datePosted: "2023-02-28",
    hours: "Full-time",
    jobType: {
      basic: false,
      flare: false,
      featured: true,
    },
    creator: {
      company: "Sine Education",
      logoUrl: Logo,
      companySize: "10-50",
    },
  },
  {
    id: 2,
    title: "Mathematics Teacher",
    location: "Chiang Mai",
    salary: "25,000 - 40,000 THB/month",
    requirements:
      "Bachelor's degree in Mathematics, teaching experience preferred",
    description: "Teach Mathematics to secondary students in Chiang Mai.",
    datePosted: "2023-02-27",
    hours: "Full-time",
    jobType: {
      basic: false,
      flare: false,
      featured: false,
    },
    creator: {
      company: "BFits",
      logoUrl: Logo,
      companySize: "10-20",
    },
  },
];

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

  return (
    <>
      <StyledUserJobsDiv>
        <StyledAdJobDiv>
          <Stack spacing={2} direction="row">
            <Button variant="contained" component={RouterLink} to="/job/new">
              Add a Job +
            </Button>{" "}
            <Divider orientation="vertical" />
            {/**auth.isLoggedIn && () */}
            <Button variant="text" component={RouterLink} to="/auth">
              Login/Join
            </Button>
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
