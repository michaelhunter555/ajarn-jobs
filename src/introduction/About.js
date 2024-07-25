import React, { useState } from "react";

import { Paper, Stack, Tab, Tabs, Typography } from "@mui/material";

import Footer, {
  Content,
  PageContainer,
} from "../shared/components/UIElements/Footer";

const About = () => {
  const [index, setIndex] = useState(0);

  const handleIndexChange = (index) => {
    setIndex(Number(index));
  };

  return (
    <PageContainer>
      <Content>
        <Paper
          sx={{
            padding: 2,
            borderRadius: 10,
            maxWidth: { xs: "100%", md: "70%" },
            margin: "0 auto",
          }}
        >
          <Tabs
            value={index}
            onChange={(event, index) => handleIndexChange(index)}
          >
            <Tab value={0} label="Ajarn Jobs" />
            <Tab value={1} label="Creator Statement" />
          </Tabs>
          {index === 0 && (
            <Stack sx={{ padding: 2 }}>
              <Typography variant="h4">Our Story</Typography>

              <Typography variant="h5" color="text.secondary">
                Our Mission
              </Typography>
              <Typography gutterBottom color="text.secondary">
                Ajarn Jobs is an English teaching job's board providing
                solutions for both teachers and employers in Asia. We aim to
                offer another perspective and experience as a go to job hunting
                solution.
              </Typography>
              <Typography variant="h5" color="text.secondary">
                Purpose
              </Typography>
              <Typography gutterBottom color="text.secondary">
                The purpose of AjarnJobs.com was to offer a new way to find
                teaching jobs in Thailand as the options serving this niche,
                despite the high and consistent demand for ESL teachers, are
                limited. AjarnJobs.com aims to simplify the process of finding a
                job by offering a platform that connects teachers and employers
                in one centralized experience.Finding a job is a job in itself.
                Creating emails, adjusting resumes, tailoring your cover letter.
                It becomes tiresome overtime and for employers there's no
                exception to this either. Long hours of sifting through resumes,
                sending messages to candidates who may not be interested (or
                even qualified) in your jobs, and the overall challenge of
                finding must meet qualification teachers. AjarnJobs.com aims to
                mitigate all of that in a way which gives a voice to both
                teachers and employers and aims to adress the needs of users to
                provide a rich job-finding resource that is safe for anyone who
                wants to teach English in the kingdom.
              </Typography>
              <Typography variant="h5" color="text.secondary">
                Roadmap Ahead
              </Typography>
              <Typography color="text.secondary">
                With that we hope that you find our website useful and encourage
                all users to share feedback regarding performance and
                improvements. The roadmap for now is to actively maintain this
                website, build a strong team, and continue to add features that
                improve the user-experience for both employers and teachers.
              </Typography>
            </Stack>
          )}
          {index === 1 && (
            <Stack sx={{ padding: 2 }}>
              <Typography gutterBottom color="text.secondary">
                In 2023, I created AjarnJobs.com while I was an English Teacher,
                who at that time had been teaching English in Thailand for over
                10 years. From highschools, private schools, language schools,
                to universities, I've had my share of experiences. Moreover, I
                was fortunate enough in each circumstance to have an opportunity
                to make a positive impact on a young learner's life. Combining
                my passion for web development with my understanding of the
                teaching industry, the idea for a teacher-centric job board only
                felt natural. My team and I are dedicated to continually
                expanding site functionality aimed at an optimal user
                experience. Most importantly, I am open to your feedback!
              </Typography>

              <br />

              <Typography color="text.secondary">-Michael Hunter</Typography>
            </Stack>
          )}
        </Paper>
      </Content>
      <Footer />
    </PageContainer>
  );
};

export default About;
