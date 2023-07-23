import React from "react";

import { Link } from "react-router-dom";
import sanitizeHtml from "sanitize-html";

import PaymentsTwoToneIcon from "@mui/icons-material/PaymentsTwoTone";
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
  height: 75,
  border: "1px solid #e5e5e5",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
    borderColor: "rgba(0, 128, 255, 0.8)",
  },
  borderRadius: 3,
});

const StyledChip = styled(Chip)(({ theme, featured }) => ({
  backgroundColor: featured ? "#f7f1d0" : "",
}));

const JobAdsList = ({ job }) => {
  return (
    <>
      {job?.map((school, i) => (
        <List key={school?._id}>
          <Link to={`/jobs/${school?._id}`} style={{ textDecoration: "none" }}>
            <StyledJobAdCard
              component="div"
              featured={school?.jobType === "featured"}
            >
              <CardActionArea>
                <CardContent>
                  <Grid container direction="row">
                    <Grid item xs={4} sm={4} lg={3} xl={2}>
                      <StyledMediaCard
                        component="img"
                        image={`${process.env.REACT_APP_IMAGE}${school?.image}`}
                        alt={`${school?._id}--${school?.creator?.company}`}
                      />
                    </Grid>

                    <Grid item xs={8} sm={8} md={8} lg={9} xl={10}>
                      <Stack spacing={0} alignItems="start">
                        <Typography
                          variant="h6"
                          sx={{
                            color: "#5e6063",
                            fontSize: "20px",
                          }}
                          component="div"
                        >
                          {school?.creator?.company} -{" "}
                          {school?.title?.length > 25
                            ? school?.title?.substring(0, 40) + "..."
                            : school?.title}{" "}
                          {school?.jobType === "featured" && (
                            <Chip
                              sx={{
                                backgroundColor: "#faea92",
                                borderRadius: "6px",
                                fontSize: "11px",
                                height: "1.2rem",
                                color: "black",
                                border: "1px solid #cdbd64",
                              }}
                              label="Featured"
                            />
                          )}
                        </Typography>
                        <Typography
                          gutterBottom
                          variant="subtitle2"
                          color="text.secondary"
                          component="div"
                        >
                          Listed • {school?.datePosted?.split("T")[0]}
                        </Typography>
                      </Stack>
                      <StyledChipDiv variant="body2" component="div">
                        <StyledChip
                          clickable
                          variant={
                            school?.jobType === "featured" ? "" : "outlined"
                          }
                          label={school?.location}
                          size={"small"}
                          icon={<PlaceIcon style={{ color: "#47acbb" }} />}
                          featured={school?.jobType === "featured"}
                        />
                        <StyledChip
                          clickable
                          variant={
                            school?.jobType === "featured" ? "" : "outlined"
                          }
                          label={school?.salary}
                          size={"small"}
                          icon={
                            <PaymentsTwoToneIcon style={{ color: "#1e8d41" }} />
                          }
                          featured={school?.jobType === "featured"}
                        />
                        <StyledChip
                          clickable
                          variant={
                            school?.jobType === "featured" ? "" : "outlined"
                          }
                          label={school?.hours}
                          size={"small"}
                          icon={<PunchClockIcon style={{ color: "#514949" }} />}
                          featured={school?.jobType === "featured"}
                        />
                      </StyledChipDiv>
                      <Typography variant="body2" color="text.secondary">
                        {sanitizeHtml(school?.description, {
                          allowedTags: [],
                          allowedAttributes: {},
                        }).substring(0, 60) + "..."}
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
