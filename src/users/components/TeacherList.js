import React, { useContext } from "react";

import { Link } from "react-router-dom";

import { Button, Card, CardActions, Grid, Skeleton } from "@mui/material";

import { AuthContext } from "../../shared/context/auth-context";
import TeacherItem from "./TeacherItem";

const TeacherList = ({ teachers, isLoading }) => {
  const auth = useContext(AuthContext);

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
      {isLoading &&
        Array.from(new Array(12)).map((_, i) => (
          <Grid item key={i} xs={12} sm={6} md={3}>
            <Skeleton
              sx={{ margin: "1rem 0.5rem 1rem 1rem", borderRadius: "6px" }}
              variant="rectangular"
              height={335}
              width={261}
            />
          </Grid>
        ))}

      {teachers?.map((teacher, i) => (
        <Grid item key={teacher?._id} xs={12} sm={6} md={3}>
          {(() => {
            const teacherItem = (
              <TeacherItem
                id={teacher?._id}
                name={teacher?.name}
                currentLocation={teacher?.location}
                education={teacher?.education}
                nationality={teacher?.nationality}
                workExperience={teacher?.workExperience}
                image={`${process.env.REACT_APP_IMAGE}${teacher?.image}`}
                degree={teacher?.highestCertification}
                about={teacher?.about}
              />
            );

            if (auth?.isLoggedIn) {
              if (auth?.user?.buffetIsActive) {
                return (
                  <Link to={`/teachers/${teacher?._id}`}>{teacherItem}</Link>
                );
              } else {
                return teacherItem;
              }
            }
            return teacherItem;
          })()}
        </Grid>
      ))}
    </Grid>
  );
};

export default TeacherList;
