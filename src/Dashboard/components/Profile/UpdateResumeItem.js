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
} from "@mui/material";

import { AuthContext } from "../../../shared/context/auth-context";
import { useForm } from "../../../shared/hooks/form-hook";
import { thaiCities } from "../../../shared/util/ThaiData";

const UpdateResumeItem = ({ resumeItem, onUpdate, onDelete, onCancel }) => {
  const auth = useContext(AuthContext);
  const [formState, inputHandler] = useForm(
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
  const [cancelForm, setCancelForm] = useState(false);

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
    };
    onUpdate(updatedResumeItem);
  };

  const resumeEditHandler = (cancel) => {
    setCancelForm((prev) => !prev);
    if (cancel) {
      onCancel(resumeItem);
    }
  };

  const hasResumeToDelete = auth.user?.resume.length >= 1;

  return (
    <Card sx={{ padding: "1rem 1rem" }}>
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
            inputHandler("from", event.target.value, event.target.value !== "")
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
            inputHandler("role", event.target.value, event.target.value !== "")
          }
        />
        <Stack direction="row" spacing={2}>
          <Button variant="contained" type="submit">
            Save
          </Button>
          <Button variant="outlined" onClick={() => resumeEditHandler(true)}>
            Cancel
          </Button>

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
    </Card>
  );
};

export default UpdateResumeItem;
