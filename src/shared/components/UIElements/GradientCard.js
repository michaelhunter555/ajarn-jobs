import React from 'react';
import { Card, CardContent, Stack, Typography, Button } from '@mui/material';

const GradientCard = ({ title, body, buttonText, buttonIcon, onClick, sx }) => {
    return (
        <Card
                variant="outlined"
                sx={{
                  mt: 2,
                  p: 1,
                  background:
                    "linear-gradient(135deg, rgba(18,140,177,0.12), rgba(255,162,162,0.10))",
                  ...sx
                }}
              >
                <CardContent>
                  <Stack
                    direction={{ xs: "column", md: "row" }}
                    spacing={2}
                    alignItems={{ xs: "flex-start", md: "center" }}
                    justifyContent="space-between"
                  >
                    <Stack spacing={0.5}>
                      <Typography variant="h6" sx={{ fontWeight: 900 }}>
                            {title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                       {body}
                      </Typography>
                    </Stack>
                    {buttonText &&<Button onClick={onClick ?? undefined} variant="contained" endIcon={buttonIcon}>
                      {buttonText}
                    </Button>}
                  </Stack>
                </CardContent>
              </Card>
    )
}

export default GradientCard;