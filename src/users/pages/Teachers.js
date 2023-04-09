import React, { useState } from 'react';

import { styled } from '@mui/material/styles';

import { DUMMY_USERS_LIST } from '../../shared/util/DummyUsers';
import TeacherFilter from '../components/TeacherFilter';
//filter, teachersList, pagination
import TeacherList from '../components/TeacherList';

const StyledUserJobsDiv = styled("div")({
  maxWidth: "85%",
  margin: "0 auto",
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "15px",
});

const StyledTeacherFilter = styled("div")(({ theme }) => ({
  gridColumn: "1/2",
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

  return (
    <StyledUserJobsDiv>
      <StyledTeacherFilter>
        <TeacherFilter onDataChange={handleFilterChange} />
      </StyledTeacherFilter>
      <StyledTeacherList>
        <TeacherList teachers={filteredTeachers} />
      </StyledTeacherList>
    </StyledUserJobsDiv>
  );
};

export default Teachers;
