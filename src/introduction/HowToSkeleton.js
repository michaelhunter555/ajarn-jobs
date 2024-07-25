import {
  Card,
  CardContent,
  Container,
  Divider,
  Skeleton,
  Stack,
} from "@mui/material";

const RenderSkeleton = () => (
  <Container
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}
  >
    <Skeleton variant="text" width={200} height={30} />
    <Skeleton variant="text" width={300} height={20} />
    <Stack
      direction="row"
      spacing={2}
      alignItems="center"
      justifyContent="center"
      sx={{ width: { xs: "100%", md: "50%" } }}
    >
      {[1, 2, 3].map((item) => (
        <Card key={item} sx={{ width: 200, height: 250 }}>
          <Skeleton variant="rectangular" width="100%" height={140} />
          <CardContent sx={{ display: "flex", justifyContent: "center" }}>
            <Skeleton variant="text" width={100} height={30} />
          </CardContent>
        </Card>
      ))}
    </Stack>
    <Divider variant="middle" sx={{ margin: "1rem auto", width: "50%" }} />
    <Skeleton variant="rectangular" width="100%" height={200} />
  </Container>
);

export default RenderSkeleton;
