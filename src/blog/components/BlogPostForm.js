import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "draft-js/dist/Draft.css";

import React, { useContext, useState } from "react";

import DOMPurify from "dompurify";
import { convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { Editor } from "react-draft-wysiwyg";

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
  Typography,
} from "@mui/material";

import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { AuthContext } from "../../shared/context/auth-context";
import { useContent } from "../../shared/hooks/content-hook";
import { useForm } from "../../shared/hooks/form-hook";
import { blogCategories } from "../../shared/util/ThaiData";

const styledComments = {
  minHeight: 200,
  height: "auto",
  padding: " 0 20px",
  borderRadius: "0 0 8px 8px",
  border: "2px solid #dbdbdb",
  boxSizing: "border-box",
  ".public-DraftStyleDefault-block": {
    height: "5rem",
  },
};

const BlogPostForm = ({ onBlogPostCreated, hideButton }) => {
  const auth = useContext(AuthContext);
  const { user } = auth;
  const [toggleForm, setToggleForm] = useState(true);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const { createContentPost, isPostLoading, error, clearError } = useContent();
  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      postContent: {
        value: "",
        isValid: false,
      },
      category: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const submitContentPostHandler = async (event) => {
    event.preventDefault();
    const contentState = editorState.getCurrentContent();
    const rawContent = convertToRaw(contentState);
    const postData = draftToHtml(rawContent);

    const sanitizedPostData = DOMPurify.sanitize(postData);

    const contentPostInputs = {
      title: formState.inputs.title.value,
      category: formState.inputs.category.value,
      postContent: sanitizedPostData,
    };

    try {
      createContentPost(user?._id, contentPostInputs)
        .then(() => {
          onBlogPostCreated();
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(`There was an error creating the content post: ${error}`);
    }

    if (!error) {
      setFormData(
        {
          title: {
            value: "",
            isValid: false,
          },
          postContent: {
            value: "",
            isValid: false,
          },
          category: {
            value: "",
            isValid: false,
          },
        },
        false
      );

      setToggleForm(false);
    }
  };

  const toggleContentFormHandler = () => {
    setToggleForm((prev) => !prev);
  };

  const handleEditorChange = (newEditorState) => {
    setEditorState(newEditorState);

    const contentState = newEditorState.getCurrentContent();
    const rawContent = convertToRaw(contentState);
    const postData = rawContent.blocks[0].text;

    inputHandler("postContent", postData, postData.length >= 7);
  };

  return (
    <>
      <ErrorModal error={error} header={error} onClear={clearError} />
      <Box>
        <Typography>
          Add a Post or Ask a Question! Get the perspectives of others.
        </Typography>

        <Button
          disabled={toggleForm || !auth.isLoggedIn}
          variant="contained"
          onClick={toggleContentFormHandler}
        >
          {!auth.isLoggedIn ? "login to post" : "Add a post"}
        </Button>

        {isPostLoading && <CircularProgress />}

        {toggleForm && !isPostLoading && (
          <Paper
            elevation={1}
            sx={{ margin: "2rem auto", padding: 2, borderRadius: "18px" }}
          >
            <form onSubmit={submitContentPostHandler}>
              <Stack direction="column" justifyContent="flex-end">
                <FormControl>
                  <FormLabel>Title</FormLabel>
                  <TextField
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
                  <FormLabel>What would you like to ask or share?</FormLabel>
                  {/* <TextField
                    fullWidth
                    multiline
                    rows={6}
                    id="postContent"
                    type="text"
                    helperText="Ask a question or share a post."
                    value={formState.inputs.postContent.value}
                    onChange={(event) =>
                      inputHandler(
                        "postContent",
                        event.target.value,
                        event.target.value !== ""
                      )
                    }
                  ></TextField> */}
                  <Box
                    sx={{
                      width: "100%",
                      ...styledComments,
                    }}
                  >
                    <Editor
                      id="postContent"
                      editorState={editorState}
                      onEditorStateChange={handleEditorChange}
                      toolbar={{
                        options: ["inline", "blockType", "fontSize", "list"],
                      }}
                    />
                  </Box>
                </FormControl>
              </Stack>
              <Stack
                justifyContent="flex-end"
                direction="row"
                spacing={1}
                sx={{ padding: 1 }}
              >
                <Button
                  variant="contained"
                  type="submit"
                  disabled={!formState.isValid || !auth.isLoggedIn}
                >
                  Submit
                </Button>

                <Button
                  variant="outlined"
                  color="error"
                  onClick={toggleContentFormHandler}
                >
                  Cancel
                </Button>
              </Stack>
            </form>
          </Paper>
        )}
      </Box>
    </>
  );
};

export default BlogPostForm;
