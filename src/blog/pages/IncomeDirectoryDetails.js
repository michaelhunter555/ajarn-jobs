import React from "react";

import { useParams } from "react-router-dom";

import { 
  Alert, 
  Box, 
  Card, 
  CardContent, 
  Chip, 
  Divider, 
  Grid, 
  Paper, 
  Stack, 
  Typography,
  Avatar,
  IconButton
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { AttachMoney, Work, School, TrendingUp, Home, Savings } from "@mui/icons-material";
import { useQuery } from "@tanstack/react-query";

import FeaturedCard from "../../Dashboard/components/Profile/FeaturedCard";
import Tefl from "../../home/components/Tefl";
import Footer, {
  Content,
  PageContainer,
} from "../../shared/components/UIElements/Footer";

// Styled Components
const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[3],
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    boxShadow: theme.shadows[6],
    transform: 'translateY(-2px)'
  }
}));

const QuestionCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  borderRadius: theme.spacing(1.5),
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    borderColor: theme.palette.primary.main
  }
}));

const IconWrapper = styled(Avatar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  width: 40,
  height: 40
}));

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
      question: "Current Job Title",
      answer: user?.jobTitle,
      icon: <Work />,
      color: "primary"
    },
    {
      question: "Location",
      answer: user?.userId?.location,
      icon: <Home />,
      color: "info"
    },
    {
      question: "Monthly Earnings (THB)",
      answer: user?.monthlySalary ? `฿${user.monthlySalary.toLocaleString()}` : user?.monthlySalary,
      icon: <AttachMoney />,
      color: "success"
    },
    {
      question: "Monthly Savings",
      answer: user?.monthlySavings ? `฿${user.monthlySavings.toLocaleString()}` : user?.monthlySavings,
      icon: <Savings />,
      color: "info"
    },
    {
      question: "Education Level",
      answer: user?.educationLevel,
      icon: <School />,
      color: "secondary"
    },
    {
      question: "Recommended Minimum Salary",
      answer: user?.perfectNumber ? `฿${user.perfectNumber.toLocaleString()}` : user?.perfectNumber,
      icon: <TrendingUp />,
      color: "warning"
    },
  ];

  if (isLoading) {
    return (
      <PageContainer>
        <Content sx={{ alignItems: "center", justifyContent: "center", minHeight: "50vh" }}>
          <Typography variant="h6" color="text.secondary">Loading income details...</Typography>
        </Content>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <Content sx={{ alignItems: "center", justifyContent: "center", minHeight: "50vh" }}>
          <Alert severity="error">Failed to load income details. Please try again.</Alert>
        </Content>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Content sx={{ alignItems: "center" }}>
        <Grid
          container
          sx={{
            maxWidth: { xs: "100%", lg: "1200px" },
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "center",
            alignItems: "flex-start",
            mb: "2rem",
            gap: 3
          }}
        >
          {/* Main Content */}
          <Grid item xs={12} md={7}>
            <StyledCard>
              <CardContent sx={{ p: 3 }}>
                {/* Header */}
                <Box sx={{ mb: 3 }}>
                  <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                    <Alert severity="info" sx={{ flex: 1 }}>
                      <Typography variant="body2">
                        This is a user-submitted income report
                      </Typography>
                    </Alert>
                  </Stack>
                  
                  <Chip
                    label={
                      <Typography variant="body2" color="text.secondary">
                        Posted {user?.postDate?.split("T")[0]} by {user?._id?.replace(/[0-9]/gi, "")}
                      </Typography>
                    }
                    variant="outlined"
                    size="small"
                    sx={{ mb: 2 }}
                  />
                </Box>

                {/* Lifestyle Description - Before Divider */}
                {user?.lifestyle && (
                  <Box sx={{ mb: 3 }}>
                    <Typography 
                      variant="subtitle1" 
                      color="text.primary" 
                      sx={{ mb: 1, fontWeight: 600 }}
                    >
                      Lifestyle Description
                    </Typography>
                    <Typography 
                      variant="subtitle1" 
                      color="text.secondary"
                      sx={{ lineHeight: 1.6 }}
                    >
                      {user.lifestyle}
                    </Typography>
                  </Box>
                )}

                <Divider sx={{ mb: 3 }} />

                {/* Income Details */}
                <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: 600 }}>
                  Income & Career Details
                </Typography>

                <Grid container spacing={2}>
                  {userDataObj?.map((item, i) => (
                    <Grid item xs={12} sm={6} key={i}>
                      <QuestionCard>
                        <Stack direction="row" spacing={2} alignItems="flex-start">
                          <IconWrapper sx={{ backgroundColor: `${item.color}.main` }}>
                            {item.icon}
                          </IconWrapper>
                          <Box sx={{ flex: 1 }}>
                            <Typography 
                              variant="subtitle2" 
                              color="text.secondary" 
                              sx={{ mb: 1, fontWeight: 500 }}
                            >
                              {item.question}
                            </Typography>
                            <Typography 
                              variant="subtitle1" 
                              color="text.primary"
                              sx={{ fontWeight: 600, lineHeight: 1.3 }}
                            >
                              {item.answer || "Not specified"}
                            </Typography>
                          </Box>
                        </Stack>
                      </QuestionCard>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </StyledCard>
          </Grid>

          {/* Sidebar */}
          <Grid item xs={12} md={4}>
            <Stack direction="column" spacing={2}>
              <Tefl />
              <FeaturedCard />
            </Stack>
          </Grid>
        </Grid>
      </Content>
      <Footer />
    </PageContainer>
  );
};

export default IncomeDirectoryDetails;
