import "./UserJobs.css";

import { useState } from "react";

import Logo from "../../logo.svg";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import FeaturedJobsLists from "../components/FeaturedJobsLists";
import JobFilter from "../components/JobFilter";
import JobLists from "../components/JobLists";

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

  return (
    <div className="user-jobs">
      <div className="add-job__div">
        <Button className="add-job__btn" to="/job/new">
          Add a Job +
        </Button>
      </div>
      <div className="user-jobs__filter">
        <JobFilter onFilterChange={handleFilterChange} />
      </div>
      <div className="user-jobs__list">
        <JobLists items={filteredJobs} />
      </div>
      <Card className="featured-jobs__list" style={{ marginTop: "1rem" }}>
        <FeaturedJobsLists sponsors={dummy_jobs} />
      </Card>
    </div>
  );
};

export default UserJobs;
