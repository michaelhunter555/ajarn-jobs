import React, {
  useContext,
  useState,
} from 'react';

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

import { AuthContext } from '../../../shared/context/auth-context';
import { useForm } from '../../../shared/hooks/form-hook';
import {
  nationalities,
  thaiCities,
} from '../../../shared/util/ThaiData';

const TeacherSettings = (props) => {
  const { updateUser } = useContext(AuthContext);
  const [isSchool, setIsSchool] = useState(props.isSchool);
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
      bio: {
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
    updateUser(updatedUser);
    console.log(updatedUser);
  };

  const userArrayHandler = (field, value, validator) => {
    const items = value.split(", ").map((item) => item.trim());
    inputHandler(field, items, validator);
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
            <TextField
              fullWidth
              label="Full name"
              variant="outlined"
              id="name"
              value={formState.inputs.name.value}
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
                value={formState.inputs.nationality.value}
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

          <Grid item xs={12} sm={6} md={7}>
            <FormControl fullWidth>
              <InputLabel id="location-select">Location</InputLabel>
              <Select
                labelId="update-location"
                id="locataion"
                value={formState.inputs.location.value}
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

          <Grid item xs={12} sm={6} md={5}>
            <FormControl fullWidth>
              <InputLabel htmlFor="my-input">Email address</InputLabel>
              <Input id="my-input" aria-describedby="my-helper-text" />
              <FormHelperText id="my-helper-text">
                We'll never share your email.
              </FormHelperText>
            </FormControl>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            multiline
            fullWidth
            label="Bio"
            variant="outlined"
            id="bio"
            value={formState.inputs.bio.value}
            onChange={(event) =>
              inputHandler("bio", event.target.value, event.target.value !== "")
            }
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            multiline
            fullWidth
            label="Skills"
            variant="outlined"
            id="skill"
            value={formState.inputs.skill.value}
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
            label="Interest"
            variant="outlined"
            id="interest"
            value={formState.inputs.interests.value}
            onChange={(event) =>
              userArrayHandler(
                "interests",
                event.target.value,
                (array) => array.length > 0
              )
            }
          />
        </Grid>
        <FormControl>
          <Button onClick={updateProfileHandler} type="submit">
            Save
          </Button>
        </FormControl>
      </CardContent>
    </Card>
  );
};

export default TeacherSettings;
