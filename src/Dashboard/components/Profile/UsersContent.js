import React, { useEffect, useState } from "react";

import { Link as RouterLink } from "react-router-dom";

import DeleteForeverTwoToneIcon from "@mui/icons-material/DeleteForeverTwoTone";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Pagination,
  Paper,
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
import UpdateUsersPostForm from "./UpdateUsersPostForm";

const UsersContent = ({ user }) => {
  const [openDeleteWarning, setOpenDeleteWarning] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingPostId, setEditingPostId] = useState(null);
  const [postToDelete, setPostToDelete] = useState(null);
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;
  const [noOfPages, setNoOfPages] = useState(
    Math.ceil(user?.blogPosts?.length / itemsPerPage)
  );
  const { deleteContentPost, isDeleting } = useContent();

  useEffect(() => {
    if (!isDeleting) {
      const newNumOfPages = Math.ceil(user?.blogPosts?.length / itemsPerPage);
      setNoOfPages(newNumOfPages);
      if (page > newNumOfPages) {
        setPage(newNumOfPages);
      }
    }
  }, [isDeleting, page, user?.blogPosts]);

  const deleteWarningHandler = (postId) => {
    setPostToDelete(postId);
    setOpenDeleteWarning(true);
  };

  const confirmDeleteHandler = () => {
    deleteContentPost(postToDelete);
    setPostToDelete(null);
    setOpenDeleteWarning(false);
  };

  const cancelDeleteHandler = () => {
    setPostToDelete(null);
    setOpenDeleteWarning(false);
  };

  console.log("POST TO DELETE", postToDelete);

  const toggleEditingMode = (id) => {
    setIsEditing(true);
    setEditingPostId(id);
  };

  const closeToggleEditMode = () => {
    setIsEditing(false);
    setEditingPostId(null);
  };

  const userHasContent = user?.blogPosts?.length > 0;

  const indexOfLastPage = page * itemsPerPage;
  const indexOfFirstPage = indexOfLastPage - itemsPerPage;
  const currentPageOfPosts = user?.blogPosts?.slice(
    indexOfFirstPage,
    indexOfLastPage
  );

  return (
    <>
      {userHasContent && !isEditing && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Interactions</TableCell>
                <TableCell>Comments</TableCell>
                <TableCell>
                  <Button
                    component={RouterLink}
                    to="/content"
                    variant="outlined"
                  >
                    Add Post
                  </Button>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentPageOfPosts &&
                currentPageOfPosts?.map((post, i) => (
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
                            <Button
                              onClick={() => confirmDeleteHandler(post?._id)}
                            >
                              Confirm Delete
                            </Button>
                            <Button onClick={cancelDeleteHandler}>
                              Cancel
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
            </TableBody>
          </Table>
          <Stack alignItems="end">
            <Pagination
              size="small"
              count={noOfPages}
              page={page}
              onChange={(event, val) => setPage(val)}
              defaultPage={1}
              showFirstButton
              showLastButton
            />
          </Stack>
        </TableContainer>
      )}
      {!userHasContent && !isEditing && (
        <Stack justifyContent="center" alignItems="center">
          <Typography variant="body1" color="text.secondary">
            No Content Yet. Maybe add a post?
          </Typography>
          <Button variant="contained" component={RouterLink} to={`/content`}>
            Add Post
          </Button>
        </Stack>
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
