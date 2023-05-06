import React, { useContext, useEffect } from "react";

import { Link } from "react-router-dom";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { AuthContext } from "../../../shared/context/auth-context";
import { useJob } from "../../../shared/hooks/jobs-hook";
import { dummy_jobs } from "../../../shared/util/DummyJobs";

const CreatorJobsTable = () => {
  const auth = useContext(AuthContext);
  const { getJobsByUserId, jobs } = useJob();
  const applications = (auth.user?.jobs?.applicants?.length || 0) < 1 && 0;

  useEffect(() => {
    getJobsByUserId(auth.user?._id);
  }, [getJobsByUserId, auth.user]);

  console.log(jobs);

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
          {dummy_jobs.map((job, i) => (
            <TableRow key={job.id}>
              <TableCell>{job.datePosted}</TableCell>
              <TableCell>
                <Link to={`/jobs/${job.id}`} target={"_blank"}>
                  View Job
                </Link>
              </TableCell>
              <TableCell>{job.location}</TableCell>
              <TableCell>{job.salary}</TableCell>
              <TableCell>{job.hours}</TableCell>
              <TableCell>{applications}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CreatorJobsTable;
