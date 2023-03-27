import React from "react";

import { Box, Card, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import Messages from "./Messages";

const StyledApplicationsCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItem: "center",
  border: "2px solid lightblue",
  height: "100%",
  width: "100%",
}));

const StyledApplicationContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-evenly",
  flexDirection: "row",
  gap: "5px",
}));

const Applications = () => {
  return (
    <>
      <StyledApplicationContainer>
        <StyledApplicationsCard>
          Total Applications:
          <Paper sx={{ margin: "0 auto" }}>
            <Typography variant="h2">1</Typography>
          </Paper>
        </StyledApplicationsCard>
        <StyledApplicationsCard>
          Responses:
          <Paper sx={{ margin: "0 auto" }}>
            <Typography variant="h2">1</Typography>
          </Paper>
        </StyledApplicationsCard>
      </StyledApplicationContainer>
      <Messages />
    </>
  );
};

export default Applications;
