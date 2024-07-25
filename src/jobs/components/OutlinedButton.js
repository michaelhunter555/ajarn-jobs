import React, { useContext } from "react";

import { Link as RouterLink } from "react-router-dom";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Button, Modal, Paper, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import ApplyToFeaturedJobModal from "../../home/components/ApplyToFeaturedJobModal";
import { AuthContext } from "../../shared/context/auth-context";

const StyledBoxModal = styled(Paper)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
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

const StyledApplyButtonContainer = styled(Stack)(({ theme, applied }) => ({
  flexDirection: "row",
  width: "100%",
  [theme.breakpoints.down("md")]: {
    width: "100%",
    flexDirection: "column",
  },
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    flexDirection: "column",
  },
}));

export const OutlinedButton = (props) => {
  const auth = useContext(AuthContext);
  const {
    applyJobModalHandler,
    open,
    job,
    closeJob,
    applyToJobHandler,
    closeSuccess,
    onSuccess,
    appliedAlready,
    cantApply,
  } = props;

  let outlinedButton;

  const incompleteTeacher = cantApply && auth?.user?.userType === "teacher";
  const employerClickedApply = cantApply && auth?.user?.userType === "employer";

  if (auth.isLoggedIn) {
    outlinedButton = (
      <>
        <StyledApplyButtonContainer
          direction="column"
          alignItems="center"
          justifyContent="center"
          spacing={1}
        >
          <Button
            size="large"
            disabled={appliedAlready}
            sx={{ borderRadius: "17px" }}
            onClick={applyJobModalHandler}
            variant="outlined"
          >
            {appliedAlready ? "Applied" : "Apply Now"}
          </Button>
          {appliedAlready && (
            <>
              <CheckCircleIcon style={{ color: "green" }} />
              <Typography
                sx={{ fontSize: 11 }}
                variant="subtitle2"
                color="text.secondary"
              >
                Application submitted
              </Typography>
            </>
          )}
        </StyledApplyButtonContainer>
        <ApplyToFeaturedJobModal
          open={open}
          onClose={applyJobModalHandler}
          job={job}
          incompleteTeacher={incompleteTeacher}
          employerClickedApply={employerClickedApply}
          onApplyToJob={applyToJobHandler}
        />

        <Modal open={onSuccess} onClose={closeSuccess}>
          <StyledBoxModal>
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <Typography>
                You have successfully Applied to this job!
              </Typography>
              <Typography>
                The employer will contact you if you are shortlisted.
              </Typography>
              <Button onClick={closeSuccess}>Close</Button>
            </Stack>
          </StyledBoxModal>
        </Modal>
      </>
    );
  } else {
    outlinedButton = (
      <Stack alignItems="flex-start">
        <Button
          sx={{ borderRadius: "17px" }}
          component={RouterLink}
          to="/auth"
          variant="outlined"
        >
          login/join
        </Button>
      </Stack>
    );
  }
  return <>{outlinedButton}</>;
};
