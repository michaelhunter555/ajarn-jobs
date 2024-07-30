import React from "react";

import {
  Button,
  CardMedia,
  Chip,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import {
  Content,
  PageContainer,
} from "../../shared/components/UIElements/Footer";
import { useThemeToggle } from "../../shared/context/theme-context";

const StyledMediaImage = styled(CardMedia)(({ theme }) => ({
  width: 200,
  height: 100,
  borderRadius: 5,
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));

const BottomFeaturedAds = (props) => {
  const { isDarkMode } = useThemeToggle();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Paper
      elevation={0}
      sx={{
        padding: 1,

        width: { xs: "100%", md: 250 },
        borderRadius: 5,
        ...(!isDarkMode && props?.featured
          ? {
              backgroundColor: "#fffdea",
              boxShadow: "0 0 20px rgb(247 221 112 / 50%)",
            }
          : isDarkMode && props?.featured
          ? {
              backgroundColor: "#303f42",
              boxShadow: "0 0 20px rgba(112, 180, 247, 0.5)",
            }
          : {}),
      }}
    >
      <PageContainer sx={{ minHeight: { xs: "100%", md: "auto" } }}>
        <Content sx={{ height: "100%" }}>
          <Grid container direction="column" spacing={2} alignItems="center">
            <Grid item xs={12}>
              <StyledMediaImage
                component="img"
                image={props?.image}
                alt={props?.school}
                sx={{ width: 200, height: 100 }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "5px",
              }}
            >
              <Typography
                align="center"
                variant="subtitle2"
                color="text.secondary"
                sx={{ fontSize: 14 }}
              >
                {props?.school?.length > 30
                  ? props?.school?.substring(0, 30) + "...see job"
                  : props?.school}
              </Typography>
              <Chip label={props?.location} size="small" />

              <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                spacing={2}
              >
                <Typography
                  variant="subtitle2"
                  fontWeight={600}
                  sx={{ color: "#128cb1" }}
                >
                  {props?.salary}
                </Typography>
                <Typography
                  variant="subtitle2"
                  fontWeight={600}
                  sx={{ color: "#128cb1" }}
                >
                  {props?.hours}
                </Typography>
              </Stack>
            </Grid>
            <Divider
              variant="middle"
              flexItem
              sx={{ margin: "0.5rem auto", width: "90%" }}
            />
          </Grid>
        </Content>
        <Grid
          item
          xs={12}
          sx={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <Stack sx={{ width: "100%" }}>
            <Button
              sx={{ borderRadius: 10 }}
              variant={props?.featured ? "contained" : "text"}
              color="primary"
            >
              View
            </Button>
          </Stack>
        </Grid>
      </PageContainer>
    </Paper>
  );
};

export default BottomFeaturedAds;
