import React, { useEffect, useMemo, useState } from "react";

import { useLocation } from "react-router-dom";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Divider,
  Fade,
  FormControlLabel,
  FormHelperText,
  Grid,
  Paper,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import ChatIcon from "@mui/icons-material/Chat";
import VerifiedIcon from "@mui/icons-material/Verified";
import PaymentsIcon from "@mui/icons-material/Payments";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import SendIcon from "@mui/icons-material/Send";
import Footer, {
  Content,
  PageContainer,
} from "../shared/components/UIElements/Footer";
import BasicTable from "./DemoEmployerTable";
import DummyPreviewComponent from "./DemoTeacher";
import DemoJobCard from "./DummyJobCard";
import EmployerPrivelages from "./EmployerPrivelages";
import FeedbackBox from "./HelpfulnessChecker";
import RenderSkeleton from "./HowToSkeleton";
import TeacherPrivelages from "./TeacherPrivelages";

const teacherImg =
  "https://res.cloudinary.com/dtqbxfe7r/image/upload/v1721794614/teacher-noblue_enhpgz.svg";
const employerImg =
  "https://res.cloudinary.com/dtqbxfe7r/image/upload/v1721793700/employers_y11uth.svg";

const userTypes = [
  { img: teacherImg, userType: "Teacher" },
  { img: employerImg, userType: "Employer" },
];

const dummyHighlights = [
  {
    title: "Fast search & filters",
    body: "Browse jobs or teachers using location, experience, and role-based filters.",
    icon: <SearchIcon />,
  },
  {
    title: "Messaging that feels modern",
    body: "Start a conversation, keep context, and follow up easily.",
    icon: <ChatIcon />,
  },
  {
    title: "Verification & trust signals",
    body: "Verified accounts and clearer profiles help reduce spam and mismatches.",
    icon: <VerifiedIcon />,
  },
  {
    title: "Simple billing & receipts",
    body: "Buy credits, track invoices, and keep history organized.",
    icon: <PaymentsIcon />,
  },
];

const dummyHighlightsTeacher = [
  {
    title: "Quickly apply to jobs",
    body: "Find jobs you're interested in and apply with a single click.",
    icon: <SendIcon />,
  },
  {
    title: "Keep track of your applications",
    body: "View all your applications in one place and manage them easily.",
    icon: <TrackChangesIcon />,
  },
  {
    title: "Engage in live chats with employers",
    body: "Start a conversation, keep context, and follow up easily.",
    icon: <ChatIcon />,
  },
  {
    title: "Build your brand",
    body: "Post helpful content and share insights to stand out.",
    icon: <TipsAndUpdatesIcon />,
  },
];

const dummyTeacherSteps = [
  {
    title: "Create your profile",
    body: "Add your location, education, experience, and a photo.",
  },
  {
    title: "Apply quickly",
    body: "Use one-click apply flows and keep your application history in one place.",
  },
  {
    title: "Message employers",
    body: "Follow up on applications and keep chats organized per job or employer.",
  },
  {
    title: "Build your brand",
    body: "Post helpful content and share insights to stand out.",
  },
];

const dummyEmployerSteps = [
  {
    title: "Post a job in minutes",
    body: "Create a basic listing, then optionally upgrade it to featured placement.",
  },
  {
    title: "Manage applicants",
    body: "Review candidates and move them forward with a clear pipeline view.",
  },
  {
    title: "Recruit from the buffet",
    body: "Activate buffet access and discover teachers proactively.",
  },
  {
    title: "Interview with context",
    body: "Keep messages, notes, and next steps tied to the conversation.",
  },
];

const dummyFaq = [
  {
    q: "Is this page showing real data?",
    a: "No — everything in this guide is dummy content so you can iterate on layout and messaging without backend dependencies.",
  },
  {
    q: "What’s the difference between Teacher and Employer accounts?",
    a: "Teachers focus on building a profile and applying. Employers focus on posting jobs, reviewing applicants, and recruiting teachers.",
  },
  {
    q: "Do I need to verify my email?",
    a: "Yes. Verification helps prevent fake signups and protects both sides of the marketplace.",
  },
  {
    q: "Where do messages live?",
    a: "Messages live inside the dashboard messaging area, organized by conversation so you can pick up where you left off.",
  },
];

