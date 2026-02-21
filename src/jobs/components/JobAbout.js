import React from "react";

import { Box, Card, CardContent, Chip, Divider, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import BusinessIcon from '@mui/icons-material/Business';

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
  marginTop: "1rem",
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

const StyledChip = styled(Chip)(({ theme }) => ({
  margin: "0.5rem 8px 8px 0",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: theme.shadows[4],
  },
}));

export const JobAbout = (props) => {
  const { job } = props;

  return (
    <ModernCard>
      <CardContent sx={{ p: 3 }}>
        <Typography 
          variant="h5" 
          component="h4"
          sx={{ 
            fontWeight: 600,
            mb: 2,
            color: "text.primary"
          }}
        >
          <BusinessIcon /> A little about {job?.creator?.company}:
        </Typography>
        <Divider variant="middle" sx={{ margin: "0 0 1rem 0" }} />
        <Typography 
          variant="body1" 
          paragraph
          sx={{ 
            lineHeight: 1.7,
            color: "text.primary"
          }}
        >
          {job?.creator?.about}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            flexWrap: "wrap",
          }}
        >
          {job?.creator?.presence?.map((item, i) => (
            <StyledChip
              key={i}
              clickable
              label={item}
              variant="outlined"
              color="primary"
              size="small"
            />
          ))}
        </Box>
      </CardContent>
    </ModernCard>
  );
};
