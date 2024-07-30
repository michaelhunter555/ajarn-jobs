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
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import { useThemeToggle } from "../../context/theme-context";

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
  marginBottom: "0",
}));

const StyledChip = styled(Chip)({
  border: "1px solid #e1e1e1",
});

const JobAd = (props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { isDarkMode } = useThemeToggle();
  const { job } = props;

  const sanitizedJobAd = sanitizeHtml(job?.description, {
    allowedTags: [],
    allowedAttributes: {},
  });

  const truncatedJobDescription = isMobile
    ? ""
    : sanitizedJobAd.length > 200
    ? sanitizedJobAd.substring(0, 200) + "..."
    : sanitizedJobAd;

  return (
    <Link
      to={`/jobs/${job?._id}/${job?.title
        ?.replace(/\s+/g, "-")
        ?.toLowerCase()}`}
      style={{ textDecoration: "none" }}
    >
      <Card>
        <CardActionArea>
          <CardContent>
            <Grid container direction="row">
              <Grid item xs={4} sm={4} lg={3} xl={2}>
                <StyledMediaCard
                  component="img"
                  src={`${job?.image}`}
                  alt={job?._id}
                />
              </Grid>

              <Grid item xs={8} sm={8} md={8} lg={9} xl={10}>
                <Typography
                  gutterBottom
                  sx={{ color: "text.secondary" }}
                  variant={isMobile ? "subtitle2" : "subtitle1"}
                  fontWeight={isMobile ? "normal" : "bold"}
                  component="div"
                >
                  {job?.creator?.company} -{" "}
                  {isMobile && job?.title?.length > 25
                    ? job?.title.substring(0, 40) + "..."
                    : job?.title}
                </Typography>

                <StyledChipDiv variant="body2" component="div">
                  <StyledChip
                    sx={{ fontSize: isMobile ? 9 : 14 }}
                    variant="outlined"
                    label={job?.location}
                    size={"small"}
                    icon={<PlaceIcon style={{ color: "#47acbb" }} />}
                  />
                  <StyledChip
                    sx={{ fontSize: isMobile ? 9 : 14 }}
                    variant="outlined"
                    label={job?.salary}
                    size={"small"}
                    icon={<PaymentsTwoToneIcon style={{ color: "#1e8d41" }} />}
                  />
                  {!isMobile && (
                    <StyledChip
                      sx={{ fontSize: isMobile ? 9 : 14 }}
                      variant="outlined"
                      label={job?.hours}
                      size={"small"}
                      icon={<PunchClockIcon style={{ color: "#514949" }} />}
                    />
                  )}
                </StyledChipDiv>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  dangerouslySetInnerHTML={{
                    __html:
                      truncatedJobDescription +
                      `<span style=${
                        (isDarkMode ? "color:#95e6ff;" : "color:#128cb1;") +
                        "font-size:12px; text-decoration: underline;"
                      }>
                    ${isMobile ? "" : "read more"}</span>`,
                  }}
                />
              </Grid>
            </Grid>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
};

export default JobAd;
