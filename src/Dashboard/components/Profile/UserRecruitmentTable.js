import React, { useContext, useEffect, useState } from "react";

import { Link } from "react-router-dom";

import InfoIcon from "@mui/icons-material/Info";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Button,
  ButtonGroup,
  Chip,
  Divider,
  Link as RouterLink,
  Modal,
  Pagination,
  Paper,
  Skeleton,
  Stack,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import { AuthContext } from "../../../shared/context/auth-context";
import { useUser } from "../../../shared/hooks/user-hook";

const BoxContent = styled(Paper)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: theme.palette.background.paper,
  boxShadow: 24,
  padding: 20,
  borderRadis: 15,
  textAlign: "center",
}));

const UserRecruitmentTable = ({ component }) => {
  const auth = useContext(AuthContext);
  const { getUserRecruitments, recruitmentOfferResponse, isPostLoading } =
    useUser();
  const [openModal, setOpenModal] = useState(false);
  const [messageIndex, setMessageIndex] = useState(false);

  const [recruitmentsPage, setRecruitmentsPage] = useState({
    page: 1,
    limit: 5,
  });
  const [totalPages, setTotalPages] = useState(1);

  const { data: jobs, isLoading: recruitDataLoading } = useQuery({
    queryKey: [
      "RecruitmentData",
      auth?.user?._id,
      recruitmentsPage.page,
      recruitmentsPage.limit,
    ],
    queryFn: () => getUserRecruitments(auth?.user?._id),
    enabled: Boolean(auth?.user?._id),
    staleTime: 5 * 60 * 60 * 1000,
  });

  useEffect(() => {
    if (jobs?.totalPages !== totalPages) {
      setTotalPages(jobs?.totalPages);
    }
  }, [jobs?.totalPages, totalPages]);

  const handleRecruitmentPageChange = (event, page) => {
    setRecruitmentsPage({
      page: page,
      limit: recruitmentsPage.limit,
    });
  };

  const handleRecruitmentResponse = async (response, jobId) => {
    await recruitmentOfferResponse(auth?.user?._id, response, jobId);
  };
  const handleMessageModal = () => {
    setOpenModal((prev) => !prev);
  };

  const loading = recruitDataLoading || isPostLoading;

  return (
    <>
      <Modal open={openModal} onClose={handleMessageModal}>
        <BoxContent elevation={0}>
          <Stack>
            <Typography>
              {jobs?.recruitments[messageIndex]?.recruitmentMessage}
            </Typography>
            <Typography fontWeight={700}>
              - {jobs?.recruitments[messageIndex]?.company}
            </Typography>
          </Stack>
          <Divider sx={{ margin: "0.5rem auto" }} />
          <Stack direction="row" justifyContent="center">
            <Button onClick={handleMessageModal}>Close</Button>
          </Stack>
        </BoxContent>
      </Modal>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Company</TableCell>
              <TableCell>Job</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Salary</TableCell>
              <TableCell>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <div>Response</div>
                  <Tooltip title={"This can only be selected once."}>
                    <InfoIcon color="inherit" />
                  </Tooltip>
                </Stack>
              </TableCell>
              <TableCell>Message</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jobs &&
              !loading &&
              jobs?.recruitments?.map((recruitment, i) => (
                <TableRow key={recruitment?._id}>
                  <TableCell>{recruitment?.company}</TableCell>
                  <TableCell>
                    <RouterLink
                      component={Link}
                      to={`/jobs/${recruitment?.jobId}`}
                    >
                      {recruitment?.jobTitle}
                    </RouterLink>
                  </TableCell>
                  <TableCell>{recruitment?.location}</TableCell>
                  <TableCell>{recruitment?.salary}</TableCell>
                  <TableCell>
                    <ButtonGroup size="small">
                      <Tooltip title="interested">
                        <Button
                          onClick={() =>
                            handleRecruitmentResponse(
                              "interested",
                              recruitment?.jobId
                            )
                          }
                        >
                          <ThumbUpIcon />
                        </Button>
                      </Tooltip>
                      <Tooltip title="not interested">
                        <Button
                          color="error"
                          onClick={() =>
                            handleRecruitmentResponse(
                              "not interested",
                              recruitment?.jobId
                            )
                          }
                        >
                          <ThumbDownIcon />
                        </Button>
                      </Tooltip>
                    </ButtonGroup>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={"View"}
                      icon={<VisibilityIcon />}
                      component={Button}
                      onClick={() => {
                        setOpenModal(true);
                        setMessageIndex(i);
                      }}
                      clickable
                      variant="outlined"
                    />
                  </TableCell>
                </TableRow>
              ))}

            {loading &&
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
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
              ))}
          </TableBody>
        </Table>
        <Pagination
          count={totalPages}
          page={recruitmentsPage.page}
          onChange={handleRecruitmentPageChange}
        />
      </TableContainer>
    </>
  );
};

export default UserRecruitmentTable;
