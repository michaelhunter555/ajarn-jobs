import React, { useContext } from "react";

import { Link } from "react-router-dom";

import {
  Button,
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

import ErrorModal from "../../../shared/components/UIElements/ErrorModal";
import { AuthContext } from "../../../shared/context/auth-context";
import { useJob } from "../../../shared/hooks/jobs-hook";

const tableRows = [
  {
    text: "Name",
    variant: "button",
    color: "text.secondary",
    style: { fontWeight: 700 },
  },
  {
    text: "Nationality",
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
    text: "E-mail",
    variant: "button",
    color: "text.secondary",
    style: { fontWeight: 700 },
  },
  {
    text: "Resume",
    variant: "button",
    color: "text.secondary",
    style: { fontWeight: 700 },
  },
];

const JobApplicantsTable = () => {
  const auth = useContext(AuthContext);
  const { user } = auth;
  const { clearError } = useJob();

  const getjobsAppliedTo = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_JOBS}/user/${user?._id}`
    );
    const data = await response.json();
    return data.jobs;
  };

  const {
    data: jobsByUser,
    isLoading,
    error,
  } = useQuery(["jobsByUser", user?._id], () => getjobsAppliedTo());

  const hasApplicants = jobsByUser?.some((job) => job?.applicants?.length > 0);

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {tableRows?.map((item, i) => (
                <TableCell key={i}>
                  <Typography
                    color={item.color}
                    variant={item.variant}
                    sx={item.style}
                  >
                    {item.text}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
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
              </TableRow>
            ) : !isLoading && !hasApplicants ? (
              <TableRow>
                <TableCell colSpan={5}>
                  <Typography variant="subtitle2" color="text.secondary">
                    No applicants yet! Check back later.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              jobsByUser?.map((job) =>
                job?.applicants?.map((teacher, i) => (
                  <TableRow key={teacher?.userId?._id}>
                    <TableCell>{teacher?.userId?.name}</TableCell>
                    <TableCell>{teacher?.userId?.nationality}</TableCell>
                    <TableCell>{teacher?.userId?.location}</TableCell>
                    <TableCell>{teacher?.userId?.email}</TableCell>
                    <TableCell>
                      <Button
                        component={Link}
                        to={`/teachers/${teacher?.userId?._id}`}
                        variant="contained"
                      >
                        profile
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default JobApplicantsTable;
