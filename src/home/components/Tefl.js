import React from "react";

import InfoIcon from "@mui/icons-material/Info";
import { Card, CardContent, Chip, Tooltip, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledTeflCard = styled(Card)({
  minWidth: "auto",
});

const StyledChip = styled(Chip)({
  fontSize: 11,
});

const Tefl = (props) => {
  return (
    <StyledTeflCard>
      <CardContent>
        <StyledChip
          size="small"
          label="sponsored"
          icon={
            <Tooltip title={`why this ad?`}>
              <InfoIcon />
            </Tooltip>
          }
        />

        <Typography variant="h5">125-Hour TEFL Course</Typography>

        <Typography
          sx={{ fontSize: "13px" }}
          variant="subtitle2"
          color="text.secondary"
        >
          Get Qualified and start Teaching.
        </Typography>
      </CardContent>
    </StyledTeflCard>
  );
};

export default Tefl;
