import React from "react";

import { Link as RouterLink } from "react-router-dom";

import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import {
  Card,
  CardContent,
  Chip,
  Link,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledJobText = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  ...theme.typography.button,
}));

const UrgentJobs = (props) => {
  const { job } = props;
  const date = new Date();
  const today = date.toLocaleDateString();

  //for now max of 2 jobs
  const urgentJobLimit = job.slice(0, 2);

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          <Chip
            label={`Urgent - ${today}`}
            size={"small"}
            color="error"
            icon={<WorkOutlineIcon />}
          />
        </Typography>
        <List>
          {urgentJobLimit.map((jobs, i) => (
            <Link key={jobs.id} component={RouterLink} to={`/jobs/${jobs.id}`}>
              <ListItem key={jobs.id}>
                <StyledJobText color="text.secondary">
                  {i + 1}. {jobs.title}
                </StyledJobText>
              </ListItem>
            </Link>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default UrgentJobs;
