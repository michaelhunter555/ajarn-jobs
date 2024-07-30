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

const teacherPrivelages = [
  {
    id: 1,
    action: "Build Out Your Profile",
    description:
      "Add work history, manage & view your profile and create meaningful content for employers to learn more about you.",
    img: "https://res.cloudinary.com/dtqbxfe7r/image/upload/v1721797076/12_bgvlmx.svg",
    component: "buildProfile",
  },
  {
    id: 2,
    action: "Search For Jobs",
    description:
      "You can apply to each job once unless the employer removes your application which you can then apply again.",
    img: "https://res.cloudinary.com/dtqbxfe7r/image/upload/v1721797077/19_lhm0ch.svg",
    component: "searchForJobs",
  },
  {
    id: 3,
    action: "Apply to Jobs",
    description:
      "After finding positions that you feel are a fit, you can apply to the job.",
    img: "https://res.cloudinary.com/dtqbxfe7r/image/upload/v1721797077/11_uij5wa.svg",
    component: "applyJobs",
  },

  {
    id: 4,
    action: "Manage Applications",
    description:
      "Keep record of all the jobs you have applied to and respond to recruitment offers from employers.",
    img: "https://res.cloudinary.com/dtqbxfe7r/image/upload/v1721797076/14_kn5eae.svg",
    component: "manage",
  },
];

const RenderExplanationText = ({ component }) => {
  switch (component) {
    case "buildProfile":
      return "Teachers can build out their profile by providing relevant work history (resume) as well as completing general info about themselves in settings. Further, each user has their own page where they can view their profile and make adjustments as needed. For each user page, users can provide a cover letter, drop-down resume table, and there about. Additionally, information such as your experience, education, location are displayed alongside your selected photo for employers and recruiters to see. While it is not required, we highly encourage that you use an image of yourself.";

    case "searchForJobs":
      return "Search our database of jobs directly from your browser and start applying to jobs that you are feel you are a fit for. The amount of jobs available depends on a various external factors and we do are best to help employers post their available jobs with competitive offers. More over, we aim to provide a specific quality of jobs from respectable schools and recruiting services in Thailand. Each job contains its own page with details regarding salary, location, qualifications, work permits, and more.";
    case "applyJobs":
      return "Apply to as many unique jobs as you wish. Remember, you cannot apply to the same job twice, so before you apply it is best to make sure your profile is in order and presentable for employers to view. You may only get one look, so make sure you have all relevant information included in your profile to standout against other applicants. If you do make a mistake in your application and later realize, or applied to a job you are no longer interested in, you can withdrawal your application from that job. This allows you total control over which jobs receive and maintain your applications.";
    case "manage":
      return "Manage all the jobs applied to in a timely record organized by date. Remove applications to jobs you are not longer interested in being a candidate for and respond to recruitment offers sent by employers with one-click. If you are interested, the employer/recruiter will be notified and further contact outside of Ajarnjob.com will likely take place.";
    default:
      return "hello world";
  }
};

const TeacherPrivelages = () => {
  const [component, setComponent] = useState("buildProfile");
  const [actionText, setActionText] = useState("Build out your profile");
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
        <Typography variant="h3">Teacher - (teach·er /ˈtēCHər/)</Typography>
        <Typography gutterBottom>
          User Type <code>Teacher</code> is for those who are looking to apply
          for teaching jobs in Thailand.
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
        {teacherPrivelages?.map((t, i) => (
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
      <Stack sx={{ padding: 2, borderRadius: 10, minHeight: 250 }}>
        <Typography variant="h3" color="text.secondary">
          {actionText}
        </Typography>
        <Divider />
        <Typography color="text.secondary" variant="subtitle2">
          <RenderExplanationText component={component} />
        </Typography>
      </Stack>
    </List>
  );
};

export default TeacherPrivelages;
