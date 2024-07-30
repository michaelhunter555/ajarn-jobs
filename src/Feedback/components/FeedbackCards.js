import React, { useEffect, useState } from "react";

import { useLocation } from "react-router-dom";

import { Box, FormHelperText, Paper, Stack, Typography } from "@mui/material";

const FeedbackCards = ({ onCardClick, isDarkMode, reasons }) => {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const queryVal = queryParams.get("reason");
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (queryVal) {
      const index = reasons.findIndex((r) => r.query === queryVal);
      setSelected(index);
      onCardClick(index);
    }
  }, []);

  const handleCardClick = (i) => {
    setSelected(i);
    onCardClick(i);
  };

  return (
    <Stack
      sx={{
        flexDirection: { xs: "column", md: "row" },
        gap: "10px",
        justifyContent: { xs: "flex-start", md: "center" },
        width: "100%",
      }}
    >
      {reasons?.map((r, i) => (
        <Paper
          key={i}
          onClick={() => handleCardClick(i)}
          sx={{
            cursor: "pointer",
            padding: 2,
            ...(selected === i && isDarkMode
              ? {
                  backgroundColor: "#030c10",
                }
              : {}),
            ...(selected === i && !isDarkMode
              ? {
                  backgroundColor: "#e1e1e1",
                }
              : {}),
          }}
        >
          <Stack alignItems="center">
            <Box>{r.icon}</Box>
            <Typography color="text.seconary" variant="subtitle2">
              {r.reason}
            </Typography>
            <FormHelperText>{r.subText}</FormHelperText>
          </Stack>
        </Paper>
      ))}
    </Stack>
  );
};

export default FeedbackCards;
