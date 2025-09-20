import React from "react";

import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Stack,
  Typography,
  Button
} from "@mui/material";
import { styled } from "@mui/material/styles";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import PublicIcon from "@mui/icons-material/Public";

const PageContainer = styled(Box)(({ theme }) => ({
  maxWidth: "1200px",
  margin: "0 auto",
  padding: theme.spacing(4, 2),
}));

const Hero = styled(Box)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(4),
  marginBottom: theme.spacing(3),
}));

const RoleCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  border: `1px solid ${theme.palette.divider}`,
  transition: "all 0.25s ease-in-out",
  "&:hover": {
    boxShadow: theme.shadows[4],
    transform: "translateY(-2px)",
    borderColor: theme.palette.primary.main,
  },
}));

const roles = [
  {
    title: "Full Stack Developer",
    location: "US/Thailand · Remote",
    tags: ["React", "Node.js", "MongoDB", "AWS"],
    description:
      "Build modern features across our React + Node stack. Ship quickly, own systems end-to-end, and help scale AjarnJobs.",
  },
  {
    title: "Sales Development Specialist",
    location: "Thailand · Remote",
    tags: ["Outbound", "CRM", "B2B", "English/Thai"],
    description:
      "Source and qualify employer leads, run outreach, and help schools discover AjarnJobs. Growth-minded role with clear KPIs.",
  },
  {
    title: "Entry/Mid-level Accountant",
    location: "Thailand · Remote",
    tags: ["AR/AP", "Reporting", "Reconciliation"],
    description:
      "Own monthly bookkeeping, reconciliations, and simple reporting. Help us keep the lights on and numbers tight.",
  },
];

const WorkWithUs = () => {
  return (
    <PageContainer>
      <Hero>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Work With Us
        </Typography>
        <Typography variant="h6" sx={{ opacity: 0.9 }}>
          Join a small team building the best place for teachers and schools in Thailand.
        </Typography>
      </Hero>

      <Grid container spacing={3}>
        {roles.map((role, idx) => (
          <Grid item xs={12} md={4} key={idx}>
            <RoleCard>
              <CardContent>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                  <WorkOutlineIcon color="primary" />
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {role.title}
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                  <PublicIcon fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary">
                    {role.location}
                  </Typography>
                </Stack>
                <Typography variant="body2" color="text.primary" sx={{ mb: 2, lineHeight: 1.6 }}>
                  {role.description}
                </Typography>
                <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", gap: 1, mb: 2 }}>
                  {role.tags.map((tag) => (
                    <Chip key={tag} label={tag} size="small" variant="outlined" />
                  ))}
                </Stack>
                <Divider sx={{ mb: 2 }} />
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="caption" color="text.secondary">
                    Thailand / Remote friendly
                  </Typography>
                  <Button variant="outlined" color="primary" size="small">
                    Apply Interest
                  </Button>
                </Stack>
              </CardContent>
            </RoleCard>
          </Grid>
        ))}
      </Grid>
    </PageContainer>
  );
};

export default WorkWithUs;


