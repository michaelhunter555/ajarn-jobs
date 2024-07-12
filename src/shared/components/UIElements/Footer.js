import React from "react";

import FacebookIcon from "@mui/icons-material/Facebook";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const FooterStyles = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  backgroundColor: theme.palette.background.paper,
  flexDirection: "row",
  borderRadius: "6px 6px 0px 0px",
  bottom: 0,
  left: 0,
  right: 0,
  padding: "2rem 2rem",
}));

export const PageContainer = styled("div")(({ theme }) => ({
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
}));

export const Content = styled("div")(({ theme }) => ({
  flex: 1,
  display: "flex",
  flexDirection: "column",
}));

const SocialIcons = styled(Grid)({
  display: "flex",
  alignItems: "center",
});

const SocialIcon = styled("div")(
  ({ theme, facebook, linkedIn, twitter, help }) => ({
    margin: "0 0.5rem",
    color: facebook
      ? "#1877F2"
      : linkedIn
      ? "#1DA1F2"
      : twitter
      ? "#0A66C2"
      : help && "black",
  })
);

const Copyright = (props) => {
  const date = new Date();

  return (
    <Typography variant="subtitle2" color="text.secondary">
      AjarnJobs.com ©{date.getFullYear()}
    </Typography>
  );
};

const Footer = () => {
  return (
    <FooterStyles>
      <Grid container direction="column" justifyContent="flex-start">
        <Copyright />
      </Grid>
      <SocialIcons item>
        <SocialIcon facebook>
          <FacebookIcon />
        </SocialIcon>
        <SocialIcon linkedIn>
          <LinkedInIcon />
        </SocialIcon>
        <SocialIcon twitter>
          <TwitterIcon />
        </SocialIcon>
        <SocialIcon help>
          <HelpOutlineIcon />
        </SocialIcon>
      </SocialIcons>
    </FooterStyles>
  );
};

export default Footer;
