import React, { useContext, useState } from "react";

import CheckIcon from "@mui/icons-material/Check";
import LanguageIcon from "@mui/icons-material/Language";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PostAddIcon from "@mui/icons-material/PostAdd";
import SchoolIcon from "@mui/icons-material/School";
import SendIcon from "@mui/icons-material/Send";
import WorkIcon from "@mui/icons-material/Work";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  FormHelperText,
  Grid,
  Modal,
  Paper,
  Skeleton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import { CollapsibleTable } from "../../Dashboard/components/Profile/Resume";
import { AuthContext } from "../../shared/context/auth-context";
import MessageTeacher from "./MessageTeacher";

export const FadeContentBox = styled(Box)(({ theme }) => ({
  position: "relative",
  maxHeight: 190,
  overflow: "hidden",
  "&:after": {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "3em",
    background: `linear-gradient(to top, ${theme.palette.background.paper}, transparent)`,
  },
}));

const StyledBoxModal = styled(Paper)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 650,
  height: 400,
  bgcolor: "background.paper",
  border: "2px solid #fff",
  borderRadius: "15px",
  boxShadow: 24,
  p: 4,
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));

const StyledBoxContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "80%",
  margin: "0 auto 3rem",
  [theme.breakpoints.down("md")]: {
    width: "100%",
    marginBottom: "3rem",
  },
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    marginBottom: "3rem",
  },
}));

const StyledGridContainer = styled(Grid)(({ theme }) => ({
  marginTop: 4,
  [theme.breakpoints.down("md")]: {},
  [theme.breakpoints.down("sm")]: {
    justifyContent: "center",
  },
}));

