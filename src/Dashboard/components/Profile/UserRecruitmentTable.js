import React, { useContext, useEffect, useState } from "react";

import { Link } from "react-router-dom";

import InfoIcon from "@mui/icons-material/Info";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Box,
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
import { useInvalidateQuery } from "../../../shared/hooks/invalidate-query";
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

const UserRecruitmentTable = () => {
  const auth = useContext(AuthContext);
  const { invalidateQuery } = useInvalidateQuery();
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
    enabled: Boolean(auth?.user?._id && auth?.user?.userType === "teacher"),
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

  const handleRecruitmentResponse = async (response, recruitmentId) => {
    await recruitmentOfferResponse(auth?.user?._id, response, recruitmentId);
    await invalidateQuery("RecruitmentData");
  };
  const handleMessageModal = () => {
    setOpenModal((prev) => !prev);
  };

  return (
    <>
      <Modal
        disableScrollLock={true}
        open={openModal}
        onClose={handleMessageModal}
      >
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
      <TableContainer component={Paper}>
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
              !recruitDataLoading &&
              jobs?.recruitments?.map((recruitment, i) => (
                <TableRow key={recruitment?._id}>
                  <TableCell>{recruitment?.company}</TableCell>
                  <TableCell>
                    <RouterLink
                      component={Link}
                      to={`/jobs/${recruitment?.jobId}/${recruitment?.jobTitle
                        ?.replace(/\s+/g, "-")
                        .toLowerCase()}`}
                    >
                      {recruitment?.jobTitle}
                    </RouterLink>
                  </TableCell>
                  <TableCell>{recruitment?.location}</TableCell>
                  <TableCell>{recruitment?.salary}</TableCell>
                  <TableCell>
                    {!isPostLoading && recruitment?.response === "pending" ? (
                      <ButtonGroup size="small">
                        <Tooltip title="interested">
                          <Button
                            onClick={() =>
                              handleRecruitmentResponse(
                                "interested",
                                recruitment?._id
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
                                recruitment?._id
                              )
                            }
                          >
                            <ThumbDownIcon />
                          </Button>
                        </Tooltip>
                      </ButtonGroup>
                    ) : (
                      !isPostLoading &&
                      recruitment?.response !== "pending" && (
                        <code>{recruitment?.response}</code>
                      )
                    )}
                    {isPostLoading && <Skeleton width="100%" />}
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

            {recruitDataLoading &&
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
                  <TableCell>
                    <Skeleton width="100%" />
                  </TableCell>
                </TableRow>
              ))}

            {!recruitDataLoading && jobs?.recruitments?.length === 0 && (
              <Box sx={{ padding: "1rem" }}>
                <Typography variant="subtitle2" color="text.secondary">
                  No recruit offers yet. Please check back later.
                </Typography>
              </Box>
            )}
          </TableBody>
        </Table>
        {totalPages > 1 && (
          <Pagination
            count={totalPages}
            page={recruitmentsPage.page}
            onChange={handleRecruitmentPageChange}
          />
        )}
      </TableContainer>
    </>
  );
};

export default UserRecruitmentTable;
