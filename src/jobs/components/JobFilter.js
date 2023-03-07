import "./JobFilter.css";

import React, { useState } from "react";

import Card from "../../shared/components/UIElements/Card";

const JobFilter = ({ onFilterChange }) => {
  const [location, setLocation] = useState("");
  const [salaryRange, setSalaryRange] = useState("");

  const locationChangeHandler = (event) => {
    setLocation(event.target.value);
    onFilterChange({ location: event.target.value, salaryRange });
  };

  const salaryRangeChangeHandler = (event) => {
    setSalaryRange(event.target.value);
    onFilterChange({ location, salaryRange: event.target.value });
  };

  return (
    <Card className="job-filter">
      <h3>Filter Jobs</h3>
      <div className="job-filter__group">
        <label htmlFor="location">Location:</label>
        <input
          type="text"
          id="location"
          value={location}
          onChange={locationChangeHandler}
        />
      </div>
      <div className="job-filter__group">
        <label htmlFor="salary-range">Full-Time Salary:</label>
        <select
          id="salary-range"
          value={salaryRange}
          onChange={salaryRangeChangeHandler}
        >
          <option value="">Any</option>
          <option value="0-30000">0 - 30,000 THB/month</option>
          <option value="30001-50000">30,001 - 50,000 THB/month</option>
          <option value="50001-80000">50,001 - 80,000 THB/month</option>
          <option value="80001-10000">80,001 - 100,000 THB/month</option>
        </select>
      </div>
      <div className="job-filter__group">
        <label htmlFor="full-time">Full-time</label>
        <div className="radio-group">
          <input
            type="radio"
            id="full-time"
            name="hours"
            value="Full-time"
            onChange={() =>
              onFilterChange({ location, salaryRange, hours: "Full-time" })
            }
          />
        </div>

        <div className="radio-group">
          <input
            type="radio"
            id="part-time"
            name="hours"
            value="Part-time"
            onChange={() =>
              onFilterChange({ location, salaryRange, hours: "Part-time" })
            }
          />
          <label htmlFor="part-time">Part-time</label>
        </div>
      </div>
    </Card>
  );
};

export default JobFilter;
