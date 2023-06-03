import React, { useContext } from "react";

import StarIcon from "@mui/icons-material/StarBorder";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Typography,
} from "@mui/material";

import ErrorModal from "../../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../../shared/components/UIElements/LoadingSpinner";
import { AuthContext } from "../../../shared/context/auth-context";
import { useUser } from "../../../shared/hooks/user-hook";

const tiers = [
  {
    title: "starter",
    price: "฿750",
    credits: 5,
    description: "5 Good for one job post up to 30 days",
    buttonText: "Add Credits",
    buttonVariant: "outlined",
  },
  {
    title: "Agency",
    price: "฿1,000",
    subheader: "Most Popular",
    credits: 15,
    description: "15 Credits Worth up to 3 job post",
    buttonText: "Add Credits",
    buttonVariant: "contained",
  },
  {
    title: "Enterprise",
    price: "฿1,800",
    credits: 30,
    description: "30 Credits All features of Agency",
    buttonText: "Add Credits",
    buttonVariant: "outlined",
  },
];

const PurchaseCredits = () => {
  const auth = useContext(AuthContext);
  const { addCredits, isPostLoading, error, clearError } = useUser();

  const purchaseCreditsHandler = (amount) => {
    addCredits(auth.user?._id, amount);
  };

  return (
    <>
      {isPostLoading && <LoadingSpinner asOverlay />}
      <ErrorModal error={error} onClear={clearError} />
      <Container sx={{ marginBottom: "1rem" }}>
        <Grid container spacing={4} alignItems="flex-end">
          {tiers.map((tier) => (
            <Grid
              item
              key={tier.title}
              xs={12}
              sm={tier.title === "Enterprise" ? 12 : 6}
              md={4}
            >
              <Card>
                <CardHeader
                  title={tier.title}
                  titleTypographyProps={{ align: "center" }}
                  action={tier.title === "Agency" ? <StarIcon /> : null}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === "light"
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],
                  }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "baseline",
                      mb: 2,
                    }}
                  >
                    <Typography
                      component="h2"
                      variant="body1"
                      sx={{ fontSize: 20 }}
                      color="text.primary"
                    >
                      {tier.price}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography>{tier.description}</Typography>
                  </Box>
                </CardContent>
                <CardActions>
                  <Button
                    onClick={() => purchaseCreditsHandler(tier.credits)}
                    fullWidth
                    variant={tier.buttonVariant}
                  >
                    {tier.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default PurchaseCredits;
