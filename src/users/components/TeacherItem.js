import React, { useContext, useState, useEffect } from "react";

import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";
import LocalPoliceTwoToneIcon from "@mui/icons-material/LocalPoliceTwoTone";
import PlaceIcon from "@mui/icons-material/Place";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import PublicIcon from "@mui/icons-material/Public";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import {
  Avatar,
  Box,
  Button,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  Grid,
  IconButton,
  Modal,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import { AuthContext } from "../../shared/context/auth-context";

const StyledNameTypography = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",
}));

const StyledGlassCard = styled(Paper)(({ theme }) => ({
  margin: "0 auto",
  minWidth: "100%",
  position: "relative",
  overflow: "hidden",
  backgroundColor: theme.palette.background.paper,
  borderRadius: "18px",
  maxWidth: 300,

  [theme.breakpoints.down("md")]: {
    margin: "0.5rem 0.5rem 0",
  },
  [theme.breakpoints.down("sm")]: {
    margin: "0.5rem 1rem 0",
  },
}));

const TeacherItem = (props) => {
  const auth = useContext(AuthContext);
  const [openModal, setOpenModal] = useState(false);
  const [pdfModalOpen, setPdfModalOpen] = useState(false);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [pdfImages, setPdfImages] = useState([]);
  /**
   * TODO: blur details of users if buffetIsNotActive (leave first user STOCK)
   */

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  // Convert PDF to image for preview
  const convertPdfToImage = async () => {
    if (!props?.pdfResume) {
      return null;
    }
    
    const cloudinaryUrl = props.pdfResume.split("/");
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

  // Load PDF images when component mounts
  useEffect(() => {
    if (props?.pdfResume) {
      convertPdfToImage().then(setPdfImages);
    } else {
      setPdfImages([]);
    }
  }, [props?.pdfResume]);

  const handlePdfModalOpen = () => {
    setPdfModalOpen(true);
  };

  const handlePdfModalClose = () => {
    setPdfModalOpen(false);
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setImageModalOpen(true);
  };

  const handleImageModalClose = () => {
    setImageModalOpen(false);
    setSelectedImage('');
  };

  let nameText;
  if (props?.name?.length > 20) {
    nameText = (
      <StyledNameTypography longName={true}>{props?.name}</StyledNameTypography>
    );
  } else {
    nameText = (
      <Typography component="h3" variant="h6">
        {props?.name}
      </Typography>
    );
  }

  return (
    <>
      <Grid container direction="row" justifyContent="center">
        <StyledGlassCard
          onClick={handleModalOpen}
          sx={{ maxWidth: props?.width }}
        >
          <CardContent sx={{ lineHeight: 1, padding: "16px 16px 0 16px" }}>
            <CardMedia
              component="img"
              image={props?.image}
              alt={`${props?.id}--${props?.name}`}
              sx={{
                border: "1px solid #e5e5e5",
                height: 170,
                margin: "0 auto",
              }}
            />
            <Stack
              direction="row"
              spacing={props?.education ? 0 : "3px"}
              alignItems="center"
              justifyContent="flex-start"
            >
              {nameText}
              {/*new Result should be mapped over */}
              {props?.education &&
                props?.education
                  ?.split(",")
                  ?.slice(0, 2)
                  ?.map((uni, i) => (
                    <Chip
                      size="small"
                      key={i}
                      sx={{ backgroundColor: "transparent" }}
                      avatar={
                        <Tooltip
                          title={`Degree from ${uni?.trim()?.split(".")[0]}`}
                          placement="top"
                        >
                          <Avatar
                            alt={`${uni?.trim()}--${props?.name}`}
                            src={`https://logo.clearbit.com/${uni
                              ?.trim()
                              ?.toLowerCase()}`}
                          />
                        </Tooltip>
                      }
                    />
                  ))}
              {/**add stuff here */}
              {props?.workExperience > 5 && (
                <Tooltip title={`Has over 5 years experience.`} placement="top">
                  <Box
                    sx={{
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "flex-end",
                    }}
                  >
                    <LocalPoliceTwoToneIcon
                      style={{ color: "#128cb1", fontSize: 18 }}
                    />{" "}
                    {/*#128cb1 */}
                  </Box>
                </Tooltip>
              )}
              {props?.pdfResume && (
                <Tooltip title={`Has PDF Resume (${pdfImages.length} page${pdfImages.length > 1 ? 's' : ''})`} placement="top">
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent card click
                      handlePdfModalOpen();
                    }}
                    sx={{
                      padding: "2px",
                      backgroundColor: "red", // TEMP: Make it very visible
                      "&:hover": {
                        backgroundColor: "rgba(33, 150, 243, 0.1)"
                      }
                    }}
                  >
                    <PictureAsPdfIcon
                      style={{ color: "#f44336", fontSize: 24 }} // TEMP: Make it bigger
                    />
                  </IconButton>
                </Tooltip>
              )}
            </Stack>
            {/*2 x 2 */}
            <Grid container spacing={2} direction="row">
              <Grid item>
                <Typography
                  component="h3"
                  color="text.secondary"
                  variant="subtitle2"
                >
                  <PublicIcon fontSize="inherit" /> {props?.nationality}
                </Typography>
                <Typography
                  component="h3"
                  color="text.secondary"
                  variant="subtitle2"
                >
                  <AssuredWorkloadIcon fontSize="inherit" />{" "}
                  {props?.workExperience}{" "}
                  {props?.workExperience > 1 ? "Years" : "Year"}
                </Typography>
              </Grid>
              {/*2 x 2 */}
              <Grid item>
                <Typography
                  component="h3"
                  color="text.secondary"
                  variant="subtitle2"
                >
                  <PlaceIcon fontSize="inherit" /> {props?.currentLocation}
                </Typography>

                <Typography
                  component="h3"
                  color="text.secondary"
                  variant="subtitle2"
                >
                  <WorkspacePremiumIcon fontSize="inherit" /> {props?.degree}
                </Typography>
              </Grid>
            </Grid>

            <Divider sx={{ width: "75%" }} variant="left" />
          </CardContent>

          <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="outlined"
              sx={{
                color: "#128cb1",
                borderRadius: "18px",
                "&:hover": { color: "#128cb1" },
              }}
            >
              View
            </Button>
          </CardActions>
        </StyledGlassCard>
      </Grid>

      {/* PDF Resume Modal */}
      <Modal
        open={pdfModalOpen}
        onClose={handlePdfModalClose}
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
            width: '95vw',
            height: '95vh',
            maxWidth: '1200px',
            maxHeight: '800px',
            overflow: 'auto',
            p: 2,
            borderRadius: 2,
            boxShadow: 24,
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" component="h2">
              📄 {props?.name}'s Resume {pdfImages.length > 1 && `(${pdfImages.length} pages)`}
            </Typography>
            <Button
              onClick={handlePdfModalClose}
              variant="outlined"
              size="small"
              sx={{ minWidth: 'auto', px: 2 }}
            >
              Close
            </Button>
          </Box>
          
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            {pdfImages.map((imageUrl, index) => (
              <Box key={index} sx={{ textAlign: 'center', position: 'relative' }}>
                <Typography variant="caption" sx={{ mb: 1, display: 'block', fontWeight: 600 }}>
                  Page {index + 1}
                </Typography>
                <Box
                  component="img"
                  src={imageUrl}
                  alt={`PDF Resume - Page ${index + 1}`}
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
        </Paper>
      </Modal>

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
            width: '90vw',
            height: '90vh',
            maxWidth: '1000px',
            maxHeight: '800px',
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
    </>
  );
};

export default TeacherItem;
