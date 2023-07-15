import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "draft-js/dist/Draft.css";

import React, { useContext, useEffect, useState } from "react";

import DOMPurify from "dompurify";
import { convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { Editor } from "react-draft-wysiwyg";

import {
  Box,
  FormLabel,
  Grid,
  Modal,
  Paper,
  Skeleton,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import CustomModal from "../../shared/components/UIElements/CustomModal";
//import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../../shared/context/auth-context";
import { useForm } from "../../shared/hooks/form-hook";
import { useJob } from "../../shared/hooks/jobs-hook";
import {
  coreJobRequirements,
  fullTimeSalaries,
  partTimeSalaries,
  thaiCities,
} from "../../shared/util/ThaiData";
import { VALIDATOR_REQUIRE } from "../../shared/util/validators";

const styledRichJobText = {
  height: "auto",
  padding: " 0 20px",
  borderRadius: "0 0 8px 8px",
  border: "2px solid #dbdbdb",
  boxSizing: "border-box",
  ".public-DraftStyleDefault-block": {
    height: "5rem",
  },
};

const StyledForm = styled("form")({
  listStyle: "none",
  margin: "1rem auto",
  padding: "0.5rem",
  width: "90%",
  maxWidth: "40rem",
  borderRadius: "6px",
  background: "white",
});

const BoxContent = styled(Paper)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  padding: 20,
  textAlign: "center",
});

