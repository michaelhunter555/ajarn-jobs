import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CheckIcon from "@mui/icons-material/Check";
import LanguageIcon from "@mui/icons-material/Language";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LockIcon from "@mui/icons-material/Lock";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import PostAddIcon from "@mui/icons-material/PostAdd";
import SchoolIcon from "@mui/icons-material/School";
import SendIcon from "@mui/icons-material/Send";
import WorkIcon from "@mui/icons-material/Work";
import { IoChatbubble } from "react-icons/io5";
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
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const openModalHandler = () => setOpen(true);
  const closeModalHandler = () => setOpen(false);
  const [readMore, setReadMore] = useState({
    open: false,
    length: 500,
  });

  // Resume visibility logic
  const canViewResume = 
    auth?.user?._id === teacher?._id || // User viewing their own profile
    (auth?.user?.userType === "employer" && auth?.user?.buffetIsActive); // Employer with active buffet

  // Check if teacher has any resume content
  const hasResumeContent = 
    teacher?.pdfResume || // Has PDF resume
    (teacher?.resume && teacher?.resume.length > 0); // Has manual resume items

  // Convert PDF to image for preview
  const convertPdfToImage = async () => {
    if (!teacher?.pdfResume) {
      return null;
    }
    
    const cloudinaryUrl = teacher.pdfResume.split("/");
    const cloudName = cloudinaryUrl[3];
    const pdfName = cloudinaryUrl[cloudinaryUrl.length - 1];
    const extension = pdfName.replace(/\.pdf$/, "");

    const page1 = `https://res.cloudinary.com/${cloudName}/image/upload/pg_1/w_500,f_auto/${extension}.png`;
    const page2 = `https://res.cloudinary.com/${cloudName}/image/upload/pg_2/w_500,f_auto/${extension}.png`;

    // Try fetching page 2 to see if it exists
    try {
      const res = await fetch(page2, { method: "HEAD" });
      if (res.ok) {
        return [page1, page2]; // return array if 2 pages exist
      } else {
        return [page1]; // only page 1 exists
      }
    } catch (err) {
      console.error("Error fetching PDF page:", err);
      return [page1]; // fallback
    }
  };

  const [pdfImages, setPdfImages] = useState([]);

  // Load PDF images when teacher data changes
  useEffect(() => {
    if (teacher?.pdfResume) {
      convertPdfToImage().then(setPdfImages);
    } else {
      setPdfImages([]);
    }
  }, [teacher?.pdfResume]);

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setImageModalOpen(true);
  };

  const handleImageModalClose = () => {
    setImageModalOpen(false);
    setSelectedImage('');
  };

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

  const handleSendMessageLink = () => {

  }

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

                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Chip label={teacher?.userType.slice(0,1).toUpperCase() + teacher?.userType.slice(1)} size="small" />
                      {auth?.user?.userType === 'employer' && (
                      <Link 
                      to={`/users/${auth?.user?._id}?sendMessage=true`}
                      state={{ teacherId: teacher?._id, name: teacher?.name, image: teacher?.image, userType: teacher?.userType }}
                      >
                      <Chip 
                      variant="contained" 
                      color="primary" 
                      clickable 
                      label={"send message"} 
                      icon={<IoChatbubble size={18} />} 
                      size="small" />
                      </Link>
                      )}
                    </Stack>
                      
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
                      ? "Offer Sent"
                      : `Recruit ${teacher?.name}`}
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
              {!isLoading && hasResumeContent && (
                <ModernCard>
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <Typography variant="h6" component="h4" sx={{ fontWeight: 600, mr: 1 }}>
                        📄 Resume
                      </Typography>
                      {!canViewResume && (
                        <Tooltip title="Activate buffet to view resume">
                          <LockIcon color="disabled" fontSize="small" />
                        </Tooltip>
                      )}
                      <Box sx={{ flexGrow: 1 }} />
                      {canViewResume && teacher?.pdfResume && (
                        <Button
                          component="a"
                          href={teacher?.pdfResume}
                          target="_blank"
                          rel="noopener noreferrer"
                          variant="outlined"
                          size="small"
                          startIcon={<PictureAsPdfIcon />}
                          sx={{ textTransform: "none", fontWeight: 500 }}
                        >
                          View PDF
                        </Button>
                      )}
                    </Box>
                    
                    {canViewResume ? (
                      <Box>
                        {/* PDF Resume Section */}
                        {teacher?.pdfResume && (
                          <Box sx={{ mb: 3 }}>
                            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                              📎 PDF Resume {pdfImages.length > 1 && `(${pdfImages.length} pages)`}
                            </Typography>
                            {pdfImages.length > 0 && (
                              <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, justifyContent: 'center', flexWrap: 'wrap', mb: 2 }}>
                                {pdfImages.map((imageUrl, index) => (
                                  <Box key={index} sx={{ textAlign: "center", position: 'relative' }}>
                                    <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: "block", fontWeight: 600 }}>
                                      Page {index + 1}
                                    </Typography>
                                    <Box
                                      component="img"
                                      src={imageUrl}
                                      alt={`PDF Resume Preview - Page ${index + 1}`}
                                      sx={{
                                        width: '120px',
                                        height: '160px',
                                        objectFit: 'cover',
                                        border: '2px solid #e0e0e0',
                                        borderRadius: 2,
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease-in-out',
                                        '&:hover': {
                                          boxShadow: '0 8px 25px rgba(0,0,0,0.3)',
                                          transform: 'scale(1.1)',
                                          border: '2px solid #2196f3',
                                          zIndex: 1
                                        }
                                      }}
                                      onClick={() => handleImageClick(imageUrl)}
                                    />
                                    <Typography variant="caption" sx={{ mt: 1, display: 'block', color: '#666', fontSize: '0.7rem' }}>
                                      Click to enlarge
                                    </Typography>
                                  </Box>
                                ))}
                              </Box>
                            )}
                           
                          </Box>
                        )}

                        {/* Manual Resume Items Section */}
                        {teacher?.resume && teacher?.resume.length > 0 && (
                          <Box>
                            {teacher?.pdfResume && <Divider sx={{ mb: 3 }} />}
                            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                              💼 Work History
                            </Typography>
                            <CollapsibleTable teacherResume={teacher?.resume} />
                          </Box>
                        )}
                      </Box>
                    ) : (
                      <Box sx={{ textAlign: "center", py: 4 }}>
                        <LockIcon sx={{ fontSize: 48, color: "text.disabled", mb: 2 }} />
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                          Resume is locked
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Activate buffet to view teacher's resume
                        </Typography>
                      </Box>
                    )}
                  </CardContent>
                </ModernCard>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Image Enlargement Modal */}
      <Modal
        open={imageModalOpen}
        onClose={handleImageModalClose}
        disableScrollLock={true}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Paper
          sx={{
            position: 'relative',
          
            maxWidth: '1000px',
            //maxHeight: '900px',
            overflow: 'auto',
            p: 2,
            borderRadius: 2,
            boxShadow: 24,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, width: '100%' }}>
            <Typography variant="h6" component="h2">
              📄 Resume Preview
            </Typography>
            <Button
              onClick={handleImageModalClose}
              variant="outlined"
              size="small"
              sx={{ minWidth: 'auto', px: 2 }}
            >
              Close
            </Button>
          </Box>
          
          <Box
            component="img"
            src={selectedImage}
            alt="PDF Resume Preview"
            sx={{
              maxWidth: '100%',
              maxHeight: '100%',
              height: 'auto',
              border: '1px solid #e0e0e0',
              borderRadius: 2,
              boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
            }}
          />
        </Paper>
      </Modal>
    </StyledBoxContainer>
  );
};

export default TeacherDetailsItem;
