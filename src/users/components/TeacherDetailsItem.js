import React from 'react';

import {
  Box,
  Grid,
} from '@mui/material';

const TeacherDetailsItem = ({ teacher }) => {
  return (
    <Box sx={{ flex: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          {teacher.name}
        </Grid>
        <Grid item xs={12} sm={6} md={8}>
          {teacher.location}
        </Grid>
      </Grid>
    </Box>
  );
};

export default TeacherDetailsItem;
