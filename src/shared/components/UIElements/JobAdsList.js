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
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import { useThemeToggle } from "../../context/theme-context";

const StyledJobAdCard = styled(Card)(({ theme, featured }) => ({
  backgroundColor: featured ? "#f5f2e4" : "",
  borderRadius: 15,
}));

const StyledChipDiv = styled("div")(({ theme, featured }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: "5px",
  color: theme.palette.text.secondary,
}));

const StyledMediaCard = styled(CardMedia)({
  width: "75%",
  height: 95,
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
    flexWrap: "wrap",
  },
}));

const JobAdsList = ({ job, company }) => {
  const { isDarkMode } = useThemeToggle();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const conditionalChip = (
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
  );

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
                    ? "#fffdea"
                    : "",
                ...(isDarkMode && school?.jobType === "featured"
                  ? { boxShadow: "0 0 20px rgba(112, 180, 247, 0.5)" }
                  : {}),
                ...(!isDarkMode && school?.jobType === "featured"
                  ? { boxShadow: "0 0 20px rgb(247 221 112 / 50%)" }
                  : {}),
                //"0 0 20px rgb(247 221 112 / 50%)"
              }}
            >
              <CardActionArea>
                <CardContent>
                  <Grid
                    container
                    direction={isMobile ? "column" : "row"}
                    alignItems={isMobile ? "" : "center"}
                  >
                    <Grid item xs={4} sm={4} lg={3} xl={2}>
                      <StyledMediaCard
                        component="img"
                        image={`${school?.image}`}
                        alt={`${school?._id}--${school?.creator?.company}`}
                        sx={{
                          ...(isMobile && { width: "100%", height: "125px" }),
                        }}
                      />
                    </Grid>

                    <Grid
                      item
                      xs={8}
                      sm={8}
                      md={8}
                      lg={9}
                      xl={10}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "2px",
                      }}
                    >
                      <Stack
                        sx={{
                          flexDirection: { xs: "column", md: "row" },
                          gap: isMobile ? 0 : 2,
                        }}
                        alignItems="center"
                      >
                        <Typography
                          variant={isMobile ? "subtitle1" : "h6"}
                          color="text.secondary"
                          fontWeight={isMobile ? 700 : "normal"}
                          sx={{
                            ...(isMobile && { align: "center" }),
                          }}
                        >
                          {school?.title?.length > 70
                            ? school?.title?.substring(0, 70) + "..."
                            : school?.title}{" "}
                        </Typography>
                      </Stack>
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
                          sx={{ fontSize: 11 }}
                          variant="subtitle2"
                          color="text.secondary"
                        >
                          Listed • {school?.datePosted?.split("T")[0]}
                        </Typography>
                        {school?.jobType === "featured" && conditionalChip}
                      </StyledStack>
                      <StyledChipDiv>
                        <StyledChip
                          sx={{
                            // ...(isDarkMode &&
                            //   school.jobType === "featured" && {
                            //     backgroundColor: "#c5c1a8",
                            //   }),
                            // ...(isDarkMode &&
                            //   school.jobType === "featured" && {
                            //     color: "#121212",
                            //   }),
                            fontSize: isMobile ? 11 : 12,
                          }}
                          clickable
                          variant={"outlined"}
                          label={school?.location}
                          size={"small"}
                          icon={<PlaceIcon style={{ color: "#47acbb" }} />}
                        />
                        <StyledChip
                          sx={{
                            fontSize: isMobile ? 11 : 12,
                            // ...(isDarkMode &&
                            //   school.jobType === "featured" && {
                            //     backgroundColor: "#c5c1a8",
                            //   }),
                            // ...(isDarkMode &&
                            //   school.jobType === "featured" && {
                            //     color: "#121212",
                            //   }),
                          }}
                          clickable
                          variant={"outlined"}
                          label={school?.salary}
                          size={"small"}
                          icon={
                            <PaymentsTwoToneIcon style={{ color: "#1e8d41" }} />
                          }
                        />
                        <StyledChip
                          sx={{
                            fontSize: isMobile ? 11 : 12,
                            // ...(isDarkMode &&
                            //   school.jobType === "featured" && {
                            //     backgroundColor: "#c5c1a8",
                            //   }),
                            // ...(isDarkMode &&
                            //   school.jobType === "featured" && {
                            //     color: "#121212",
                            //   }),
                          }}
                          clickable
                          variant={"outlined"}
                          label={school?.hours}
                          size={"small"}
                          icon={
                            <PunchClockIcon
                              style={{
                                color: isDarkMode ? "white" : "#514949",
                              }}
                            />
                          }
                        />
                      </StyledChipDiv>
                      <Typography variant="body2" color="text.secondary">
                        {school?.jobType === "featured" &&
                          sanitizeHtml(school?.description, {
                            allowedTags: [],
                            allowedAttributes: {},
                          }).substring(0, 175) + "..."}

                        {school?.jobType !== "featured" &&
                          sanitizeHtml(school?.description, {
                            allowedTags: [],
                            allowedAttributes: {},
                          }).substring(0, 70) + "..."}
                        <Typography
                          component="span"
                          sx={{
                            color: isDarkMode
                              ? "#95e6ff"
                              : (theme) => theme.palette.primary.main,
                            fontSize: 12,
                            textDecoration: "underline",
                          }}
                        >
                          read more
                        </Typography>
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
