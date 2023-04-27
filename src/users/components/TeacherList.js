import React, { useContext } from "react";

import { Link } from "react-router-dom";

import { Button, Card, CardActions, Grid } from "@mui/material";

import { AuthContext } from "../../shared/context/auth-context";
import TeacherItem from "./TeacherItem";

const TeacherList = ({ teachers }) => {
  const authCtx = useContext(AuthContext);
  //userId = useParams().uid;
  //const teacher = teachers.find(teacher => teacher.id === userId);
  //const [teacher, setTeacher] =  useState(null)

  // const teacherClickHandler = () => {
  //   setTeacher(userId);

  // }

  if (teachers?.length === 0) {
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
      {teachers?.map((teacher, i) => (
        <Grid item key={teacher.id} xs={12} sm={6} md={3}>
          {authCtx.isLoggedIn && authCtx.user.credits > 0 && (
            <Link to={`/teachers/${teacher.id}`}>
              <TeacherItem
                id={teacher.id}
                name={teacher.name}
                currentLocation={teacher.location}
                nationality={teacher.nationality}
                workExperience={teacher.workExperience}
                image={teacher.image}
                degree={teacher.highestCertification}
                about={teacher.about}
              />
            </Link>
          )}

          {authCtx.isLoggedIn && authCtx.user.credits === 0 && (
            <TeacherItem
              id={teacher.id}
              name={teacher.name}
              currentLocation={teacher.location}
              nationality={teacher.nationality}
              workExperience={teacher.workExperience}
              image={teacher.image}
              degree={teacher.highestCertification}
              about={teacher.about}
            />
          )}

          {!authCtx.isLoggedIn && (
            <TeacherItem
              id={teacher.id}
              name={teacher.name}
              currentLocation={teacher.location}
              nationality={teacher.nationality}
              workExperience={teacher.workExperience}
              image={teacher.image}
              degree={teacher.highestCertification}
              about={teacher.about}
            />
          )}
        </Grid>
      ))}
    </Grid>
  );
};

export default TeacherList;
