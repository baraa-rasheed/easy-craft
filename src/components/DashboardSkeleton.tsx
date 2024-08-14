import { Box, Grid, Skeleton, SkeletonOwnProps, Stack } from "@mui/material";

const AppSkeleton = (props: SkeletonOwnProps) => (
  <Skeleton
    width={"100%"}
    height={"100%"}
    animation="wave"
    variant="rectangular"
    sx={{ fontSize: "1rem", bgcolor: "#f1f5f9" }}
    {...props}
  />
);

export default function DashboardSkeleton() {
  return (
    <Stack width={"100%"} gap={1} height="100%">
      <AppSkeleton variant="rectangular" width={"100%"} height={50} />
      <AppSkeleton variant="rectangular" width={"100%"} height={90} />
      <Stack height={"100%"} gap={1} px={8} py={1}>
        <Box mb={3}>
          <AppSkeleton variant="text" width={400} height="auto" />
          <AppSkeleton variant="text" width={400} height="auto" />
          <AppSkeleton
            variant="text"
            width={500}
            height="auto"
            sx={{ fontSize: "2rem", bgcolor: "#f1f5f9" }}
          />
          <AppSkeleton
            variant="text"
            width={400}
            height="auto"
            sx={{ fontSize: "1rem", bgcolor: "#f1f5f9" }}
          />
        </Box>
        <Grid container spacing={2} height={"100%"}>
          <Grid item xs={6}>
            <AppSkeleton />
          </Grid>
          <Grid item xs={6}>
            <Grid container rowGap={2} columnSpacing={2} height={"100%"}>
              <Grid item xs={12}>
                <AppSkeleton />
              </Grid>
              <Grid item xs={6}>
                <AppSkeleton />
              </Grid>
              <Grid item xs={6}>
                <AppSkeleton />
              </Grid>
              <Grid item xs={6}>
                <AppSkeleton />
              </Grid>
              <Grid item xs={6}>
                <AppSkeleton />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <AppSkeleton />
          </Grid>
          <Grid item xs={4}>
            <AppSkeleton />
          </Grid>
          <Grid item xs={4}>
            <AppSkeleton />
          </Grid>
        </Grid>
      </Stack>
    </Stack>
  );
}
