import React, { useContext, useState } from "react";

import {
  Button,
  Card,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { AuthContext } from "../../../shared/context/auth-context";
import { useForm } from "../../../shared/hooks/form-hook";
import { thaiCities } from "../../../shared/util/ThaiData";

const UpdateResumeItem = ({ resumeItem, onUpdate, onDelete, onCancel }) => {
  const auth = useContext(AuthContext);
  const [formState, inputHandler, setFormData] = useForm(
    {
      company: {
        value: resumeItem.company || "",
        isValid: true,
      },
      schoolName: {
        value: resumeItem.schoolName || "",
        isValid: true,
      },
      role: {
        value: resumeItem.role || "",
        isValid: true,
      },
      location: {
        value: resumeItem.location || "",
        isValid: true,
      },
      jobTitle: {
        value: resumeItem.jobTitle || "",
        isvalid: true,
      },
      from: {
        value: resumeItem.from || "",
        isValid: true,
      },
      to: {
        value: resumeItem.to || "",
        isVaid: true,
      },
    },
    true
  );
  const [isEditing, setIsEditing] = useState(resumeItem.isNew);

  const handleSubmit = (event) => {
    event.preventDefault();

    const updatedResumeItem = {
      company: formState.inputs.company.value,
      schoolName: formState.inputs.schoolName.value,
      role: formState.inputs.role.value,
      location: formState.inputs.location.value,
      jobTitle: formState.inputs.jobTitle.value,
      from: formState.inputs.from.value,
      to: formState.inputs.to.value,
      _id: resumeItem._id,
    };

    const newResume = auth.user?.resume?.map((item) =>
      item._id === resumeItem._id ? updatedResumeItem : item
    );
    console.log(newResume);
    onUpdate(newResume);

    if (resumeItem.isNew) {
      setFormData(
        {
          company: {
            value: resumeItem.company || "",
            isValid: true,
          },
          schoolName: {
            value: resumeItem.schoolName || "",
            isValid: true,
          },
          role: {
            value: resumeItem.role || "",
            isValid: true,
          },
          location: {
            value: resumeItem.location || "",
            isValid: true,
          },
          jobTitle: {
            value: resumeItem.jobTitle || "",
            isvalid: true,
          },
          from: {
            value: resumeItem.from || "",
            isValid: true,
          },
          to: {
            value: resumeItem.to || "",
            isVaid: true,
          },
        },
        false
      );
      setIsEditing(false);
    }
  };

  const clearResumeHandler = (cancel) => {
    if (cancel) {
      onCancel(resumeItem);
      if (resumeItem.isNew) {
        setIsEditing(false);
      }
    }
  };

  const hasResumeToDelete = !!auth.user?.resume?.find(
    (res) => res._id === resumeItem._id
  );

  return (
    <Card sx={{ padding: "1rem 1rem" }}>
      {!isEditing && (
        <>
          <Grid key={resumeItem?._id}>
            <Typography>{resumeItem?.company}</Typography>
            <Typography>{resumeItem?.schoolName}</Typography>
            <Typography>{resumeItem?.role}</Typography>
            <Typography>{resumeItem?.location}</Typography>
            <Typography>{resumeItem?.from}</Typography>
            <Typography>{resumeItem?.to}</Typography>
          </Grid>
          <Stack direction="row" spacing={2}>
            <Button
              onClick={() => setIsEditing((prev) => !prev)}
              variant="contained"
            >
              Edit
            </Button>
            {resumeItem.isNew && (
              <Button onClick={() => clearResumeHandler(resumeItem)}>
                Clear Item
              </Button>
            )}
            {hasResumeToDelete && (
              <Button
                onClick={() => onDelete(resumeItem)}
                variant="outlined"
                color="warning"
              >
                Delete
              </Button>
            )}
          </Stack>
        </>
      )}
      {isEditing && (
        <form onSubmit={handleSubmit}>
          <TextField
            sx={{ margin: "0 0 0.5rem 0" }}
            fullWidth
            name="jobTitle"
            label="Job Title"
            value={formState.inputs.jobTitle.value}
            onChange={(event) =>
              inputHandler(
                "jobTitle",
                event.target.value,
                event.target.value !== ""
              )
            }
          />
          <Grid
            container
            alignItems="center"
            direction="row"
            sx={{ margin: "0 0 0.5rem 0" }}
          >
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="schoolName"
                label="School Name"
                value={formState.inputs.schoolName.value}
                onChange={(event) =>
                  inputHandler(
                    "schoolName",
                    event.target.value,
                    event.target.value !== ""
                  )
                }
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <TextField
                name="company"
                label="Company"
                value={formState.inputs.company.value}
                onChange={(event) =>
                  inputHandler(
                    "company",
                    event.target.value,
                    event.target.value !== ""
                  )
                }
              />
            </Grid>
          </Grid>
          <FormControl sx={{ width: 200, margin: "0 0.5rem 0.5rem 0" }}>
            <InputLabel id="location-select">Location</InputLabel>
            <Select
              labelId="location"
              id="location"
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

          <TextField
            sx={{ margin: "0 0.5rem 0 0" }}
            name="from"
            label="From"
            value={formState.inputs.from.value}
            onChange={(event) =>
              inputHandler(
                "from",
                event.target.value,
                event.target.value !== ""
              )
            }
          />
          <TextField
            name="to"
            label="To"
            value={formState.inputs.to.value}
            onChange={(event) =>
              inputHandler("to", event.target.value, event.target.value !== "")
            }
          />
          <TextField
            sx={{ margin: "0.5rem 0" }}
            fullWidth
            multiline={true}
            rows={4}
            helperText="describe your role at this job"
            name="role"
            label="Role"
            value={formState.inputs.role.value}
            onChange={(event) =>
              inputHandler(
                "role",
                event.target.value,
                event.target.value !== ""
              )
            }
          />
          <Stack direction="row" spacing={2}>
            <Button variant="contained" type="submit">
              Save
            </Button>
            {!resumeItem.isNew && (
              <Button
                onClick={() => setIsEditing((prev) => !prev)}
                variant="outlined"
              >
                Cancel
              </Button>
            )}
            {resumeItem.isNew && (
              <Button
                onClick={() => clearResumeHandler(resumeItem)}
                variant="outlined"
              >
                Cancel
              </Button>
            )}

            {hasResumeToDelete && (
              <Button
                onClick={() => onDelete(resumeItem)}
                variant="outlined"
                color="warning"
              >
                Delete
              </Button>
            )}
          </Stack>
        </form>
      )}
    </Card>
  );
};

export default UpdateResumeItem;
