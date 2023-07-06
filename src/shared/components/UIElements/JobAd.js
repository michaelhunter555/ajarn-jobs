import React from "react";

import { Link } from "react-router-dom";
import sanitizeHtml from "sanitize-html";

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
  height: 75,
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
  marginBottom: "0.5rem",
}));

const JobAd = (props) => {
  const { job } = props;

  const sanitizedJobAd = sanitizeHtml(job?.description);

  const truncatedJobDescrition =
    sanitizedJobAd.length > 120
      ? sanitizedJobAd.substring(0, 120)
      : sanitizedJobAd;

  return (
    <Link to={`/jobs/${job?._id}`} style={{ textDecoration: "none" }}>
      <Card>
        <CardActionArea>
          <CardContent>
            <Grid container direction="row">
              <Grid item xs={4} sm={4} lg={3} xl={2}>
                <StyledMediaCard
                  component="img"
                  src={`${process.env.REACT_APP_IMAGE}${job?.image}`}
                  alt={job?._id}
                />
              </Grid>

              <Grid item xs={8} sm={8} md={8} lg={9} xl={10}>
                <Typography
                  gutterBottom
                  color="primary"
                  variant="h6"
                  component="div"
                >
                  {job?.creator?.company} -{" "}
                  {job?.title?.length > 25
                    ? job?.title.substring(0, 40) + "..."
                    : job?.title}
                </Typography>

                <StyledChipDiv variant="body2" component="div">
                  <Chip
                    label={job?.location}
                    size={"small"}
                    icon={<PlaceIcon />}
                  />
                  <Chip
                    label={job?.salary}
                    size={"small"}
                    icon={<PaymentsIcon />}
                  />
                  <Chip
                    label={job?.hours}
                    size={"small"}
                    icon={<PunchClockIcon />}
                  />
                </StyledChipDiv>
                <Typography variant="body2" color="text.secondary">
                  {truncatedJobDescrition}
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
