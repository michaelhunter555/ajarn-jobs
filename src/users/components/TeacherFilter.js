import React, { useState } from "react";

import {
  FormControl,
  FormLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import {
  coreJobRequirements,
  nationalities,
  thaiCities,
} from "../../shared/util/ThaiData";

const StyledPaperContainer = styled(Paper)(({ theme }) => ({
  border: "1px solid #ddd",
  padding: "1.5rem",
  borderRadius: "6px",
  background: theme.palette.background.paper,
}));

const TeacherFilter = ({ onDataChange }) => {
  const [location, setLocation] = useState("");
  const [nationality, setNationality] = useState("");
  const [qualifications, setQualifications] = useState("");

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
    onDataChange({ location: event.target.value, nationality, qualifications });
  };

  const handleNationalityChange = (event) => {
    setNationality(event.target.value);
    onDataChange({ location, nationality: event.target.value, qualifications });
  };

  const handleQualificationsChange = (event) => {
    setQualifications(event.target.value);
    onDataChange({ location, nationality, qualifications: event.target.value });
  };

  return (
    <StyledPaperContainer>
      <Typography sx={{ fontSize: 30 }} component="h2">
        Filter Teachers
      </Typography>
      <FormControl fullWidth={true}>
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
      <FormControl fullWidth={true}>
        <FormLabel component="legend">Nationality</FormLabel>
        <Select
          labelId="salary"
          id="salary"
          value={nationality}
          onChange={handleNationalityChange}
          MenuProps={{ disableScrollLock: true }}
        >
          <MenuItem value="">any</MenuItem>
          {nationalities.map((nationality, i) => (
            <MenuItem key={i} value={nationality}>
              {nationality}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth={true}>
        <FormLabel component="legend">Qualifications</FormLabel>
        <Select
          labelId="salary"
          id="salary"
          value={qualifications}
          onChange={handleQualificationsChange}
          MenuProps={{ disableScrollLock: true }}
        >
          <MenuItem value="">any</MenuItem>
          {coreJobRequirements.map((qualification, i) => (
            <MenuItem key={i} value={qualification}>
              {qualification}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </StyledPaperContainer>
  );
};

export default TeacherFilter;
