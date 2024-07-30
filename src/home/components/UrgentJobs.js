import React from "react";

import { Link as RouterLink } from "react-router-dom";

import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import { Card, Chip, Link, List, ListItem, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledJobText = styled(Typography)(({ theme }) => ({
  fontSize: "14px",
}));
const StyledTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));
const UrgentJobs = (props) => {
  const { job } = props;
  const date = new Date();
  const today = date.toLocaleDateString();

  //for now max of 2 jobs
  const urgentJobLimit = job?.slice(0, 3);

  return (
    <>
      <StyledTitle variant="h5" color="text.secondary">
        Urgent Jobs
      </StyledTitle>
      <Card>
        <Chip
          label={`Urgent - ${today}`}
          size={"small"}
          color="error"
          icon={<WorkOutlineIcon />}
        />

        <List>
          {urgentJobLimit &&
            urgentJobLimit?.map((jobs, i) => (
              <Link
                key={jobs?._id}
                component={RouterLink}
                to={`/jobs/${jobs?._id}/${jobs?.title
                  ?.replace(/\s+/g, "-")
                  .toLowerCase()}`}
              >
                <ListItem key={jobs?._id}>
                  <StyledJobText color="text.secondary">
                    {i + 1}. {jobs?.title}
                  </StyledJobText>
                </ListItem>
              </Link>
            ))}
        </List>
      </Card>
    </>
  );
};

export default UrgentJobs;
