import React from "react";

import PaymentsTwoToneIcon from "@mui/icons-material/PaymentsTwoTone";
import PlaceIcon from "@mui/icons-material/Place";
import PunchClockIcon from "@mui/icons-material/PunchClock";
import {
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Grid,
  Typography,
} from "@mui/material";

import { useThemeToggle } from "../shared/context/theme-context";

const job = {
  _id: "123456",
  title: "Head English Teacher",
  image:
    "https://res.cloudinary.com/dtqbxfe7r/image/upload/v1721352295/whxydl6t2fmyjhqjsjpp.png",
  creator: {
    company: "English Tech Company Inc.",
  },
  location: "Chiang Mai",
  salary: "120,000 - 140,000",
  hours: "Full-time",
  description:
    "We are looking for a Senior Head Teacher with 5+ years of experience. You will be responsible for designing and implementing robust curriculums, working with a team of talented engineers, and delivering high-quality software solutions.",
};

const truncatedJobDescrition =
  job.description.length > 100
    ? job.description.substring(0, 100) + "..."
    : job.description;

const StyledMediaCard = (props) => (
  <img {...props} style={{ width: "100%", height: "auto" }} />
);

const StyledChipDiv = (props) => (
  <div
    style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "8px" }}
  >
    {props.children}
  </div>
);

const StyledChip = (props) => <Chip {...props} />;

const DemoJobCard = ({ featured }) => {
  const { isDarkMode } = useThemeToggle();

  return (
    <Grid container>
      <Grid item xs={12} md={3} sx={{ padding: 2 }}>
        <Typography fontWeight={700} align="center">
          Cost: {featured ? "10 Credits" : "5 Credits"}
        </Typography>
        <Typography color="text.secondary" gutterBottom>
          {featured
            ? "featured posts are prominently displayed on the jobs page list. This makes your job post distinctive and eye-catching."
            : "Basic job posts carry all necessary information regarding the employer and details regarding the job where users can visit the job page."}
        </Typography>
      </Grid>
      <Grid item xs={12} md={9}>
        <Card
          sx={{
            backgroundColor:
              isDarkMode && featured
                ? "#303f42"
                : !isDarkMode && featured
                ? "#f5f2e4"
                : "",
            ...(isDarkMode && featured
              ? { boxShadow: "0 0 20px rgba(112, 180, 247, 0.5)" }
              : {}),
          }}
        >
          <CardActionArea>
            <CardContent>
              <Grid container direction="row" spacing={2}>
                <Grid item xs={4} sm={4} lg={3} xl={2}>
                  <StyledMediaCard
                    component="img"
                    src={`${job.image}`}
                    alt={job._id}
                  />
                </Grid>

                <Grid item xs={8} sm={8} md={8} lg={9} xl={10}>
                  <Typography
                    gutterBottom
                    sx={{ color: "text.secondary" }}
                    variant="h6"
                    component="div"
                  >
                    {job.creator.company} -{" "}
                    {job.title.length > 25
                      ? job.title.substring(0, 25) + "..."
                      : job.title}{" "}
                    {featured && (
                      <Chip
                        sx={{
                          ...(!isDarkMode
                            ? {
                                backgroundColor: "#faea92",
                                color: "black",
                              }
                            : {
                                backgroundColor: "transparent",
                                color: "#cdbd64",
                              }),
                          borderRadius: "6px",
                          fontSize: "11px",
                          height: "1.2rem",

                          border: "1px solid #cdbd64",
                        }}
                        label="Featured"
                      />
                    )}
                  </Typography>

                  <StyledChipDiv variant="body2" component="div">
                    <StyledChip
                      variant="outlined"
                      label={job.location}
                      size="small"
                      icon={<PlaceIcon style={{ color: "#47acbb" }} />}
                    />
                    <StyledChip
                      variant="outlined"
                      label={job.salary}
                      size="small"
                      icon={
                        <PaymentsTwoToneIcon style={{ color: "#1e8d41" }} />
                      }
                    />
                    <StyledChip
                      variant="outlined"
                      label={job.hours}
                      size="small"
                      icon={<PunchClockIcon style={{ color: "#514949" }} />}
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
      </Grid>
    </Grid>
  );
};
export default DemoJobCard;
