import React from "react";

import { Link as RouterLink } from "react-router-dom";

import InfoIcon from "@mui/icons-material/Info";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Link,
  Tooltip,
  Typography,
} from "@mui/material";

const teflStyles = {
  container: {
    minWidth: "auto",
  },
  text: {
    fontSize: 11,
  },
  secondText: {
    marginBottom: 1.5,
  },
};

const link = (
  <Link component={RouterLink} to={`/ads`}>
    View
  </Link>
);

const Tefl = (props) => {
  return (
    <Card sx={teflStyles.container}>
      <CardContent>
        <Typography sx={teflStyles.text} color="text.secondary" gutterBottom>
          <Chip
            size="small"
            label="sponsored"
            icon={
              <Tooltip title={`why this ad? ${link}`}>
                <InfoIcon />
              </Tooltip>
            }
          />
        </Typography>

        <Typography variant="h5" component="div">
          125-Hour TEFL Course
        </Typography>

        <Typography variant="subtitle2" color="text.secondary">
          Get Qualified and start Teaching.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};

export default Tefl;
