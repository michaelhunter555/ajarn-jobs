import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "draft-js/dist/Draft.css";

import React, { useCallback, useContext, useState } from "react";

import DOMPurify from "dompurify";
import { ContentState, convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import { Editor } from "react-draft-wysiwyg";

//import { useContent } from "../../../shared/hooks/content-hook";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import { AuthContext } from "../../../shared/context/auth-context";
import { useForm } from "../../../shared/hooks/form-hook";
import { blogCategories } from "../../../shared/util/ThaiData";

const StyledPost = styled(Box)({
  minHeight: 200,
  height: "auto",
  marginBottom: "1rem",
  padding: " 0 20px",
  borderRadius: "0 0 8px 8px",
  border: "2px solid #dbdbdb",
  boxSizing: "border-box",
  ".public-DraftStyleDefault-block": {
    height: "2rem",
  },
});

const UpdateUsersPostForm = ({ toggle, postId }) => {
  const auth = useContext(AuthContext);
  const { user, updateUser } = auth;
  const postToEdit = user?.blogPosts?.find((post) => post?._id === postId);
  const [isLoading, setIsLoading] = useState(false);
  //const { updateContentPost } = useContent();

  let initialEditorState = EditorState.createEmpty();
  if (postToEdit) {
    const htmlBlocks = htmlToDraft(postToEdit?.postContent);
    const { contentBlocks, entityMap } = htmlBlocks;
    const contentState = ContentState.createFromBlockArray(
      contentBlocks,
      entityMap
    );
    initialEditorState = EditorState.createWithContent(contentState);
  }
  const [editorState, setEditorState] = useState(initialEditorState);
  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: postToEdit?.title || "",
        isValid: true,
      },
      postContent: {
        value: postToEdit?.postContent || "",
        isValid: true,
      },
      category: {
        value: postToEdit?.category || "",
        isValid: true,
      },
    },
    true
  );

  const submitUpdatedContent = useCallback(async () => {
    setIsLoading(true);
    const contentState = editorState.getCurrentContent();
    const rawContent = convertToRaw(contentState);
    const postData = draftToHtml(rawContent);
    const sanitizedPostData = DOMPurify.sanitize(postData);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BLOG}/post/${postId}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            title: formState.inputs.title.value,
            postContent: sanitizedPostData,
            category: formState.inputs.category.value,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.token,
          },
        }
      );

      if (!response.ok) {
        throw new Error("There was an error with updating your post.");
      }

      const responseData = await response.json();
      const updatedPostDetails = {
        ...user,
        blogPosts: user?.blogPosts?.map((blog, i) =>
          blog._id === responseData.updatedPost._id
            ? responseData.updatedPost
            : blog
        ),
      };
      updateUser(updatedPostDetails);
      setEditorState(EditorState.createEmpty());
    } catch (err) {
      setIsLoading(false);
      console.log(err);
      toggle();
    }

    setFormData(
      {
        title: { value: "", isValid: false },
        postContent: { value: "", isValid: false },
        category: { value: "", isValid: false },
      },
      false
    );
    setIsLoading(false);
  }, [
    user,
    updateUser,
    editorState,
    postId,
    auth.token,
    setFormData,
    formState,
    toggle,
  ]);

  const handleEditorChange = (editorContent) => {
    setEditorState(editorContent);
    const contentState = editorContent.getCurrentContent();
    const rawContent = convertToRaw(contentState);
    const postData = rawContent.blocks[0].text;

    inputHandler("postContent", postData, postData.length >= 7);
  };

  return (
    <>
      <Paper
        elevation={1}
        sx={{ margin: "2rem auto", padding: 2, borderRadius: "18px" }}
      >
        {!isLoading && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              submitUpdatedContent();
              toggle();
            }}
          >
            <Stack direction="column" justifyContent="flex-end">
              <FormControl>
                <FormLabel>Title</FormLabel>
                <TextField
                  disabled={true}
                  fullWidth
                  id="title"
                  type="text"
                  helperText="Enter a title"
                  value={formState.inputs.title.value}
                  onChange={(event) =>
                    inputHandler(
                      "title",
                      event.target.value,
                      event.target.value !== ""
                    )
                  }
                ></TextField>
              </FormControl>
              <FormControl>
                <FormLabel>Category</FormLabel>
                <Select
                  labelId="category selection"
                  id="category"
                  value={formState.inputs.category.value}
                  label="category"
                  onChange={(event) =>
                    inputHandler(
                      "category",
                      event.target.value,
                      event.target.value !== ""
                    )
                  }
                >
                  {blogCategories.map((category, i) => (
                    <MenuItem key={i} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>What would like to share or ask?</FormLabel>
                <StyledPost>
                  <Editor
                    id="postContent"
                    editorState={editorState}
                    onEditorStateChange={handleEditorChange}
                    toolbar={{
                      options: ["inline", "blockType", "fontSize", "list"],
                    }}
                  />
                </StyledPost>
              </FormControl>

              <Stack direction="row" alignItems="center" spacing={1}>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={!formState.isValid}
                >
                  Update Post
                </Button>
                <Button variant="outlined" onClick={toggle}>
                  Cancel
                </Button>
              </Stack>
            </Stack>
          </form>
        )}
        {isLoading && <CircularProgress />}
      </Paper>
    </>
  );
};

export default UpdateUsersPostForm;
