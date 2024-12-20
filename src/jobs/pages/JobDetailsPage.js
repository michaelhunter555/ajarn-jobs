import React, { useContext, useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";

//import { useQuery } from "@tanstack/react-query";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import Footer, {
  Content,
  PageContainer,
} from "../../shared/components/UIElements/Footer";
import { AuthContext } from "../../shared/context/auth-context";
import { useJob } from "../../shared/hooks/jobs-hook";
import JobDetails from "../components/JobDetails";

const JobDetailsPage = () => {
  const auth = useContext(AuthContext);
  const jobId = useParams().jid;
  const { error, clearError } = useJob();
  const navigate = useNavigate();
  // useEffect(() => {
  //   getJobById(jobId);
  // });

  const getJobDetails = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_JOBS}/${jobId}`);
      if (!response.ok) {
        throw new Error("There was an error with the request");
      }
      const data = await response.json();
      return data.job;
    } catch (err) {
      console.log("Error in jobDetails:", err);
    }
  };

  const { data: jobs, isLoading } = useQuery(["jobDetailsPage", jobId], () =>
    getJobDetails(jobId)
  );

  const userAppliedAlready = jobs?.applicants?.some(
    (applicant) => applicant?.userId?._id === auth?.user?._id
  );

  useEffect(() => {
    if (!isLoading && !jobs) {
      navigate("/404");
    }
  }, [jobs, navigate, isLoading]);

  return (
    <PageContainer>
      <Content>
        <ErrorModal error={error} onClear={clearError} />
        <JobDetails
          userAppliedAlready={userAppliedAlready}
          isLoading={isLoading}
          job={jobs}
        />
      </Content>
      <Footer />
    </PageContainer>
  );
};

export default JobDetailsPage;
