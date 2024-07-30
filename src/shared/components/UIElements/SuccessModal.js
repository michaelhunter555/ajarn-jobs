import React from "react";

import { Chip, Divider, Modal, Paper, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

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

const SuccessModal = ({ success, clearModalHandler }) => {
  return (
    <Modal
      disableScrollLock={true}
      open={success}
      onClose={clearModalHandler}
      aria-labelledby="application-succes-title"
      aria-describedby="application-success-description"
    >
      <BoxContent>
        <Typography variant="subtitle1" id="job-success-title">
          You have applied to this job!
        </Typography>
        <Typography
          color="text.secondary"
          variant="subtitle2"
          id="application-success-description"
        >
          The creator of this job post has been notified of your application.
          You will be contacted if shorstlisted.
        </Typography>
        <Divider sx={{ margin: "0.5rem auto " }} />
        <Stack alignItems="end">
          <Chip
            label="Close"
            color="primary"
            clickable
            component="button"
            size="small"
            onClick={clearModalHandler}
          />
        </Stack>
      </BoxContent>
    </Modal>
  );
};

export default SuccessModal;
