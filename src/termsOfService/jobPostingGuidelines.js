import React from "react";

import {
  Alert,
  Button,
  Divider,
  Modal,
  Stack,
  Typography,
} from "@mui/material/";

import { StyledBoxContainer } from "../shared/components/UIElements/CustomModal";

const jobPostingGuidelines = [
  {
    id: 1,
    rule: "Job Listing must be as true and accurate as possible so to that the candidates can commit their time to apply for your open positions. Job location and salary cannot be updated if users have already applied. No exceptions.",
  },
  {
    id: 2,
    rule: "Job listings must state whether a work permit will be offered.",
  },
  {
    id: 3,
    rule: "Do not post the same exact job more than once in 7 days. You can post as many unique jobs as you desire. ",
  },
  {
    id: 4,
    rule: "All job posts must completely and coherently explain the job, it's requirements, location, benefits (if any) and length of contract.",
  },
  {
    id: 5,
    rule: "Zero-tolerance for racism or discrimination. Your job post will be removed and your account banned.",
  },

  {
    id: 6,
    rule: "Zero-tolrance for use of profanity, slurs and other types of offensive language that is likely to offend others. Your job post will be removed and account suspended.",
  },
  {
    id: 7,
    rule: "Stick to the point and only include relevant information to job and/or company.",
  },
];

const JobPostingGuidelinesModal = ({ open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose} disableScrollLock={true}>
      <StyledBoxContainer sx={{ width: 600, padding: "2rem" }}>
        <Stack>
          <Alert severity="warning">
            Violating our guidlines will see your job removed.
          </Alert>
          <Typography variant="h5">Job Posting Guidelines</Typography>
          <Typography gutterBottom variant="subtitle2" color="text.secondary">
            Our aim is to provide a safe and robust platform that encourages
            positivity and inclusiveness. Below are the rules that every job
            post must follow.
          </Typography>
        </Stack>
        <Divider flexItem sx={{ margin: "0.5rem auto" }} />
        <Stack spacing={3}>
          {jobPostingGuidelines?.map(({ id, rule }, i) => (
            <Typography color="text.secondary" variant="subtile1" key={id}>
              {id}. {rule}
            </Typography>
          ))}
        </Stack>
        <Stack alignItems="flex-end">
          <Divider />
          <Button onClick={onClose}>I understand</Button>
        </Stack>
      </StyledBoxContainer>
    </Modal>
  );
};

export default JobPostingGuidelinesModal;
