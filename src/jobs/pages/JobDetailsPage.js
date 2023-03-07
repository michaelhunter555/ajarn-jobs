import React from "react";

import { useParams } from "react-router-dom";

import JobDetails from "../components/JobDetails";

const dummy_jobs = [
  {
    id: "1",
    title: "English Teacher",
    location: "Bangkok",
    salary: "30,000 - 50,000 THB/month",
    requirements: "Bachelor's degree, TEFL certification",
    description: "Teach English to primary and secondary students in Bangkok.",
    datePosted: "2023-02-28",
    hours: "Full-time",
    workPermit: false,
    creator: {
      company: "Sine Education",
      logoUrl: "#",
      companySize: "10-50",
    },
  },
  {
    id: "2",
    title: "Mathematics Teacher",
    location: "Chiang Mai",
    salary: "25,000 - 40,000 THB/month",
    requirements: "BA in Mathematics + 2yrs experience",
    description: "Teach Mathematics to secondary students in Chiang Mai.",
    datePosted: "2023-02-27",
    hours: "Full-time",
    workPermit: true,
    creator: {
      company: "BFits",
      logoUrl: "#",
      companySize: "10-20",
    },
  },
];

const JobDetailsPage = () => {
  const jobId = useParams().jid;
  const job = dummy_jobs.find((j) => j.id === jobId);
  return <JobDetails job={job} />;
};

export default JobDetailsPage;
