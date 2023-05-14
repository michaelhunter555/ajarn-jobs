import React, { useContext, useEffect } from "react";

import { useParams } from "react-router-dom";

import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import { AuthContext } from "../../shared/context/auth-context";
import { useForm } from "../../shared/hooks/form-hook";
import { useJob } from "../../shared/hooks/jobs-hook";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";

//import JobUpdateForm from "../components/JobUpdateForm";

const updateJobStyles = {
  "job-form": {
    listStyle: "none",
    margin: "6rem auto",
    padding: "1rem",
    width: "90%",
    maxWidth: "40rem",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.26)",
    borderRadius: "6px",
    background: "white",
  },
};

const UpdateJob = () => {
  const auth = useContext(AuthContext);
  const { user } = auth;
  const jobId = useParams().jid;
  const { jobs, getJobsByUserId, updateJobById, isLoading } = useJob();

  useEffect(() => {
    getJobsByUserId(user?._id);
  }, [getJobsByUserId, user]);

  const identifiedJob = jobs.find((j) => j._id === jobId);

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      location: {
        value: "",
        isValid: false,
      },
      requirements: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      hours: {
        value: "",
        isValid: false,
      },
      workPermit: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    if (identifiedJob) {
      setFormData(
        {
          title: {
            value: identifiedJob.title,
            isValid: true,
          },
          jobType: {
            value: identifiedJob.jobType,
            isValid: true,
          },
          location: {
            value: identifiedJob.location,
            isValid: true,
          },
          salary: {
            value: identifiedJob.salary,
            isVaid: true,
          },
          requirements: {
            value: identifiedJob.requirements,
            isValid: true,
          },
          description: {
            value: identifiedJob.description,
            isValid: true,
          },
          hours: {
            value: identifiedJob.hours,
            isValid: true,
          },
          workPermit: {
            value: identifiedJob.workPermit,
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
      jobType: formState.inputs.jobType.value,
      location: formState.inputs.location.value,
      salary: formState.inputs.salary.value,
      requirements: formState.inputs.requirements.value,
      hours: formState.inputs.hours.value,
      description: formState.inputs.description.value,
      workPermit: formState.inputs.workPermit.value,
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
      <form
        style={{ ...updateJobStyles["job-form"] }}
        onSubmit={jobUpdateHandler}
      >
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="please enter a valid title"
          onInput={inputHandler}
          initialValue={formState.inputs.title.value}
          initialValid={formState.inputs.title.isValid}
        />
        <Input
          id="location"
          element="input"
          type="text"
          label="Location"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="please enter a valid location"
          onInput={inputHandler}
          initialValue={formState.inputs.location.value}
          initialValid={formState.inputs.location.isValid}
        />
        <Input
          id="requirements"
          element="input"
          type="text"
          label="Requirements"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="please enter a valid requirements"
          onInput={inputHandler}
          initialValue={formState.inputs.requirements.value}
          initialValid={formState.inputs.requirements.isValid}
        />
        <Input
          id="hours"
          element="input"
          type="text"
          label="Hours"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="please enter a valid hours"
          onInput={inputHandler}
          initialValue={formState.inputs.hours.value}
          initialValid={formState.inputs.hours.isValid}
        />

        <Input
          id="description"
          element="textarea"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(7)]}
          errorText="please enter a valid description of min 7 characters"
          onInput={inputHandler}
          initialValue={formState.inputs.description.value}
          initialValid={formState.inputs.description.isValid}
        />
        <Button type="submit" disabled={!formState.isValid}>
          Update Job
        </Button>
      </form>
    </>
  );
};

export default UpdateJob;
