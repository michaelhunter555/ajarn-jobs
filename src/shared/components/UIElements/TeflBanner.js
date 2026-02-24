import React from "react";

import { Card, CardMedia, Chip, Grid, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import RemoteLifestyleImg from "../../../assets/contribute.png";

const StyledGlassTeflAd = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-start",
  position: "relative",
  border: "1px solid rgba(216, 216, 216, 0.5)",
  color: "black",
  fontSize: "16px",
  fontWeight: "bold",
  padding: "0 20px 0 0",
  borderRadius: "6px",
  overflow: "hidden",
  gap: 2,

  background:
    "linear-gradient(135deg, hsla(0, 100%, 100%, 0), hsla(0, 100%, 100%, 0) 9.37%, hsla(0, 100%, 100%, 0) 54.69%, hsla(0, 100%, 100%, 0) 66.15%, hsla(0, 1000%, 100%, 0))",
  "&::after": {
    content: '""',
    position: "absolute",
    top: "0",
    left: "-200%",
    width: "200%",
    height: "100%",
    transform: "skewX(-20deg)",
    backgroundImage:
      "linear-gradient(90deg, transparent, rgba(98, 250, 255, 0.219), transparent)",
  },
  "&:hover::after": {
    animation: "shine 1s ", //infinite alternate
    animationTimingFunction: "cubic-bezier(0, 0.6, 0.5, 0.4)",
  },
  "@keyframes shine": {
    "0%": {
      left: "-200%",
    },
    "60%": {
      left: "100%",
    },
    "100%": {
      left: "100%",
    },
  },
  [theme.breakpoints.down("md")]: {
    margin: "0.5rem 0.5rem 0",
  },
  [theme.breakpoints.down("sm")]: {
    margin: "0.5rem 1rem 0",
  },
}));

//later to be replaced with dynamic Tefl ads
const TeflBanner = () => {
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      sx={{ margin: "1rem auto" }}
    >
      <StyledGlassTeflAd sx={{ width: '100%', padding: 1, cursor: 'pointer' }}>
        <Stack direction="row" alignItems="start">

          <CardMedia
            sx={{ padding: 1, width: "100px", height: "100px" }}
            component="img"
            image={RemoteLifestyleImg}
            alt="temp-lifestyle-tefl"
           
          />
        </Stack>
            
       
       <Stack>

          <Stack direction="row" alignItems="start" gap={1}>
            <Typography
              component="div"
              variant="body1"
              sx={{ fontWeight: 550, color: "#464646" }}
            >
              Barvard TEFL - 120 Hour Course{" "}
            </Typography>
            <Chip
              sx={{ fontSize: 10, borderRadius: "6px" }}
              label="Ad"
              size="small"
            />
          </Stack>

          <Typography variant="subtitle2" color="text.secondary">
            Get Qualified, find work, earn more.
          </Typography>
       </Stack>
       
      </StyledGlassTeflAd>
    </Grid>
  );
};

export default TeflBanner;
