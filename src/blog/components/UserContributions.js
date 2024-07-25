import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PaymentsTwoToneIcon from "@mui/icons-material/PaymentsTwoTone";
import {
  Avatar,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import TeflBanner from "../../shared/components/UIElements/TeflBanner";
import UserContributionForm from "./UserContributionForm";

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
    <Grid
      container
      direction="row"
      justifyContent="center"
      spacing={2}
      sx={{ maxWidth: { xs: "100%", md: "90%" }, mb: "2rem" }}
    >
      <Grid item xs={12} sm={6}>
        <Stack direction="column" spacing={2}>
          <Typography variant="h4" color="text.primary">
            {" "}
            Welcome To The Income Directory
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            See what other teachers are earning and how they're living.
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            This is a user contributed section of our website and would advise
            to do your own due dilligent research before settling on an salary
            that is ideal for you.
          </Typography>
          <UserContributionForm onSubmit={getFreshData} />
        </Stack>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Stack>
          <TeflBanner />
          {isLoading && <CircularProgress />}
          {!isLoading &&
            userIncomeData &&
            userIncomeData?.incomes?.map((val, i) => (
              <List
                key={val._id}
                sx={{ width: "100%", bgcolor: "background.paper" }}
              >
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar
                      alt={val.jobTitle}
                      src={`/static/images/avatar/${i + 1}.jpg`}
                    />
                  </ListItemAvatar>

                  <ListItemText
                    primary={
                      <Stack component="span" direction="column">
                        <Stack
                          component="span"
                          direction="row"
                          alignItems="center"
                          spacing={1}
                        >
                          {val?.userId?.location && (
                            <Chip
                              variant="outlined"
                              size="small"
                              component="span"
                              label={val?.userId?.location}
                              icon={
                                <LocationOnOutlinedIcon
                                  style={{ color: "#47acbb" }}
                                />
                              }
                            />
                          )}
                          <Chip
                            variant="outlined"
                            size="small"
                            component="span"
                            label={`${val?.monthlySalary} p/m`}
                            icon={
                              <PaymentsTwoToneIcon
                                style={{ color: "#1e8d41" }}
                              />
                            }
                          />
                        </Stack>

                        <Typography component="span">
                          {val?.jobTitle}
                        </Typography>
                      </Stack>
                    }
                    secondary={
                      <>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {val?.postDate?.split("T")[0]}
                        </Typography>
                        {" — " + val?.lifestyle?.substring(0, 40) + "..."}
                      </>
                    }
                  />
                  <Stack justifyContent="flex-end">
                    <Chip
                      label="Read Post"
                      component={Link}
                      clickable
                      color="primary"
                      to={`/income-details/${val?._id}`}
                    />
                  </Stack>
                </ListItem>

                {i - userIncomeData?.incomes?.length - 1 && (
                  <Divider variant="inset" light />
                )}
              </List>
            ))}
        </Stack>
        <Pagination
          page={incomePage.page}
          count={totalPages}
          onChange={handleIncomePageChange}
        />
      </Grid>
    </Grid>
  );
};

export default UserContributions;
