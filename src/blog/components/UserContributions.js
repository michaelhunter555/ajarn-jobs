import React from "react";

import { Link } from "react-router-dom";

import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PaymentsTwoToneIcon from "@mui/icons-material/PaymentsTwoTone";
import {
  Avatar,
  Button,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import TeflBanner from "../../shared/components/UIElements/TeflBanner";
import UserContributionForm from "./UserContributionForm";

const UserContributions = () => {
  const getUserIncomeData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_USERS}/income-posts`
      );
      if (!response.ok) {
        throw new Error("There was an error retrievin the income post data.");
      }

      const data = await response.json();
      return data.incomeDirectoryData;
    } catch (err) {
      console.log("GET: ERROR for USER INCOME DATA:" + err);
    }
  };

  const {
    data: userIncomeData,
    refetch,
    isLoading,
  } = useQuery(["infoDirectory"], () => getUserIncomeData());

  console.log(userIncomeData);

  const getFreshData = () => {
    refetch();
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      spacing={2}
      sx={{ maxWidth: "90%" }}
    >
      <Grid item xs={12} sm={6}>
        <Stack direction="column" spacing={2} sx={{ margin: "2rem 2rem" }}>
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
        <Stack sx={{ margin: "2rem 2rem" }}>
          <TeflBanner />
          {isLoading && <CircularProgress />}
          {!isLoading &&
            userIncomeData &&
            userIncomeData?.map((val, i) => (
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
                    <Button
                      variant="contained"
                      component={Link}
                      to={`/income-details/${val?._id}`}
                    >
                      Read Post
                    </Button>
                  </Stack>
                </ListItem>

                {i - userIncomeData?.length - 1 && (
                  <Divider variant="inset" light />
                )}
              </List>
            ))}
        </Stack>
      </Grid>
    </Grid>
  );
};

export default UserContributions;
