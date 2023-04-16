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
import { styled } from "@mui/material/styles";

const StyledMediaCard = styled(CardMedia)({
  width: "75%",
  border: "1px solid #e5e5e5",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
    borderColor: "rgba(0, 128, 255, 0.8)",
  },
  borderRadius: 3,
});

const StyledChipDiv = styled(Typography)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: "5px",
  color: theme.palette.text.secondary,
}));

const JobAd = (props) => {
  const { job } = props;

  return (
    <Link to={`/jobs/${job.id}`} style={{ textDecoration: "none" }}>
      <Card
        raised={true}
        sx={{ border: "1px solid #a1bcff", borderRadius: "15px" }}
      >
        <CardActionArea>
          <CardContent>
            <Grid container direction="row">
              <Grid item xs={4} sm={4} lg={3} xl={2}>
                <StyledMediaCard
                  component="img"
                  src={job.creator.logoUrl}
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

                <StyledChipDiv variant="body2" component="div">
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
                </StyledChipDiv>
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
