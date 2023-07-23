import React, { useState } from "react";

import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import {
  fullTimeSalaries,
  partTimeSalaries,
  thaiCities,
} from "../../shared/util/ThaiData";

const StyledPaperContainer = styled(Paper)({
  border: "1px solid #ddd",
  padding: "1.5rem",
  borderRadius: "6px",
  background: "#fff",
});

const JobFilters = ({ onFilterChange }) => {
  const [salaryRange, setSalaryRange] = useState("");
  const [location, setLocation] = useState("");
  const [checked, setChecked] = useState("");

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
    onFilterChange({
      location: event.target.value,
      salaryRange,
      hours: checked,
    });
  };

  const handleSalaryRangeChange = (event) => {
    setSalaryRange(event.target.value);
    onFilterChange({
      location,
      salaryRange: event.target.value,
      hours: checked,
    });
  };

  const handleHoursChange = (event) => {
    setChecked(event.target.value);
    onFilterChange({ location, salaryRange, hours: event.target.value });
  };

  const resetFilter = () => {
    setChecked("");
    setSalaryRange("");
    setLocation("");
    onFilterChange({ location: null, salaryRange: null, hours: null });
  };

  return (
    <StyledPaperContainer>
      <Typography sx={{ fontSize: 30 }} component="h2">
        Filter Jobs
      </Typography>
      {location || salaryRange || checked ? (
        <FormControl>
          <Button onClick={resetFilter}>reset</Button>
        </FormControl>
      ) : (
        ""
      )}
      <FormControl fullWidth={true}>
        <FormLabel component="legend">hours</FormLabel>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={checked}
          onChange={handleHoursChange}
        >
          <FormControlLabel
            control={<Radio />}
            label="Full-time"
            value="Full-time"
            name="fullTime"
          />
          <FormControlLabel
            control={<Radio />}
            label="Part-time"
            value="Part-time"
            name="partTime"
          />
        </RadioGroup>
      </FormControl>
      <FormControl fullWidth={true}>
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
      </FormControl>
      <FormControl fullWidth={true}>
        <FormLabel component="legend">
          {checked === "Full-time" ? "Full-Time Salary" : "Part-Time Salary"}
        </FormLabel>
        <Select
          labelId="salary"
          id="salary"
          value={salaryRange}
          onChange={handleSalaryRangeChange}
        >
          <MenuItem value="">any</MenuItem>
          {checked === "Full-time" &&
            fullTimeSalaries.map((item, i) => (
              <MenuItem key={i} value={item}>
                {item}
              </MenuItem>
            ))}
          {checked === "Part-time" &&
            partTimeSalaries.map((item, i) => (
              <MenuItem key={i} value={item}>
                {item}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </StyledPaperContainer>
  );
};

export default JobFilters;
