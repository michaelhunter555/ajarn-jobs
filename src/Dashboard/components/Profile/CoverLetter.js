import React, { useCallback, useContext, useState } from "react";

import DOMPurify from "dompurify";
import { ContentState, convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import { Editor } from "react-draft-wysiwyg";
import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from "../../../shared/context/snackbar-context";
import AssistantIcon from '@mui/icons-material/Assistant';

import {
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  CircularProgress,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";

import { AuthContext } from "../../../shared/context/auth-context";
import { useForm } from "../../../shared/hooks/form-hook";
import { useUser } from "../../../shared/hooks/user-hook";

const styledRichCoverLetterText = {
  height: "auto",
  padding: "0 20px",
  borderRadius: "0 0 8px 8px",
  border: "1px solid #bdbdbd",
  boxSizing: "border-box",
  wordBreak: "break-word",
  ".public-DraftStyleDefault-block": {
    height: "auto",
    marginBottom: "1rem",
  },
  ".rdw-editor-main": {
    minHeight: 300,
  },
};

const CoverLetter = () => {
  const auth = useContext(AuthContext);
  const { user, updateUser } = auth;
  const [isEditing, setIsEditing] = useState(user?.coverLetter === "");
  const [isLoading, setIsLoading] = useState(false);
  const { generateCoverLetter } = useUser();
  const { showSnackbar } = useSnackbar();
  let initialEditorState = EditorState.createEmpty();

  if (user?.coverLetter) {
    const htmlBlocks = htmlToDraft(user?.coverLetter);
    const { contentBlocks, entityMap } = htmlBlocks;
    const contentState = ContentState.createFromBlockArray(
      contentBlocks,
      entityMap
    );
    initialEditorState = EditorState.createWithContent(contentState);
  }

  const [editorState, setEditorState] = useState(initialEditorState);
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
            Authorization: "Bearer " + auth.token,
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
      //setEditorState(EditorState.createEmpty());
      setIsLoading(false);
      setIsEditing(false);
    } catch (err) {
      console.log("an error has occured in coverLetter update:" + err);
    }
  }, [user, updateUser, editorState, auth.token]);

  const handleEditorChange = (content) => {
    setEditorState(content);
    const currentContent = content.getCurrentContent();
    const rawContent = convertToRaw(currentContent);
    const postData = rawContent.blocks[0].text;
    inputHandler("coverLetter", postData, postData.length >= 5);
  };

  const mutateGeneratedCoverLetter = useMutation({
    mutationKey: ["generate-cover-letter"],
    mutationFn: async (userId) => await generateCoverLetter(userId),
    onSuccess: (data) => {
      const htmlBlocks = htmlToDraft(data);
      const { contentBlocks, entityMap } = htmlBlocks;
      const contentState = ContentState.createFromBlockArray(
        contentBlocks,
        entityMap
      );
      const newEditorState = EditorState.createWithContent(contentState);
      const rawContent = convertToRaw(contentState);
      const postData = rawContent.blocks[0]?.text || "";
      inputHandler("coverLetter", postData, postData.length >= 5);
      setEditorState(newEditorState);
      showSnackbar({
        message: "Cover letter generated successfully",
        severity: "success",
      });
    },
    onError: (error) => {
      console.log("Error with the request: " + error);
      showSnackbar({
        message: "Error with the request: " + error,
        severity: "error",
      });
    },
  });

  const handleGenerateCoverLetter = async() => {
    await mutateGeneratedCoverLetter.mutateAsync(auth.user?._id);
  };

  return (
    <>
      {isLoading && <Skeleton sx={{ width: "100%", height: 382 }} />}
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
                direction="column"
                spacing={2}
              >
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
              
                <Grid item sx={{ margin: "1rem auto", width: "100%" }}>
                  <Typography
                    color="text.secondary"
                    variant="h5"
                    component="h2"
                  >
                    Cover Letter:
                  </Typography>
                  {auth.user?.coverLetter ? (
                    <Typography
                      component="div"
                      sx={{
                        border: "1px solid #bdbdbd",
                        padding: "2rem",
                        borderRadius: "15px",
                        width: "100%",
                        minHeight: "200px",
                      }}
                      variant="body1"
                      color="text.secondary"
                      dangerouslySetInnerHTML={{ __html: auth.user?.coverLetter }}
                    />
                  ) : (
                    <Box
                      sx={{
                        border: "1px solid #bdbdbd",
                        padding: "2rem",
                        borderRadius: "15px",
                        width: "100%",
                        minHeight: "200px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#f5f5f5",
                      }}
                    >
                      <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ fontStyle: "italic" }}
                      >
                        No Cover Letter! Add one!
                      </Typography>
                    </Box>
                  )}
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
            <Stack direction="row" spacing={2}>
              {mutateGeneratedCoverLetter.isLoading ? (
                <CircularProgress size={16} />
              ) : (
                <Button 
                  startIcon={<AssistantIcon />} 
                  variant="outlined" 
                  onClick={handleGenerateCoverLetter}>Generate Cover Letter</Button>
              )}
                </Stack>
          <Grid item xs={12}>
            <Stack justifyContent="center" alignItems="center">
              <Grid>
                <Typography variant="body1" component="h2">
                  {auth.user?.name}
                </Typography>
              </Grid>
            </Stack>
            <Divider sx={{ margin: "1rem" }} />
            <Grid container direction="column" spacing={2}>
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
              <Grid item>
                <Typography color="text.secondary" variant="h5" component="h2">
                  Cover Letter:
                </Typography>

                <Box sx={{ ...styledRichCoverLetterText, width: "100%" }}>
                  <Editor
                    editorState={editorState}
                    onEditorStateChange={handleEditorChange}
                    toolbar={{
                      options: ["inline", "blockType", "fontSize", "list"],
                    }}
                  />
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Stack
            direction="row"
            justifyContent={"flex-end"}
            spacing={2}
            sx={{ margin: "0.5rem" }}
          >
            <Button color="error" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button
              variant="outlined"
              disabled={!formState.isValid}
              onClick={updateCoverLetterHandler}
            >
              {auth.user?.coverLetter ? "Update" : "Save"}
            </Button>
          </Stack>
        </Grid>
      )}
    </>
  );
};

export default CoverLetter;