const NewJob = () => {
  const auth = useContext(AuthContext);
  const [isFullTime, setIsFullTime] = useState(true);
  const [jobIsBasic, setJobIsBasic] = useState(true);
  const [jobCost, setJobCost] = useState(5);
  const [success, setSuccess] = useState(false);

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const [workPermitOffered, setWorkPermitOffered] = useState(true);
  const { addJobByUserId, isPostLoading, error, clearError } = useJob();
  //our onInput props(1,2,3) takes 3 arguments(Refer to Input.js). these values will be used to locate the id, value and validate.
  // important! Avoid infinite loop! useCallback() with dependencies!
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      jobType: {
        value: "basic",
        isValid: true,
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
      workPermit: {
        value: workPermitOffered,
        isValid: true,
      },
    },
    false
  );

  //Update salary ranges based on job hours
  useEffect(() => {
    if (isFullTime) {
      inputHandler("salary", fullTimeSalaries[0], true);
    } else {
      inputHandler("salary", partTimeSalaries[0], true);
    }
  }, [isFullTime, inputHandler]);

  //update hours for fullTime
  const jobIsFullTimeHandler = () => {
    setIsFullTime(true);
    inputHandler("hours", "Full-time", true);
  };

  //update hours for partTime
  const jobIsPartTimeHandler = () => {
    setIsFullTime(false);
    inputHandler("hours", "Part-time", true);
  };

  const basicJobTypeHandler = () => {
    setJobIsBasic(true);
    if (jobCost > 5) {
      setJobCost(5);
    }
    inputHandler("jobType", "basic", true);
  };

  const featuredJobTypeHandler = () => {
    setJobIsBasic(false);
    setJobCost((prev) => prev + 2);
    inputHandler("jobType", "featured", true);
  };

  const workPermitHandler = (event) => {
    const workPermitValue = event.target.value === "true";
    setWorkPermitOffered(workPermitValue);
    inputHandler("workPermit", workPermitValue, true);
  };

  const jobSubmitHandler = async (event) => {
    event.preventDefault();

    const contentState = editorState.getCurrentContent();
    const rawContent = convertToRaw(contentState);
    const postData = draftToHtml(rawContent);

    const sanitizedJobPostData = DOMPurify.sanitize(postData);

    //new job data expected fields
    const newJob = {
      title: formState.inputs.title.value,
      jobType: formState.inputs.jobType.value,
      location: formState.inputs.location.value,
      salary: formState.inputs.salary.value,
      requirements: formState.inputs.requirements.value,
      hours: formState.inputs.hours.value,
      description: sanitizedJobPostData,
      workPermit: formState.inputs.workPermit.value,
    };
    //pass userId & object as argument to POST request
    console.log(newJob);

    if (newJob.jobType === "featured") {
      setJobCost((prev) => prev + 2);
    }

    try {
      await addJobByUserId(auth.user?._id, newJob, jobCost);
      if (!error) {
        setSuccess(true);
        setEditorState(Editor.createEmpty());
      }
    } catch (err) {
      console.log(err);
    }
  };

  const clearModalHandler = () => {
    setSuccess(false);
  };

  //make sure inputs are valid
  const handleEditorChange = (newEditorState) => {
    setEditorState(newEditorState);
    const contentState = newEditorState.getCurrentContent();
    const rawContent = convertToRaw(contentState);
    const postData = rawContent.blocks[0].text;
    inputHandler("description", postData, postData.length >= 7);
  };

  console.log(formState);

  return (
    <>
      {isPostLoading && (
        <Skeleton sx={{ height: 500, width: 788 }} variant="rectangular" />
      )}
      <Modal
        open={success}
        onClose={clearModalHandler}
        aria-labelledby="job-succes-title"
        aria-describedby="job-succes-description"
      >
        <BoxContent>
          <Typography variant="subtitle1" id="job-success-title">
            You have successfully created a job!
          </Typography>
          <Typography
            color="text.secondary"
            variant="subtitle2"
            id="job-success-description"
          >
            Your job is live and users can apply. View your current list of jobs
            in Job Listings.
          </Typography>
        </BoxContent>
      </Modal>
      <CustomModal error={error} handleClose={clearError} />
      {!isPostLoading && (
        <StyledForm onSubmit={jobSubmitHandler} sx={{ marginBottom: 1 }}>
          <Grid container direction="row">
            Total: {jobCost}
            <Grid item xs={12}>
              <FormLabel>Hours:</FormLabel>
              <input
                id="hours-fullTime"
                type="radio"
                name="hours"
                value="Full-time"
                checked={isFullTime}
                onChange={jobIsFullTimeHandler}
              />{" "}
              Full-Time
              <input
                id="hours-partTime"
                type="radio"
                name="hours"
                value="Part-time"
                checked={!isFullTime}
                onChange={jobIsPartTimeHandler}
              />{" "}
              Part-Time
            </Grid>
            <Grid item xs={12} sx={{ margin: "0.5rem 0" }}>
              <FormLabel>Job Type:</FormLabel>
              <input
                id="basic"
                type="radio"
                name="jobType"
                value="basic"
                checked={jobIsBasic}
                onChange={basicJobTypeHandler}
              />{" "}
              Basic (default)
              <input
                id="featured"
                type="radio"
                name="jobType"
                value="featured"
                checked={!jobIsBasic}
                onChange={featuredJobTypeHandler}
              />{" "}
              Featured (+2 credits)
            </Grid>
            <Grid item xs={12}>
              <FormLabel>Work Permit</FormLabel>
              <input
                id="workPermit"
                type="radio"
                name="workPermit"
                value={true}
                checked={workPermitOffered}
                onChange={workPermitHandler}
              />{" "}
              Yes
              <input
                id="workPermit"
                type="radio"
                name="workPermit"
                value={false}
                checked={!workPermitOffered}
                onChange={workPermitHandler}
              />{" "}
              No
            </Grid>
            <Grid item xs={12}>
              <Input
                id="title"
                element="input"
                type="text"
                label="Title"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="please enter a valid title"
                onInput={inputHandler}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={5}>
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
            </Grid>
            <Grid item xs={12} sm={6} md={7}>
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
            </Grid>
            <Grid item>
              <Input
                id="requirements"
                element="checkbox"
                max={2}
                type="checkbox"
                label="Requirements (select Max 2)"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="please enter a valid requirement"
                onInput={inputHandler}
                options={coreJobRequirements}
              />
            </Grid>
            <Grid item xs={12} sx={{ margin: "0 0 1rem 0 " }}>
              <Box sx={{ ...styledRichJobText, width: "100%" }}>
                <Editor
                  id="description"
                  editorState={editorState}
                  onEditorStateChange={handleEditorChange}
                  toolbar={{
                    options: ["inline", "blockType", "fontSize", "list"],
                  }}
                />
              </Box>
            </Grid>
          </Grid>
          <Button type="submit" disabled={!formState.isValid}>
            Add Job
          </Button>
        </StyledForm>
      )}
    </>
  );
};

export default NewJob;
