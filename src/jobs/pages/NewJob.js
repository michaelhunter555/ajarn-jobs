import React, { useEffect, useState } from "react";

//import { useNavigate } from 'react-router-dom';
import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import { useForm } from "../../shared/hooks/form-hook";
//import { AuthContext } from '../../shared/context/auth-context';
import {
  fullTimeSalaries,
  partTimeSalaries,
  thaiCities,
} from "../../shared/util/ThaiData";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";

const newJobstyles = {
  newJobForm: {
    listStyle: "none",
    margin: "6rem auto",
    padding: "1rem",
    width: "90%",
    maxWidth: "40rem",
    boxShadow: " 0 2px 8px rgba(0, 0, 0, 0.26)",
    borderRadius: "6px",
    background: "white",
  },
};

const NewJob = () => {
  //our onInput props(1,2,3) takes 3 arguments(Refer to Input.js). these values will be used to locate the id, value and validate.
  // important! Avoid infinite loop! useCallback() with dependencies!
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      location: {
        value: "",
        isValid: false,
      },
      salary: {
        value: fullTimeSalaries[0],
        isValid: true,
      },
      requirements: {
        value: "",
        isValid: false,
      },
      hours: {
        value: "Full-time",
        isValid: true,
      },

      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  const [isFullTime, setIsFullTime] = useState(true);

  useEffect(() => {
    if (isFullTime) {
      inputHandler("salary", fullTimeSalaries[0], true);
    } else {
      inputHandler("salary", partTimeSalaries[0], true);
    }
  }, [isFullTime, inputHandler]);

  const jobIsFullTimeHandler = () => {
    setIsFullTime(true);
    inputHandler("hours", "Full-time", true);
  };

  const jobIsPartTimeHandler = () => {
    setIsFullTime(false);
    inputHandler("hours", "Part-time", true);
  };

  const jobSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  return (
    <form style={{ ...newJobstyles.newJobForm }} onSubmit={jobSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="please enter a valid title"
        onInput={inputHandler}
      />
      <input
        id="hours-fullTime"
        type="radio"
        name="jobType"
        value="Full-time"
        checked={isFullTime}
        onChange={jobIsFullTimeHandler}
      />{" "}
      Full-Time
      <input
        id="hours-partTime"
        type="radio"
        name="jobType"
        value="Part-time"
        checked={!isFullTime}
        onChange={jobIsPartTimeHandler}
      />{" "}
      Part-Time
      <Input
        id="salary"
        element="select"
        type="number"
        label="Salary"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="please select a valid salary"
        onInput={inputHandler}
        options={isFullTime ? fullTimeSalaries : partTimeSalaries}
      />
      <Input
        id="location"
        element="select"
        label="Location"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="please enter a valid location"
        onInput={inputHandler}
        options={thaiCities}
        selectType="location"
      />
      <Input
        id="requirements"
        element="input"
        type="text"
        label="Requirements"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="please enter a valid requirements"
        onInput={inputHandler}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(7)]}
        errorText="please enter a valid description of min 7 characters"
        onInput={inputHandler}
        type="text"
      />
      <Button type="submit" disabled={!formState.isValid}>
        Add Job
      </Button>
    </form>
  );
};

export default NewJob;
