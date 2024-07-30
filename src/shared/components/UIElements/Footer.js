import React from "react";

import { Link } from "react-router-dom";

import FacebookIcon from "@mui/icons-material/Facebook";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import XIcon from "@mui/icons-material/X";
import {
  CardMedia,
  Divider,
  Grid,
  Link as RouterLink,
  Stack,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import { useThemeToggle } from "../../context/theme-context";

const FooterStyles = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  backgroundColor: "transparent",
  flexDirection: { xs: "column", md: "row" },
  borderRadius: "6px 6px 0px 0px",
  bottom: 0,
  left: 0,
  right: 0,
  padding: "2rem 5rem",
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

const SocialIcon = styled("div")(({ theme }) => ({
  margin: "0 0.5rem",
  color: theme.palette.primary.main,
  cursor: "pointer",
}));

const imageDark =
  "https://res.cloudinary.com/dtqbxfe7r/image/upload/v1721613414/Aharnaroi-dark_ca4sso.svg";
const imageLight =
  "https://res.cloudinary.com/dtqbxfe7r/image/upload/v1721613414/Aharnaroi_hrx5qw.svg";

const Copyright = (props) => {
  const date = new Date();

  return (
    <Typography variant="subtitle2" color="text.secondary">
      AjarnJobs.com ©{date.getFullYear()}
    </Typography>
  );
};

const Footer = () => {
  const { isDarkMode } = useThemeToggle();
  return (
    <>
      <Divider sx={{ width: "90%", margin: "0 auto" }} />
      <FooterStyles>
        <Grid
          container
          direction="row"
          alignItems="start"
          justifyContent="flex-start"
          spacing={3}
        >
          <Grid item xs={12} md={4}>
            <Stack spacing={1}>
              <Stack alignItems="center">
                <CardMedia
                  component="img"
                  src={isDarkMode ? imageDark : imageLight}
                  alt="site-logo"
                  sx={{ width: "40%" }}
                />
              </Stack>
              <Divider flexItem sx={{ width: "90%" }} />
              <Stack
                sx={{
                  flexDirection: { xs: "column", md: "row" },
                  alignItems: { xs: "center" },
                  gap: { xs: "5px", md: "10px" },
                }}
              >
                <Copyright />
                <Divider orientation="vertical" flexItem />
                <RouterLink
                  component={Link}
                  sx={{ fontSize: 14 }}
                  to="/about-us"
                >
                  About Us
                </RouterLink>
                <RouterLink
                  sx={{ fontSize: 14 }}
                  component={Link}
                  to="/terms-and-conditions"
                >
                  Terms & Conditions
                </RouterLink>
                <RouterLink
                  sx={{ fontSize: 14 }}
                  component={Link}
                  to="/privacy-policy"
                >
                  Privacy Policy
                </RouterLink>
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={12} md={2}>
            <Stack direction="column" spacing={2}>
              <Stack direction="column" spacing={1} alignItems="center">
                <Typography
                  variant="subtitle1"
                  fontWeight={700}
                  color="text.secondary"
                >
                  Follow us
                </Typography>
                <SocialIcons>
                  <SocialIcon>
                    <FacebookIcon fontSize="large" />
                  </SocialIcon>
                  <SocialIcon>
                    <LinkedInIcon fontSize="large" />
                  </SocialIcon>

                  <SocialIcon>
                    <HelpOutlineIcon fontSize="large" />
                  </SocialIcon>
                  <SocialIcon>
                    <XIcon fontSize="large" />
                  </SocialIcon>
                </SocialIcons>
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={12} md={2}>
            <Stack direction="column" alignItems="center">
              <Typography
                variant="subtitle1"
                fontWeight={700}
                color="text.secondary"
              >
                Work with us
              </Typography>
              <RouterLink component={Link} to={`/work-with-us`}>
                Jobs
              </RouterLink>
            </Stack>
          </Grid>
          <Grid item xs={12} md={2}>
            <Stack direction="column" alignItems="center">
              <Typography
                variant="subtitle1"
                fontWeight={700}
                color="text.secondary"
              >
                Partnerships
              </Typography>
              <RouterLink component={Link} to={`/media-partnerships`}>
                Media
              </RouterLink>
              <RouterLink
                component={Link}
                to={`/how-to-use-ajarn-jobs?type=employer`}
              >
                Site Feature
              </RouterLink>
            </Stack>
          </Grid>
          <Grid item xs={12} md={2}>
            <Stack direction="column" alignItems="center">
              <Typography
                variant="subtitle1"
                fontWeight={700}
                color="text.secondary"
              >
                Feedback
              </Typography>
              <RouterLink component={Link} to={`/feedback?reason=bug`}>
                Report a Bug
              </RouterLink>
              <RouterLink component={Link} to={`/feedback?reason=suggestion`}>
                Site Suggestions
              </RouterLink>
              <RouterLink component={Link} to={`/feedback?reason=violation`}>
                Report a Violation
              </RouterLink>
            </Stack>
          </Grid>
        </Grid>
      </FooterStyles>
    </>
  );
};

export default Footer;
