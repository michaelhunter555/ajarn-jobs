import React from "react";

import { Link } from "react-router-dom";

import { Button, CircularProgress, Grid, Stack } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { useQuery } from "@tanstack/react-query";

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
    error,
  } = useQuery(["infoDirectory"], () => getUserIncomeData());

  console.log("USER INCOME DATA:", userIncomeData);

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
            Welcome To the Income Directory
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            See what other teachers are earning and how they're living
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            This is a user contributed section of our website and would advise
            to do your own due dilligent research before settling on an salary
            that is ideal for you.
          </Typography>
          <UserContributionForm />
        </Stack>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Stack sx={{ margin: "2rem 2rem" }}>
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
                      <>
                        <Stack direction="row" spacing={2}>
                          <Typography>{val?.jobTitle}</Typography>
                          <Typography>{val?.monthlySalary} p/m</Typography>
                        </Stack>
                      </>
                    }
                    secondary={
                      <>
                        <Stack alignItems="center" direction="row" spacing={1}>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {val?.postDate?.split("T")[0]}
                          </Typography>
                          {" — " + val?.lifestyle}
                        </Stack>
                      </>
                    }
                  />
                  <Button
                    variant="contained"
                    component={Link}
                    to={`/income-details/${val?._id}`}
                  >
                    Read Post
                  </Button>
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
