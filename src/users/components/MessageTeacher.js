import React, { useContext, useEffect, useState } from "react";

import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import { AuthContext } from "../../shared/context/auth-context";
import { useJob } from "../../shared/hooks/jobs-hook";
import RecruitJobSelectionList from "./RecruitJobSelectionList";

const MessageTeacher = (props) => {
  const [selectedJob, setSelectedJob] = useState();
  const [message, setMessage] = useState(
    `Dear ${props.userName}, we saw your profile and feel you might be a fit for...`
  );
  const auth = useContext(AuthContext);
  const { getJobsByUserId, sendRecruitmentOffer, isPostLoading } = useJob();

  const canRecruit =
    auth?.isLoggedIn &&
    auth?.user?.userType === "employer" &&
    auth?.user?.buffetIsActive;

  const { data: jobs, isLoading: jobsIsLoading } = useQuery({
    queryKey: ["jobRecruitments", auth?.user?._id],
    queryFn: () => getJobsByUserId(auth?.user?._id),
    staleTime: 5 * 60 * 60 * 1000,
    enabled: Boolean(canRecruit && auth?.user?._id),
  });

  useEffect(() => {
    if (jobs && jobs.length > 0 && !selectedJob) {
      setSelectedJob(jobs[0]);
    }
  }, [jobs, selectedJob]);

  const handleRecruitmentAction = async () => {
    const recruitmentInfo = {
      userId: auth?.user?._id,
      teacherId: props.teacherId,
      jobId: selectedJob?._id,
      creatorId: selectedJob?.creator?._id,
      jobTitle: selectedJob?.title,
      salary: selectedJob?.salary,
      location: selectedJob?.location,
      company: selectedJob?.creator?.company,
      message: message,
    };
    console.log("recruitment info", recruitmentInfo);
    await sendRecruitmentOffer(recruitmentInfo);
    props.closeModal();
  };

  const messageIsTooLong =
    message.split(/\s+/g).length > 100 || message.length > 600;

  return (
    <Box sx={{ padding: "1rem" }}>
      {!jobsIsLoading && !isPostLoading && (
        <>
          <Typography color="text.secondary" variant="body1">
            Recruit for Job:{" "}
          </Typography>
          <RecruitJobSelectionList
            jobs={jobs}
            onSelectedJob={(job) => setSelectedJob(job)}
          />
        </>
      )}
      {isPostLoading && <CircularProgress />}
      {jobsIsLoading && <CircularProgress />}
      {!jobsIsLoading && !isPostLoading && (
        <Divider sx={{ maxWidth: "90%", margin: "1rem 0" }} />
      )}
      {!jobsIsLoading && !isPostLoading && (
        <>
          <Typography color="text.secondary" variant="body1">
            Body:{" "}
          </Typography>
          <TextField
            fullWidth
            helperText="Briefly introduce and describe the job (max 100 words or 600 characters)."
            multiline
            rows={4}
            onChange={(event) => setMessage(event.target.value)}
            value={message}
          />
        </>
      )}

      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Stack spacing={2} direction="row" alignItems="center">
          <div>
            {messageIsTooLong && (
              <Typography sx={{ fontSize: 11 }} color="error">
                Your message has exceeded 100 words. Please reduce your word
                count.
              </Typography>
            )}
          </div>
          <Chip
            label={"Cancel"}
            color="error"
            variant="outlined"
            component={Button}
            onClick={props.closeModal}
            sx={{ marginTop: 1 }}
          />
          <Chip
            label={isPostLoading ? "loading..." : "Send"}
            component={Button}
            clickable
            disabled={messageIsTooLong || !selectedJob?._id || !canRecruit}
            variant="contained"
            sx={{ marginTop: 1 }}
            onClick={handleRecruitmentAction}
          />
        </Stack>
      </Box>
    </Box>
  );
};

export default MessageTeacher;
