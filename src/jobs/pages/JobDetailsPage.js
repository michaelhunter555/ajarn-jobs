import React from "react";

import { useParams } from "react-router-dom";

import Logo from "../../logo.svg";
import JobDetails from "../components/JobDetails";

const dummy_jobs = [
  {
    id: "1",
    title: "English Teacher",
    location: "Bangkok",
    salary: "50k THB/month",
    requirements: "BA degree, 120-Hr TEFL",
    description: "Teach English to primary and secondary students in Bangkok.",
    datePosted: "2023-02-28",
    hours: "Full-time",
    workPermit: false,
    about:
      "We focus on tackling the challenges that come with delivering English language programs – notably to large classes – through our specially designed courses, delivered by our Sine trained teachers. These courses are specifically designed to make learning as fun and as rewarding as possible. We understand the importance and benefits of English to Thai students in today’s competitive ASEAN market. It is for this reason that the management team provides ongoing support after the initial teacher training, as well as visiting partner schools to conduct classroom observations on a regular basis. This allows management to see how the programmes are received by the students, as well as ensure that all teachers are up to date with the required teaching methods and meet the high Sine standard.",
    creator: {
      company: "Sine Education",
      logoUrl: Logo,
      companySize: "10-50",
      headquarters: "Bangkok, TH",
      established: "2006",
      presence: [
        "Bangkok",
        "chiang mai",
        "nontaburi",
        "sisaket",
        "Burriram",
        "Nakhon Nayok",
      ],
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
      logoUrl: Logo,
      companySize: "10-20",
      headquarters: "Bangkok, TH",
      established: "2006",
      presence: [
        "Bangkok",
        "chiang mai",
        "nontaburi",
        "sisaket",
        "Burriram",
        "Nakhon Nayok",
      ],
    },
  },
];

const JobDetailsPage = () => {
  const jobId = useParams().jid;
  const job = dummy_jobs.find((j) => j.id === jobId);
  return <JobDetails job={job} />;
};

export default JobDetailsPage;
