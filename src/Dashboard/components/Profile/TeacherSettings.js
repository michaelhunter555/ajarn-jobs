import React, { useState } from "react";

import {
  Button,
  Card,
  CardContent,
  CircularProgress,
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

import ImageUpload from "../../../shared/components/FormElements/ImageUpload";
import { useForm } from "../../../shared/hooks/form-hook";
import {
  coreJobRequirements,
  nationalities,
  thaiCities,
  yearsOfExperience,
} from "../../../shared/util/ThaiData";

//const uniRegex = /^[a-zA-Z]+(\.[a-zA-Z]+)*\.(edu|ac\.uk|co\.uk|edu\.uk)$/;

const TeacherSettings = (props) => {
  const [isTeacher, setIsTeacher] = useState(props.isTeacher);
  const [isHidden, setIsHidden] = useState(props.isHidden);
  const user = props.user;
  const [formState, inputHandler] = useForm(
    {
      name: {
        value: user.name,
        isValid: true,
      },
      email: {
        value: user.email,
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
      education: {
        value: user.education,
        isValid: false,
      },
      highestCertification: {
        value: user.highestCertification,
        isValid: true,
      },
      workExperience: {
        value: user.workExperience,
        isvalid: true,
      },
      image: {
        value: user.image,
        isValid: true,
      },
    },
    true
  );

  const updateProfileHandler = (event) => {
    event.preventDefault();
    // const updatedUser = {
    //   ...user,
    //   name: formState.inputs.name.value,
    //   nationality: formState.inputs.nationality.value,
    //   location: formState.inputs.location.value,
    //   about: formState.inputs.about.value,
    //   skill: formState.inputs.skill.value,
    //   interests: formState.inputs.interests.value,
    //   education: formState.inputs.education.value,
    //   highestCertification: formState.inputs.highestCertification.value,
    //   workExperience: formState.inputs.workExperience.value,
    //   image: formState.inputs.image.value,
    // };

    const formData = new FormData();
    formData.append("name", formState.inputs.name.value);
    formData.append("nationality", formState.inputs.nationality.value);
    formData.append("location", formState.inputs.location.value);
    formData.append("about", formState.inputs.about.value);
    formData.append("skill", formState.inputs.skill.value);
    formData.append("interests", formState.inputs.interests.value);
    formData.append("education", formState.inputs.education.value);
    formData.append(
      "highestCertification",
      formState.inputs.highestCertification.value
    );
    formData.append("workExperience", formState.inputs.workExperience.value);
    formData.append("image", formState.inputs.image.value);

    props.onProfileUpdate(formData);
  };

  const userArrayHandler = (field, value, validator) => {
    // const items = value.split(",").map((item) => item.trim());
    inputHandler(field, value, validator);
  };

  const handleRoleToggle = () => {
    setIsTeacher((prev) => !prev);
    props.onClickToggle();
  };

  const handleVisibilityToggle = () => {
    setIsHidden((prev) => !prev);
    props.onToggleVisibility();
  };

  const emailIsValid = (email) => /^\S+@\S+\.\S+$/.test(email);

  return (
    <Card>
      {
        <Typography>
          <Switch
            disabled={true}
            checked={!isTeacher}
            onChange={handleRoleToggle}
          />
          {isTeacher ? "Teacher looking for a job" : "Employer looking to hire"}
        </Typography>
      }
      <Typography>
        <Switch
          disabled={user?.userType === "employer"}
          checked={!isHidden}
          onChange={handleVisibilityToggle}
        />
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
            <ImageUpload id="image" onInput={inputHandler} />
          </Grid>
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
              <InputLabel id="workExperience-select">
                Work Experience
              </InputLabel>
              <Select
                labelId="update-workExperience"
                id="workExperience"
                defaultValue={formState.inputs.workExperience.value}
                label="Years of Experience"
                onChange={(event) =>
                  inputHandler(
                    "workExperience",
                    event.target.value,
                    event.target.value !== ""
                  )
                }
              >
                {yearsOfExperience.map((item, i) => (
                  <MenuItem key={i} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <FormControl fullWidth>
              <InputLabel id="highestCertification-select">
                Highest Certification
              </InputLabel>
              <Select
                labelId="update-highestCertification"
                id="highestCertification"
                defaultValue={formState.inputs.highestCertification.value}
                label="Highest Certification"
                onChange={(event) =>
                  inputHandler(
                    "highestCertification",
                    event.target.value,
                    event.target.value !== ""
                  )
                }
              >
                {coreJobRequirements.map((item, i) => (
                  <MenuItem key={i} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl>
              <TextField
                multiline
                fullWidth
                helperText="Enter university domains separted by commas (i.e. Harvard, Yale, etc.)"
                label="Add University Badges"
                variant="outlined"
                id="education"
                defaultValue={formState.inputs.education.value}
                onChange={(event) =>
                  userArrayHandler(
                    "education",
                    event.target.value,
                    event.target.value !== ""
                  )
                }
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={5}>
            <FormControl fullWidth>
              <InputLabel htmlFor="my-input">Email address</InputLabel>
              <Input
                value={formState?.inputs?.email?.value}
                onChange={(event) => {
                  inputHandler(
                    "email",
                    event.target.value,
                    emailIsValid(event.target.value)
                  );
                }}
                id="email"
                aria-describedby="e-mail-address"
              />
              <FormHelperText id="e-mail-address">
                Edit your email (*you may need to re-verfiy)
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
              helperText="separate each interest by a comma."
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
          {props.isPostLoading && <CircularProgress />}
          {!props.isLoading && (
            <Button
              variant="outlined"
              onClick={updateProfileHandler}
              type="submit"
            >
              Save
            </Button>
          )}
        </FormControl>
      </CardContent>
    </Card>
  );
};

export default TeacherSettings;
