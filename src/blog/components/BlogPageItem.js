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

const BlogPageItem = ({ content }) => {
  console.log("Auth Image:", content?.author?.image);
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
            {content?.title}
          </Typography>
          <CardMedia
            component="img"
            alt="dummy_image"
            sx={{ height: 100, width: 100 }}
            image={`${process.env.REACT_APP_IMAGE}${content?.author?.image}`}
          />
          <CardContent>
            <Typography variant="body1">{content?.postContent}</Typography>
          </CardContent>
          <CardActions>
            <Button>Maybe Yes</Button>
            <Button> Maybe No</Button>
          </CardActions>
        </Card>
      </Grid>
      {/**sidebar below */}
      <Grid item xs={12} sm={6} md={4}>
        <Card>
          <Button>Make a Post!</Button>
          <Typography variant="h5" component="h2" color="text.secondary">
            Other Posts
          </Typography>
        </Card>
      </Grid>
    </Grid>
  );
};

export default BlogPageItem;
