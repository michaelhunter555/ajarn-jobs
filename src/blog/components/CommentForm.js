import React, { useContext } from "react";

import { Editor } from "react-draft-wysiwyg";

import { Box, Button, CircularProgress, Paper, Stack } from "@mui/material";

import { AuthContext } from "../../shared/context/auth-context";

const styledComments = {
  height: "auto",
  padding: " 0 20px",
  borderRadius: "0 0 8px 8px",
  border: "2px solid #dbdbdb",
  boxSizing: "border-box",
};

const CommentForm = ({
  postComment,
  editorState,
  editorChange,
  formStateIsValid,
  addCommentIsLoading,
}) => {
  const auth = useContext(AuthContext);

  return (
    <>
      {/**WYSIWYG EDITOR*/}
      <Paper
        elevation={0}
        sx={{
          padding: 2,
          display: "flex",
          flexDirection: "column",
          gap: "3px",
        }}
      >
        <Box
          sx={{
            width: "100%",
            ...styledComments,
          }}
        >
          <Editor
            id="postComment"
            editorState={editorState}
            onEditorStateChange={editorChange}
          />
          <Stack direction="row" justifyContent="flex-end">
            <Button
              variant="contained"
              sx={{ borderRadius: "20px", marginBottom: "0.5rem" }}
              disabled={!auth.isLoggedIn || !formStateIsValid}
              onClick={postComment}
            >
              {!auth.isLoggedIn && "Login"}
              {auth.isLoggedIn && !addCommentIsLoading && "Comment"}
              {auth.isLoggedIn && addCommentIsLoading && (
                <CircularProgress size="12px" />
              )}
            </Button>
          </Stack>
        </Box>
      </Paper>
      {/**END OF WYSIWYG EDITOR*/}
    </>
  );
};

export default CommentForm;
