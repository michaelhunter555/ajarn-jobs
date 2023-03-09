import "./JobDetails.css";

import React from "react";

import {
  FaClipboardList,
  FaClock,
  FaGraduationCap,
  FaMapMarkerAlt,
  FaMoneyBill,
} from "react-icons/fa";

import Button from "../../shared/components/FormElements/Button";

const JobDetails = (props) => {
  const { job } = props;

  // work permit?

  //add function for sending job application to employer. maybe email.js?
  const sendApplicationHandler = (event, userId) => {
    event.preventDefault();

    // const sendRequest = async () => {
    //   const responseData = await sendRequest(
    //     "url",
    //     "POST",
    //     JSON.stringify({})
    //     ,
    //     {'Content-Type': 'application/json'}
    //     );
    // };
  };

  return (
    <>
      <div className="job-details">
        <div className="job-header">
          <div className="job-title">{job.title}</div>
          <Button onClick={sendApplicationHandler}>Apply Now</Button>
        </div>
        <div className="job-details-container">
          <div className="job-icon-table">
            <div className="job-info-item">
              <div className="job-icon-cell">
                <FaMapMarkerAlt className="job-icon" />
                Location
              </div>
              <div className="job-text-cell">{job.location}</div>
            </div>
            <div className="job-info-item">
              <div className="job-icon-cell">
                <FaGraduationCap className="job-icon" />
                Requirements
              </div>
              <div className="job-text-cell">{job.requirements}</div>
            </div>
            <div className="job-info-item">
              <div className="job-icon-cell">
                <FaMoneyBill className="job-icon" />
                Salary
              </div>
              <div className="job-text-cell">{job.salary}</div>
            </div>
            <div className="job-info-item">
              <div className="job-icon-cell">
                <FaClipboardList className="job-icon" />
                Work-Permit
              </div>
              <div className="job-text-cell">
                {job.workPermit ? "✅" : "⛔"}
              </div>
            </div>
            <div className="job-info-item">
              <div className="job-icon-cell">
                <FaClock className="job-icon" />
                Workload
              </div>
              <div className="job-text-cell">{job.hours}</div>
            </div>
          </div>
        </div>
        <div className="job-description">
          <div className="job-description-title">Job Description</div>
          <div className="job-description-text">{job.description}</div>
        </div>
      </div>
      <div className="">
        {/*auth.login && auth.isSchool */}
        <Button to={`/jobs/${job.id}/update`}> update Job </Button>
      </div>
    </>
  );
};

export default JobDetails;
//<Button to={`/jobs/${job.id}/update`}> update Job </Button>
