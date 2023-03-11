import "./JobAd.css";

import React from "react";

import { FaMoneyBillWave } from "react-icons/fa";
import { MdAvTimer, MdLocationPin } from "react-icons/md";
import { Link } from "react-router-dom";

import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";

const JobAd = (props) => {
  const { job } = props;

  return (
    <Link to={`/jobs/${job.id}`} className="job-ad__link">
      <Card sx={{ backgroundColor: "#fffef9" }} component="div">
        <CardActionArea>
          <CardContent>
            <Grid container direction="row">
              <Grid item xs={3.5} sm={4} lg={3} xl={2}>
                <CardMedia
                  component="img"
                  sx={{
                    width: 100,
                    border: "1px solid #a5a5a5",
                    borderRadius: 3,
                  }}
                  image={job.creator.logoUrl}
                  alt={job.id}
                />
              </Grid>

              <Grid item xs={8.5} sm={8} md={8} lg={9} xl={10}>
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
                <Typography variant="body2" color="text.secondary">
                  <p>
                    <MdLocationPin />
                    {job.location} - <FaMoneyBillWave />
                    {job.salary} - <MdAvTimer />
                    {job.hours}
                  </p>
                  <p>
                    {job.description.length > 60
                      ? job.description.substring(0, 60) + "..."
                      : job.description}
                  </p>
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

/**
 * <Link to={`/jobs/${job.id}`} className="job-ad__link">
 * <Card sx={{ backgroundColor: 'transparent' component="div" }}>
 * <CardActionArea>
 * <CardContent>
 * <Typography gutterButton variant="h5" component="div">
 * {job.title.length > 25
 * ? job.title.substring(0,40) + '...' : job.title}
 * </Typography>
 * <Typography variant="body2" color="text.secondary">
 * {job.location}
 * </Typography>
 * </CardContent>
 * </CardActionArea>
 * </Card>
 * </Link>
 */
