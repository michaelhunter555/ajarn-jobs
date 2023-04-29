import React, { useEffect, useState } from "react";

import { Box, Grid } from "@mui/material/";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";
import TeacherFilter from "../components/TeacherFilter";
//[filter, teachersList, pagination];
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
  const [filter, setFilter] = useState({});
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [users, setUsers] = useState();

  useEffect(() => {
    const getUsersRequest = async () => {
      try {
        const response = await sendRequest("http://localhost:5000/api/user");
        setUsers(response.users);
        console.log(response);
      } catch (err) {}
    };
    getUsersRequest();
  }, [sendRequest]);

  const handleFilterChange = (teacher) => {
    setFilter(teacher);
  };

  const filteredTeachers =
    users &&
    users.filter((teacher) => {
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

  return (
    <>
      {isLoading && (
        <Box>
          <LoadingSpinner asOverlay />
        </Box>
      )}
      <ErrorModal onClear={clearError} error={error} />
      <ThemeProvider theme={customThemeForTeachers}>
        <Grid container spacing={3} sx={{ width: "90%" }}>
          <Grid item xs={12} xl={3}>
            <TeacherFilter onDataChange={handleFilterChange} />
          </Grid>
          <Grid item xs={12} xl={9} sx={{ margin: "1rem auto" }}>
            <Grid container spacing={2}>
              <TeacherList teachers={filteredTeachers} />
            </Grid>
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
};

export default Teachers;
