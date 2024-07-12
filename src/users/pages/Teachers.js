import React, { useContext, useEffect, useState } from "react";

import { Grid, Pagination } from "@mui/material/";
import { createTheme, styled } from "@mui/material/styles";
import { useQuery } from "@tanstack/react-query";

import CustomModal from "../../shared/components/UIElements/CustomModal";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import Footer, {
  Content,
  PageContainer,
} from "../../shared/components/UIElements/Footer";
import TeflBanner from "../../shared/components/UIElements/TeflBanner";
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
    palette: {
      primary: {
        main: "#128cb1",
      },
    },
  },
});

const StyledGridContainer = styled(Grid)(({ theme }) => ({
  width: "100%",
  margin: "0 0 2rem 0",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));

const StyledGridItem = styled(Grid)(({ theme }) => ({
  paddingLeft: "24px",
  [theme.breakpoints.down("sm")]: {
    paddingLeft: 0,
  },
}));

const Teachers = () => {
  const auth = useContext(AuthContext);
  const [filter, setFilter] = useState({
    location: "",
    nationality: "",
    qualifications: "",
  });
  const [blur, setBlur] = useState(false);
  const [teachersPage, setTeachersPage] = useState({
    limit: 12,
    page: 1,
  });
  const [totalPages, setTotalPages] = useState(1);
  const { clearError } = useHttpClient();

  const getTeachers = async (
    page,
    limit,
    location,
    nationality,
    highestCertification
  ) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_USERS}?page=${page}&limit=${limit}&location=${location}&nationality=${nationality}&highestCertification=${highestCertification}`
      );
      const data = await response.json();

      //return object with page, totalPages, teachers list
      return {
        users: data.users,
        totalPages: data.totalPages,
        page: data.pageNum,
        totalUsers: data.totalUsers,
      };
    } catch (err) {
      console.log("there was an error retrieving teachers  - Msg: " + err);
    }
  };

  //modify useQuery for pagination and dependency of page
  const {
    data: teachers,
    isLoading,
    error,
  } = useQuery({
    queryKey: [
      "teachers",
      teachersPage.page,
      teachersPage.limit,
      filter.location,
      filter.nationality,
      filter.qualifications,
    ],
    queryFn: () =>
      getTeachers(
        teachersPage.page,
        teachersPage.limit,
        filter.location,
        filter.nationality,
        filter.qualifications
      ),
    staleTime: 10 * 60 * 60 * 1000,
  });

  useEffect(() => {
    if (!auth.isLoggedIn || !auth?.user?.buffetIsActive) {
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

  useEffect(() => {
    if (teachers?.totalPages && teachers?.totalPages !== totalPages) {
      setTotalPages(teachers?.totalPages);
    }
  }, [teachers?.totalPages, totalPages]);

  const handleFilterChange = (teacher) => {
    setFilter(teacher);
  };

  const handleTeacherPageChange = (page, limit) => {
    setTeachersPage({
      page: page,
      limit: limit,
    });
  };

  return (
    <PageContainer>
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
      <Content>
        <ErrorModal onClear={clearError} error={error} />

        <StyledGridContainer container spacing={3}>
          <StyledGridItem item xs={12} md={3}>
            <TeacherFilter onDataChange={handleFilterChange} />
            <TeflBanner />
          </StyledGridItem>
          <StyledGridItem item xs={12} md={9} sx={{ margin: "1rem auto" }}>
            <Grid container spacing={2}>
              <TeacherList teachers={teachers?.users} isLoading={isLoading} />
              {/* add values for pagination */}
              {totalPages > 1 && (
                <Pagination
                  sx={{ marginTop: "0.5rem" }}
                  count={totalPages}
                  page={teachersPage.page}
                  onChange={(event, page) => handleTeacherPageChange(page, 12)}
                />
              )}
            </Grid>
          </StyledGridItem>
        </StyledGridContainer>
      </Content>
      <Footer />
    </PageContainer>
  );
};

export default Teachers;
