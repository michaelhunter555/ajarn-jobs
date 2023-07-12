import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "draft-js/dist/Draft.css";

import React, { useContext, useState } from "react";

import DOMPurify from "dompurify";
import { convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { useParams } from "react-router-dom";

import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";
import { Button, Divider, Grid, Paper, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import { AuthContext } from "../../shared/context/auth-context";
import { useComment } from "../../shared/hooks/content-hook";
import { useForm } from "../../shared/hooks/form-hook";
import BlogContent from "./BlogContent";
import BlogPageLoadingSkeleton from "./BlogPageLoadingSkeleton";
import CommentForm from "./CommentForm";
import UserComments from "./UserComments";
import UserInteractions from "./UserInteractions";

const BlogPageItem = ({ content, refetchLikeState, isLoading }) => {
  const auth = useContext(AuthContext);
  const { user } = auth;
  const blogId = useParams().bid;
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [formState, inputHandler] = useForm(
    { postComment: { value: "", isValid: false } },
    false
  );
  const { addComment, getComments, error } = useComment();

  const {
    data: usersComments,
    isLoading: commentsIsLoading,
    refetch,
  } = useQuery(["commentsByBlogId", blogId], () => getComments(blogId));

  console.log(usersComments?.length);

  const handleCommentSubmit = () => {
    const contentState = editorState.getCurrentContent();
    const rawContent = convertToRaw(contentState);
    const commentHtml = draftToHtml(rawContent);
    const sanitizedComment = DOMPurify.sanitize(commentHtml);
    const comment = JSON.stringify({ postComment: sanitizedComment });

    try {
      addComment(user?._id, blogId, comment)
        .then(() => {
          refetch();
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log("HandleCommentSubmit Error - POST:", error);
    }
    setEditorState(EditorState.createEmpty());
  };

  const handleEditorChange = (newEditorState) => {
    setEditorState(newEditorState);
    const contentState = newEditorState.getCurrentContent();
    const rawContent = convertToRaw(contentState);
    const commentPostData = rawContent.blocks[0].text;

    inputHandler(
      "postComment",
      commentPostData,
      commentPostData.trim().length >= 7
    );
  };

  return (
    <Grid container sx={{ maxWidth: "75%", margin: "2rem auto" }} spacing={2}>
      <Grid item xs={12}>
        {isLoading ? (
          <BlogPageLoadingSkeleton />
        ) : (
          <>
            <Paper
              elevation={0}
              sx={{
                display: "flex",
                flexDirection: "column",
                padding: 2,
                borderRadius: "18px",
              }}
            >
              <BlogContent content={content} />
              <Grid container direction="row" justify="center" spacing={2}>
                {/**START OF COMMENTS COUNT<> */}
                <Grid item>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Button
                      startIcon={
                        <CommentIcon color="action" sx={{ fontSize: 20 }} />
                      }
                    >
                      <Typography
                        color="text.secondary"
                        variant="subtitle2"
                        sx={{ fontSize: 14, fontWeight: 550 }}
                      >
                        {usersComments?.length} comments
                      </Typography>
                    </Button>
                  </Stack>
                </Grid>
                {/**START OF LIKES & DISLIKES GOES HERE <> */}
                <UserInteractions
                  blogId={blogId}
                  content={content}
                  refetchLikeState={refetchLikeState}
                />
                {/**END OF LIKES & DISLIKES GOES HERE <> */}
                <Grid item>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Button
                      endIcon={
                        <ShareIcon color="action" sx={{ fontSize: 20 }} />
                      }
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
              <Divider variant="inset" />

              {/**WYSIWYG EDITOR*/}
              <CommentForm
                editorState={editorState}
                editorChange={handleEditorChange}
                postComment={handleCommentSubmit}
                formStateIsValid={formState.isValid}
              />

              {/**END OF WYSIWYG EDITOR*/}
              <Divider flexItem light variant="inset" />
              {/**START OF User Comments*/}
              <UserComments
                usersComments={usersComments}
                commentsIsLoading={commentsIsLoading}
                blogId={blogId}
                refetch={refetch}
              />
            </Paper>
            {/**END OF User Comments*/}
          </>
        )}
      </Grid>

      {/**sidebar below */}
    </Grid>
  );
};

export default BlogPageItem;
