import React, { useEffect, useState, useContext } from "react";

import { AuthContext } from "../../shared/context/auth-context";
import WorkIcon from "@mui/icons-material/Work";
import { Link as RouterLink } from "react-router-dom";
import {
  Chip,
  Container,
  Divider,
  Grid,
  Pagination,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
  Box,
  Button,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import AjarnHowToHelper from "../../introduction/HowToLead";
import Footer, {
  Content,
  PageContainer,
} from "../../shared/components/UIElements/Footer";
import JobAd from "../../shared/components/UIElements/JobAd";
import { JobAdSkeleton } from "../../shared/components/UIElements/LoadingSkeletons";
//import { useHttpClient } from "../../shared/hooks/http-hook";
import BottomFeatured from "../components/BottomFeatured";
import BottomFeaturedAdsList from "../components/BottomFeaturedAdsList";
import FeaturedContentList from "../components/FeaturedContentList";
import JobContent from "../components/JobContent";
import MobileJobsAccordion from "../components/MobileJobsAccordion";
import RecentJobs from "../components/RecentJobs";
import SiteFeatures from "../components/SiteFeatures";
import WelcomeCard from "../components/WelcomeCard";
import {
  StyledGridContainer,
  StyledHomeFeaturedContent,
  StyledHomeFeaturedTop,
} from "./HomeStyles";
import EmployerPromoCard from "../../shared/components/UIElements/EmployerPromo";

const SectionHeading = ({ title, subtitle, action }) => {
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      alignItems={{ xs: "flex-start", sm: "flex-end" }}
      justifyContent="space-between"
      spacing={1}
      sx={{ width: "100%", mb: 1.5 }}
    >
      <Stack spacing={0.25}>
        <Typography variant="h6" sx={{ fontWeight: 900 }}>
          {title}
        </Typography>
        {subtitle ? (
          <Typography variant="body2" color="text.secondary">
            {subtitle}
          </Typography>
        ) : null}
      </Stack>
      {action ? <Box sx={{ flex: "0 0 auto" }}>{action}</Box> : null}
    </Stack>
  );
};

