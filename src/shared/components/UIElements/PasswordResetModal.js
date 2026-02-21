import React, { useState} from "react";

import { Chip, Divider, Modal, Paper, Stack, Typography, CircularProgress } from "@mui/material";
import Input from "../FormElements/Input";
import { styled } from "@mui/material/styles";
import { VALIDATOR_EMAIL, validate } from "../../util/validators";

export const BoxContent = styled(Paper)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: theme.palette.background.paper,
  border: theme.palette.background.paper,
  borderRadius: "10px",
  boxShadow: 24,
  padding: 20,
  textAlign: "center",
}));

const PasswordResetModal = ({ 
    isSuccess,
    isLoading,
    open, 
    onClose, 
    onSubmitEmail 
}) => {
  const [email, setEmail] = useState("");

  const handleSubmitEmail = () => {
    if (validate(email, [VALIDATOR_EMAIL()])) {
      onSubmitEmail(email);
    }
  }
  return (
    <Modal
      disableScrollLock={true}
      open={open}
      onClose={onClose}
      aria-labelledby="password-reset-modal-title"
      aria-describedby="password-reset-modal-description"
    >
      {!isSuccess ? <BoxContent>
        <Typography variant="subtitle1" id="job-success-title">
          Reset your password?
        </Typography>
        <Typography
          color="text.secondary"
          variant="subtitle2"
          id="application-success-description"
        >
          Enter your email address to reset your password.
        </Typography>
        <Input
            element="input"
            type="email"
            id="email-reset"
            helperText="Your email address"
            fieldLabel="e-mail"
            label="Your e-mail"
            validators={[VALIDATOR_EMAIL()]}
            errorText="please enter an email address"
            onInput={(id, value, isValid) => setEmail(value)}
        />
        <Divider sx={{ margin: "0.5rem auto " }} />
        <Stack 
        alignItems="center" 
        direction="row" 
        justifyContent="flex-end" 
        spacing={2}>
          <Chip
            label="Close"
            color="error"
            clickable
            component="button"
            size="small"
            variant="outlined"
            onClick={onClose}
          />
          <Chip
            sx={{ minWidth: '60px' }}
            label={!isLoading ? "Submit" : <CircularProgress sx={{ color: 'white'}} size={14} />}
            color="primary"
            clickable
            component="button"
            size="small"
            onClick={handleSubmitEmail}
            disabled={!validate(email, [VALIDATOR_EMAIL()])}
          />
        </Stack>
      </BoxContent>: 
      <BoxContent>
        <Typography variant="subtitle1" id="job-success-title">
          Password reset email sent!
        </Typography>
        <Typography
          color="text.secondary"
          variant="subtitle2"
          id="application-success-description"
        >
          An email has been sent to your email address with instructions to reset your password. It may land in your Spam/Junk folder.
        </Typography>
        <Divider sx={{ margin: "0.5rem auto " }} />
       
          <Chip
          clickable
          component="button"
          size="small"
          onClick={onClose}
          label="Close"
          color="primary" />

        </BoxContent>}
    </Modal>
  );
};

export default PasswordResetModal;
