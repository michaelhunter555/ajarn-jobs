import React from "react";

import { Typography } from "@mui/material";

const PreExplanationText = ({ component }) => {
  switch (component) {
    case "question":
      return (
        <>
          <Typography variant="h5" color="text.secondary">
            General Questions
          </Typography>
          <Typography gutterBottom variant="subtitle2" color="text.secondary">
            General Questions pertain to any questions about teaching, our
            website or finding work in Thailand. You must have an account and a
            verified e-mail to ask general questions.
          </Typography>
        </>
      );
    case "bug":
      return (
        <>
          <Typography variant="h5" color="text.secondary">
            Issues with the Site
          </Typography>
          <Typography gutterBottom variant="subtitle2" color="text.secondary">
            If you have come across an issue hindering your actions or causing
            unintended results, please let us know asap. We will investigate the
            issue and if a fix is needed, you may be rewarded.
          </Typography>
        </>
      );
    case "violation":
      return (
        <>
          <Typography variant="h5" color="text.secondary">
            Violation
          </Typography>
          <Typography gutterBottom variant="subtitle2" color="text.secondary">
            Use this option when a job post, or user has violated our terms of
            service. This should only be initiated when clear an obvious
            infractions are taking place. We take these issues very seriously.
          </Typography>
          <Typography gutterBottom variant="h5" color="text.secondary">
            How to find job or user Id
          </Typography>
          <Typography gutterBottom variant="subtitle2" color="text.secondary">
            for example take the example url
            ajarnjobs.com/jobs/669f754f0982d59d3967f281/afterschool-tutor-for-2-homeschooled-students,
            the id would be id: <code>669f754f0982d59d3967f281</code>. The same
            follows for users. If you are reporting an employer, you can simply
            share the jobId.
          </Typography>
        </>
      );
    case "suggestion":
      return (
        <>
          <Typography variant="h5" color="text.secondary">
            Site Suggestion for Improved UX
          </Typography>
          <Typography gutterBottom variant="subtitle2" color="text.secondary">
            We love new ideas and are always thinking about how to improve the
            AjarnJobs.com. If you want to share your ideas, please do not
            hesitate!
          </Typography>
        </>
      );
    default:
      return "";
  }
};

export default PreExplanationText;
