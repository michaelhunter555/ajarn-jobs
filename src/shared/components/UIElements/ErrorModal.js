import React from "react";

import { Button, Modal, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const BoxContent = styled(Paper)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  padding: 20,
  textAlign: "center",
});

const ErrorModal = (props) => {
  return (
    <Modal
      disableScrollLock={true}
      onClose={props.onClear}
      header="An Error Occurred!"
      open={!!props.error}
      footer={<Button onClick={props.onClear}>Okay</Button>}
    >
      <BoxContent>
        <Typography variant="body1" id="job-success-title">
          There was an Error...
        </Typography>
        <Typography
          color="text.secondary"
          variant="subtitle2"
          id="error-description"
        >
          {props.error}
        </Typography>
      </BoxContent>
    </Modal>
  );
};

export default ErrorModal;
