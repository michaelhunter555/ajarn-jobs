import React, { useContext, useState } from "react";

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
  Link,
  Modal,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import ErrorModal from "../../../shared/components/UIElements/ErrorModal";
import { AuthContext } from "../../../shared/context/auth-context";
import { useStripe } from "../../../shared/hooks/stripe-hook";

const StyleCreditsModal = styled(Paper)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgColor: "background.paper",
  border: "1px solid #000",
  boxShadow: 5,
  padding: 7,
  margin: "2rem auto",
  borderRadius: 8,
});

const tiers = [
  {
    priceId: "price_1PNxKlRpnv4ckgZhXsKjq8Yw",
    title: "starter",
    price: "฿750",
    credits: 5,
    description: "5 Credits Good for a job post or two 24h Teacher Buffets.",
    buttonText: "Add Credits",
    buttonVariant: "outlined",
  },
  {
    priceId: "price_1PNxLvRpnv4ckgZhMFUfhKqZ",
    title: "Agency",
    price: "฿1,200",
    subheader: "Most Popular",
    credits: 15,
    description: "15 Credits for job posting and teacher buffets.",
    buttonText: "Add Credits",
    buttonVariant: "contained",
  },
  {
    priceId: "price_1PNxMiRpnv4ckgZhTjkWZrsD",
    title: "Enterprise",
    price: "฿1,800",
    credits: 30,
    description: "30 Credits for job posting and teacher buffets.",
    buttonText: "Add Credits",
    buttonVariant: "outlined",
  },
];

const PurchaseCredits = () => {
  const auth = useContext(AuthContext);
  const [openModal, setOpenModal] = useState(false);
  const [totalCredits, setTotalCredits] = useState(0);
  //const { addCredits, isPostLoading, error, clearError } = useUser();
  const {
    createCheckoutSession,
    isPostLoading,
    checkoutUrl,
    error,
    clearError,
  } = useStripe();

  const confirmCreditsHandler = async (val, priceId) => {
    if (auth?.user?._id && priceId) {
      try {
        setOpenModal((prev) => !prev);
        setTotalCredits(val);
        await createCheckoutSession(auth?.user?._id, priceId, val);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      {/* {isPostLoading && <LoadingSpinner asOverlay />} */}
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
                    onClick={() =>
                      confirmCreditsHandler(tier.credits, tier.priceId)
                    }
                    fullWidth
                    variant={tier.buttonVariant}
                  >
                    {tier.buttonText}
                  </Button>
                  <Modal
                    disableScrollLock={true}
                    open={openModal}
                    onClose={confirmCreditsHandler}
                    aria-labelledby="add-credits-modal"
                    aria-describedby="final step before adding credits"
                  >
                    <StyleCreditsModal>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 2,
                        }}
                      >
                        <Typography variant="body1" color="text.secondary">
                          Confirm Credit Amount - You will be redirected to
                          Stripe to complete your purchase
                        </Typography>
                        <Typography variant="subtitle2" color="text.secondary">
                          You are about to purchase{" "}
                          <b>{totalCredits} credits</b>.
                        </Typography>
                        <Stack
                          direction="column"
                          justifyContent="flex-end"
                          alignItems="center"
                        >
                          <Button
                            variant={"contained"}
                            component={Link}
                            href={`${checkoutUrl}`}
                          >
                            {isPostLoading
                              ? "Loading..."
                              : "Checkout with stripe"}
                          </Button>
                        </Stack>
                      </Box>
                    </StyleCreditsModal>
                  </Modal>
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
