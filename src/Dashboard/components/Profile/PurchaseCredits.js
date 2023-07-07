import React, { useContext, useEffect, useState } from "react";

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
  Modal,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import ErrorModal from "../../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../../shared/components/UIElements/LoadingSpinner";
import { AuthContext } from "../../../shared/context/auth-context";
import { useUser } from "../../../shared/hooks/user-hook";

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
  const [openModal, setOpenModal] = useState(false);
  const [price, setPrice] = useState("");
  const [totalCredits, setTotalCredits] = useState(0);
  const [isClicked, setIsClicked] = useState(false); //acts as basic debouncer for users who might repeat click
  const { addCredits, isPostLoading, error, clearError } = useUser();

  const purchaseCreditsHandler = (amount) => {
    if (!isClicked) {
      setIsClicked(true);
      addCredits(auth.user?._id, amount);
      setOpenModal(false);
    }
  };

  useEffect(() => {
    if (!isPostLoading) {
      setIsClicked(false);
    }
  }, [isPostLoading]);

  const confirmCreditsHandler = (val) => {
    setTotalCredits(val);
    setOpenModal((prev) => !prev);
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
                    onClick={() => confirmCreditsHandler(tier.credits)}
                    fullWidth
                    variant={tier.buttonVariant}
                  >
                    {tier.buttonText}
                  </Button>
                  <Modal
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
                          Confirm Credit Amount
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
                            onClick={() => purchaseCreditsHandler(totalCredits)}
                            variant={tier.buttonVariant}
                          >
                            Complete Purchase
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
