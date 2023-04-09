import React from 'react';

import { Link } from 'react-router-dom';

import {
  Button,
  Card,
  CardActions,
  Grid,
} from '@mui/material';

import TeacherItem from './TeacherItem';

const TeacherList = ({ teachers }) => {
  //userId = useParams().uid;
  //const teacher = teachers.find(teacher => teacher.id === userId);
  //const [teacher, setTeacher] =  useState(null)

  // const teacherClickHandler = () => {
  //   setTeacher(userId);

  // }

  if (teachers.length < 1) {
    return (
      <Card>
        No teachers match your current search criteria. Please check back in the
        future or create a job.
        <CardActions>
          <Button component={Link} to="/job/new">
            Create Job
          </Button>
        </CardActions>
      </Card>
    );
  }

  return (
    <Grid container spacing={2} wrap="wrap">
      {teachers.map((teacher, i) => (
        <Grid item key={teacher.id} xs={12} sm={6} md={3}>
          <Link to={`/teachers/${teacher.id}`}>
            <TeacherItem
              id={teacher.id}
              name={teacher.name}
              currentLocation={teacher.location}
              nationality={teacher.nationality}
              workExperience={teacher.workExperience}
              image={teacher.image}
              degree={teacher.highestCertification}
            />
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};

export default TeacherList;
