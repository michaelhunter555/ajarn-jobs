import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Box,
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
import SkillsChipInput from "../../../shared/components/FormElements/SkillsChipInput";
import ChipInput from "../../../shared/components/FormElements/ChipInput";
import { useForm } from "../../../shared/hooks/form-hook";
import {
  coreJobRequirements,
  nationalities,
} from "../../../shared/util/ThaiData";
import { thaiProvinces, experienceYears } from "../../../shared/data/thaiLocations";
import { useUser } from "../../../shared/hooks/user-hook";
import { AuthContext } from "../../../shared/context/auth-context";

//const uniRegex = /^[a-zA-Z]+(\.[a-zA-Z]+)*\.(edu|ac\.uk|co\.uk|edu\.uk)$/;

const TeacherSettings = (props) => {
  const auth = useContext(AuthContext);
  const [isTeacher, setIsTeacher] = useState(props.isTeacher);
  const [isHidden, setIsHidden] = useState(props.isHidden);
  const user = props.user;
  const { deleteUserById, isPostLoading, error, clearError } = useUser();
  const navigate = useNavigate();
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
        isValid: true,
      },
      highestCertification: {
        value: user.highestCertification,
        isValid: true,
      },
      workExperience: {
        value: user.workExperience,
        isValid: true,
      },
      image: {
        value: user.image,
        isValid: true,
      },
    },
    true // Start with form as valid since all fields have default values
  );

  const updateProfileHandler = (event) => {
    event.preventDefault();
    
    // Check if form is valid (has changes)
    if (!formState.isValid) {
      return; // Don't make API call if no changes
    }

    const formData = new FormData();
    formData.append("name", formState.inputs.name.value);
    formData.append("nationality", formState.inputs.nationality.value);
    formData.append("location", formState.inputs.location.value);
    formData.append("about", formState.inputs.about.value);
    formData.append("skill", formState.inputs.skill.value);
    formData.append("interests", formState.inputs.interests.value);
    formData.append("education", formState.inputs.education.value);
    formData.append("email", formState.inputs.email.value);
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

  const handleDeleteAccount = async (userId) => {
    try {
     await deleteUserById(userId).then(() => {
        auth.logout();
        navigate("/");
      })
    } catch(err) {
      console.log(err);
    }
  }

  return (
    <Card sx={{}}>
      {user?.userType === "teacher" && (
        <Typography>
          <Switch
            disabled={true}
            checked={!isTeacher}
            onChange={handleRoleToggle}
          />
          {isTeacher ? "Teacher looking for a job" : "Employer looking to hire"}
        </Typography>
      )}
      {user?.userType === "teacher" && (
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
      )}
      <Box sx={{ padding: "1rem" }}>
      <Button color="error" variant="outlined" onClick={() =>  handleDeleteAccount(auth?.user?._id)}>
        Delete Account
      </Button>
      </Box>

      <CardContent>
        <Typography variant="h4" sx={{ margin: "1rem auto" }}>
          Update your profile
        </Typography>
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
              value={formState.inputs.name.value || ""}
              onChange={(event) =>
                inputHandler(
                  "name",
                  event.target.value,
                  !!event.target.value
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
                value={formState.inputs.nationality.value || ""}
                label="Nationality"
                onChange={(event) =>
                  inputHandler(
                    "nationality",
                    event.target.value,
                    !!event.target.value
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
                value={formState.inputs.workExperience.value || ""}
                label="Years of Experience"
                onChange={(event) =>
                  inputHandler(
                    "workExperience",
                    event.target.value,
                    !!event.target.value
                  )
                }
              >
                {experienceYears.map((item, i) => (
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
                value={formState.inputs.highestCertification.value || ""}
                label="Highest Certification"
                onChange={(event) =>
                  inputHandler(
                    "highestCertification",
                    event.target.value,
                    !!event.target.value
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
            <ChipInput
              label="My Education / Certifications"
              helperText="Enter university domains (e.g., Harvard.edu, Liverpool.ac.uk)"
              value={formState.inputs.education.value}
              onChange={(value) =>
                userArrayHandler(
                  "education",
                  value,
                  !!value
                )
              }
              id="education"
              multiline={true}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={5}>
            <FormControl fullWidth>
              <InputLabel htmlFor="my-input">Email address</InputLabel>
              <Input
                value={formState?.inputs?.email?.value}
                disabled
                id="email"
                aria-describedby="e-mail-address"
              />
              <FormHelperText id="e-mail-address">
                Email is managed by your authentication provider (Google/Firebase)
              </FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={7}>
            <FormControl fullWidth>
              <InputLabel id="location-select">Location</InputLabel>
              <Select
                labelId="update-location"
                id="location"
                value={formState.inputs.location.value || ""}
                label="Location"
                onChange={(event) =>
                  inputHandler(
                    "location",
                    event.target.value,
                    !!event.target.value
                  )
                }
              >
                {thaiProvinces.map((item, i) => (
                  <MenuItem key={i} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <SkillsChipInput
              label="Skills"
              helperText="Type a skill and press Enter to add it"
              value={formState.inputs.skill.value}
              onChange={(value) =>
                userArrayHandler(
                  "skill",
                  value,
                  !!value
                )
              }
              id="skill"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <SkillsChipInput
              label="Interests"
              helperText="Type an interest and press Enter to add it"
              value={formState.inputs.interests.value}
              onChange={(value) =>
                userArrayHandler(
                  "interests",
                  value,
                  !!value
                )
              }
              id="interests"
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
            value={formState.inputs.about.value || ""}
            onChange={(event) =>
              inputHandler(
                "about",
                event.target.value,
                !!event.target.value
              )
            }
          />
        </Grid>
        <FormControl>
          {props.isPostLoading && <CircularProgress />}
          {!props.isLoading && (
            <Button
            disabled={!formState.isValid}
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
