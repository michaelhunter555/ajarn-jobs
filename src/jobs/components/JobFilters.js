import React, { useState } from "react";

import {
  Card,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

const thaiCities = [
  "bangkok",
  "pattaya",
  "chiang mai",
  "nakhon nayok",
  "rangsit",
  "sukothai",
  "nontaburi",
];

const jobSalaryRange = ["at least 20,000", "+25,000", "+30,000"];

const JobFilters = ({ onFilterChange }) => {
  const [salaryRange, setSalaryRange] = useState("");
  const [location, setLocation] = useState("");
  const [checked, setChecked] = useState({
    partTime: false,
    fullTime: false,
  });

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
    onFilterChange({ location: event.target.value, salaryRange });
  };

  const handleSalaryRangeChange = (event) => {
    setSalaryRange(event.target.value);
    onFilterChange({ location, salaryRange: event.target.value });
  };

  const handleHoursChange = (event) => {
    const { name, checked } = event.target;
    setChecked((prev) => ({ ...prev, [name]: checked }));
    onFilterChange({ location, salaryRange, hours: event.target.value });
  };

  return (
    <Card>
      <Typography component="div" color="primary">
        Filter Jobs
      </Typography>
      <FormControl fullWidth>
        <FormLabel component="legend">Select city</FormLabel>
        <Select
          labelId="location"
          id="location"
          value={location}
          onChange={handleLocationChange}
        >
          <MenuItem value="">any</MenuItem>
          {thaiCities.map((item, i) => (
            <MenuItem key={i} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
        <FormLabel component="legend">Select Salary</FormLabel>
        <Select
          labelId="salary"
          id="salary"
          value={salaryRange}
          onChange={handleSalaryRangeChange}
        >
          <MenuItem value="">any</MenuItem>
          {jobSalaryRange.map((item, i) => (
            <MenuItem key={i} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
        <FormControlLabel
          control={<Checkbox checked={checked.fullTime} />}
          label="Full-time"
          value="Full-time"
          name="fullTime"
          onChange={handleHoursChange}
        />
        <FormControlLabel
          control={<Checkbox checked={checked.partTime} />}
          label="Part-time"
          value="Part-time"
          name="partTime"
          onChange={handleHoursChange}
        />
      </FormControl>
    </Card>
  );
};

export default JobFilters;
