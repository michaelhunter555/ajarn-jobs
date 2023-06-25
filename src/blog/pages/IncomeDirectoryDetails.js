import React from "react";

import { useParams } from "react-router-dom";

import { Alert, Chip, Grid, Paper, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import FeaturedCard from "../../Dashboard/components/Profile/FeaturedCard";
import Tefl from "../../home/components/Tefl";

const IncomeDirectoryDetails = () => {
  const incomePostId = useParams().id;

  const getUserIncomeData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_USERS}/income-posts/${incomePostId}`
      );

      if (!response.ok) {
        throw new Error("Error retrieving user income Post details.");
      }

      const data = await response.json();
      return data.incomeDetails;
    } catch (err) {
      console.log(
        "Error retreiving user Income Data in IncomeDirectorDetails:" + err
      );
    }
  };

  const {
    data: user,
    isLoading,
    error,
  } = useQuery(["IncomeDetails"], () => getUserIncomeData());

  const userDataObj = [
    {
      question: "What is your current Job Title?",
      variant: "h6",
      color: "text.primary",
      answer: user?.jobTitle,
      answerVariant: "body1",
      answerColor: "text.secondary",
    },
    {
      question: "What are your current monthly earnings (in THB)?",
      variant: "h6",
      color: "text.primary",
      answer: user?.monthlySalary,
      answerVariant: "body1",
      answerColor: "text.secondary",
    },
    {
      question: "How much can save per month (with minimum effort)?",
      variant: "h6",
      color: "text.primary",
      answer: user?.monthlySavings,
      answerVariant: "body1",
      answerColor: "text.secondary",
    },
    {
      question: "Do you mind sharing your highest education level?",
      variant: "h6",
      color: "text.primary",
      answer: user?.educationLevel,
      answerVariant: "body1",
      answerColor: "text.secondary",
    },
    {
      question:
        "What's the minimum salary you would advise others to aim for in your current location?",
      variant: "h6",
      color: "text.primary",
      answer: user?.perfectNumber,
      answerVariant: "body1",
      answerColor: "text.secondary",
    },
    {
      question: "How would you describe your lifestyle on your current salary?",
      variant: "h6",
      color: "text.primary",
      answer: user?.lifestyle,
      answerVariant: "body1",
      answerColor: "text.secondary",
    },
  ];

  return (
    <Grid container justifyContent="center" sx={{ maxWidth: "90%" }}>
      <Grid
        item
        xs={12}
        sm={6}
        md={9}
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Paper elevation={0} sx={{ padding: 2, borderRadius: 8 }}>
          <Alert
            sx={{ maxWidth: 250, padding: 0, marginBottom: 1 }}
            severity="info"
          >
            This is a user submitted post
          </Alert>
          <Chip
            label={
              <Typography variant="subtitle2" color="text.secondary">
                Posted - {user?.postDate?.split("T")[0]} by{" "}
                {user?._id?.replace(/[0-9]/gi, "")}
              </Typography>
            }
            variant="filled"
            size="small"
          />
          {userDataObj?.map((val, i) => (
            <Stack key={i}>
              <Typography variant={val?.variant} color={val?.color}>
                {val?.question}
              </Typography>
              <Typography variant={val?.answerVariant} color={val?.answerColor}>
                {val?.answer}
              </Typography>
            </Stack>
          ))}
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Stack direction="column" spacing={2} sx={{ marginTop: 1 }}>
          <Tefl />
          <FeaturedCard />
        </Stack>
      </Grid>
    </Grid>
  );
};

export default IncomeDirectoryDetails;
