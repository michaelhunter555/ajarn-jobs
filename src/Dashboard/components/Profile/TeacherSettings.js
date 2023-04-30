import React, { useState } from "react";

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
} from "@mui/material";

import { useForm } from "../../../shared/hooks/form-hook";
import { nationalities, thaiCities } from "../../../shared/util/ThaiData";

const TeacherSettings = (props) => {
  const [isSchool, setIsSchool] = useState(props.isSchool);
  const [isHidden, setIsHidden] = useState(props.isHidden);
  const user = props.user;
  const [formState, inputHandler] = useForm(
    {
      name: {
        value: user.name,
        isValid: true,
      },
      nationality: {
        value: user.nationality,
        isValid: true,
      },
      location: {
        value: user.location,
        isValid: true,
      },
      about: {
        value: user.about,
        isValid: true,
      },
      skill: {
        value: user.skill,
        isValid: true,
      },
      interests: {
        value: user.interests,
        isValid: true,
      },
    },
    true
  );

  const updateProfileHandler = (event) => {
    event.preventDefault();
    const updatedUser = {
      ...user,
      name: formState.inputs.name.value,
      nationality: formState.inputs.nationality.value,
      location: formState.inputs.location.value,
      about: formState.inputs.about.value,
      skill: formState.inputs.skill.value,
      interests: formState.inputs.interests.value,
    };
    props.onProfileUpdate(updatedUser);
    console.log("updateProfileHandler:", updatedUser);
  };

  const userArrayHandler = (field, value, validator) => {
    const items = value.split(", ").map((item) => item.trim());
    inputHandler(field, items, validator);
  };

  const handleRoleToggle = () => {
    setIsSchool((prev) => !prev);
    props.onClickToggle();
  };

  const handleVisibilityToggle = () => {
    setIsHidden((prev) => !prev);
    props.onToggleVisibility();
  };

  return (
    <Card>
      <Typography>
        <Switch checked={!isSchool} onChange={handleRoleToggle} />
        {isSchool ? "Teacher looking for a job" : "Employer looking to hire"}
      </Typography>
      <Typography>
        <Switch checked={!isHidden} onChange={handleVisibilityToggle} />
        {isHidden
          ? "Profile is hidden from employers"
          : "Your profile is public to schools, agencies & recruiters"}
      </Typography>
      <Typography variant="h4" sx={{ margin: "1rem auto" }}>
        Update your profile
      </Typography>
      <CardContent>
        <Grid container spacing={2} direction="row">
          <Grid item xs={12} sm={6} md={5}>
            <TextField
              fullWidth
              label="Full name"
              variant="outlined"
              id="name"
              defaultValue={formState.inputs.name.value}
              onChange={(event) =>
                inputHandler(
                  "name",
                  event.target.value,
                  event.target.value !== ""
                )
              }
            />
          </Grid>

          <Grid item xs={12} sm={6} md={7}>
            <FormControl fullWidth>
              <InputLabel id="nationality-select">Nationality</InputLabel>
              <Select
                labelId="update-nationality"
                id="nationality"
                defaultValue={formState.inputs.nationality.value}
                label="Nationality"
                onChange={(event) =>
                  inputHandler(
                    "nationality",
                    event.target.value,
                    event.target.value !== ""
                  )
                }
              >
                {nationalities.map((item, i) => (
                  <MenuItem key={i} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
              <InputLabel id="location-select">Location</InputLabel>
              <Select
                labelId="update-location"
                id="location"
                defaultValue={formState.inputs.location.value}
                label="Location"
                onChange={(event) =>
                  inputHandler(
                    "location",
                    event.target.value,
                    event.target.value !== ""
                  )
                }
              >
                {thaiCities.map((item, i) => (
                  <MenuItem key={i} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              multiline
              fullWidth
              helperText="separate each skill by a comma."
              label="Skills"
              variant="outlined"
              id="skill"
              defaultValue={formState.inputs.skill.value}
              onChange={(event) =>
                userArrayHandler(
                  "skill",
                  event.target.value,
                  (array) => array.length > 0
                )
              }
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              multiline
              fullWidth
              helperText="separate each skill by a comma."
              label="Interest"
              variant="outlined"
              id="interest"
              defaultValue={formState.inputs.interests.value}
              onChange={(event) =>
                userArrayHandler(
                  "interests",
                  event.target.value,
                  (array) => array.length > 0
                )
              }
            />
          </Grid>
        </Grid>

        <Grid item xs={12} sx={{ margin: "0.5rem 0 0.5rem 0" }}>
          <TextField
            multiline
            rows={3}
            fullWidth
            label="About"
            variant="outlined"
            id="about"
            defaultValue={formState.inputs.about.value}
            onChange={(event) =>
              inputHandler(
                "about",
                event.target.value,
                event.target.value !== ""
              )
            }
          />
        </Grid>
        <FormControl>
          <Button
            variant="outlined"
            onClick={updateProfileHandler}
            type="submit"
          >
            Save
          </Button>
        </FormControl>
      </CardContent>
    </Card>
  );
};

export default TeacherSettings;
