import React, {
  useContext,
  useEffect,
} from 'react';

import { Link as RouterLink } from 'react-router-dom';

import {
  Box,
  Button,
  ButtonGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

import { AuthContext } from '../../../shared/context/auth-context';
import { useJob } from '../../../shared/hooks/jobs-hook';

const CreatorJobsTable = () => {
  const auth = useContext(AuthContext);
  const { user } = auth;
  const { getJobsByUserId, jobs, isLoading } = useJob();

  useEffect(() => {
    getJobsByUserId(user?._id);
  }, [getJobsByUserId, user]);

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableCell>
            <Typography
              sx={{ fontWeight: 700 }}
              variant="button"
              color="text.secondary"
            >
              Posted
            </Typography>
          </TableCell>
          <TableCell>
            <Typography
              sx={{ fontWeight: 700 }}
              variant="button"
              color="text.secondary"
            >
              View/Edit
            </Typography>
          </TableCell>
          <TableCell>
            <Typography
              sx={{ fontWeight: 700 }}
              variant="button"
              color="text.secondary"
            >
              Location
            </Typography>
          </TableCell>
          <TableCell>
            <Typography
              sx={{ fontWeight: 700 }}
              variant="button"
              color="text.secondary"
            >
              salary
            </Typography>
          </TableCell>
          <TableCell>
            <Typography
              sx={{ fontWeight: 700 }}
              variant="button"
              color="text.secondary"
            >
              Hours
            </Typography>
          </TableCell>
          <TableCell>
            <Typography
              sx={{ fontWeight: 700 }}
              variant="button"
              color="text.secondary"
            >
              Applicants
            </Typography>
          </TableCell>
        </TableHead>
        <TableBody>
          {isLoading ? (
            <Box sx={{ display: "flex", width: "100%" }}>Loading...</Box>
          ) : (
            jobs?.map((job, i) => (
              <TableRow key={job?._id}>
                <TableCell>{job?.datePosted.split("T")[0]}</TableCell>
                <TableCell>
                  <ButtonGroup
                    size="small"
                    variant="contained"
                    disableElevation
                  >
                    <Button to={`/jobs/${job?._id}`} component={RouterLink}>
                      View
                    </Button>
                    <Button
                      sx={{ backgroundColor: "#2c6399" }}
                      to={`/jobs/${job?._id}/update`}
                      component={RouterLink}
                    >
                      Edit
                    </Button>
                  </ButtonGroup>
                </TableCell>
                <TableCell>{job?.location}</TableCell>
                <TableCell>{job?.salary}</TableCell>
                <TableCell>{job?.hours}</TableCell>
                <TableCell>{job?.applicants?.length}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CreatorJobsTable;
