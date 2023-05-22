import React, { useContext, useEffect } from "react";

import { useParams } from "react-router-dom";

import { Box, Grid, TextField, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import Button from "../../shared/components/FormElements/Button";
import { AuthContext } from "../../shared/context/auth-context";
import { useForm } from "../../shared/hooks/form-hook";
import { useJob } from "../../shared/hooks/jobs-hook";

const UpdateJobStylesForm = styled("form")({
  listStyle: "none",
  margin: "6rem auto",
  padding: "1rem",
  width: "90%",
  maxWidth: "40rem",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.26)",
  borderRadius: "6px",
  background: "white",
});

const UpdateJob = () => {
  const auth = useContext(AuthContext);
  const { user } = auth;
  const jobId = useParams().jid;
  const { jobs, getJobsByUserId, updateJobById, isLoading } = useJob();
  const identifiedJob = jobs?.find((j) => j?._id === jobId);
  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: identifiedJob?.title || "",
        isValid: true,
      },
      description: {
        value: identifiedJob?.description || "",
        isValid: true,
      },
    },
    true
  );

  useEffect(() => {
    getJobsByUserId(user?._id);
  }, [getJobsByUserId, user]);

  useEffect(() => {
    if (identifiedJob) {
      setFormData(
        {
          title: {
            value: identifiedJob?.title,
            isValid: true,
          },
          description: {
            value: identifiedJob?.description,
            isValid: true,
          },
        },
        true
      );
    }
  }, [setFormData, identifiedJob]);

  const jobUpdateHandler = (event) => {
    event.preventDefault();

    const updatedJob = {
      title: formState.inputs.title.value,
      description: formState.inputs.description.value,
    };
    updateJobById(jobId, updatedJob);
  };

  if (isLoading) {
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: 100,
          flexDirection: "column",
        }}
      >
        <Grid>
          <Typography variant="body1" color="text.secondary">
            At this current time, only the title & description can be updated.
          </Typography>
        </Grid>
        <Grid>
          <Typography variant="subtitle2" color="text.secondary">
            If there were any major errors, please contact us at
            helpdesk@ajarnjobs.com
          </Typography>
        </Grid>
      </Box>
      <UpdateJobStylesForm onSubmit={jobUpdateHandler}>
        <TextField
          sx={{ margin: "1rem auto" }}
          fullWidth
          id="title"
          label="Title"
          defaultValue={identifiedJob?.title}
          onChange={(event) =>
            inputHandler("title", event.target.value, event.target.value !== "")
          }
        />

        <TextField
          sx={{ margin: "1rem auto" }}
          fullWidth
          multiline
          rows={3}
          id="description"
          label="Description"
          defaultValue={identifiedJob?.description}
          onChange={(event) =>
            inputHandler(
              "description",
              event.target.value,
              event.target.value !== ""
            )
          }
        />
        <Button type="submit" disabled={!formState.isValid}>
          Update Job
        </Button>
      </UpdateJobStylesForm>
    </>
  );
};

export default UpdateJob;
