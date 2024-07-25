import React, { useEffect, useState } from "react";

import { Link as RouterLink } from "react-router-dom";

import DeleteForeverTwoToneIcon from "@mui/icons-material/DeleteForeverTwoTone";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Pagination,
  Paper,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";

import { useContent } from "../../../shared/hooks/content-hook";
import { useInvalidateQuery } from "../../../shared/hooks/invalidate-query";
import UpdateUsersPostForm from "./UpdateUsersPostForm";

const UsersContent = ({
  isLoading,
  blogPosts,
  onBlogPageChange,
  refetchBlogs,
}) => {
  const [openDeleteWarning, setOpenDeleteWarning] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingPostId, setEditingPostId] = useState(null);
  const [postToDelete, setPostToDelete] = useState(null);
  const [page, setPage] = useState(blogPosts?.page);
  const [totalPages, setTotalPages] = useState(1);
  const { invalidateQuery } = useInvalidateQuery();

  const { deleteContentPost, isDeleting } = useContent();

  useEffect(() => {
    if (totalPages !== blogPosts?.totalPages) {
      setTotalPages(blogPosts?.totalPages);
    }
  }, [blogPosts?.totalPages, totalPages]);

  const deleteWarningHandler = (postId) => {
    setPostToDelete(postId);
    setOpenDeleteWarning(true);
  };

  const confirmDeleteHandler = async () => {
    await deleteContentPost(postToDelete);
    setPostToDelete(null);
    setOpenDeleteWarning(false);
    await invalidateQuery("userBlogPosts");
    if (page !== 1) {
      setPage(1);
      onBlogPageChange(1, 5);
    }
  };

  const cancelDeleteHandler = () => {
    setPostToDelete(null);
    setOpenDeleteWarning(false);
  };

  const toggleEditingMode = (id) => {
    setIsEditing(true);
    setEditingPostId(id);
  };

  const closeToggleEditMode = () => {
    setIsEditing(false);
    setEditingPostId(null);
  };

  const userHasContent = blogPosts?.blogPost?.length > 0;

  return (
    <>
      {!isEditing && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Interactions</TableCell>
                <TableCell>Comments</TableCell>
                <TableCell>
                  <Chip
                    label="Add Post"
                    component={RouterLink}
                    to="/content"
                    variant="outlined"
                    clickable={true}
                  />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!isLoading &&
                !isDeleting &&
                blogPosts &&
                blogPosts?.blogPost?.map((post, i) => (
                  <TableRow key={post?._id}>
                    <TableCell>
                      <Typography
                        variant="subtitle2"
                        color="text.secondary"
                        sx={{ fontSize: 11 }}
                      >
                        {post?.postDate?.split("T")[0]}
                      </Typography>
                    </TableCell>
                    <TableCell>{post?.title}</TableCell>
                    <TableCell>{post?.interactions?.length}</TableCell>
                    <TableCell>{post?.comments?.length}</TableCell>
                    <TableCell>
                      <Stack direction="row" alignItems="center">
                        <Button
                          component={RouterLink}
                          to={`/content/${post?._id}`}
                        >
                          <VisibilityTwoToneIcon />
                        </Button>

                        <Tooltip title="Edit" placement="top">
                          <Button onClick={() => toggleEditingMode(post?._id)}>
                            <EditTwoToneIcon sx={{ color: "#b18912" }} />
                          </Button>
                        </Tooltip>
                        <Dialog
                          disableScrollLock={true}
                          open={openDeleteWarning}
                          onClose={cancelDeleteHandler}
                          aria-labelledby="delete-your-post"
                          aria-describedby="confirm-post-delete"
                        >
                          <DialogTitle>Are you sure?</DialogTitle>
                          <DialogContent>
                            You are about to delete your post. This can not be
                            reversed.
                          </DialogContent>
                          <DialogActions sx={{}}>
                            <Button onClick={cancelDeleteHandler}>
                              Cancel
                            </Button>
                            <Button
                              color="error"
                              variant="contained"
                              onClick={() => confirmDeleteHandler(post?._id)}
                            >
                              Confirm Delete
                            </Button>
                          </DialogActions>
                        </Dialog>
                        <Tooltip title="Delete" placement="top">
                          <Button
                            onClick={() => deleteWarningHandler(post?._id)}
                          >
                            <DeleteForeverTwoToneIcon color="error" />
                          </Button>
                        </Tooltip>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}

              {(isDeleting || isLoading) &&
                Array.from({ length: 4 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <Skeleton animation={false} width="100%" />
                    </TableCell>
                    <TableCell>
                      <Skeleton animation={false} width="100%" />
                    </TableCell>
                    <TableCell>
                      <Skeleton animation={false} width="100%" />
                    </TableCell>
                    <TableCell>
                      <Skeleton animation={false} width="100%" />
                    </TableCell>
                    <TableCell>
                      <Skeleton animation={false} width="100%" />
                    </TableCell>
                  </TableRow>
                ))}

              {!userHasContent && !isEditing && !isLoading && (
                <Stack
                  justifyContent="center"
                  alignItems="center"
                  sx={{ width: "100%" }}
                >
                  <Typography variant="body1" color="text.secondary">
                    No Content Yet. Maybe add a post?
                  </Typography>
                </Stack>
              )}
            </TableBody>
          </Table>
          <Stack alignItems="end">
            <Pagination
              size="small"
              count={totalPages}
              page={page}
              onChange={(event, val) => {
                onBlogPageChange(val, 5);
                setPage(val);
              }}
              defaultPage={1}
              showFirstButton
              showLastButton
            />
          </Stack>
        </TableContainer>
      )}

      {isEditing && editingPostId && (
        <UpdateUsersPostForm
          postId={editingPostId}
          toggle={closeToggleEditMode}
        />
      )}
    </>
  );
};

export default UsersContent;
