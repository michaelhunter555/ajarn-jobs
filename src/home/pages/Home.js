import React from "react";

import { Link as RouterLink } from "react-router-dom";

import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

import Logo from "../../logo.svg";
import Footer from "../../shared/components/UIElements/Footer";
import JobAd from "../../shared/components/UIElements/JobAd";
import BlogContent from "../components/BlogContent";
import BottomFeatured from "../components/BottomFeatured";
import BottomFeaturedAdsList from "../components/BottomFeaturedAdsList";
import RecentJobs from "../components/RecentJobs";
import SiteFeatures from "../components/SiteFeatures";
import SponsorsList from "../components/SponsorsList";
import Tefl from "../components/Tefl";
import UrgentJobs from "../components/UrgentJobs";

const dummy_jobs = [
  {
    id: "1",
    title: "Native ESL Teacher",
    creationDate: "2023-03-10",
    location: "Bangkok",
    salary: "50,000THB p/m",
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
    id: "2",
    title: "Math Teacher for K9 Kids",
    creationDate: "2023-03-02",
    location: "Chiang Mai",
    salary: "80,000THB p/m",
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
  {
    id: "3",
    title: "Filipino Teacher",
    creationDate: "2023-03-02",
    location: "Bangkok",
    salary: "50,000THB p/m",
    requirements: "Bachelor's degree in Life, teaching experience preferred",
    description: "Teach Philosphy to university students in bangkok",
    datePosted: "2023-02-27",
    hours: "Full-time",
    jobType: {
      basic: false,
      flare: false,
      featured: false,
    },
    creator: {
      company: "St. Johns Intl'",
      logoUrl: Logo,
      companySize: "10-20",
    },
  },
];

const StyledGridContainer = styled("div")(({ theme }) => ({
  display: "grid",
  justifyContent: "center",
  gridTemplateColumns: "20% 45% 20%",
  gridAutoRows: "auto",
  margin: "6rem 0 2rem 0",
  gap: "6px",
  "& > *": {
    flexBasis: "80%",
  },
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "100%",
    gridAutoColumns: "auto",
  },
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "100%",
    gridAutoColumns: "auto",
  },
}));

const StyledHomeFeaturedTop = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr",
  gridAutoRows: "auto",
  alignItems: "stretch",
  gap: "5px",
  [theme.breakpoints.down("md")]: {
    gridColumn: 1,
    gridRow: 1,
  },
  [theme.breakpoints.down("sm")]: {
    gridColumn: 1,
    gridRow: 1,
  },
}));

const StyledHomeFeaturedContent = styled("div")(({ theme }) => ({
  backgroundColor: "rgb(255, 255, 255)",
  gridColumn: "2/3",
  height: "auto",
  marginTop: "1rem",
  [theme.breakpoints.down("md")]: {
    gridColumn: 1,
    gridRow: 2,
  },
  [theme.breakpoints.down("sm")]: {
    gridColumn: 1,
    gridrow: 2,
  },
}));

const StyledHomeFeaturedJobs = styled("div")(({ theme }) => ({
  textAlign: "center",
  marginTop: "1rem",
  boxShadow: "0 0 20px rgba(112, 180, 247, 0.5)",
  overflow: "auto",
  [theme.breakpoints.down("md")]: {
    gridColumn: 1,
    gridRow: 3,
  },
  [theme.breakpoints.down("sm")]: {
    gridColumn: 1,
    gridRow: 3,
  },
}));

const StyledHomeFeaturedSponsors = styled("div")(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    gridcolumn: 1,
    gridRow: 4,
  },
  [theme.breakpoints.down("sm")]: {
    gridColumn: 1,
    gridRow: 4,
  },
}));

const StyledUrgentJobsWrapper = styled("div")(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    gridColumn: 1,
    gridRow: 5,
  },
  [theme.breakpoints.down("sm")]: {
    gridColumn: 1,
    gridRow: 5,
  },
}));

const StyledTeflWrapper = styled("div")(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    gridColumn: 1,
    gridRow: 6,
  },
  [theme.breakpoints.down("sm")]: {
    gridColumn: 1,
    gridRow: 6,
  },
}));

const Home = () => {
  return (
    <>
      {/* */}
      <StyledGridContainer>
        {/* top-left column*/}
        <StyledTeflWrapper>
          <Tefl />
        </StyledTeflWrapper>
        <StyledHomeFeaturedTop>
          <JobAd job={dummy_jobs[0]} />
          {/* top-middle column */}
        </StyledHomeFeaturedTop>

        {/* top-right column*/}
        <StyledUrgentJobsWrapper>
          <UrgentJobs job={dummy_jobs} />
        </StyledUrgentJobsWrapper>

        {/*lower-left column */}
        <StyledHomeFeaturedJobs>
          <RecentJobs homeJobs={dummy_jobs} />
          <Button component={RouterLink} to="/jobs">
            View All Jobs
          </Button>
        </StyledHomeFeaturedJobs>
        {/* lower middle-column*/}
        <StyledHomeFeaturedContent>
          <BlogContent />
        </StyledHomeFeaturedContent>
        {/* lower-right column*/}
        <StyledHomeFeaturedSponsors>
          <SponsorsList sponsor={dummy_jobs} />
        </StyledHomeFeaturedSponsors>
      </StyledGridContainer>
      <div>
        <SiteFeatures />
      </div>
      <div>
        <BottomFeatured />
      </div>
      <div>
        <h2 style={{ textAlign: "center" }}>Jobs You may like:</h2>{" "}
        {/*auth.isLoggedIn && auth.isSchool ? 'teachers' : 'jobs'*/}
        {/*  {auth.isLoggedIn && auth.isTeacher} && <BottomFeaturedAdsList /> */}
        <BottomFeaturedAdsList footerJobs={dummy_jobs} />
      </div>
      <Footer />
    </>
  );
};

export default Home;
