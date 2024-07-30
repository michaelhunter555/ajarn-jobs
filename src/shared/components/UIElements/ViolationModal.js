import React, { useContext, useEffect, useState } from "react";

import {
  Chip,
  Divider,
  FormHelperText,
  MenuItem,
  Modal,
  Paper,
  Select,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { AuthContext } from "../../context/auth-context";
import { useForm } from "../../hooks/form-hook";
import { useJobViolation } from "../../hooks/jobs-hook";
import { Content, PageContainer } from "./Footer";
import { BoxContent } from "./SuccessModal";

const violationList = [
  "Profanity",
  "Racism/Discrimination",
  "Obviously untrue statements",
  "Harmful content",
];

const ViolationModal = ({ open, onClose, jobId }) => {
  const { sendJobViolation, isPostLoading, error, clearError } =
    useJobViolation();
  const auth = useContext(AuthContext);
  const [formState, inputHandler, setFormData] = useForm(
    {
      violationReason: {
        value: "Profanity",
        isValid: true,
      },
      violationExplanation: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  const [jobResponse, setJobResponse] = useState("");

  useEffect(() => {
    if (formState?.isValid) {
      setFormData(
        {
          violationReason: {
            value: formState?.inputs?.violationReason?.value,
            isValid: true,
          },
          violationExplanation: {
            value: formState?.inputs?.violationExplanation?.value,
            isValid: true,
          },
        },
        true
      );
    }
  }, [
    formState?.inputs?.violationReason?.value,
    formState?.inputs?.violationExplanation?.value,
    formState?.isValid,
    setFormData,
  ]);

  const handleViolationPost = async () => {
    const sendFeedbackData = {
      user: auth?.user?._id,
      userName: auth?.user?.name,
      datePosted: new Date(),
      feedback: formState?.inputs?.violationExplanation?.value,
      feedbackType: formState?.inputs?.violationReason?.value,
      reportedJobId: jobId,
    };

    try {
      if (auth?.isLoggedIn) {
        const response = await sendJobViolation(sendFeedbackData);
        setJobResponse(response);
      }
    } catch (err) {
      console.log(err);
    }

    setFormData(
      {
        violationReason: {
          value: "Profanity",
          isValid: false,
        },
        violationExplanation: {
          value: "",
          isValid: false,
        },
      },
      false
    );
    //onClose();
  };

  return (
    <Modal open={open} onClose={onClose} disableScrollLock={true}>
      <Paper>
        <BoxContent>
          <PageContainer sx={{ minHeight: "100%" }}>
            <Content>
              {jobResponse ? (
                <Typography variant="subtitle1" color="text.secondary">
                  {" "}
                  {jobResponse}
                </Typography>
              ) : !isPostLoading ? (
                <Stack spacing={2}>
                  <Stack spacing={1}>
                    <Typography variant="subtitle2" color="text.secondary">
                      This report will be reviewed and a decision will be made
                      after thorough evaluation.
                    </Typography>
                    <Select
                      name="violationReason"
                      id="violationReason"
                      value={formState?.inputs?.violationReason?.value}
                      onChange={(event) =>
                        inputHandler(
                          "violationReason",
                          event.target.value,
                          true
                        )
                      }
                    >
                      {violationList?.map((violation, i) => (
                        <MenuItem key={i} value={violation}>
                          {violation}
                        </MenuItem>
                      ))}
                    </Select>
                  </Stack>
                  <Stack>
                    <FormHelperText>Explanation:</FormHelperText>
                    <TextField
                      id="violationExplanation"
                      name="violationExplanation"
                      onChange={(event) =>
                        inputHandler(
                          "violationExplanation",
                          event.target.value,
                          event.target.value.length > 6
                        )
                      }
                      rows={5}
                      multiline
                    />
                  </Stack>
                </Stack>
              ) : (
                isPostLoading && (
                  <>
                    <Skeleton width="100%" variant="text" />
                    <Skeleton width="80%" variant="text" />
                    <Skeleton width="80%" variant="text" />
                  </>
                )
              )}
            </Content>
            <Divider sx={{ margin: "0.5rem auto", width: "100%" }} flexItem />
            <Stack
              direction="row"
              alignItems="center"
              spacing={2}
              justifyContent="flex-end"
            >
              <Chip
                onClick={onClose}
                color="error"
                component="button"
                clickable
                label="cancel"
              />
              <Chip
                disabled={!auth?.isLoggedIn || !formState.isValid}
                component="button"
                clickable
                label="send"
                onClick={handleViolationPost}
              />
            </Stack>
          </PageContainer>
        </BoxContent>
      </Paper>
    </Modal>
  );
};

export default ViolationModal;