const SectionTitle = ({ title, subtitle }) => (
  <Stack spacing={0.5} sx={{ mb: 2 }}>
    <Typography variant="h5" sx={{ fontWeight: 800 }}>
      {title}
    </Typography>
    {subtitle ? (
      <Typography variant="subtitle2" color="text.secondary">
        {subtitle}
      </Typography>
    ) : null}
  </Stack>
);

const AjarnJobsExperience = () => {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const queryValue = queryParams.get("type");

  const [userType, setUserType] = useState("Teacher"); // || employer
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [featured, setFeatured] = useState(false);

  const featureHighlights = userType === "Teacher" ? dummyHighlightsTeacher : dummyHighlights;

  const handleFeatureToggle = () => setFeatured((prev) => !prev);

  const activeSteps = useMemo(() => {
    return userType === "Teacher" ? dummyTeacherSteps : dummyEmployerSteps;
  }, [userType]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => {
      setIsLoading(false);
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    if (queryValue && queryValue === "employer") {
      setSelectedIndex(1);
      setUserType("Employer");
    }
  }, [queryValue]);

  return (
    <PageContainer>
      <Content>
        {isLoading && <RenderSkeleton />}
        {!isLoading && (
          <>
            <Box
              sx={{
                py: { xs: 4, md: 7 },
                background:
                  "radial-gradient(1200px circle at 10% 10%, rgba(18,140,177,0.18), transparent 60%), radial-gradient(900px circle at 90% 0%, rgba(255,162,162,0.22), transparent 55%)",
                borderBottom: "1px solid",
                borderColor: "divider",
              }}
            >
              <Container>
                <Stack
                  direction={{ xs: "column", md: "row" }}
                  spacing={3}
                  alignItems={{ xs: "flex-start", md: "center" }}
                  justifyContent="space-between"
                >
                  <Stack spacing={1} sx={{ maxWidth: 720 }}>
                    <Chip
                      size="small"
                      color="primary"
                      sx={{ width: "fit-content" }}
                      label="AjarnJobs Guide"
                    />
                    <Typography
                      variant="h3"
                      sx={{
                        fontWeight: 900,
                        letterSpacing: -0.6,
                        fontSize: { xs: 32, md: 44 },
                      }}
                    >
                      How to use AjarnJobs like a pro
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                      Pick a user type below, then follow the quick steps, feature highlights,
                      and demos. Everything on this page is example data.
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap">
                      <Chip label="Messaging" variant="outlined" />
                      <Chip label="Content" variant="outlined" />
                      <Chip label="Recruiting" variant="outlined" />
                      <Chip label="Billing" variant="outlined" />
                      <Chip label="Profile strength" variant="outlined" />
                    </Stack>
                  </Stack>
                  <Stack direction="row" spacing={1}>
                    <Button
                      variant="contained"
                      onClick={() =>
                        document
                          .getElementById("how-to-steps")
                          ?.scrollIntoView({ behavior: "smooth", block: "start" })
                      }
                    >
                      Jump to steps
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() =>
                        document
                          .getElementById("how-to-faq")
                          ?.scrollIntoView({ behavior: "smooth", block: "start" })
                      }
                    >
                      FAQ
                    </Button>
                  </Stack>
                </Stack>
              </Container>
            </Box>

            <Container
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mt: { xs: 3, md: 5 },
              }}
            >
              <FormHelperText sx={{ fontSize: 20, fontWeight: 700 }}>
                User Types
              </FormHelperText>
              <FormHelperText>
                Select user type to see available features
              </FormHelperText>
              <Fade in={true}>
                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  justifyContent="center"
                  sx={{ width: { xs: "100%", md: "50%" } }}
                >
                  {userTypes?.map((user, i) => (
                    <Card
                      key={user.userType}
                      onClick={() => {
                        setUserType(user.userType);
                        setSelectedIndex(i);
                      }}
                      sx={{
                        cursor: "pointer",

                        backgroundColor:
                          selectedIndex === i ? "#f2fdff" : "bg.paper",
                        transition: "transform 120ms ease",
                        "&:hover": { transform: "translateY(-1px)" },
                      }}
                    >
                      <CardMedia
                        component="img"
                        src={user.img}
                        alt="user-types-ajarn-jobs"
                      />
                      <CardContent
                        sx={{ display: "flex", justifyContent: "center" }}
                      >
                        <Typography
                          sx={{
                            fontWeight: selectedIndex === i ? 700 : "normal",
                            color:
                              selectedIndex === i ? "#000" : "text.secondary",
                          }}
                          color="text.secondary"
                        >
                          {user.userType}
                        </Typography>
                      </CardContent>
                    </Card>
                  ))}
                </Stack>
              </Fade>
            </Container>

            <Container sx={{ mt: { xs: 3, md: 5 } }}>
              <SectionTitle
                title="Feature highlights"
                subtitle="A quick snapshot of what makes the site useful."
              />
              <Grid container spacing={2}>
                {featureHighlights.map((h) => (
                  <Grid key={h.title} item xs={12} sm={6} md={3}>
                    <Card
                      component={Paper}
                      elevation={0}
                      variant="outlined"
                      sx={{ height: "100%" }}
                    >
                      <CardContent>
                        <Stack spacing={1.25}>
                          <Stack direction="row" spacing={1} alignItems="center">
                            <Box
                              sx={{
                                width: 36,
                                height: 36,
                                display: "grid",
                                placeItems: "center",
                                borderRadius: 2,
                                bgcolor: "action.hover",
                              }}
                            >
                              {h.icon}
                            </Box>
                            <Typography sx={{ fontWeight: 800 }}>
                              {h.title}
                            </Typography>
                          </Stack>
                          <Typography variant="body2" color="text.secondary">
                            {h.body}
                          </Typography>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Container>

            <Divider
              variant="middle"
              sx={{ margin: "1rem auto", width: "50%" }}
            />

            <Container id="how-to-steps" sx={{ mt: { xs: 2, md: 4 } }}>
              <SectionTitle
                title={`How it works for ${userType}s`}
                subtitle="A quick walkthrough."
              />
              <Grid container spacing={2}>
                {activeSteps.map((step, idx) => (
                  <Grid key={step.title} item xs={12} md={6}>
                    <Card variant="outlined" sx={{ height: "100%" }}>
                      <CardContent>
                        <Stack direction="row" spacing={2} alignItems="flex-start">
                          <Box
                            sx={{
                              width: 34,
                              height: 34,
                              borderRadius: 99,
                              bgcolor: "primary.main",
                              color: "primary.contrastText",
                              display: "grid",
                              placeItems: "center",
                              fontWeight: 900,
                              flex: "0 0 auto",
                            }}
                          >
                            {idx + 1}
                          </Box>
                          <Stack spacing={0.5}>
                            <Typography sx={{ fontWeight: 800 }}>
                              {step.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {step.body}
                            </Typography>
                          </Stack>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                sx={{ mt: 2 }}
              >
                <Card variant="outlined" sx={{ flex: 1 }}>
                  <CardContent>
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                      <TipsAndUpdatesIcon fontSize="small" />
                      <Typography sx={{ fontWeight: 800 }}>Pro tip</Typography>
                    </Stack>
                    {userType === "Teacher" && <Typography variant="body2" color="text.secondary">
                      Keep your profile “complete” (photo + experience + location). Better
                      profiles get better matches.
                    </Typography>}
                   {userType === "Employer" && <Typography variant="body2" color="text.secondary">
                     You can have recruit multiple teachers, and start active chats simultaneously.
                    </Typography>}
                  </CardContent>
                </Card>
                <Card variant="outlined" sx={{ flex: 1 }}>
                  <CardContent>
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                      <VerifiedIcon fontSize="small" />
                      <Typography sx={{ fontWeight: 800 }}>Trust signal</Typography>
                    </Stack>
                    <Typography variant="body2" color="text.secondary">
                      Every user is verified by email verification or Google sign in.
                    </Typography>
                  </CardContent>
                </Card>
              </Stack>
            </Container>

            {userType === "Teacher" ? (
              <TeacherPrivelages />
            ) : (
              <EmployerPrivelages />
            )}{" "}
            {userType === "Employer" && (
              <Stack
                direction="column"
                justifyContent="center"
                spacing={2}
                sx={{ width: { xs: "100%", md: "70%" }, margin: "1rem auto" }}
              >
                <Divider />
                <Typography variant="h5" color="text.secondary">
                  Basic Vs. Featured Jobs
                </Typography>
                <FormHelperText>
                  Toggle day & night mode to view featured vs basic
                  presentation.
                </FormHelperText>
                <FormControlLabel
                  control={
                    <Switch
                      value={featured}
                      checked={featured}
                      onChange={handleFeatureToggle}
                    />
                  }
                  label={`${featured ? "featured Job" : "basic"}`}
                />
                <DemoJobCard featured={featured} />
                <Divider />
                <Typography variant="h5" color="text.secondary">
                  Manage your applicants and start the interview process
                </Typography>
                <BasicTable />
                <Divider />
                <Typography variant="h5" color="text.secondary">
                  You can also recruit teachers by activating a teacher buffet.
                </Typography>
                <Stack
                  sx={{
                    flexDirection: { xs: "column", md: "row" },
                    alignItems: { xs: "center", md: "start" },
                  }}
                >
                  <Stack sx={{ maxWidth: { xs: "100%", md: "40%" } }}>
                    <Typography variant="subtitle1" color="text.secondary">
                      When a teacher buffet is active, you have access to all
                      teacher profiles on AjarnJobs.com. Activated buffets will
                      also give you access to the user's contact information. We
                      suggest you recruit the user to confirm interest before
                      directly e-mailing them.
                    </Typography>
                  </Stack>
                  <Stack sx={{ minWidth: "60%" }}>
                    <DummyPreviewComponent />
                  </Stack>
                </Stack>
                <Divider sx={{ margin: "0.5rem auto 3rem" }} />
                <Stack sx={{ width: "100%" }}>
                  <FeedbackBox />
                </Stack>
              </Stack>
            )}

            <Container id="how-to-faq" sx={{ mt: { xs: 4, md: 7 }, mb: { xs: 2, md: 4 } }}>
              <SectionTitle
                title="FAQ"
                subtitle="Common questions."
              />
              {dummyFaq.map((item) => (
                <Accordion key={item.q} disableGutters elevation={0} sx={{ mb: 1 }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography sx={{ fontWeight: 800 }}>{item.q}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body2" color="text.secondary">
                      {item.a}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}

              <Card
                variant="outlined"
                sx={{
                  mt: 2,
                  p: 1,
                  background:
                    "linear-gradient(135deg, rgba(18,140,177,0.12), rgba(255,162,162,0.10))",
                }}
              >
                <CardContent>
                  <Stack
                    direction={{ xs: "column", md: "row" }}
                    spacing={2}
                    alignItems={{ xs: "flex-start", md: "center" }}
                    justifyContent="space-between"
                  >
                    <Stack spacing={0.5}>
                      <Typography variant="h6" sx={{ fontWeight: 900 }}>
                        Want a personalized walkthrough?
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                       Reach out to our team by sending an email, and we'll be happy to help you get started.
                      </Typography>
                    </Stack>
                    <Button variant="contained" endIcon={<TipsAndUpdatesIcon />}>
                      Contact support
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Container>
          </>
        )}
      </Content>
      <Footer />
    </PageContainer>
  );
};

export default AjarnJobsExperience;
