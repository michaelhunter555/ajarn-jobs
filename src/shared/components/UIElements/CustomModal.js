import React, { useContext } from "react";

import { Link, useNavigate } from "react-router-dom";

import { Box, Chip, Divider, Modal, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import { AuthContext } from "../../context/auth-context";
import { CustomModalBlur } from "../../util/CustomerBlurStyle";

export const StyledBoxContainer = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  background: theme.palette.background.paper,
  border: "1px solid #bbb",
  boxShadow: 24,
  padding: 8,
  borderRadius: "15px",
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
  [theme.breakpoints.down("sm")]: {
    width: "95%",
  },
}));

const CustomModal = (props) => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const { isLoggedIn, credits, buffetIsActive } = auth;

  const handleClose = () => {
    props.handleClose();
  };

  return (
    <div>
      <Modal
        disableScrollLock={true}
        open={props.open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ ...(!auth?.user?.buffetIsActive ? { ...CustomModalBlur } : {}) }}
      >
        <StyledBoxContainer>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {props.success || props.error}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {props.noCredits || props.signIn || props.errorMessage}
          </Typography>
          <Divider flexItem sx={{ marginBottom: "0.5rem" }} />
          {!isLoggedIn && (
            <Stack direction="row" spacing={1} justifyContent="flex-end">
              <Chip
                label="login"
                component={Link}
                variant="contained"
                to={`/auth`}
                clickable={true}
              />
              <Chip
                label="go back"
                variant={props.alternateButtonVariant}
                component={Link}
                onClick={() => navigate(-1)}
              />
            </Stack>
          )}
          {isLoggedIn && credits === 0 && (
            <Chip
              label="Get Credits"
              component={Link}
              to={`/users/${auth.user._id}`}
              clickable={true}
            />
          )}
          {isLoggedIn && !buffetIsActive && (
            <Stack direction="row" spacing={1}>
              <Chip
                label="Get Credits"
                variant={props.buttonVariant}
                component={Link}
                to={`/users/${auth.user._id}`}
              />

              <Chip
                label="go back"
                variant={props.alternateButtonVariant}
                component={Link}
                onClick={() => navigate(-1)}
              />
            </Stack>
          )}
        </StyledBoxContainer>
      </Modal>
    </div>
  );
};

export default CustomModal;
