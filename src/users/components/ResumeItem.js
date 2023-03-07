import React from "react";

import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import Card from "../../shared/components/UIElements/Card";
import { useForm } from "../../shared/hooks/form-hook";

const ResumeItem = (props) => {
  const [formState, inputHandler] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      nationality: {
        value: "",
        isvalid: false,
      },
      education: {
        value: "",
        isValid: false,
      },
      qualifications: {
        value: "",
        isValid: false,
      },
      workExperience: {
        value: "",
        isValid: false,
      },
      recommendationsUponRequest: {
        isValid: true,
      },
      additionalSkills: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const saveResumeHandler = () => {
    console.log(formState.inputs);
    props.onSubmit();
  };

  return (
    <Card className="resume-profile__container">
      <form onSubmit={saveResumeHandler}>
        <div className="resume-field">
          <label htmlFor="name">Name</label>
          <Input type="text" id="name" element="input" onInput={inputHandler} />
        </div>
        <div className="resume-field">
          <label htmlFor="nationality">Nationality</label>
          <Input
            type="text"
            id="nationality"
            element="input"
            onInput={inputHandler}
          />
        </div>
        <Button disabled={!formState.isvalid} type="submit">
          Save Resume
        </Button>
      </form>
    </Card>
  );
};

export default ResumeItem;