const StyledLoadingSkeleton = styled(Skeleton)(({ theme }) => ({
  borderRadius: "15px",
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));

const StyledStack = styled(Stack)(({ theme }) => ({
  flexWrap: "wrap",
  [theme.breakpoints.down("sm")]: {
    flexWrap: "wrap",
    gap: "5px",
  },
}));

const TeacherDetailsItem = ({ teacher, isLoading }) => {
  const auth = useContext(AuthContext);
  const isPaidUser =
    auth?.user?.userType === "employer" && auth?.user?.buffetIsActive;
  const [open, setOpen] = useState(false);
  const openModalHandler = () => setOpen(true);
  const closeModalHandler = () => setOpen(false);
  const [readMore, setReadMore] = useState({
    open: false,
    length: 500,
  });

  const recruitmentSentAlready =
    teacher &&
    teacher?.recruitmentReceived.some(
      (j) => j?.creatorId === auth?.user?._id && j?.response === "pending"
    );

  const handleReadMoreCoverLetter = () => {
    setReadMore((prev) => ({
      open: !prev.open,
      length: prev.length === 500 ? teacher?.coverLetter?.length : 500,
    }));
  };

  return (
    <StyledBoxContainer>
      <Grid spacing={2} container direction="row">
        <Grid item xs={12} sm={6} md={6}>
          <Stack spacing={2}>
            {isLoading && (
              <StyledLoadingSkeleton
                variant="rectangular"
                sx={{
                  borderRadius: "15px",

                  height: 260,
                  width: "100%",
                }}
              />
            )}
            {!isLoading && (
              <Paper
                elevation={0}
                sx={{
                  borderRadius: "15px",
                  padding: "1rem",
                  border: " 1px solid #bdbdbd",
                }}
              >
                <StyledGridContainer container direction="row" spacing={1}>
                  {/**grid item 1 */}
                  <Grid item>
                    <Avatar
                      variant="circular"
                      src={`${teacher?.image}`}
                      sx={{ height: 175, width: 175 }}
                      alt={`${teacher?._id}--${teacher?.name}`}
                    />
                  </Grid>
                  {/**grid item 2 */}
                  <Grid
                    item
                    alignItems="center"
                    sx={{ margin: "0 0 0 0.5rem" }}
                  >
                    <Typography
                      color="text.secondary"
                      variant="h5"
                      component="h2"
                    >
                      {teacher?.name}
                    </Typography>

                    <Typography variant="subtitle2" component="div">
                      <Chip label={teacher?.userType} size="small" />
                    </Typography>

                    <Stack direction="row" alignItems="center">
                      <Box>
                        <LocationOnIcon
                          size="inherit"
                          sx={{ color: "#646464" }}
                        />
                      </Box>
                      <Box>
                        <Typography
                          variant="subtitle2"
                          color="text.secondary"
                          component="div"
                        >
                          lives in {teacher?.location}
                        </Typography>
                      </Box>
                    </Stack>

                    <Stack direction="row" alignItems="center">
                      <Box>
                        <LanguageIcon
                          size="inherit"
                          sx={{ color: "#646464" }}
                        />
                      </Box>
                      <Box>
                        <Typography
                          color="text.secondary"
                          variant="subtitle2"
                          component="div"
                        >
                          Nationality: {teacher?.nationality}
                        </Typography>
                      </Box>
                    </Stack>

                    <Stack direction="row" alignItems="center">
                      <Box>
                        <SchoolIcon size="inherit" sx={{ color: "#646464" }} />
                      </Box>
                      <Box sx={{ display: "flex", flexDirection: "row" }}>
                        <Typography
                          color="text.secondary"
                          variant="subtitle2"
                          component="div"
                        >
                          Education: {teacher?.highestCertification}
                        </Typography>
                      </Box>
                      <Box>
                        {teacher?.education &&
                          teacher?.education?.split(",")?.map((uni, i) => (
                            <Chip
                              key={i}
                              sx={{ backgroundColor: "transparent" }}
                              avatar={
                                <Tooltip
                                  title={`Degree from ${
                                    uni?.trim()?.split(".")[0]
                                  }`}
                                  placement="top"
                                >
                                  <Avatar
                                    alt={`${uni?.trim()}--${teacher?.name}`}
                                    src={`https://logo.clearbit.com/${uni
                                      ?.trim()
                                      ?.toLowerCase()}`}
                                  />
                                </Tooltip>
                              }
                            />
                          ))}
                      </Box>
                    </Stack>

                    <Stack direction="row" alignItems="center">
                      <Box>
                        <WorkIcon size="inherit" sx={{ color: "#646464" }} />
                      </Box>
                      <Box>
                        <Typography
                          color="text.secondary"
                          variant="subtitle2"
                          component="div"
                        >
                          {teacher?.workExperience}
                          {teacher?.workExperience > 1 ? " years" : " year"} of
                          experience
                        </Typography>
                      </Box>
                    </Stack>
                  </Grid>
                  <Divider flexItem sx={{ margin: "0.5rem 0" }} />
                  <Stack sx={{ marginLeft: "1rem" }}>
                    <Typography
                      color="text.secondary"
                      variant="subtitle2"
                      component="div"
                    >
                      Skills:
                    </Typography>
                    <StyledStack
                      spacing={2}
                      direction="row"
                      alignItems="center"
                    >
                      {teacher?.skill?.split(",").map((skills, i) => (
                        <Chip
                          sx={{ margin: "0.3rem 0" }}
                          clickable
                          key={i}
                          label={skills}
                        />
                      ))}
                    </StyledStack>
                  </Stack>
                </StyledGridContainer>
                <Divider flexItem sx={{ margin: "0.5rem 0" }} />
                <Stack
                  direction="column"
                  sx={{ width: "100%" }}
                  alignItems="center"
                >
                  <Button
                    onClick={openModalHandler}
                    disabled={recruitmentSentAlready || !isPaidUser}
                    variant="outlined"
                    endIcon={
                      recruitmentSentAlready ? (
                        <CheckIcon color="success" />
                      ) : (
                        <SendIcon />
                      )
                    }
                    sx={{ borderRadius: "17px" }}
                  >
                    {recruitmentSentAlready
                      ? "Offer Sent"
                      : `recruit ${teacher?.name}`}
                  </Button>
                  {recruitmentSentAlready && (
                    <FormHelperText>
                      Please wait for the user to reply.
                    </FormHelperText>
                  )}
                  <Modal
                    open={open}
                    onClose={closeModalHandler}
                    disableScrollLock={true}
                  >
                    <StyledBoxModal>
                      <MessageTeacher
                        closeModal={closeModalHandler}
                        userName={teacher?.name}
                        userEmail={teacher?.email}
                        teacherId={teacher?._id}
                      />
                    </StyledBoxModal>
                  </Modal>
                </Stack>
              </Paper>
            )}

            {isLoading && (
              <StyledLoadingSkeleton
                variant="rectangular"
                sx={{
                  borderRadius: "15px",

                  height: 177,
                  width: "100%",
                }}
              />
            )}
            {!isLoading && (
              <Grid item>
                <Paper
                  sx={{
                    padding: 2,
                    borderRadius: "15px",
                    border: " 1px solid #bdbdbd",
                  }}
                  elevation={0}
                >
                  <Typography variant="h6" component="h4">
                    A little about {teacher?.name}:
                  </Typography>
                  <Typography variant="subtitle1" paragraph>
                    {teacher?.about}
                  </Typography>
                  <Divider
                    flexItem
                    variant="left"
                    sx={{ margin: "0 0 0.5rem 0" }}
                  />
                  <StyledStack direction="row" alignItems="center" spacing={1}>
                    {teacher?.interests?.split(",").map((interest, i) => (
                      <Chip
                        clickable
                        key={i}
                        label={interest}
                        variant="outlined"
                      />
                    ))}
                  </StyledStack>
                </Paper>
              </Grid>
            )}
          </Stack>
        </Grid>

        <Grid item xs={12} sm={6} md={6}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {/*cover letter */}
              {isLoading && (
                <StyledLoadingSkeleton
                  variant="rectangular"
                  sx={{
                    borderRadius: "15px",
                    marginTop: 2,
                    height: 177,
                    width: "100%",
                  }}
                />
              )}
              {!isLoading && (
                <Paper
                  elevation={0}
                  sx={{
                    padding: "2rem",
                    borderRadius: "17px",
                    margin: "0rem auto",
                    border: " 1px solid #bdbdbd",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <Typography variant="h5" component="h4">
                      {teacher?.name} - CoverLetter
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Typography variant="subtitle2" color="text.secondary">
                        {teacher?.name}
                      </Typography>

                      {isPaidUser ? (
                        <Typography variant="subtitle2" color="text.secondary">
                          - {teacher?.email}
                        </Typography>
                      ) : (
                        <Tooltip title="Activate buffet to view emails">
                          <Typography
                            variant="subtitle2"
                            color="text.secondary"
                          >
                            - *******
                          </Typography>
                        </Tooltip>
                      )}
                    </Stack>
                  </Box>

                  <Divider />
                  {teacher?.coverLetter?.length > 500 && !readMore.open ? (
                    <FadeContentBox>
                      <Typography
                        color="text.secondary"
                        variant="subtitle2"
                        paragraph
                        dangerouslySetInnerHTML={{
                          __html:
                            teacher?.coverLetter?.substring(
                              0,
                              readMore.length
                            ) +
                            `${
                              readMore.length !== teacher?.coverLetter?.length
                                ? "..."
                                : ""
                            }`,
                        }}
                      />
                    </FadeContentBox>
                  ) : (
                    <Typography
                      color="text.secondary"
                      variant="subtitle2"
                      paragraph
                      dangerouslySetInnerHTML={{
                        __html: teacher?.coverLetter,
                      }}
                    />
                  )}
                  {teacher?.coverLetter?.length > 500 && (
                    <Button
                      endIcon={<PostAddIcon />}
                      size="small"
                      onClick={handleReadMoreCoverLetter}
                    >
                      {!readMore.open ? "Read More" : "Read Less"}
                    </Button>
                  )}
                </Paper>
              )}
            </Grid>

            <Grid item xs={12}>
              {isLoading && (
                <StyledLoadingSkeleton
                  variant="rectangular"
                  sx={{
                    borderRadius: "15px",
                    marginTop: 2,
                    height: 177,
                    width: "100%",
                  }}
                />
              )}
              {!isLoading && (
                <CollapsibleTable teacherResume={teacher?.resume} />
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </StyledBoxContainer>
  );
};

export default TeacherDetailsItem;
