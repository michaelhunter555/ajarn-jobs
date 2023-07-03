import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "draft-js/dist/Draft.css";

import React, { useContext, useState } from "react";

import { convertToRaw, EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { FaChalkboardTeacher, FaSchool } from "react-icons/fa";
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

const styledComments = {
  minHeight: "250px",
  height: "auto",
  padding: " 0 20px",
  borderRadius: "0 0 8px 8px",
  border: "2px solid #dbdbdb",
  boxSizing: "border-box",
};

const BlogPageItem = ({ content }) => {
  const auth = useContext(AuthContext);
  const { user } = auth;
  const blogId = useParams().bid;
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [toggleEditor, setToggleEditor] = useState(true);
  const {
    addComment,
    comments: userComments,
    isPostLoading,
    error,
    clearError,
  } = useComment();

  const handleCommentSubmit = () => {
    const contentState = editorState.getCurrentContent();
    //console.log("const contentState =", contentState);
    const rawContent = convertToRaw(contentState);
    //console.log("const rawContent =", rawContent.blocks[0].text);
    const comment = JSON.stringify({ postComment: rawContent.blocks[0].text });
    //console.log("const comment = ", comment);

    try {
      addComment(user?._id, blogId, comment);
    } catch (err) {
      console.log("HandleCommentSubmit Error - POST:", error);
    }

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
                <Button
                  endIcon={
                    <ThumbDownIcon color="action" sx={{ fontSize: 20 }} />
                  }
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
                <Button
                  endIcon={<ShareIcon color="action" sx={{ fontSize: 20 }} />}
                >
                  <Typography
                    color="text.secondary"
                    variant="subtitle2"
                    sx={{ fontSize: 14, fontWeight: 550 }}
                  >
                    Share
                  </Typography>
                </Button>
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
            flexDirection: "column",
            gap: "3px",
          }}
        >
          {toggleEditor && (
            <Box
              sx={{
                width: "100%",
                ...styledComments,
              }}
            >
              <Editor
                editorState={editorState}
                onEditorStateChange={handleEditorChange}
              />
            </Box>
          )}
          <Stack direction="row" justifyContent="flex-end">
            <Button disabled={!auth.isLoggedIn} onClick={handleCommentSubmit}>
              Submit
            </Button>
          </Stack>
        </Paper>
        <Paper
          elevation={0}
          sx={{
            marginTop: "1rem",
            height: 200,
            borderRadius: 8,
            display: "flex",
            padding: 4,
          }}
        >
          {content?.comments?.length === 0 && (
            <Typography variant="h4">No comments yet. Be the first!</Typography>
          )}
          {content?.comments?.length !== 0 &&
            content?.comments?.map((comment, i) => (
              <Box
                key={comment?.userId}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  gap: 3,
                }}
              >
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar
                      sx={{ height: 70, width: 70 }}
                      alt={`${comment?.userId?.name}-${comment?.userId?.userType}`}
                      src={`${process.env.REACT_APP_IMAGE}${comment?.userId?.image}`}
                    />
                  </Stack>
                  <Stack alignItems="flex-start">
                    <Typography>{comment?.userId?.name}</Typography>
                    <Chip
                      label={comment?.userId?.userType}
                      icon={
                        comment?.userId?.userType === "teacher" ? (
                          <FaChalkboardTeacher />
                        ) : (
                          <FaSchool />
                        )
                      }
                    />
                    <Typography>
                      Teacher Exp: {comment?.userId?.workExperience}
                    </Typography>
                  </Stack>
                </Stack>
                <Typography>{comment?.comment}</Typography>
              </Box>
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
