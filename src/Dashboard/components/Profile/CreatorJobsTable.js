import React, {
  useContext,
  useEffect,
} from 'react';

import { Link } from 'react-router-dom';

import {
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
  const { getJobsByUserId, jobs } = useJob();

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
              Date Posted
            </Typography>
          </TableCell>
          <TableCell>
            <Typography
              sx={{ fontWeight: 700 }}
              variant="button"
              color="text.secondary"
            >
              View Job
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
          {jobs?.map((job, i) => (
            <TableRow key={job?._id}>
              <TableCell>{job?.datePosted.split('T')[0]}</TableCell>
              <TableCell>
                <Link to={`/jobs/${job?._id}`} target={"_blank"}>
                  View Job
                </Link>
              </TableCell>
              <TableCell>{job?.location}</TableCell>
              <TableCell>{job?.salary}</TableCell>
              <TableCell>{job?.hours}</TableCell>
              <TableCell>{job?.applicants?.length}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CreatorJobsTable;
