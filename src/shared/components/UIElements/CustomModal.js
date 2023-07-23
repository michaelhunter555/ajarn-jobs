import React, { useContext } from "react";

import { Link, useNavigate } from "react-router-dom";

import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import { AuthContext } from "../../context/auth-context";

const StyledBoxContainer = styled(Box)(({ theme }) => ({
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
      >
        <StyledBoxContainer>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {props.success || props.error}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {props.noCredits || props.signIn || props.errorMessage}
          </Typography>
          {!isLoggedIn && (
            <Stack direction="row" spacing={1}>
              <Button component={Link} variant="contained" to={`/auth`}>
                {" "}
                login{" "}
              </Button>
              <Button
                variant={props.alternateButtonVariant}
                component={Link}
                onClick={() => navigate(-1)}
              >
                go back
              </Button>
            </Stack>
          )}
          {isLoggedIn && credits === 0 && (
            <Button component={Link} to={`/users/${auth.user._id}`}>
              Get Credits
            </Button>
          )}
          {isLoggedIn && !buffetIsActive && (
            <Stack direction="row" spacing={1}>
              <Button
                variant={props.buttonVariant}
                component={Link}
                to={`/users/${auth.user._id}`}
              >
                Get Credits & Activate Buffet
              </Button>
              <Button
                variant={props.alternateButtonVariant}
                component={Link}
                onClick={() => navigate(-1)}
              >
                go back
              </Button>
            </Stack>
          )}
        </StyledBoxContainer>
      </Modal>
    </div>
  );
};

export default CustomModal;
