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

import { AuthContext } from "../../../shared/context/auth-context";

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

const JobApplicantsTable = ({ applicants, isLoading }) => {
  const auth = useContext(AuthContext);
  const { user } = auth;
  //const { clearError } = useJob();

  // const getjobsAppliedTo = async () => {
  //   const response = await fetch(
  //     `${process.env.REACT_APP_JOBS}/user/${user?._id}`
  //   );
  //   const data = await response.json();
  //   return data.jobs;
  // };

  // const {
  //   data: jobsByUser,
  //   isLoading,
  //   error,
  // } = useQuery(["jobsByUser", user?._id], () => getjobsAppliedTo());

  const hasApplicants =
    applicants && applicants?.some((apps) => apps?.length > 0);
  console.log("PROPS APPLICANTS", applicants && applicants?.length > 0);

  return (
    <>
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
              applicants?.map((application) =>
                application?.map((applicant, i) => (
                  <TableRow key={`${applicant?._id}${i + 1}`}>
                    <TableCell>{applicant?.userId?.name}</TableCell>
                    <TableCell>{applicant?.userId?.nationality}</TableCell>
                    <TableCell>{applicant?.userId?.location}</TableCell>
                    <TableCell>{applicant?.userId?.email}</TableCell>
                    <TableCell>
                      <Button
                        component={Link}
                        to={`/teachers/${applicant?.userId?._id}`}
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
