import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import React, { useContext, useEffect, useState } from "react";

import { EditorState } from "draft-js";
import { convertToRaw, Editor } from "react-draft-wysiwyg";
import { useParams } from "react-router-dom";

import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import { AuthContext } from "../../shared/context/auth-context";
import { useComment } from "../../shared/hooks/content-hook";
import { useForm } from "../../shared/hooks/form-hook";

const BlogPageItem = ({ content }) => {
  const auth = useContext(AuthContext);
  const { user } = auth;
  const blogId = useParams().bid;
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [toggleEditor, setToggleEditor] = useState(true);
  const [formState, inputHandler, setFormData] = useForm(
    {
      postComment: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  const { addComment, isPostLoading, error, clearError } = useComment();

  useEffect(() => {
    if (formState.isValid) {
      setFormData(
        {
          postComment: formState.inputs.postComment.value,
        },
        true
      );
    }
  });

  const handleCommentSubmit = () => {
    const contentState = editorState.getCurrentContent();
    const rawContent = convertToRaw(contentState);
    const comment = JSON.stringify({ postComment: rawContent });

    try {
      addComment(user?._id, blogId, comment);
    } catch (err) {}

    if (!error) {
      setEditorState(Editor.createEmpty());
    }
  };

  const handleEditorChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="start"
      sx={{ maxWidth: "75%", margin: "0 auto" }}
      spacing={2}
    >
      <Grid item xs={12} sm={6} md={8}>
        <Paper
          elevation={0}
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: 2,
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <Avatar
              sx={{ width: 100, height: 100, margin: "0 2rem" }}
              alt="dummy_image"
              src={`${process.env.REACT_APP_IMAGE}${content?.author?.image}`}
            />
            <Typography variant="h3" component="div">
              {content?.title}
            </Typography>
            <Divider orientation="vertical" flexItem />
            <Stack
              sx={{
                border: "2px solid #e7e4e4",
                borderRadius: "5px",
                padding: 2,
              }}
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <Typography variant="subtitle2" color="text.secondary">
                {content?.postDate?.split("T")[0]}
              </Typography>
              <Chip label={content?.category} size="small" />
            </Stack>
          </Stack>
          <CardContent>
            <Typography variant="body1">{content?.postContent}</Typography>
          </CardContent>
          <Grid container direction="row" justify="center" spacing={2}>
            <Grid item>
              <Stack direction="row" alignItems="center" spacing={1}>
                <CommentIcon color="action" sx={{ fontSize: 20 }} />
                <Typography
                  component={Button}
                  onClick={() => setToggleEditor((prev) => !prev)}
                  color="text.secondary"
                  variant="subtitle2"
                  sx={{ fontSize: 14, fontWeight: 550 }}
                >
                  {content?.comments?.length} comments
                </Typography>
              </Stack>
            </Grid>
            <Grid item>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Button
                  endIcon={<ThumbUpIcon color="action" sx={{ fontSize: 20 }} />}
                >
                  <Typography
                    color="text.secondary"
                    variant="subtitle2"
                    sx={{ fontSize: 14, fontWeight: 550 }}
                  >
                    0
                  </Typography>
                </Button>
              </Stack>
            </Grid>
            <Grid item>
              <Stack direction="row" alignItems="center" spacing={1}>
                <ThumbDownIcon color="action" sx={{ fontSize: 20 }} />
                <Typography
                  color="text.secondary"
                  variant="subtitle2"
                  sx={{ fontSize: 14, fontWeight: 550 }}
                >
                  0
                </Typography>
              </Stack>
            </Grid>
            <Grid item>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography
                  color="text.secondary"
                  variant="subtitle2"
                  sx={{ fontSize: 14, fontWeight: 550 }}
                >
                  Share
                </Typography>
                <ShareIcon color="action" sx={{ fontSize: 20 }} />
              </Stack>
            </Grid>
          </Grid>
        </Paper>
        <Divider variant="inset" />
        <Paper
          elevation={0}
          sx={{
            padding: 2,
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            gap: "3px",
          }}
        >
          {toggleEditor && (
            <Box
              sx={{
                width: "90%",
                height: "auto",
                border: "1px solid f1f1f1",
                borderRadius: "0 0 8px 8px",
                backgroundColor: "#f1f1f1",
              }}
            >
              <Editor
                style={{ padding: "2px" }}
                editorState={editorState}
                onEditorStateChange={handleEditorChange}
              />
              <Stack direction="row" justifyContent="flex-end">
                <Button onClick={handleCommentSubmit}>Submit</Button>
              </Stack>
            </Box>
          )}
          {content?.comments?.length === 0 && (
            <Typography variant="h4">No comments yet. Be the first!</Typography>
          )}
          {content?.comments?.length !== 0 &&
            content?.comments?.map((comment, i) => (
              <Card key={comment?.userId}>
                <Stack>
                  <Typography>{comment?.userId?.name}</Typography>
                  <Typography>{comment?.userId?.userType}</Typography>
                  <Typography>{comment?.userId?.workExperience}</Typography>
                </Stack>
              </Card>
            ))}
        </Paper>
      </Grid>
      {/**sidebar below */}
      <Grid item xs={12} sm={6} md={4}>
        <Card>
          <Button>Make a Post!</Button>
          <Typography variant="h5" component="h2" color="text.secondary">
            Other Posts
          </Typography>
        </Card>
      </Grid>
    </Grid>
  );
};

export default BlogPageItem;
