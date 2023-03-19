import React from "react";

import { Link } from "react-router-dom";

import PaymentsIcon from "@mui/icons-material/Payments";
import PlaceIcon from "@mui/icons-material/Place";
import PunchClockIcon from "@mui/icons-material/PunchClock";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  List,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledJobAdCard = styled(Card)(({ theme, featured }) => ({
  backgroundColor: featured === true ? "#fffef9" : "#fafafa",
  border: featured ? "1px solid #faea92" : "1px solid #e5e5e5",
}));

const StyledChipDiv = styled(Typography)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: "5px",
  color: theme.palette.text.secondary,
}));

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

const JobAdsList = (props) => {
  const { job } = props;

  if (job.length === 0) {
    return (
      <Box>
        <Card sx={{ padding: "0 2rem" }}>
          <h2>
            No jobs found. Please check back again in the future or create one.
          </h2>
          <Button component={Link} to="/job/new">
            Create a job
          </Button>
        </Card>
      </Box>
    );
  }

  return (
    <>
      {job.map((school, i) => (
        <List key={school.id}>
          <Link to={`/jobs/${school.id}`}>
            <StyledJobAdCard
              component="div"
              featured={school.jobType.featured ? true : false}
            >
              <CardActionArea>
                <CardContent>
                  <Grid container direction="row">
                    <Grid item xs={4} sm={4} lg={3} xl={2}>
                      <StyledMediaCard
                        component="img"
                        image={school.creator.logoUrl}
                        alt={school.id}
                      />
                    </Grid>

                    <Grid item xs={8} sm={8} md={8} lg={9} xl={10}>
                      <Typography
                        gutterBottom
                        color="primary"
                        variant="h5"
                        component="div"
                      >
                        {school.creator.company} -{" "}
                        {school.title.length > 25
                          ? school.title.substring(0, 40) + "..."
                          : school.title}
                      </Typography>

                      <StyledChipDiv variant="body2" component="div">
                        <Chip
                          label={school.location}
                          size={"small"}
                          icon={<PlaceIcon />}
                        />
                        <Chip
                          label={school.salary}
                          size={"small"}
                          icon={<PaymentsIcon />}
                        />
                        <Chip
                          label={school.hours}
                          size={"small"}
                          icon={<PunchClockIcon />}
                        />
                      </StyledChipDiv>
                      <Typography variant="body2" color="text.secondary">
                        {school.description.length > 60
                          ? school.description.substring(0, 60) + "..."
                          : school.description}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </CardActionArea>
            </StyledJobAdCard>
          </Link>
        </List>
      ))}
    </>
  );
};

export default JobAdsList;
