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
  List,
  Stack,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledJobAdCard = styled(Card)(({ theme, featured }) => ({
  backgroundColor: featured ? "#fffef9" : "",
  border: featured ? "1px solid #faea92" : "1px solid #e5e5e5",
}));

const StyledChipDiv = styled(Typography)(({ theme, featured }) => ({
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

const StyledChip = styled(Chip)(({ theme, featured }) => ({
  backgroundColor: featured ? "#faea92" : "#e5e5e5",
}));

const JobAdsList = (props) => {
  const { job } = props;

  return (
    <>
      {job.map((school, i) => (
        <List key={school?._id}>
          <Link to={`/jobs/${school?._id}`} style={{ textDecoration: "none" }}>
            <StyledJobAdCard
              component="div"
              featured={school.jobType === "featured"}
            >
              <CardActionArea>
                <CardContent>
                  <Grid container direction="row">
                    <Grid item xs={4} sm={4} lg={3} xl={2}>
                      <StyledMediaCard
                        component="img"
                        image={school?.image}
                        alt={`${school?._id}--${school.creator.company}`}
                      />
                    </Grid>

                    <Grid item xs={8} sm={8} md={8} lg={9} xl={10}>
                      <Stack spacing={0} alignItems="start">
                        <Typography color="primary" variant="h5">
                          {school?.creator?.company} -{" "}
                          {school.title.length > 25
                            ? school.title.substring(0, 40) + "..."
                            : school.title}
                        </Typography>
                        <Typography
                          gutterBottom
                          variant="subtitle2"
                          color="text.secondary"
                        >
                          Listed • {school?.datePosted.split("T")[0]}
                        </Typography>
                      </Stack>
                      <StyledChipDiv variant="body2" component="div">
                        <StyledChip
                          label={school.location}
                          size={"small"}
                          icon={<PlaceIcon />}
                          featured={school.jobType === "featured"}
                        />
                        <StyledChip
                          label={school.salary}
                          size={"small"}
                          icon={<PaymentsIcon />}
                          featured={school.jobType === "featured"}
                        />
                        <StyledChip
                          label={school.hours}
                          size={"small"}
                          icon={<PunchClockIcon />}
                          featured={school.jobType === "featured"}
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
