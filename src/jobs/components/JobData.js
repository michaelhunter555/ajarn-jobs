import React from "react";

import {
  FaClipboardList,
  FaClock,
  FaGraduationCap,
  FaMapMarkerAlt,
  FaMoneyBill,
} from "react-icons/fa";

import JobDataTable from "./JobDataTable";

export const JobData = (props) => {
  const { applyJobModalHandler, job } = props;

  const jobSpecifications = job && [
    { text: "Location", icon: <FaMapMarkerAlt />, data: job?.location },
    {
      text: "Requirements",
      icon: <FaGraduationCap />,
      data: job?.requirements,
    },
    { text: "Salary", icon: <FaMoneyBill />, data: job?.salary },
    {
      text: "Work Permit",
      icon: <FaClipboardList />,
      data: job?.workPermit ? "✅" : "⛔",
    },
    { text: "Hours", icon: <FaClock />, data: job?.hours },
  ];

  return (
    <>
      <JobDataTable
        modal={applyJobModalHandler}
        jobSpecifications={jobSpecifications}
      />
    </>
  );
};
