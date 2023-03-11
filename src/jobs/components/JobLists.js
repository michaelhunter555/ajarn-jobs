import "./JobsList.css";

import React from "react";

import { Link } from "react-router-dom";

import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import { getTimeDifference } from "../../shared/util/getTimeDifference";
import JobItem from "./JobItem";

const JobLists = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="job-list center">
        <Card>
          <h2>
            No jobs found. Please check back again in the future or create one.
          </h2>
          <Button to="/job/new">Create a job</Button>
        </Card>
      </div>
    );
  }

  return (
    <ul className="job-list">
      {props.items.map((job) => {
        return (
          <li key={job.id}>
            <Link
              to={`/jobs/${job.id}`}
              style={{
                textDecoration: "none",
              }}
            >
              <JobItem
                schoolLogo={job.creator.logoUrl}
                title={job.title}
                salary={job.salary}
                description={job.description}
                datePosted={getTimeDifference(job.datePosted)}
                requirements={job.requirements}
                company={job.creator.company}
                jobType={job.jobType.featured}
                location={job.location}
                hours={job.hours}
              />
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default JobLists;
