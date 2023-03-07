import React from "react";

import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";

const JobUpdateForm = ({ formState, inputHandler, onSubmit }) => {
  return (
    <form className="job-update-form" onSubmit={onSubmit}>
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
      <Button type="submit" disabale={!formState.isValid}>
        Update Job
      </Button>
    </form>
  );
};

export default JobUpdateForm;
