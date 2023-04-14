import React from 'react';

import {
  Avatar,
  Box,
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
        alignItem: "center",
        width: "90%",
      }}
    >
      <Grid
        spacing={2}
        container
        direction="row"
        sx={{ justifyContent: "center", alignItem: "center" }}
      >
        <Grid
          item
          xs={12}
          sm={6}
          md={6}
          sx={{ display: "flex", justifyContent: "flex-end" }}
        >
          <Avatar
            variant="circular"
            src={teacher.image}
            sx={{ height: 200, width: 200 }}
            alt={`${teacher.id}--${teacher.name}`}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Typography variant="h5" component="h2">
            {teacher.name}
          </Typography>
          <Typography variant="subtitle2" component="h3">
            {teacher.location}
          </Typography>
          <Typography variant="subtitle2" component="h3">
            {teacher.nationality}
          </Typography>
          <Typography variant="subtitle2" component="h3">
            {teacher.education}
          </Typography>
          <Typography variant="subtitle2" component="h3">
            {teacher.skill.map((skills, i) => (
              <Chip key={i} label={skills} />
            ))}
          </Typography>
          <Typography variant="subtitle2" component="h3">
            Teaching for: {teacher.workExperience}-
            {teacher.workExperience > 1 ? "years" : "year"}
          </Typography>
          <Typography variant="subtitle2" component="h3">
            {teacher.interests.map((interest, i) => (
              <Chip key={i} label={interest} />
            ))}
          </Typography>
        </Grid>
        <Grid container>
          <Grid item xs={12} sm={6} md={6}>
            <Card>{teacher.about}</Card>
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <CollapsibleTable teacherResume={teacher.resume} />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TeacherDetailsItem;

// {teacher.resume.map(({resumeId, company, schoolName, role, location, jobTitle, from, to}) => (
//   <>
//   <TableContainer component={Paper} key={resumeId}>
//     <Table sx={{ minWidth: 650 }} aria-label="resume">
//       <TableHead>
//         <TableRow>
//           <TableCell>job Title</TableCell>
//           <TableCell>Company</TableCell>
//           <TableCell>School Name</TableCell>
//           <TableCell>Role</TableCell>
//           <TableCell>Location</TableCell>
//           <TableCell>From</TableCell>
//           <TableCell>job Title</TableCell>
//         </TableRow>
//       </TableHead>
//       <TableBody>

//       </TableBody>
//     </Table>
//   </TableContainer>
//   </>
// ))}
