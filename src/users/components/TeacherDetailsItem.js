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
  Card,
  CardContent,
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
  width: "90%",
  maxWidth: "1200px",
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

const ModernCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.spacing(3),
  background: theme.palette.mode === "dark"
    ? "rgba(255, 255, 255, 0.08)"
    : "rgba(255, 255, 255, 0.15)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: theme.palette.mode === "dark"
    ? "1px solid rgba(255, 255, 255, 0.2)"
    : "1px solid rgba(255, 255, 255, 0.3)",
  boxShadow: theme.palette.mode === "dark"
    ? `
        0 8px 32px rgba(0, 0, 0, 0.3),
        inset 0 1px 0 rgba(255, 255, 255, 0.1),
        inset 0 -1px 0 rgba(255, 255, 255, 0.05)
      `
    : `
        0 8px 32px rgba(0, 0, 0, 0.1),
        inset 0 1px 0 rgba(255, 255, 255, 0.5),
        inset 0 -1px 0 rgba(255, 255, 255, 0.1)
      `,
  position: "relative",
  overflow: "hidden",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: theme.palette.mode === "dark"
      ? `
          0 12px 40px rgba(0, 0, 0, 0.4),
          inset 0 1px 0 rgba(255, 255, 255, 0.15)
        `
      : `
          0 12px 40px rgba(0, 0, 0, 0.15),
          inset 0 1px 0 rgba(255, 255, 255, 0.6)
        `,
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
              <ModernCard>
                <CardContent sx={{ p: 3 }}>
                <StyledGridContainer container direction="row" spacing={1}>
                  {/**grid item 1 */}
                  <Grid item>
                    <Avatar
                      variant="circular"
                      src={`${teacher?.image}`}
                      sx={{ height: 100, width: 100 }}
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

                    <Stack direction="column" spacing={1}>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <SchoolIcon size="inherit" sx={{ color: "#646464" }} />
                        <Typography
                          color="text.secondary"
                          variant="subtitle2"
                          component="div"
                        >
                          Education:
                        </Typography>
                      </Stack>
                      <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", gap: 0.5 }}>
                        {teacher?.highestCertification && (
                          <Chip
                            label={teacher.highestCertification}
                            size="small"
                            color="primary"
                            variant="outlined"
                            sx={{ fontWeight: 500 }}
                          />
                        )}
                        {teacher?.education &&
                          teacher?.education?.split(",")?.map((uni, i) => (
                            <Chip
                              key={i}
                              label={uni?.trim()?.split(".")[0] || uni?.trim()}
                              size="small"
                              color="secondary"
                              variant="outlined"
                              avatar={
                                <Avatar
                                  alt={`${uni?.trim()} logo`}
                                  src={`https://logo.clearbit.com/${uni
                                    ?.trim()
                                    ?.toLowerCase()}`}
                                  sx={{ width: 20, height: 20 }}
                                />
                              }
                              sx={{ fontWeight: 500 }}
                            />
                          ))}
                      </Stack>
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
                      sx={{ mb: 1, fontWeight: 600 }}
                    >
                      Skills:
                    </Typography>
                    <StyledStack
                      spacing={1}
                      direction="row"
                      alignItems="flex-start"
                      sx={{ flexWrap: "wrap", rowGap: 0.5, columnGap: 0.5 }}
                    >
                      {(teacher?.skill?.split(",") || [])
                        .map((s) => s.trim())
                        .filter((s) => !!s)
                        .map((skills, i) => (
                          <Chip
                            sx={{ 
                              margin: 0,
                              fontWeight: 500,
                              "&:hover": {
                                backgroundColor: "primary.main",
                                color: "white",
                                transform: "scale(1.05)"
                              },
                              transition: "all 0.2s ease-in-out"
                            }}
                            size="small"
                            color="primary"
                            variant="outlined"
                            clickable
                            key={i}
                            label={skills}
                          />
                        ))}
                    </StyledStack>
                  </Stack>
                </StyledGridContainer>
                <Divider flexItem sx={{ margin: "1.5rem 0" }} />
                <Stack
                  direction="column"
                  sx={{ width: "100%" }}
                  alignItems="center"
                >
                  <Button
                    onClick={openModalHandler}
                    disabled={recruitmentSentAlready || !isPaidUser}
                    variant="contained"
                    endIcon={
                      recruitmentSentAlready ? (
                        <CheckIcon color="success" />
                      ) : (
                        <SendIcon />
                      )
                    }
                    sx={{ 
                      borderRadius: "25px",
                      px: 3,
                      py: 1,
                      fontWeight: 600,
                      textTransform: "none",
                      background: recruitmentSentAlready 
                        ? "linear-gradient(45deg, #4caf50 30%, #66bb6a 90%)"
                        : "linear-gradient(45deg, #2196f3 30%, #21cbf3 90%)",
                      "&:hover": {
                        background: recruitmentSentAlready 
                          ? "linear-gradient(45deg, #388e3c 30%, #4caf50 90%)"
                          : "linear-gradient(45deg, #1976d2 30%, #2196f3 90%)",
                        transform: "translateY(-2px)",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
                      },
                      transition: "all 0.3s ease-in-out"
                    }}
                  >
                    {recruitmentSentAlready
                      ? "✨ Offer Sent"
                      : `🚀 Recruit ${teacher?.name}`}
                  </Button>
                  {recruitmentSentAlready && (
                    <FormHelperText sx={{ mt: 1, textAlign: "center" }}>
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
                </CardContent>
              </ModernCard>
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
                <ModernCard>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" component="h4" sx={{ mb: 2, fontWeight: 600 }}>
                      💭 A little about {teacher?.name}:
                    </Typography>
                    <Typography variant="body1" paragraph sx={{ lineHeight: 1.6, mb: 2 }}>
                      {teacher?.about}
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600, color: "text.secondary" }}>
                      Interests:
                    </Typography>
                    <StyledStack direction="row" alignItems="center" spacing={1} sx={{ flexWrap: "wrap", gap: 0.5 }}>
                      {(teacher?.interests?.split(",") || [])
                        .map((s) => s.trim())
                        .filter((s) => !!s)
                        .map((interest, i) => (
                          <Chip
                            clickable
                            key={i}
                            size="small"
                            label={interest}
                            color="info"
                            variant="outlined"
                            sx={{ 
                              fontWeight: 500,
                              "&:hover": {
                                backgroundColor: "info.main",
                                color: "white",
                                transform: "scale(1.05)"
                              },
                              transition: "all 0.2s ease-in-out"
                            }}
                          />
                        ))}
                    </StyledStack>
                  </CardContent>
                </ModernCard>
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
                <ModernCard>
                  <CardContent sx={{ p: 3 }}>
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
                      sx={{ 
                        mt: 2,
                        borderRadius: "20px",
                        textTransform: "none",
                        fontWeight: 500
                      }}
                    >
                      {!readMore.open ? "📖 Read More" : "📖 Read Less"}
                    </Button>
                  )}
                  </CardContent>
                </ModernCard>
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
