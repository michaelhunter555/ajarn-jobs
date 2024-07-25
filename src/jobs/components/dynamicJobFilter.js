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
  Stack,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import {
  fullTimeSalaries,
  partTimeSalaries,
  thaiCities,
} from "../../shared/util/ThaiData";

const StyledPaperContainer = styled(Paper)({
  //border: "1px solid #ddd",
  padding: "1.5rem",
  borderRadius: "6px",
});

const DynamicJobFilter = ({ onFilterChange }) => {
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
    onFilterChange({ location: "", salaryRange: "", hours: "" });
  };

  return (
    <>
      <Stack sx={{ width: "100%" }}>
        <FormControl>
          <Button
            variant="outlined"
            disabled={!location && !salaryRange && !checked}
            onClick={resetFilter}
          >
            reset
          </Button>
        </FormControl>
      </Stack>
      <Stack sx={{ width: "100%" }}>
        <FormControl sx={{ margin: "0 auto" }}>
          <FormLabel sx={{ alignContent: "left" }} component="legend">
            hours
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={checked}
            onChange={handleHoursChange}
            row
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
      </Stack>
      <Stack sx={{ width: "100%" }}>
        <FormControl>
          <FormLabel component="legend">Select city</FormLabel>
          <Select
            labelId="location"
            id="location"
            value={location}
            onChange={handleLocationChange}
            MenuProps={{ disableScrollLock: true }}
          >
            <MenuItem value="">any</MenuItem>
            {thaiCities.map((item, i) => (
              <MenuItem key={i} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
      <Stack sx={{ width: "100%" }}>
        <FormControl>
          <FormLabel component="legend">
            {checked === "Full-time" ? "Full-Time Salary" : "Part-Time Salary"}
          </FormLabel>
          <Select
            labelId="salary"
            id="salary"
            value={salaryRange}
            onChange={handleSalaryRangeChange}
            MenuProps={{ disableScrollLock: true }}
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
      </Stack>
    </>
  );
};

export default DynamicJobFilter;
