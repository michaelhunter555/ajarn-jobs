import React, { useContext, useEffect, useState } from "react";

import DOMPurify from "dompurify";
import { ContentState, convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import { Editor } from "react-draft-wysiwyg";
import { useParams } from "react-router-dom";

import {
  Alert,
  Box,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
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

const styledRichJobUpdateJobText = {
  height: "auto",
  padding: " 0 20px",
  borderRadius: "0 0 8px 8px",
  border: "2px solid #dbdbdb",
  boxSizing: "border-box",
  marginBottom: "1rem",
};

const UpdateJob = () => {
  const auth = useContext(AuthContext);
  const { user } = auth;
  const jobId = useParams().jid;
  const { jobs, getJobsByUserId, updateJobById, isLoading, isPostLoading } =
    useJob();
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
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    if (identifiedJob?.description) {
      const htmlBlocks = htmlToDraft(identifiedJob?.description);
      const { contentBlocks, entityMap } = htmlBlocks;
      const contentState = ContentState.createFromBlockArray(
        contentBlocks,
        entityMap
      );
      const newEditorState = EditorState.createWithContent(contentState);
      setEditorState(newEditorState);
    }
  }, [identifiedJob]);

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
    const content = editorState.getCurrentContent();
    const rawContent = convertToRaw(content);
    const postData = draftToHtml(rawContent);
    const sanitizedDescription = DOMPurify.sanitize(postData);

    const updatedJob = {
      title: formState.inputs.title.value,
      description: sanitizedDescription,
    };

    try {
      updateJobById(jobId, updatedJob);
    } catch (err) {
      console.log("error in updateJob component", err);
    }
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  const handleEditorChange = (editorContent) => {
    setEditorState(editorContent);
    const content = editorContent.getCurrentContent();
    const rawContent = convertToRaw(content);
    const postData = draftToHtml(rawContent);

    inputHandler("description", postData, postData.length >= 5);
  };

  console.log("updateJob formState", formState);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: 100,
          flexDirection: "column",
          gap: "15px",
        }}
      >
        <Grid>
          <Typography variant="h6" color="text.secondary">
            At this current time, only the title & description can be updated.
          </Typography>
        </Grid>
        <Grid
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            maxWidth: "50%",
          }}
        >
          <Typography variant="subtitle2" color="text.secondary">
            If there were any errors regarding, location, salary or work-Permit.
            You must delete your current job and create a new one.
          </Typography>
          <Alert severity="info">
            Please copy and paste your current description before updating to
            avoid format issues.
          </Alert>
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
        <Box sx={{ width: "100%", ...styledRichJobUpdateJobText }}>
          <Editor
            id="description"
            editorState={editorState}
            onEditorStateChange={handleEditorChange}
          />
        </Box>

        {!isPostLoading && (
          <Button type="submit" disabled={!formState.isValid}>
            Update Job
          </Button>
        )}
        {isPostLoading && <CircularProgress />}
      </UpdateJobStylesForm>
    </>
  );
};

export default UpdateJob;
