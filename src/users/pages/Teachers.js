import React, { useContext, useEffect, useState } from "react";

import { Grid, Skeleton } from "@mui/material/";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useQuery } from "@tanstack/react-query";

import CustomModal from "../../shared/components/UIElements/CustomModal";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import Footer from "../../shared/components/UIElements/Footer";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import TeacherFilter from "../components/TeacherFilter";
import TeacherList from "../components/TeacherList";

const customThemeForTeachers = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1807,
    },
  },
});

const Teachers = () => {
  const auth = useContext(AuthContext);
  const [filter, setFilter] = useState({});
  const [blur, setBlur] = useState(false);
  const { clearError } = useHttpClient();

  const getTeachers = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_USERS}`);
      const data = await response.json();
      console.log(data);
      return data.users;
    } catch (err) {
      console.log("there was an error retrieving teachers  - Msg: " + err);
    }
  };

  const {
    data: teachers,
    isLoading,
    error,
  } = useQuery(["teachers"], () => getTeachers());

  useEffect(() => {
    if (!auth.isLoggedIn || !auth.user?.buffetIsActive) {
      setBlur(true);
      return;
    }
    const checkUserBuffetStatus = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_USERS}/${auth.user._id}`
        );

        if (!response.ok) {
          throw new Error("There was an issue with the request.");
        }

        const data = await response.json();
        const { buffetIsActive } = data.user;
        setBlur(!buffetIsActive);
      } catch (err) {
        console.log("there was an error retrieving teachers - Msg: " + err);
      }
    };
    checkUserBuffetStatus();
  }, [auth]);

  const handleFilterChange = (teacher) => {
    setFilter(teacher);
  };

  const filteredTeachers =
    teachers &&
    teachers?.filter((teacher) => {
      return (
        (!filter?.location ||
          teacher.location
            .toLowerCase()
            .includes(filter?.location.toLowerCase())) &&
        (!filter?.nationality ||
          teacher.nationality.includes(filter.nationality)) &&
        (!filter?.qualifications ||
          teacher.highestCertification.includes(filter.qualifications))
      );
    });

  console.log("BUFFET IS BLURRED:", blur);

  return (
    <>
      {!isLoading && blur && (
        <CustomModal
          error="Teacher Buffet is not active."
          open={blur}
          noCredits="Please activate buffet to view teacher profiles"
          handleClose={blur}
          buttonVariant="contained"
          alternateButtonVariant="outlined"
        />
      )}
      <ErrorModal onClear={clearError} error={error} />
      <ThemeProvider theme={customThemeForTeachers}>
        <Grid container spacing={3} sx={{ width: "90%", margin: "0 0 2rem 0" }}>
          <Grid item xs={12} xl={3}>
            {isLoading && (
              <Skeleton
                sx={{ height: 356, width: 332 }}
                variant="rectangular"
              />
            )}
            {!isLoading && <TeacherFilter onDataChange={handleFilterChange} />}
          </Grid>
          <Grid item xs={12} xl={9} sx={{ margin: "1rem auto" }}>
            <Grid container spacing={2}>
              <TeacherList teachers={filteredTeachers} isLoading={isLoading} />
            </Grid>
          </Grid>
        </Grid>
      </ThemeProvider>
      <Footer />
    </>
  );
};

export default Teachers;
