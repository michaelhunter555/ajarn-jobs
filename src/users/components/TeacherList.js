import React from 'react';

import {
  Grid,
  Paper,
} from '@mui/material';
import { styled } from '@mui/material/styles';

import TeacherItem from './TeacherItem';

const StyledPaperContainer = styled(Paper)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  height: "500px",
  margin: "10px",
}));

const TeacherList = ({ teachers }) => {
  //userId = useParams().uid;
  //const teacher = teachers.find(teacher => teacher.id === userId);
  //const [teacher, setTeacher] =  useState(null)

  // const teacherClickHandler = () => {
  //   setTeacher(userId);

  // }

  return (
    <Grid container spacing={2} wrap="wrap">
      {teachers.map((teacher, i) => (
        <Grid item key={teacher.id} xs={12} sm={6} md={2}>
          <TeacherItem
            id={teacher.id}
            name={teacher.name}
            currentLocation={teacher.location}
            nationality={teacher.nationality}
            workExperience={teacher.workExperience}
            image={teacher.image}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default TeacherList;
