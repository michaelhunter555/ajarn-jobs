import "./Home.css";

import React from "react";

import { Link as RouterLink } from "react-router-dom";

import { Button } from "@mui/material";

import Logo from "../../logo.svg";
//import GlassCard from "../../shared/components/UIElements/GlassCard";
import JobAd from "../../shared/components/UIElements/JobAd";
import BlogContent from "../components/BlogContent";
import RecentJobs from "../components/RecentJobs";
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
];

const Home = () => {
  return (
    <>
      {/* */}
      <div className="grid-container">
        {/* top-left column*/}
        <Tefl />
        <div className="home-column__featured-top">
          <JobAd job={dummy_jobs[0]} />
          {/* top-middle column */}
        </div>

        {/* top-right column*/}
        <UrgentJobs job={dummy_jobs} />

        {/*lower-left column */}
        <div className="home-column__jobs">
          <RecentJobs homeJobs={dummy_jobs} />
          <Button component={RouterLink} to="/jobs">
            View All Jobs
          </Button>
        </div>
        {/* lower middle-column*/}
        <div className="home-column__content">
          <BlogContent />
        </div>
        {/* lower-right column*/}
        <div className="home-column__sponsors">
          <SponsorsList sponsor={dummy_jobs} />
        </div>
      </div>
    </>
  );
};

export default Home;
