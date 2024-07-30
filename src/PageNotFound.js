import React from "react";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, CardMedia, Chip, Stack, Typography } from "@mui/material";

import Footer, {
  Content,
  PageContainer,
} from "./shared/components/UIElements/Footer";

const notFoundImg =
  "https://res.cloudinary.com/dtqbxfe7r/image/upload/v1722173900/page-not-found_1_iqisuk.svg";

const PageNotFound = () => {
  const handleGoBack = () => window.history.go(-2);
  return (
    <PageContainer>
      <Content>
        <Box sx={{ margin: "2rem auto", width: "50%" }}>
          <Typography align="center" variant="h2" color="text.secondary">
            Page Not Found
          </Typography>
          <Typography align="center" gutterBottom color="text.secondary">
            The page you are looking for either doesn't exist or no longer
            exists.
          </Typography>
          <CardMedia
            component="img"
            src={notFoundImg}
            alt="page-not-found"
            sx={{ width: "50%", height: "50%", margin: "0 auto" }}
          />
          <Stack alignItems="center">
            <Chip
              icon={<ArrowBackIcon />}
              color="primary"
              label="Go back"
              component="button"
              clickable
              onClick={handleGoBack}
            />
          </Stack>
        </Box>
      </Content>
      <Footer />
    </PageContainer>
  );
};

export default PageNotFound;
