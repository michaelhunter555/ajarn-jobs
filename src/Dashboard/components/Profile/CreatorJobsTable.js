import React, { useContext } from "react";

import { Link as RouterLink } from "react-router-dom";

import DeleteForeverTwoToneIcon from "@mui/icons-material/DeleteForeverTwoTone";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import {
  Button,
  ButtonGroup,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import { AuthContext } from "../../../shared/context/auth-context";
import { useJob } from "../../../shared/hooks/jobs-hook";

const tableRows = [
  {
    text: "Posted",
    variant: "button",
    color: "text.secondary",
    style: { fontWeight: 700 },
  },
  {
    text: "View/Edit",
    variant: "button",
    color: "text.secondary",
    style: { fontWeight: 700 },
  },
  {
    text: "Location",
    variant: "button",
    color: "text.secondary",
    style: { fontWeight: 700 },
  },
  {
    text: "Salary",
    variant: "button",
    color: "text.secondary",
    style: { fontWeight: 700 },
  },
  {
    text: "Hours",
    variant: "button",
    color: "text.secondary",
    style: { fontWeight: 700 },
  },
  {
    text: "Applicants",
    variant: "button",
    color: "text.secondary",
    style: { fontWeight: 700 },
  },
];

const CreatorJobsTable = (props) => {
  const auth = useContext(AuthContext);
  const { user } = auth;
  const { deleteJobById, isDeleting } = useJob();

  const getCreatorJobs = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_JOBS}/user/${user?._id}`
      );
      const data = await response.json();
      return data.jobs;
    } catch (err) {
      console.log(
        "There was an issue with the request for creatorJobsTable - Msg: " + err
      );
    }
  };

  const {
    data: creatorJobs,
    isLoading,
    refetch,
  } = useQuery(["creatorJobs", user?._id], () => getCreatorJobs());

  const deleteJobHandler = async (jobId) => {
    try {
      await deleteJobById(jobId);
      refetch();
    } catch (err) {
      console.log("Error trying to delete a job");
    }
  };

  const creatorHasJobs = creatorJobs && creatorJobs.length > 0;
  console.log("Creator has jobs?:", creatorHasJobs);

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {tableRows.map((item, i) => (
              <TableCell key={i}>
                <Typography
                  sx={item.style}
                  color={item.color}
                  variant={item.variant}
                >
                  {item.text}
                </Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading || isDeleting ? (
            <TableRow>
              <TableCell>
                <Skeleton width="100%" />
              </TableCell>
              <TableCell>
                <Skeleton width="100%" />
              </TableCell>
              <TableCell>
                <Skeleton width="100%" />
              </TableCell>
              <TableCell>
                <Skeleton width="100%" />
              </TableCell>
              <TableCell>
                <Skeleton width="100%" />
              </TableCell>
              <TableCell>
                <Skeleton width="100%" />
              </TableCell>
            </TableRow>
          ) : !isLoading && !creatorHasJobs ? (
            <TableRow>
              <TableCell colSpan={5}>
                <Typography variant="subtitle2" color="text.secondary">
                  No active jobs for this account.
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            creatorJobs?.map((job, i) => (
              <TableRow key={job?._id}>
                <TableCell>{job?.datePosted.split("T")[0]}</TableCell>
                <TableCell>
                  <ButtonGroup
                    size="small"
                    variant="contained"
                    disableElevation
                  >
                    <Button to={`/jobs/${job?._id}`} component={RouterLink}>
                      <VisibilityTwoToneIcon />
                    </Button>
                    {/*auth.user._id === job._id */}
                    <Button
                      sx={{ backgroundColor: "#2c6399" }}
                      to={`/jobs/${job?._id}/update`}
                      component={RouterLink}
                      disabled={job?.applicants?.length > 0}
                    >
                      <EditTwoToneIcon />
                    </Button>
                    <Button
                      to={`/users/${user?._id}`}
                      color="error"
                      onClick={() => deleteJobHandler(job?._id)}
                    >
                      <DeleteForeverTwoToneIcon />
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
