import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PaymentsTwoToneIcon from "@mui/icons-material/PaymentsTwoTone";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Pagination,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useQuery } from "@tanstack/react-query";

import TeflBanner from "../../shared/components/UIElements/TeflBanner";
import UserContributionForm from "./UserContributionForm";

// Styled Components
const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[2],
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    boxShadow: theme.shadows[4],
    transform: 'translateY(-2px)'
  }
}));

const IncomeCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.spacing(1.5),
  marginBottom: theme.spacing(2),
  border: `1px solid ${theme.palette.divider}`,
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    borderColor: theme.palette.primary.main,
    boxShadow: theme.shadows[2]
  }
}));

const HeaderSection = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(3),
  borderRadius: theme.spacing(2),
  marginBottom: theme.spacing(3)
}));

const UserContributions = () => {
  const [incomePage, setIncomePage] = useState({
    page: 1,
    limit: 5,
  });
  const [totalPages, setTotalPages] = useState(1);

  const getUserIncomeData = async (page, limit) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_USERS}/income-posts?page=${page}&limit=${limit}`
      );
      if (!response.ok) {
        throw new Error("There was an error retrievin the income post data.");
      }

      const data = await response.json();
      return {
        incomes: data.incomeDirectoryData,
        page: data.pageNum,
        totalPages: data.totalPages,
        totalIncomes: data.totalIncomes,
      };
    } catch (err) {
      console.log("GET: ERROR for USER INCOME DATA:" + err);
    }
  };

  const {
    data: userIncomeData,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["infoDirectory", incomePage.page, incomePage.limit],
    queryFn: () => getUserIncomeData(incomePage.page, incomePage.limit),
    staleTime: 5 * 60 * 60 * 1000,
  });

  useEffect(() => {
    if (totalPages !== userIncomeData?.totalPages) {
      setTotalPages(userIncomeData?.totalPages);
    }
  }, [totalPages, userIncomeData?.totalPages]);

  const getFreshData = () => {
    refetch();
  };

  const handleIncomePageChange = (event, page) => {
    setIncomePage({
      page: page,
      limit: incomePage.limit,
    });
  };

  return (
    <Box sx={{ maxWidth: { xs: "100%", lg: "1200px" }, mx: "auto", p: 2 }}>
      {/* Header Section */}
      <HeaderSection>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
          Welcome To The Income Directory
        </Typography>
        <Typography variant="h6" sx={{ opacity: 0.9, mb: 2 }}>
          See what other teachers are earning and how they're living.
        </Typography>
        <Typography variant="body1" sx={{ opacity: 0.8 }}>
          This is a user-contributed section. Please do your own research before 
          settling on a salary that's ideal for you.
        </Typography>
      </HeaderSection>

      <Grid container spacing={3}>
        {/* Left Column - Form */}
        <Grid item xs={12} md={5}>
          <StyledCard>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Share Your Experience
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Help other teachers by sharing your income and lifestyle details.
              </Typography>
              <UserContributionForm onSubmit={getFreshData} />
            </CardContent>
          </StyledCard>
          
          <Box sx={{ mt: 2 }}>
            <TeflBanner />
          </Box>
        </Grid>

        {/* Right Column - Income Listings */}
        <Grid item xs={12} md={7}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Recent Income Reports
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {userIncomeData?.totalIncomes || 0} total reports
            </Typography>
          </Box>

          {isLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <Stack spacing={2}>
              {userIncomeData?.incomes?.map((income, i) => (
                <IncomeCard key={income._id} component={Link} to={`/income-details/${income._id}`} sx={{ textDecoration: 'none' }}>
                  <CardContent sx={{ p: 2 }}>
                    <Stack direction="row" spacing={2} alignItems="flex-start">
                      <Avatar
                        alt={income.jobTitle}
                        src={`/static/images/avatar/${i + 1}.jpg`}
                        sx={{ width: 50, height: 50 }}
                      />
                      
                      <Box sx={{ flex: 1 }}>
                        <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                          {income?.userId?.location && (
                            <Chip
                              variant="outlined"
                              size="small"
                              label={income.userId.location}
                              icon={<LocationOnOutlinedIcon />}
                              color="info"
                            />
                          )}
                          <Chip
                            variant="outlined"
                            size="small"
                            label={`฿${income?.monthlySalary?.toLocaleString()}/month`}
                            icon={<PaymentsTwoToneIcon />}
                            color="success"
                          />
                        </Stack>

                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                          {income.jobTitle}
                        </Typography>

                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                          Posted {income.postDate?.split("T")[0]}
                        </Typography>

                        <Typography variant="body2" color="text.primary" sx={{ lineHeight: 1.4 }}>
                          {income.lifestyle?.substring(0, 100)}
                          {income.lifestyle?.length > 100 && "..."}
                        </Typography>
                      </Box>

                      <Box sx={{ alignSelf: 'center' }}>
                        <Chip
                          label="Read Full Report"
                          color="primary"
                          variant="outlined"
                          clickable
                        />
                      </Box>
                    </Stack>
                  </CardContent>
                </IncomeCard>
              ))}
            </Stack>
          )}

          {userIncomeData?.incomes?.length > 0 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
              <Pagination
                page={incomePage.page}
                count={totalPages}
                onChange={handleIncomePageChange}
                color="primary"
                size="large"
              />
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserContributions;
