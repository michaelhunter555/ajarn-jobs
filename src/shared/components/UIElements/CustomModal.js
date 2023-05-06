import React, { useContext } from "react";

import { Link } from "react-router-dom";

import { Box, Button, Modal, Typography } from "@mui/material";

import { AuthContext } from "../../context/auth-context";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const CustomModal = (props) => {
  const auth = useContext(AuthContext);
  const { isLoggedIn, credits } = auth;
  const handleClose = () => {
    props.handleClose();
  };

  return (
    <div>
      <Modal
        open={props.open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {props.success || props.error}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {props.noCredits || props.signIn}
          </Typography>
          {!isLoggedIn && (
            <Button component={Link} to={`/auth`}>
              {" "}
              login{" "}
            </Button>
          )}
          {isLoggedIn && credits === 0 && (
            <Button component={Link} to={`/users/${auth.user._id}`}>
              Get Credits
            </Button>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default CustomModal;
