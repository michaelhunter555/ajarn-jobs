import React from "react";

import { Button, FormHelperText, Grid, Stack, TextField } from "@mui/material";

const FeedbackForm = ({ formState, inputHandler, onSubmitFeedback, auth }) => {
  const handleFeedbackSubmit = (event) => {
    event.preventDefault();

    const feedbackData = {};
    //api
    onSubmitFeedback(feedbackData);
  };
  return (
    <form onSubmit={handleFeedbackSubmit}>
      <Grid container direction="column" spacing={2}>
        <Grid item xs={12}>
          <FormHelperText>
            Please provide a brief explanation: (300 words max.)
          </FormHelperText>
          <TextField
            multiline
            rows={6}
            fullWidth
            id="feedbackText"
            value={formState?.inputs?.feedbackText?.value}
            onChange={(event) =>
              inputHandler(
                "feedbackText",
                event.target.value,
                event.target.value.length > 10
              )
            }
          />
        </Grid>
      </Grid>
      <Stack
        direction="row"
        justifyContent="flex-end"
        sx={{ marginTop: "1rem" }}
      >
        <Button
          variant="contained"
          type="submit"
          disabled={!formState?.isValid || !auth?.isLoggedIn}
        >
          Submit
        </Button>
      </Stack>
    </form>
  );
};

export default FeedbackForm;
