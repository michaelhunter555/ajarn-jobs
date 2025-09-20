import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Grid, Card, CardContent, Avatar } from "@mui/material";
import { styled } from "@mui/material/styles";
import { FaMoneyBillWave } from "react-icons/fa";
import { MdAvTimer, MdLocationPin } from "react-icons/md";
import { getTimeDifference } from "../../shared/util/getTimeDifference";

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  borderRadius: "15px",
  transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: theme.shadows[4],
  },
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(2),
  "&:last-child": {
    paddingBottom: theme.spacing(2),
  },
}));

const JobHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "flex-start",
  flexDirection: "column",
  marginBottom: theme.spacing(2),
}));

const CompanyLogo = styled(Avatar)(({ theme }) => ({
  width: 50,
  height: 50,
  marginRight: theme.spacing(2),
  borderRadius: "8px",
}));

const JobInfo = styled(Box)({
  flex: 1,
});

const JobTitle = styled(Typography)(({ theme }) => ({
  fontSize: "1.1rem",
  fontWeight: 600,
  marginBottom: theme.spacing(0.5),
  color: theme.palette.text.primary,
}));

const Salary = styled(Typography)(({ theme }) => ({
  fontSize: "0.95rem",
  fontWeight: 500,
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(0.5),
}));

const CompanyInfo = styled(Typography)(({ theme }) => ({
  fontSize: "0.85rem",
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

const JobIcons = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: theme.spacing(1),
  marginTop: theme.spacing(1),
}));

const IconItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  fontSize: "0.8rem",
  color: theme.palette.text.secondary,
  "& svg": {
    marginRight: theme.spacing(0.5),
    fontSize: "1rem",
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: "1.3rem",
  fontWeight: 600,
  marginBottom: theme.spacing(2),
  color: theme.palette.text.primary,
}));

const OtherJobsFromEmployer = ({ otherJobs, otherJobsCount, currentJobId }) => {
  if (!otherJobs || otherJobs.length === 0) {
    return null;
  }

  return (
    <Box sx={{ marginTop: 4 }}>
      <SectionTitle variant="h5">
        More Jobs from {otherJobs[0]?.creator?.company || "This Employer"} ({otherJobsCount})
      </SectionTitle>
      
      <Grid container spacing={2}>
        {otherJobs.map((job) => (
          <Grid item xs={12} sm={6} md={6} key={job._id}>
            <Link
              to={`/jobs/${job._id}/${job?.title?.replace(/\s+/g, "-")?.toLowerCase()}`}
              style={{ textDecoration: "none" }}
            >
              <StyledCard>
                <StyledCardContent>
                  <JobHeader>
                    <CompanyLogo
                      src={job?.image}
                      alt={job.creator?.company}
                    >
                      {job.creator?.company?.charAt(0) || "E"}
                    </CompanyLogo>
                    <JobInfo>
                      <JobTitle variant="h6">
                        {job.title}
                      </JobTitle>
                      <Salary>
                        {job.salary}
                      </Salary>
                      <CompanyInfo>
                        {job.creator?.company} • {getTimeDifference(job.datePosted)}
                      </CompanyInfo>
                    </JobInfo>
                  </JobHeader>
                  
                  <JobIcons>
                    <IconItem>
                      <MdLocationPin />
                      {job.location}
                    </IconItem>
                    <IconItem>
                      <MdAvTimer />
                      {job.hours}
                    </IconItem>
                    <IconItem>
                      <FaMoneyBillWave />
                      {job.salary.split(" - ")[0]}
                    </IconItem>
                  </JobIcons>
                </StyledCardContent>
              </StyledCard>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default OtherJobsFromEmployer;
