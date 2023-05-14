import React from "react";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";

import DummyImage from "../../assets/geoff-greenwood-rH1aA4TqGms-unsplash.jpg";

const BlogPageItem = ({ blog }) => {
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="start"
      sx={{ maxWidth: "75%", margin: "0 auto" }}
      spacing={2}
    >
      <Grid item xs={12} sm={6} md={8}>
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography variant="h3" component="div">
            Article Title
          </Typography>
          <CardMedia component="img" alt="dummy_image" image={DummyImage} />
          <CardContent>
            <Typography variant="body1">Article Content</Typography>
          </CardContent>
          <CardActions>
            <Button>Maybe Yes</Button>
            <Button> Maybe No</Button>
          </CardActions>
        </Card>
      </Grid>
      {/**sidebar below */}
      <Grid item xs={12} sm={6} md={4}>
        <Card sx={{ display: "flex", justifyContent: "center" }}>
          <Typography variant="h5" component="h2" color="text.secondary">
            Other Posts
          </Typography>
        </Card>
      </Grid>
    </Grid>
  );
};

export default BlogPageItem;
