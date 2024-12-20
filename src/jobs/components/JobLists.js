import "./JobsList.css";

import React from "react";

import { Link } from "react-router-dom";

import { styled } from "@mui/material/styles";

import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import { getTimeDifference } from "../../shared/util/getTimeDifference";
import JobItem from "./JobItem";

const UnorderedJobListStyles = styled("ul")({
  listStyle: "none",
  margin: "1rem auto",
  padding: "0",
  width: "100%",
  maxWidth: "50rem",
});

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
    <UnorderedJobListStyles>
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
    </UnorderedJobListStyles>
  );
};

export default JobLists;
