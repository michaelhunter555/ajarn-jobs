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

const StyledUrgentJobCard = styled(Card)(({ theme }) => ({
  backgroundColor: "rgba(255, 255, 255, 0.38)",
  borderRadius: "16px",
  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
  backdropFilter: "blur(8.5px)",
  webkitBackdropFilter: "blur(8.5px)",
  border: "1px solid rgba(79, 185, 255, 0.3)",
}));

const StyledJobText = styled(Typography)({
  fontSize: "13px",
});

const UrgentJobs = (props) => {
  const { job } = props;
  const date = new Date();
  const today = date.toLocaleDateString();

  const urgentJobLimit = job.slice(0, 2);

  return (
    <StyledUrgentJobCard>
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
                <StyledJobText variant="subtitle" color="text.secondary">
                  {i + 1}. {jobs.title}
                </StyledJobText>
              </ListItem>
            </Link>
          ))}
        </List>
      </CardContent>
    </StyledUrgentJobCard>
  );
};

export default UrgentJobs;
