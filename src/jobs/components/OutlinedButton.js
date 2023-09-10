import React, { useContext } from "react";

import { Link as RouterLink } from "react-router-dom";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Button, Grid, Modal, Paper, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import { AuthContext } from "../../shared/context/auth-context";

const StyledBoxModal = styled(Paper)({
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
});

const StyledApplyButtonContainer = styled(Stack)(({ theme, applied }) => ({
  flexDirection: "row",
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

  if (auth.isLoggedIn) {
    outlinedButton = (
      <>
        <StyledApplyButtonContainer
          direction="column"
          alignItems="center"
          spacing={1}
        >
          <Button
            size="small"
            sx={{ borderRadius: "17px" }}
            onClick={applyJobModalHandler}
            variant="outlined"
          >
            Apply Now
          </Button>
          {appliedAlready && appliedAlready && (
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
        <Modal
          open={open}
          onClose={applyJobModalHandler}
          disableScrollLock={true}
        >
          <StyledBoxModal>
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={12} sm={9} md={6} sx={{ marginBottom: 5 }}>
                <Typography>
                  You're about to apply to {job?.creator?.company}'s job for{" "}
                  {job?.title}.
                </Typography>

                <Typography color="text.secondary" variant="subtitle2">
                  You currently{" "}
                  {auth.user?.resume?.length > 0
                    ? "have a resume"
                    : "don't have a resume "}{" "}
                  on file.{" "}
                  {auth.user?.resume?.length > 0 ? "✅" : "Please add one.⛔"}
                </Typography>
                <Typography color="text.secondary" variant="subtitle2">
                  You currently{" "}
                  {auth.user?.coverLetter
                    ? "have a cover letter"
                    : "don't have a cover letter "}{" "}
                  on file. {auth.user?.coverLetter ? "✅" : "Please add one.⛔"}
                </Typography>

                {auth.user?.userType === "employer" && (
                  <Typography color="text.secondary" variant="subtitle2">
                    You're registered as an {auth.user?.userType}.You can not
                    apply to jobs. ⛔
                  </Typography>
                )}

                {auth.user?.coverLetter && auth.user?.resume && (
                  <Typography
                    sx={{ marginTop: "1rem" }}
                    color="text.secondary"
                    variant="subtitle2"
                  >
                    You may apply to this job!
                  </Typography>
                )}
              </Grid>

              <Grid
                item
                xs={12}
                sm={9}
                md={6}
                sx={{ display: "flex", flexDirection: "row" }}
                alignItems="center"
                justifyContent="space-between"
              >
                <Stack spacing={2} direction="row">
                  <Button
                    onClick={applyToJobHandler}
                    variant="contained"
                    disabled={cantApply}
                  >
                    Apply
                  </Button>
                  <Button
                    onClick={() => closeJob(false)}
                    color="error"
                    variant="outlined"
                  >
                    close
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </StyledBoxModal>
        </Modal>
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
