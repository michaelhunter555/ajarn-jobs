import React, { useState } from "react";

import {
  CardContent,
  CardMedia,
  Divider,
  List,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

const employerPrivelages = [
  {
    id: 1,
    action: "Get More Exposure",
    description:
      "Build out your profile with relevant business information to let applicants learn more about your company.",
    img: "https://res.cloudinary.com/dtqbxfe7r/image/upload/v1721812133/16_at0qnn.svg",
    component: "buildProfile",
  },
  {
    id: 2,
    action: "Find Teachers",
    description:
      "Upon successful account creation, you'll get 15 credits to post jobs and activate teacher buffets.",
    img: "https://res.cloudinary.com/dtqbxfe7r/image/upload/v1721812133/15_p7f45a.svg",
    component: "postJobs",
  },
  {
    id: 3,
    action: "Recruit Teachers",
    description:
      "Send recruitment offers to candidates who you feel are a fit for your job(s).",
    img: "https://res.cloudinary.com/dtqbxfe7r/image/upload/v1721812133/22_dvpdom.svg",
    component: "recruit",
  },

  {
    id: 4,
    action: "All-in-one dashboard",
    description:
      "The Employer dashboard allows you to keep record and mange all of your job postings, applicants and recruit offers.",
    img: "https://res.cloudinary.com/dtqbxfe7r/image/upload/v1721812133/17_f431dh.svg",
    component: "manage",
  },
];

const RenderExplanationText = ({ component }) => {
  switch (component) {
    case "buildProfile":
      return "Upon sign-up, once you visit the dashboard, you will be prompted to create a 'creator' profile. The information you fill here will be used and associated with every job you create, recruitment offer you send and for every applicant you receive. Information about your business/school should be as true and as accurate as possible. You have the ability to update your creator information, which will update all of your existing jobs/interactions with users. While updating minor info about your business is usually harmless, identifying factors such as company name should stay the same for the sake of familiarity.";

    case "postJobs":
      return "No credit card required to get started. New schools/recruiters are currently welcomed with 15 credits, you can post at least 3 basic jobs or enable teacher buffets which vary from 24(2 credits) hours to 1 month (50 credits). Please note, in order to post jobs, you must have a complete creator profile. This means you have filled in all fields related to your company before posting jobs or attempting to recruit other users. We believe this approach allows you to familiarize yourself with our platform and take advantage of an offer to save you money in your attempt to fill positions.";
    case "recruit":
      return "Sometimes the demand for new Teachers can be high and if there are a lot of jobs currently listed, it increases the chances that users may not come across your listing. In order to avoid this scenario, Employers have the ability to directly recruit teachers by activating their teacher buffet, visiting the user's profile and clicking 'Recruit [name]' option. From there a drop down list of all your active jobs will be available and you can send offers for positions. After an offer is sent, you can wait for a reply via your dashboard.";
    case "manage":
      return "Keep track of all jobs you have created, applicants who have applied to your jobs, and recruitment offers sent out to shortlisted candidates. Each Employer account maintains a billing history of all transactions done on AjarnJobs.com in regards to credit purchases via Stripe, Job postings, and teacher buffet activations. Easily manage and edit your job listings, remove applicants, post content, and view the most recent list of active teachers whenever your teacher buffet setting is active.";
    default:
      return "hello world";
  }
};

const EmployerPrivelages = () => {
  const [component, setComponent] = useState("buildProfile");
  const [actionText, setActionText] = useState("Get More Exposure");
  const [index, setIndex] = useState(0);
  return (
    <List
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        gap: "15px",
        justifyContent: "center",
        width: { xs: "100%", md: "75%" },
        margin: "0 auto 1rem",
      }}
    >
      <Stack>
        <Typography variant="h3">
          Employer - (em·​ploy·​er /im-ˈplȯi-ər/)
        </Typography>
        <Typography gutterBottom>
          User Type <code>Employer</code> is for those who are looking to create
          job listings and/or hire teachers.
        </Typography>
      </Stack>
      <Divider flexItem />
      <Stack
        sx={{
          justifyContent: "center",
          flexDirection: { xs: "column", md: "row" },
          gap: "10px",
          width: "100%",
        }}
      >
        {employerPrivelages?.map((t, i) => (
          <Paper
            onClick={() => {
              setComponent(t.component);
              setActionText(t.action);
              setIndex(i);
            }}
            key={t.id}
            sx={{
              cursor: "pointer",
              padding: 2,
              borderRadius: 10,
              maxWidth: { sx: "100%", md: 300 },
              minHeight: 400,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              border: i === index ? "1px solid gray" : "none",
              backgroundColor: index === i ? "#f2fdff" : "bg.paper",
            }}
          >
            <Typography
              sx={{
                fontWeight: index === i ? 700 : "normal",
                color: index === i ? "#000" : "text.secondary",
              }}
              variant="h5"
              color="text.secondary"
            >
              {t.action}
            </Typography>
            <CardMedia
              component="img"
              src={t.img}
              alt="teacher-find-jobs"
              sx={{ width: 150, height: 150 }}
            />
            <Divider
              sx={{
                margin: "0.5rem auto",
                width: "90%",
                color: i === index ? "#000 !important" : "#121212",
              }}
              flexItem
            />
            <CardContent>
              <Typography
                sx={{
                  color: index === i ? "#000" : "text.secondary",
                }}
              >
                {t.description}
              </Typography>
            </CardContent>
          </Paper>
        ))}
      </Stack>
      <Stack sx={{ padding: 2, borderRadius: 10, minHeight: 200 }}>
        <Typography variant="h3">{actionText}</Typography>
        <Divider />
        <RenderExplanationText component={component} />
      </Stack>
    </List>
  );
};

export default EmployerPrivelages;
