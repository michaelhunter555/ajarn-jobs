import React from 'react';

import {
  Card,
  TextField,
} from '@mui/material';

import { useForm } from '../../../shared/hooks/form-hook';

const UpdateResumeItem = ({ resumeItem, onUpdate }) => {
  const [formState, inputHandler] = useForm(
    {
      company: {
        value: resumeItem.company,
        isValid: true,
      },
      schoolName: {
        value: resumeItem.schoolName,
        isValid: true,
      },
      role: {
        value: resumeItem.role,
        isValid: true,
      },
      location: {
        value: resumeItem.location,
        isValid: true,
      },
      jobTitle: {
        value: resumeItem.jobTitle,
        isvalid: true,
      },
      from: {
        value: resumeItem.from,
        isValid: true,
      },
      to: {
        value: resumeItem.to,
        isVaid: true,
      },
    },
    true
  );

  const handleSubmit = (event) => {
    event.preventDefault();

    const updatedResumeItem = {
      resumeId: resumeItem.resumeId,
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

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <TextField
          name="company"
          label="Company"
          defaultValue={resumeItem.company}
          onChange={(event) =>
            inputHandler(
              "company",
              event.target.value,
              event.target.value !== ""
            )
          }
        />
        <TextField
          name="schoolName"
          label="School Name"
          defaultValue={resumeItem.schoolName}
          onChange={(event) =>
            inputHandler(
              "schoolName",
              event.target.value,
              event.target.value !== ""
            )
          }
        />
        <TextField
          name="role"
          label="Role"
          defaultValue={resumeItem.role}
          onChange={(event) =>
            inputHandler("role", event.target.value, event.target.value !== "")
          }
        />
        <TextField
          name="location"
          label="Location"
          defaultValue={resumeItem.location}
          onChange={(event) =>
            inputHandler(
              "location",
              event.target.value,
              event.target.value !== ""
            )
          }
        />
        <TextField
          name="jobTitle"
          label="Job Title"
          defaultValue={resumeItem.jobTitle}
          onChange={(event) =>
            inputHandler(
              "jobTitle",
              event.target.value,
              event.target.value !== ""
            )
          }
        />
        <TextField
          name="from"
          label="From"
          defaultValue={resumeItem.from}
          onChange={(event) =>
            inputHandler("from", event.target.value, event.target.value !== "")
          }
        />
        <TextField
          name="to"
          label="To"
          defaultValue={resumeItem.to}
          onChange={(event) =>
            inputHandler("to", event.target.value, event.target.value !== "")
          }
        />
        <button type="submit">Save</button>
      </form>
    </Card>
  );
};

export default UpdateResumeItem;
