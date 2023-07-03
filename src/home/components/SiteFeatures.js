import React from "react";

import { Link } from "react-router-dom";

import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import Contribute from "../../assets/contribute.png";
import ThaiLifeTwo from "../../assets/geoff-greenwood-rH1aA4TqGms-unsplash.jpg";
import Interviews from "../../assets/interviews.png";
import Jobs from "../../assets/mario-heller-hXLkFpvKRys-unsplash.jpg";
import SchoolImage from "../../assets/sangga-rima-roman-selia-bgQgAKagQB4-unsplash.jpg";
import SkillsTests from "../../assets/skillsTest.png";

const StyledBoxWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "nowrap",
  minWidth: 100,
  margin: "0 0 1rem 0",
  flexDirection: "row",
  justifyContent: "center",
  gap: "1rem",
  overflowX: "auto",
  whiteSpace: "nowrap",
  [theme.breakpoints.down("md")]: {
    minWidth: "unset",
    paddingLeft: "7.5rem",
  },
  [theme.breakpoints.down("sm")]: {
    minWidth: "unset",
    paddingLeft: "22.5rem",
  },
}));

const StyledCardBackground = styled(Card)(({ theme }) => ({
  margin: "0.2rem",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  minWidth: 150,
  borderRadius: "6px",
  "&:hover": {
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
  },
  [theme.breakpoints.down("md")]: {
    minWidth: 120,
  },
  [theme.breakpoints.down("sm")]: {
    minWidth: 100,
  },
}));

//arrange items in array of objects
const items = [
  { label: "Jobs", img: Jobs, link: `/jobs` },
  { label: "Schools", img: SchoolImage, link: `/school` },
  { label: "Incomes", img: ThaiLifeTwo, link: `/income-directory` },
  { label: "Skills Tests", img: SkillsTests, link: `skills-test` },
  { label: "Teachers", img: Interviews, link: `/teachers` },
  { label: "Content", img: Contribute, link: `/content` },
];

const SiteFeatures = () => {
  return (
    <StyledBoxWrapper>
      {/*map over items with destructured values */}
      {items.map(({ label, img, link }, i) => {
        return (
          <Link key={i} to={link}>
            <StyledCardBackground raised={false}>
              <CardMedia
                component="img"
                image={img}
                alt={`${label}-card#-${i}`}
                sx={{ height: 100 }}
              />
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography
                  align="center"
                  component="h3"
                  variant="button"
                  color="text.secondary"
                  sx={{ textDecoration: "none" }}
                >
                  {label}
                </Typography>
              </CardContent>
            </StyledCardBackground>
          </Link>
        );
      })}
    </StyledBoxWrapper>
  );
};

export default SiteFeatures;
