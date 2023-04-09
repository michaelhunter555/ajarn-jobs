import React from 'react';

import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';

import Contribute from '../../assets/contribute.png';
import ThaiLifeTwo from '../../assets/geoff-greenwood-rH1aA4TqGms-unsplash.jpg';
import Interviews from '../../assets/interviews.png';
import Jobs from '../../assets/mario-heller-hXLkFpvKRys-unsplash.jpg';
import SchoolImage
  from '../../assets/sangga-rima-roman-selia-bgQgAKagQB4-unsplash.jpg';
import SkillsTests from '../../assets/skillsTest.png';

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

const SiteFeatures = () => {
  const items = [
    { label: "Jobs", img: Jobs },
    { label: "Schools", img: SchoolImage },
    { label: "Thai Life", img: ThaiLifeTwo },
    { label: "Skills Tests", img: SkillsTests },
    { label: "Interviews", img: Interviews },
    { label: "Contribute", img: Contribute },
  ];

  return (
    <StyledBoxWrapper>
      {items.map(({ label, img }, i) => {
        return (
          <StyledCardBackground key={i} raised={false}>
            <CardMedia
              component="img"
              image={img}
              alt={`${label}-${Math.floor(Math.random(i ** i))}`}
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
              >
                {label}
              </Typography>
            </CardContent>
          </StyledCardBackground>
        );
      })}
    </StyledBoxWrapper>
  );
};

export default SiteFeatures;
