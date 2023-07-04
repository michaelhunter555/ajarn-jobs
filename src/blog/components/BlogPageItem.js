import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'draft-js/dist/Draft.css';

import React, {
  useContext,
  useState,
} from 'react';

import {
  convertToRaw,
  EditorState,
} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import {
  FaChalkboardTeacher,
  FaSchool,
} from 'react-icons/fa';
import { useParams } from 'react-router-dom';

import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from '@mui/icons-material/Share';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { AuthContext } from '../../shared/context/auth-context';
import {
  useComment,
  useContent,
} from '../../shared/hooks/content-hook';
import { getTimeDifference } from '../../shared/util/getTimeDifference';

const styledComments = {
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
  const [isLiked, setIsLiked] = useState(true);
  const [isDisliked, setIsDisliked] = useState(true);
  const { addComment, getComments, error } = useComment();
  const {
    isLoading,
    isPostLoading,
    likeContentPost,
    dislikeContentPost,
    contentPostLikes,
    contentPostDislikes,
  } = useContent();

  const {
    data: usersComments,
    isLoading: commentsIsLoading,
    refetch,
  } = useQuery(["commentsByBlogId", blogId], () => getComments(blogId));

  const handleCommentSubmit = () => {
    const contentState = editorState.getCurrentContent();
    const rawContent = convertToRaw(contentState);
    const comment = JSON.stringify({ postComment: rawContent.blocks[0].text });

    try {
      addComment(user?._id, blogId, comment);
    } catch (err) {
      console.log("HandleCommentSubmit Error - POST:", error);
    }
    if (!error) {
      setEditorState(Editor.createEmpty());
      refetch();
    }
  };

  const handleEditorChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  const handlePostLike = () => {
    likeContentPost(blogId, user?._id, isLiked);

    setIsLiked((prev) => !prev);
  };

  const handlePostDislike = () => {
    dislikeContentPost(blogId, user?._id, isDisliked);
    setIsDisliked((prev) => !prev);
  };

  const commentIndex =
    content &&
    content?.interactions?.findIndex(
      (interaction) => interaction?.userId === user?._id
    );
  const usersInteraction = content?.interactions[commentIndex];
  const userAlreadyLiked = usersInteraction?.like === true;

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
              alt={`${content?.title}--${content?._id}`}
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
                {!isPostLoading && (
                  <Button
                    onClick={handlePostLike}
                    disabled={!auth.isLoggedIn}
                    endIcon={
                      <ThumbUpIcon
                        color={
                          auth.isLoggedIn && userAlreadyLiked
                            ? "primary"
                            : "action"
                        }
                        sx={{ fontSize: 20 }}
                      />
                    }
                  >
                    <Typography
                      color="text.secondary"
                      variant="subtitle2"
                      sx={{ fontSize: 14, fontWeight: 550 }}
                    >
                      {
                        content?.interactions?.filter(
                          (action) => action.like === true
                        )?.length
                      }
                    </Typography>
                  </Button>
                )}
                {isPostLoading && <CircularProgress size="12px" />}
              </Stack>
            </Grid>
            <Grid item>
              <Stack direction="row" alignItems="center" spacing={1}>
                {!isPostLoading && (
                  <Button
                    onClick={handlePostDislike}
                    disabled={!auth.isLoggedIn}
                    endIcon={
                      <ThumbDownIcon color="action" sx={{ fontSize: 20 }} />
                    }
                  >
                    <Typography
                      color="text.secondary"
                      variant="subtitle2"
                      sx={{ fontSize: 14, fontWeight: 550 }}
                    >
                      {
                        content?.interactions?.filter(
                          (action) => action.dislike === true
                        )?.length
                      }
                    </Typography>
                  </Button>
                )}
                {isPostLoading && <CircularProgress size="12px" />}
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
              <Stack direction="row" justifyContent="flex-end">
                <Button
                  variant="contained"
                  sx={{ borderRadius: "20px", marginBottom: "0.5rem" }}
                  disabled={!auth.isLoggedIn}
                  onClick={handleCommentSubmit}
                >
                  {!auth.isLoggedIn ? "Login" : "Submit"}
                </Button>
              </Stack>
            </Box>
          )}
        </Paper>
        <Divider flexItem light variant="inset" />
        <Paper
          elevation={0}
          sx={{
            height: content?.comments?.length === 0 ? 200 : "",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            padding: 4,
            boxSizing: "border-box",
            margin: "0 0 5rem 0",
          }}
        >
          {usersComments?.length === 0 && (
            <Typography variant="h4">No comments yet. Be the first!</Typography>
          )}
          {commentsIsLoading && <CircularProgress />}
          {!commentsIsLoading &&
            usersComments?.length !== 0 &&
            usersComments?.map((comment, i) => (
              <Box
                key={i}
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
                    <Stack direction="row" alignItems="center">
                      <Typography varaint="body1" color="text.primary">
                        {comment?.userId?.name} ·{" "}
                      </Typography>
                      <Typography variant="subtitle2" color="text.secondary">
                        {getTimeDifference(comment?.commentDate)}
                      </Typography>
                    </Stack>
                    <Chip
                      label={`${comment?.userId?.userType}
                      ${
                        comment?.userId?.userType === "teacher"
                          ? " | " + comment?.userId?.workExperience + " years"
                          : ""
                      } `}
                      icon={
                        comment?.userId?.userType === "teacher" ? (
                          <FaChalkboardTeacher />
                        ) : (
                          <FaSchool />
                        )
                      }
                    />
                  </Stack>
                </Stack>
                <Typography>{comment?.comment}</Typography>
                {i - usersComments?.length - 1 && (
                  <Divider light sx={{ width: "100%", margin: "0.5rem 0" }} />
                )}
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
