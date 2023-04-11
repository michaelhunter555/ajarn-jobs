import React, { useState } from 'react';

import { styled } from '@mui/material/styles';

import { DUMMY_USERS_LIST } from '../../shared/util/DummyUsers';
import TeacherFilter from '../components/TeacherFilter';
//filter, teachersList, pagination
import TeacherList from '../components/TeacherList';

const StyledUserDiv = styled("div")(({ theme }) => ({
  maxWidth: "85%",
  margin: "0 auto",
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "15px",
  [theme.breakpoints.between("xl", 1807)]: {
    gridTemplateColumns: "repeat (3, 1fr)",
  },
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "repeat(1, 1fr)",
  },
}));

const StyledTeacherFilter = styled("div")(({ theme }) => ({
  gridColumn: "1/2",
  [theme.breakpoints.down("sm")]: {
    gridColumn: "1/5",
    gridRow: 1,
    width: "100%",
  },
}));

const StyledTeacherList = styled("div")(({ theme }) => ({
  gridColumn: "2/5",
}));

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
    <StyledUserDiv>
      <StyledTeacherFilter>
        <TeacherFilter onDataChange={handleFilterChange} />
      </StyledTeacherFilter>
      <StyledTeacherList>
        <TeacherList teachers={filteredTeachers} />
      </StyledTeacherList>
    </StyledUserDiv>
  );
};

export default Teachers;
