import React, { useState } from 'react';

import {
  Button,
  Card,
  CardContent,
  FormControl,
  FormHelperText,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
} from '@mui/material';

import { nationalities } from '../../../shared/util/ThaiData';

const TeacherSettings = (props) => {
  const [nationality, setNationality] = useState("");
  const [isSchool, setIsSchool] = useState(props.isSchool);

  const handleNationalityChange = (event) => {
    setNationality(event.target.value);
  };

  const handleRoleToggle = () => {
    setIsSchool((prev) => !prev);
    props.onClickToggle();
  };

  return (
    <Card>
      <Typography>
        <Switch checked={!isSchool} onChange={handleRoleToggle} />
        {isSchool ? "Teacher looking for a job" : "Employer looking to hire"}
      </Typography>

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
          <Grid item xs={12} sm={6} md={5}>
            <FormControl fullWidth>
              <InputLabel htmlFor="my-input">Email address</InputLabel>
              <Input id="my-input" aria-describedby="my-helper-text" />
              <FormHelperText id="my-helper-text">
                We'll never share your email.
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={7}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Nationality</InputLabel>
              <Select
                labelId="update-nationality"
                id="nationality-select"
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
        <FormControl>
          <Button type="submit">Save</Button>
        </FormControl>
      </CardContent>
    </Card>
  );
};

export default TeacherSettings;
