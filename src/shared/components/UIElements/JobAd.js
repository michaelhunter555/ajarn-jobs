import "./JobAd.css";

import React from "react";

import { Link } from "react-router-dom";

import PaymentsIcon from "@mui/icons-material/Payments";
import PlaceIcon from "@mui/icons-material/Place";
import PunchClockIcon from "@mui/icons-material/PunchClock";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  Typography,
} from "@mui/material";

const JobAd = (props) => {
  const { job } = props;

  return (
    <Link to={`/jobs/${job.id}`} className="job-ad__link">
      <Card
        sx={{ backgroundColor: "#fffef9", border: "1px solid #faea92" }}
        component="div"
      >
        <CardActionArea>
          <CardContent>
            <Grid container direction="row">
              <Grid item xs={4} sm={4} lg={3} xl={2}>
                <CardMedia
                  component="img"
                  sx={{
                    width: "75%",
                    border: "1px solid #e5e5e5",
                    transition: "all 0.3s ease-in-out",
                    "&:hover": {
                      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
                      borderColor: "rgba(0, 128, 255, 0.8)",
                    },
                    borderRadius: 3,
                  }}
                  image={job.creator.logoUrl}
                  alt={job.id}
                />
              </Grid>

              <Grid item xs={8} sm={8} md={8} lg={9} xl={10}>
                <Typography
                  gutterBottom
                  color="primary"
                  variant="h5"
                  component="div"
                >
                  {job.creator.company} -{" "}
                  {job.title.length > 25
                    ? job.title.substring(0, 40) + "..."
                    : job.title}
                </Typography>
                {/*need to validate domNesting wit p-tags here... */}
                <Typography
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "5px",
                  }}
                  variant="body2"
                  color="text.secondary"
                  component="div"
                >
                  <Chip
                    label={job.location}
                    size={"small"}
                    icon={<PlaceIcon />}
                  />
                  <Chip
                    label={job.salary}
                    size={"small"}
                    icon={<PaymentsIcon />}
                  />
                  <Chip
                    label={job.hours}
                    size={"small"}
                    icon={<PunchClockIcon />}
                  />
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {job.description.length > 60
                    ? job.description.substring(0, 60) + "..."
                    : job.description}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
};

export default JobAd;
