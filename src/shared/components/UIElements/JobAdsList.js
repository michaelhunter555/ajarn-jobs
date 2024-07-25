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

import { useThemeToggle } from "../../context/theme-context";

const StyledJobAdCard = styled(Card)(({ theme, featured }) => ({
  backgroundColor: featured ? "#f5f2e4" : "",
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

const StyledStack = styled(Stack)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: theme.spacing(1),
  marginBottom: "0.5rem",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));

const JobAdsList = ({ job, company }) => {
  const { isDarkMode } = useThemeToggle();

  return (
    <>
      {job?.map((school, i) => (
        <List key={school?._id}>
          <Link
            to={`/jobs/${school?._id}/${school.title
              ?.replace(/\s+/g, "-")
              ?.toLowerCase()}`}
            style={{ textDecoration: "none" }}
          >
            <StyledJobAdCard
              component="div"
              sx={{
                backgroundColor:
                  isDarkMode && school?.jobType === "featured"
                    ? "#303f42"
                    : !isDarkMode && school?.jobType === "featured"
                    ? "#f5f2e4"
                    : "",
                ...(isDarkMode && school?.jobType === "featured"
                  ? { boxShadow: "0 0 20px rgba(112, 180, 247, 0.5)" }
                  : {}),
              }}
            >
              <CardActionArea>
                <CardContent>
                  <Grid container direction="row">
                    <Grid item xs={4} sm={4} lg={3} xl={2}>
                      <StyledMediaCard
                        component="img"
                        image={`${school?.image}`}
                        alt={`${school?._id}--${school?.creator?.company}`}
                      />
                    </Grid>

                    <Grid item xs={8} sm={8} md={8} lg={9} xl={10}>
                      <Stack spacing={0} alignItems="start">
                        <Typography
                          variant="h6"
                          color="text.secondary"
                          sx={{
                            fontSize: "20px",
                          }}
                          component="div"
                        >
                          {school?.title?.length > 70
                            ? school?.title?.substring(0, 70) + "..."
                            : school?.title}{" "}
                          {school?.jobType === "featured" && (
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
                        <StyledStack>
                          {company && (
                            <Chip
                              label={school?.creator?.company}
                              size="small"
                              sx={{
                                fontSize: "11px",
                                padding: 0,
                                height: "20px",
                              }}
                            />
                          )}
                          <Typography
                            variant="subtitle2"
                            color="text.secondary"
                          >
                            Listed • {school?.datePosted?.split("T")[0]}
                          </Typography>
                        </StyledStack>
                      </Stack>
                      <StyledChipDiv variant="body2" component="div">
                        <StyledChip
                          sx={{
                            ...(isDarkMode &&
                              school.jobType === "featured" && {
                                backgroundColor: "#eeffb7",
                              }),
                            ...(isDarkMode &&
                              school.jobType === "featured" && {
                                color: "#121212",
                              }),
                          }}
                          clickable
                          variant={
                            school?.jobType === "featured" ? "" : "outlined"
                          }
                          label={school?.location}
                          size={"small"}
                          icon={<PlaceIcon style={{ color: "#47acbb" }} />}
                        />
                        <StyledChip
                          sx={{
                            ...(isDarkMode &&
                              school.jobType === "featured" && {
                                backgroundColor: "#eeffb7",
                              }),
                            ...(isDarkMode &&
                              school.jobType === "featured" && {
                                color: "#121212",
                              }),
                          }}
                          clickable
                          variant={
                            school?.jobType === "featured" ? "" : "outlined"
                          }
                          label={school?.salary}
                          size={"small"}
                          icon={
                            <PaymentsTwoToneIcon style={{ color: "#1e8d41" }} />
                          }
                        />
                        <StyledChip
                          sx={{
                            ...(isDarkMode &&
                              school.jobType === "featured" && {
                                backgroundColor: "#eeffb7",
                              }),
                            ...(isDarkMode &&
                              school.jobType === "featured" && {
                                color: "#121212",
                              }),
                          }}
                          clickable
                          variant={
                            school?.jobType === "featured" ? "" : "outlined"
                          }
                          label={school?.hours}
                          size={"small"}
                          icon={<PunchClockIcon style={{ color: "#514949" }} />}
                        />
                      </StyledChipDiv>
                      <Typography variant="body2" color="text.secondary">
                        {school?.jobType === "featured" &&
                          sanitizeHtml(school?.description, {
                            allowedTags: [],
                            allowedAttributes: {},
                          }).substring(0, 120) + "..."}

                        {school?.jobType !== "featured" &&
                          sanitizeHtml(school?.description, {
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
