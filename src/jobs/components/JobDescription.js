import React, { useState } from "react";

import PostAddIcon from "@mui/icons-material/PostAdd";
import { Box, Button, Card, CardContent, Divider, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import { FadeContentBox } from "../../users/components/TeacherDetailsItem";

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

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  textTransform: "none",
  fontWeight: 600,
  padding: theme.spacing(1, 2),
  marginTop: theme.spacing(2),
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: theme.shadows[4],
  },
}));

export const JobDescription = (props) => {
  const [readMore, setReadMore] = useState(false);
  const { job } = props;

  return (
    <ModernCard>
      <CardContent sx={{ p: 3 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
            mb: 3,
          }}
        >
          <Typography 
            variant="h4" 
            component="h2"
            sx={{ 
              fontWeight: 700,
              color: "text.primary",
              textAlign: "center"
            }}
          >
            📝 {job?.title}
          </Typography>
          <Typography 
            variant="subtitle1" 
            color="text.secondary" 
            sx={{ 
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
              gap: 1
            }}
          >
            📅 Posted: {job?.datePosted?.split("T")[0]}
          </Typography>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {job?.description?.length > 500 && !readMore ? (
          <FadeContentBox>
            <Typography
              variant="body1"
              sx={{ lineHeight: 1.7, color: "text.primary" }}
              dangerouslySetInnerHTML={{ __html: job?.description }}
            />
          </FadeContentBox>
        ) : (
          <Typography
            variant="body1"
            sx={{ lineHeight: 1.7, color: "text.primary" }}
            dangerouslySetInnerHTML={{ __html: job?.description }}
          />
        )}
        {job?.description?.length > 500 && (
          <StyledButton
            variant="outlined"
            color="primary"
            endIcon={<PostAddIcon />}
            onClick={() => setReadMore((prev) => !prev)}
          >
            {!readMore ? "📖 Read more" : "📕 Read less"}
          </StyledButton>
        )}
      </CardContent>
    </ModernCard>
  );
};

export default JobDescription;