const Home = () => {
  const auth = useContext(AuthContext);
  const theme = useTheme();
  const isMobileOrTablet = useMediaQuery(
    theme.breakpoints.down("sm") || theme.breakpoints.down("md")
  );
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  //featured jobs page, limit & total pages
  const [featuredPage, setFeaturedPage] = useState({
    page: 1,
    limit: isMobileOrTablet ? 6 : 10,
  });
  const [totalFeaturedPages, setTotalFeaturedPages] = useState(1);

  const getFeaturedJobs = async (page, limit) => {
    const response = await fetch(
      `${
        process.env.REACT_APP_JOBS
      }/featured-jobs?isHome=${true}&page=${page}&limit=${limit}`
    );

    if (!response.ok) {
      throw new Error("There was an error with retrieving the jobs Data.");
    }
    const data = await response.json();
    return {
      jobs: data.jobs,
      page: data.pageNum,
      totalPages: data.totalPages,
    };
  };

  const { data: featuredJobs, isLoading: featuredJobsIsLoading } = useQuery({
    queryKey: ["featuredJobs", featuredPage.page, featuredPage.limit],
    queryFn: () => getFeaturedJobs(featuredPage.page, featuredPage.limit),
    staleTime: 2 * 60 * 60 * 1000,
    keepPreviousData: true,
  });

  useEffect(() => {
    if (featuredJobs?.totalPages !== totalFeaturedPages) {
      setTotalFeaturedPages(featuredJobs?.totalPages);
    }
  }, [featuredJobs?.totalPages, totalFeaturedPages]);

  //GET Jobs for API Cache
  const getJobsData = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_JOBS}?isHome=false&page=1&limit=5`
    );

    if (!response.ok) {
      throw new Error("There was an error with retrieving the jobs Data.");
    }
    const data = await response.json();
    return data.jobs;
  };

  const { data: homeJobs, isLoading } = useQuery({
    queryKey: ["homePageJobs"],
    queryFn: () => getJobsData(),
    staleTime: 2 * 60 * 60 * 1000,
  });

  //GET all user content for API Cache
  const getAllContent = async () => {
    const response = await fetch(`${process.env.REACT_APP_BLOG}`);
    if (!response.ok) {
      throw new Error("There was an error trying to get content posts.");
    }
    const data = await response.json();
    return data.blogList;
  };

  const { data: contentList, isLoading: contentListIsLoading } = useQuery({
    queryKey: ["homeContentList"],
    queryFn: () => getAllContent(),
  });

  //Randomize the job
  const randomFeaturedJob = featuredJobs?.jobs
    ? featuredJobs?.jobs[Math.floor(Math.random() * featuredJobs?.jobs?.length)]
    : null;

  const handleFeaturedPageChange = (page) => {
    setFeaturedPage({
      page: page,
      limit: featuredPage.limit,
    });
  };

  const homepageIsLoading =
    featuredJobsIsLoading || contentListIsLoading || isLoading;

  return (
    <PageContainer>
      <Content>
        <Box
          sx={{
            py: { xs: 4, md: 6 },
            borderBottom: "1px solid",
            borderColor: "divider",
            background:
              "radial-gradient(900px circle at 20% 10%, rgba(18,140,177,0.16), transparent 60%), radial-gradient(700px circle at 90% 0%, rgba(255,162,162,0.20), transparent 55%)",
          }}
        >
          <Container sx={{ width: { xs: "100%", md: "85%" } }}>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={7}>
                <Stack spacing={1.25}>
                  <Chip
                    size="small"
                    color="primary"
                    sx={{ width: "fit-content" }}
                    label="AjarnJobs.com"
                  />
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: 950,
                      letterSpacing: -0.6,
                      fontSize: { xs: 30, sm: 36, md: 44 },
                      lineHeight: 1.08,
                    }}
                  >
                    Find teaching jobs in Thailand & Asia
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    Featured jobs, a content feed, and a dashboard built for teachers and
                    employers. Explore with confidence—mobile friendly by default.
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap">
                    <Chip size="small" variant="outlined" label="Featured jobs" />
                    <Chip size="small" variant="outlined" label="Messaging" />
                    <Chip size="small" variant="outlined" label="Recruiting" />
                    <Chip size="small" variant="outlined" label="Content" />
                  </Stack>
                  <Stack direction={{ xs: "column", sm: "row" }} spacing={1.25}>
                    <Button
                      variant="contained"
                      onClick={() =>
                        document
                          .getElementById("jobsTop")
                          ?.scrollIntoView({ behavior: "smooth", block: "start" })
                      }
                    >
                      Browse featured jobs
                    </Button>
                    <Button
                      variant="outlined"
                      component={RouterLink}
                      to="/how-to-use-ajarn-jobs"
                    >
                      How it works
                    </Button>
                  </Stack>
                </Stack>
              </Grid>
               <Grid item xs={12} md={5}>
                <Stack
                  spacing={1}
                  sx={{
                    p: 2,
                    borderRadius: 3,
                    border: "1px solid",
                    borderColor: "divider",
                    bgcolor: "background.paper",
                  }}
                >
                  <Typography sx={{ fontWeight: 900 }}>
                    What you can do today
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    - Teachers: build your profile, apply, and engage in live chats with employers.
                    <br />- Employers: post jobs, manage applicants, and recruit & message teachers.
                  </Typography>
                  {!auth?.isLoggedIn && <Stack direction="row" spacing={1} justifyContent="flex-end">
                    <Button
                      size="small"
                      variant="text"
                      component={RouterLink}
                      to="/auth?name=signUp"
                    >
                      Create account
                    </Button>
                    <Button
                      size="small"
                      variant="text"
                      component={RouterLink}
                      to="/auth"
                    >
                      Log In
                    </Button>
                  </Stack>}
                </Stack>
              </Grid>
            </Grid>
          </Container>
        </Box>

        <StyledGridContainer>
          {/* top-middle column */}
          <StyledHomeFeaturedTop>
            <Stack sx={{ width: "100%" }}>
              {homepageIsLoading && (
                <Grid
                  container
                  sx={{
                    flexDirection: { xs: "column", md: "row" },
                    justifyContent: { md: "center" },
                  }}
                  spacing={2}
                >
                  <Grid item xs={12} md={2}>
                    <JobAdSkeleton
                      sx={{
                        fontSize: 11,
                        width: "100%",
                        borderRadius: "6px",
                      }}
                      num={1}
                      variant="text"
                    />
                    <JobAdSkeleton
                      sx={{
                        fontSize: 11,
                        width: "80%",
                        borderRadius: "6px",
                      }}
                      num={1}
                      variant="text"
                    />
                    <JobAdSkeleton
                      sx={{
                        fontSize: 11,
                        width: "70%",
                        borderRadius: "6px",
                      }}
                      num={1}
                      variant="text"
                    />
                  </Grid>
                  <Divider
                    orientation="vertical"
                    flexItem
                    sx={{ margin: "0.5rem" }}
                  />
                  <Grid item xs={12} md={9}>
                    <JobAdSkeleton
                      sx={{
                        height: "5.5rem",

                        borderRadius: "6px",
                      }}
                      num={1}
                      variant="rectangular"
                    />
                  </Grid>
                </Grid>
              )}
            </Stack>
            {!homepageIsLoading && randomFeaturedJob && (
              <Grid
                container
                sx={{
                  flexDirection: { xs: "column", md: "row" },
                  justifyContent: { md: "center" },
                }}
                spacing={2}
              >
                <Grid item xs={12} md={2}>
                  <SectionHeading
                    title="Today’s featured pick"
                    subtitle="A quick preview from the featured feed."
                  />
                </Grid>
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{ margin: "0.5rem" }}
                />
                <Grid item xs={12} md={9}>
                  <JobAd key={randomFeaturedJob?._id} job={randomFeaturedJob} />
                </Grid>
              </Grid>
            )}
          </StyledHomeFeaturedTop>

          {/* lower middle-column*/}
          <StyledHomeFeaturedContent
            id="jobsTop"
            sx={{
              ...(!homepageIsLoading && {
                boxShadow: "0 0 20px rgba(112, 180, 247, 0.5)",
              }),
            }}
          >
            {/* only load for desktop */}
            {homepageIsLoading && !isMobileOrTablet && (
              <JobAdSkeleton
                num={1}
                sx={{ height: 500 }}
                variant="rectangular"
              />
            )}

            {!homepageIsLoading && (
              <JobContent
                page={featuredPage}
                totalPages={totalFeaturedPages}
                onPageChange={handleFeaturedPageChange}
                featuredJobs={featuredJobs?.jobs}
              />
            )}

            <MobileJobsAccordion
              jobs={featuredJobs?.jobs}
              jobsIsLoading={homepageIsLoading}
            />
            {isMobileOrTablet && totalFeaturedPages > 1 && (
              <Pagination
                count={totalFeaturedPages}
                page={featuredPage.page}
                onChange={(event, page) => handleFeaturedPageChange(page)}
              />
            )}
          </StyledHomeFeaturedContent>

          <Divider sx={{ margin: "0.5rem auto", width: "95%" }} />
          <EmployerPromoCard
          userId={auth?.user?._id}
          isLoggedIn={auth?.isLoggedIn} />
          <Box
            sx={{
              width: { xs: "100%", sm: "100%", md: "auto" },
              overflowX: { xs: "auto", sm: "auto", md: "visible" },
            }}
          >
            <SiteFeatures isLoading={homepageIsLoading} />
          </Box>

          <Grid
            container
            sx={{
              width: { xs: "100%", md: "100%" },
              flexDirection: { xs: "column", md: "row" },
              justifyContent: { md: "center" },
              alignItems: { md: "stretch" },
            }}
            spacing={2}
          >
            <Grid item xs={12} md={8}>
              <SectionHeading
                title="Recent jobs"
                subtitle="Fresh listings that are actively reviewing applicants."
              />
              {homepageIsLoading && (
                <JobAdSkeleton
                  sx={{
                    height: "95px",
                  }}
                  num={5}
                  variant="rectangular"
                />
              )}
              {!homepageIsLoading && <RecentJobs homeJobs={homeJobs} />}
            </Grid>
            
            <Grid item xs={12} md={4}>
              <SectionHeading
                title="Welcome"
                subtitle="Quick links and getting-started info."
              />
              {homepageIsLoading && (
                <JobAdSkeleton
                  sx={{
                    height: "95px",
                    borderRadius: "6px",
                  }}
                  num={5}
                  variant="rectangular"
                />
              )}

              {!homepageIsLoading && <WelcomeCard />}
            </Grid>
          </Grid>

          <div>
            <Divider />
            <AjarnHowToHelper />
            <Divider />
          </div>
          <div>
            <SectionHeading
              title="Featured extras"
              subtitle="More ways to explore and discover."
            />
            <BottomFeatured isLoading={homepageIsLoading} />
          </div>
          <Divider flexItem />
        </StyledGridContainer>
        <div>
          <Typography align="center" variant="h6" color="text.secondary">
            Jobs you may like <WorkIcon sx={{ fontSize: 14 }} />
          </Typography>

          <BottomFeaturedAdsList
            isLoading={homepageIsLoading}
            footerJobs={homeJobs}
          />
        </div>
      </Content>
      {/* */}

      <Footer />
    </PageContainer>
  );
};

export default Home;
