import React from "react";

import {
  Box,
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

const MessageTeacher = (props) => {
  const submitEmailHandler = (event) => {
    event.preventDefault();
    console.log(event.target.value);
  };

  return (
    <Box>
      <form onSubmit={submitEmailHandler} style={{ padding: "1rem" }}>
        <Typography color="text.secondary" variant="body1">
          To:{" "}
        </Typography>
        <TextField
          sx={{ margin: "1rem auto" }}
          fullWidth
          defaultValue={props.userName || ""}
          helperText="email is already added for you."
          disabled={true}
        />
        <Divider sx={{ maxWidth: "90%", margin: "0 0 1rem 0" }} />
        <Typography color="text.secondary" variant="body1">
          Body:{" "}
        </Typography>
        <TextField
          fullWidth
          helperText="Send the user a short message requesting further discussion."
          multiline
          rows={4}
          defaultValue={
            `Dear ${props.userName}, we would like to arrange a meeting to further discuss your teaching experience...` ||
            ""
          }
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Stack spacing={2} direction="row">
            <Button
              sx={{ marginTop: 1 }}
              variant="outlined"
              color="error"
              onClick={props.closeModal}
            >
              cancel
            </Button>
            <Button sx={{ marginTop: 1 }} variant="contained" type="submit">
              Send Email
            </Button>
          </Stack>
        </Box>
      </form>
    </Box>
  );
};

export default MessageTeacher;
