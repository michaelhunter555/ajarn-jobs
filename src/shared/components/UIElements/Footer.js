import React from "react";

import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import { BottomNavigation, BottomNavigationAction, Grid } from "@mui/material";

const footerStyles = {
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    border: "1px solid #dddddd",
    borderRadius: "6px 6px 0px 0px",
    position: "fixed",
    bottom: 0,
  },
  gridItem: {},
};

const Copyright = (props) => {
  const date = new Date();

  return `AjarnJobs.com ©${date.getFullYear()}`;
};

const Footer = () => {
  return (
    <BottomNavigation sx={{ ...footerStyles.root }}>
      <Grid
        container
        spacing={4}
        sx={{
          margin: "3rem 5rem",
          alignItems: "center",
        }}
      >
        <Grid item>
          <Copyright />
          <BottomNavigationAction
            showLabel="Email"
            value="email"
            icon={<EmailIcon />}
            href="mailto:team@ajarnjobs.com"
            target="_blank"
            rel="noopener"
          />
          <BottomNavigationAction
            showLabel="facebook"
            value="facebook"
            icon={<FacebookIcon />}
            href="https://facebook.com/your-facebook-username"
            target="_blank"
            rel="noopener"
          />
          <BottomNavigationAction
            showLabel="Twitter"
            value="twitter"
            icon={<TwitterIcon />}
            href="https://www.twitter.com/in/your-twitter-username"
            target="_blank"
            rel="noopener"
          />
        </Grid>
      </Grid>

      <Grid
        container
        spacing={2}
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          margin: "auto 0",
        }}
      ></Grid>
    </BottomNavigation>
  );
};

export default Footer;
