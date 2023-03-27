import React, { useState } from "react";

import {
  Card,
  CardContent,
  FormControl,
  FormHelperText,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import { nationalities } from "../../../shared/util/ThaiData";

const TeacherSettings = () => {
  const [nationality, setNationality] = useState("");

  const handleNationalityChange = (event) => {
    setNationality(event.target.value);
  };

  return (
    <Card>
      <Typography variant="h4" sx={{ margin: "1rem auto" }}>
        Update your profile
      </Typography>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="first name" variant="outlined" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="last name" variant="outlined" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel htmlFor="my-input">Email address</InputLabel>
              <Input id="my-input" aria-describedby="my-helper-text" />
              <FormHelperText id="my-helper-text">
                We'll never share your email.
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={9}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Nationality</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={nationality}
                label="Nationality"
                onChange={handleNationalityChange}
              >
                {nationalities.map((item, i) => (
                  <MenuItem key={i} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default TeacherSettings;
