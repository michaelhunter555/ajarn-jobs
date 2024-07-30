import React, { useEffect, useState } from "react";

import { useLocation } from "react-router-dom";

import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Divider,
  Fade,
  FormControlLabel,
  FormHelperText,
  Stack,
  Switch,
  Typography,
} from "@mui/material";

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

const AjarnJobsExperience = () => {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const queryValue = queryParams.get("type");

  const [userType, setUserType] = useState("Teacher"); // || employer
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [featured, setFeatured] = useState(false);

  const handleFeatureToggle = () => setFeatured((prev) => !prev);

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
            <Container
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
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
            <Divider
              variant="middle"
              sx={{ margin: "1rem auto", width: "50%" }}
            />
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
                  You can also recruit teachers by activing a teacher buffet.
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
          </>
        )}
      </Content>
      <Footer />
    </PageContainer>
  );
};

export default AjarnJobsExperience;
