import React, { useState } from 'react';

import { Grid } from '@mui/material/';
import {
  createTheme,
  ThemeProvider,
} from '@mui/material/styles';

import { DUMMY_USERS_LIST } from '../../shared/util/DummyUsers';
import TeacherFilter from '../components/TeacherFilter';
//filter, teachersList, pagination
import TeacherList from '../components/TeacherList';

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
  const [filter, setFilter] = useState(DUMMY_USERS_LIST);

  const handleFilterChange = (teacher) => {
    setFilter(teacher);
  };

  const filteredTeachers = DUMMY_USERS_LIST.filter((teacher) => {
    return (
      (!filter.location ||
        teacher.location
          .toLowerCase()
          .includes(filter.location.toLowerCase())) &&
      (!filter.nationality ||
        teacher.nationality.includes(filter.nationality)) &&
      (!filter.qualifications ||
        teacher.highestCertification.includes(filter.qualifications))
    );
  });

  //change to grid
  //add custom breakpoints
  // import createTheme(), themeprovider

  return (
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
  );
};

export default Teachers;
