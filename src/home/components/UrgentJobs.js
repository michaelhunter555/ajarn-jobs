import React from "react";

import { Link as RouterLink } from "react-router-dom";

import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Link,
  List,
  ListItem,
  Typography,
} from "@mui/material";

const urgentJobStyles = {
  background: {
    backgroundColor: "rgba(255, 255, 255, 0.38)",
    borderRadius: "16px",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    backdropFilter: "blur(8.5px)",
    webkitBackdropFilter: "blur(8.5px)",
    border: "1px solid rgba(79, 185, 255, 0.3)",
  },
  jobText: {
    fontSize: "13px",
  },
};

const UrgentJobs = (props) => {
  const { job } = props;
  const date = new Date();
  const today = date.toLocaleDateString();

  return (
    <Card sx={urgentJobStyles.background}>
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
          {job.map((jobs, i) => (
            <Link key={jobs.id} component={RouterLink} to={`/jobs/${jobs.id}`}>
              <ListItem key={jobs.id}>
                <Typography
                  sx={urgentJobStyles.jobText}
                  variant="subtitle"
                  color="text.secondary"
                >
                  {i + 1}. {jobs.title}
                </Typography>
              </ListItem>
            </Link>
          ))}
        </List>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button variant="outlined" size="small">
          see More
        </Button>
      </CardActions>
    </Card>
  );
};

export default UrgentJobs;
