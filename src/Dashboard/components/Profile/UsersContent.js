import React, { useContext, useState } from "react";

import { Link as RouterLink } from "react-router-dom";

import DeleteForeverTwoToneIcon from "@mui/icons-material/DeleteForeverTwoTone";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import {
  Button,
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

import { AuthContext } from "../../../shared/context/auth-context";
import UpdateUsersPostForm from "./UpdateUsersPostForm";

const UsersContent = () => {
  const auth = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editingPostId, setEditingPostId] = useState(null);

  const deletePostHandler = () => {
    console.log(`Deleted post`);
  };

  const toggleEditingMode = (id) => {
    setIsEditing(true);
    setEditingPostId(id);
  };

  const closeToggleEditMode = (id) => {
    setIsEditing(false);
    setEditingPostId(null);
  };

  const userHasContent = auth.user?.blogPosts?.length > 0;

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
              </TableRow>
            </TableHead>
            <TableBody>
              {auth.user?.blogPosts?.map((post, i) => (
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
                          <EditTwoToneIcon />
                        </Button>
                      </Tooltip>
                      <Tooltip title="Delete" placement="top">
                        <Button onClick={() => deletePostHandler(post?._id)}>
                          <DeleteForeverTwoToneIcon color="error" />
                        </Button>
                      </Tooltip>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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
