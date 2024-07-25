import React from "react";

import {
  Alert,
  Button,
  Divider,
  FormHelperText,
  Grid,
  Modal,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledBoxModal = styled(Paper)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  height: "auto",
  bgcolor: "background.paper",
  border: "2px solid #fff",
  borderRadius: "15px",
  boxShadow: 24,
  padding: 14,
  [theme.breakpoints.down("sm")]: {
    width: "90%",
  },
}));

const ApplyToFeaturedJobModal = ({
  job,
  open,
  onClose,
  incompleteTeacher,
  employerClickedApply,
  onApplyToJob,
}) => {
  return (
    <Modal open={open} onClose={onClose} disableScrollLock={true}>
      <StyledBoxModal>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{ padding: { xs: 0, md: 2 } }}
        >
          <Grid item xs={12} sm={9} md={6} sx={{ marginBottom: 5 }}>
            <Typography>
              You're about to apply to {job?.creator?.company}'s job for{" "}
              <b>{job?.title}</b>.
            </Typography>
            <Divider sx={{ width: "100%", margin: "0.5rem auto 0" }} />
            <Alert
              severity={
                incompleteTeacher || employerClickedApply ? "error" : "success"
              }
            >
              {incompleteTeacher &&
                "Your profile is incomplete, please make sure you have completed the profile checklist."}
              {employerClickedApply &&
                `Employers cannot apply to jobs. ${String.fromCodePoint(
                  0x1f641
                )}`}
              {!incompleteTeacher &&
                !employerClickedApply &&
                "You are eligible for submitting an application!"}
            </Alert>
          </Grid>
          <FormHelperText>
            You can only apply to a job once. Make sure your profile is ready!
          </FormHelperText>
          <Divider
            variant="inset"
            flexItem
            sx={{ width: "100%", margin: "0.5rem auto" }}
          />

          <Grid
            item
            xs={12}
            sm={9}
            md={6}
            sx={{ display: "flex", flexDirection: "row", width: "100%" }}
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack
              spacing={2}
              direction="row"
              justifyContent="end"
              sx={{ width: "100%" }}
            >
              <Button
                size="small"
                onClick={onClose}
                color="error"
                variant="outlined"
              >
                close
              </Button>
              <Button
                size="small"
                onClick={onApplyToJob}
                variant="contained"
                disabled={incompleteTeacher || employerClickedApply}
              >
                Apply
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </StyledBoxModal>
    </Modal>
  );
};
export default ApplyToFeaturedJobModal;
