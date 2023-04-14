import React from 'react';

import LanguageIcon from '@mui/icons-material/Language';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SchoolIcon from '@mui/icons-material/School';
import {
  Avatar,
  Box,
  Button,
  Card,
  Chip,
  Grid,
  Typography,
} from '@mui/material';

import { CollapsibleTable } from '../../Dashboard/components/Profile/Resume';

const TeacherDetailsItem = ({ teacher }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "80%",
        margin: "0 auto",
      }}
    >
      <Grid
        spacing={2}
        container
        direction="row"
        sx={{ justifyContent: "flex-start" }}
      >
        <Grid
          item
          xs={12}
          sm={6}
          md={6}
          container
          direction="column"
          justifyContent="flex-start"
          spacing={2}
        >
          <Grid item container direction="row" spacing={1}>
            {/**grid item 1 */}
            <Grid item>
              <Avatar
                variant="circular"
                src={teacher.image}
                sx={{ height: 200, width: 200 }}
                alt={`${teacher.id}--${teacher.name}`}
              />
            </Grid>
            {/**grid item 2 */}
            <Grid item sx={{ margin: "0 0 0 0.5rem" }}>
              <Typography variant="h5" component="h2">
                {teacher.name}
              </Typography>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                component="h3"
              >
                <LocationOnIcon size="inherit" /> {teacher.location}
              </Typography>
              <Typography
                color="text.secondary"
                variant="subtitle2"
                component="h3"
              >
                <LanguageIcon size="inherit" /> {teacher.nationality}
              </Typography>
              <Typography
                color="text.secondary"
                variant="subtitle2"
                component="h3"
              >
                <SchoolIcon size="inherit" /> {teacher.education}
              </Typography>

              <Typography variant="subtitle2" component="h3">
                Teaching for: {teacher.workExperience}-
                {teacher.workExperience > 1 ? "years" : "year"}
              </Typography>
              <Typography variant="subtitle2" component="h3">
                {teacher.skill.map((skills, i) => (
                  <Chip key={i} label={skills} />
                ))}
              </Typography>
            </Grid>
            <Grid item>
              <Button variant="outlined">Contact user</Button>
            </Grid>
          </Grid>

          <Grid item>
            <Card sx={{ padding: 2 }}>
              <Typography variant="subtitle2" component="h3">
                {teacher.interests.map((interest, i) => (
                  <Chip key={i} label={interest} />
                ))}
              </Typography>
              <Typography variant="h6" component="h4">
                A little about {teacher.name}:
              </Typography>
              <Typography variant="subtitle1" paragraph>
                {teacher.about}
              </Typography>
            </Card>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <CollapsibleTable teacherResume={teacher.resume} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default TeacherDetailsItem;
