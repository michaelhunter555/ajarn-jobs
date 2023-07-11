import React, { useCallback, useContext, useState } from "react";

import DOMPurify from "dompurify";
import { convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { Editor } from "react-draft-wysiwyg";

import {
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";

import { AuthContext } from "../../../shared/context/auth-context";
import { useForm } from "../../../shared/hooks/form-hook";

const styledRichCoverLetterText = {
  height: "auto",
  padding: " 0 20px",
  borderRadius: "0 0 8px 8px",
  border: "1px solid #eee",
  boxSizing: "border-box",
};

const CoverLetter = () => {
  const auth = useContext(AuthContext);
  const { user, updateUser } = auth;
  const [isEditing, setIsEditing] = useState(user?.coverLetter === "");
  const [isLoading, setIsLoading] = useState(false);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [formState, inputHandler] = useForm(
    {
      coverLetter: {
        value: user.coverLetter || "",
        isValid: false,
      },
    },
    false
  );

  const updateCoverLetterHandler = useCallback(async () => {
    const contentState = editorState.getCurrentContent();
    const rawContent = convertToRaw(contentState);
    const postData = draftToHtml(rawContent);
    const sanitizedPostData = DOMPurify.sanitize(postData);

    try {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_USERS}/update-profile/${user?._id}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            coverLetter: sanitizedPostData,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("There was an issue with the request");
      }

      const responseData = await response.json();

      const updatedCoverLetter = {
        ...user,
        coverLetter: responseData.user.coverLetter,
      };

      updateUser(updatedCoverLetter);
      setEditorState(EditorState.createEmpty());
      setIsLoading(false);
      setIsEditing(false);
    } catch (err) {
      console.log("an error has occured in coverLetter update:" + err);
    }
  }, [user, updateUser, editorState]);

  const handleEditorChange = (content) => {
    setEditorState(content);
    const currentContent = editorState.getCurrentContent();
    const rawContent = convertToRaw(currentContent);
    const postData = rawContent.blocks[0].text;
    inputHandler("coverLetter", postData, postData.length >= 5);
  };

  console.log(formState);

  return (
    <>
      {isLoading && <Skeleton sx={{ width: 753, height: 382 }} />}
      {!isLoading && !isEditing && (
        <>
          <Grid
            component={Paper}
            container
            direction="column"
            sx={{ padding: "1rem" }}
          >
            <Grid item xs={12}>
              <Stack justifyContent="center" alignItems="center">
                <Grid>
                  <Typography variant="body1" component="h2">
                    {auth.user?.name}
                  </Typography>
                </Grid>
              </Stack>
              <Divider sx={{ margin: "1rem" }} />
              <Grid
                container
                justifyContent="center"
                direction="row"
                spacing={2}
              >
                <Stack
                  justifyContent="center"
                  alignItem="center"
                  direction="row"
                  spacing={2}
                >
                  <Typography color="text.secondary" variant="subtitle2">
                    {auth.user?.name}
                  </Typography>
                  <Divider orientation="vertical" flexItem />
                  <Typography color="text.secondary" variant="subtitle2">
                    {auth.user?.location}
                  </Typography>
                  <Divider orientation="vertical" flexItem />
                  <Typography color="text.secondary" variant="subtitle2">
                    {auth.user?.email}
                  </Typography>
                </Stack>
                <Grid item sx={{ margin: "1rem auto" }}>
                  <Typography
                    color="text.secondary"
                    variant="h5"
                    component="h2"
                  >
                    Cover Letter:
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    dangerouslySetInnerHTML={{ __html: auth.user?.coverLetter }}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Stack direction="row">
              <Button onClick={() => setIsEditing(true)}>
                {auth.user?.coverLetter ? "Edit" : "Add cover letter"}
              </Button>
            </Stack>
          </Grid>
        </>
      )}
      {!isLoading && isEditing && (
        <Grid
          component={Paper}
          container
          direction="column"
          sx={{ padding: "1rem" }}
        >
          <Grid item sx={12}>
            <Stack justifyContent="center" alignItems="center">
              <Grid>
                <Typography variant="body1" component="h2">
                  {auth.user?.name}
                </Typography>
              </Grid>
            </Stack>
            <Divider sx={{ margin: "1rem" }} />
            <Grid direction="row" spacing={2}>
              <Stack justifyContent="center" direction="row" spacing={2}>
                <Typography color="text.secondary" variant="subtitle2">
                  {auth.user?.name}
                </Typography>
                <Divider orientation="vertical" flexItem />
                <Typography color="text.secondary" variant="subtitle2">
                  {auth.user?.location}
                </Typography>
                <Divider orientation="vertical" flexItem />
                <Typography color="text.secondary" variant="subtitle2">
                  {auth.user?.email}
                </Typography>
              </Stack>
              <Grid item sx={{ margin: "1rem auto" }}>
                <Typography color="text.secondary" variant="h5" component="h2">
                  Cover Letter:
                </Typography>
                {/* <TextField
                  helperText="Write a compelling cover letter for employers to view"
                  multiline={true}
                  fullWidth
                  rows={5}
                  id="coverLetter"
                  defaultValue={formState.inputs.coverLetter.value}
                  onChange={(event) =>
                    inputHandler(
                      "coverLetter",
                      event.target.value,
                      event.target.value !== ""
                    )
                  }
                /> */}
                <Box sx={{ ...styledRichCoverLetterText, width: "100%" }}>
                  <Editor
                    editorState={editorState}
                    onEditorStateChange={handleEditorChange}
                  />
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Stack direction="row">
            <Button
              disabled={!formState.isValid}
              onClick={updateCoverLetterHandler}
            >
              {auth.user?.coverLetter ? "Update" : "Save"}
            </Button>
            <Button onClick={() => setIsEditing(false)}>Cancel</Button>
          </Stack>
        </Grid>
      )}
    </>
  );
};

export default CoverLetter;
