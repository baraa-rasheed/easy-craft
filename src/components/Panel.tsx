import { Box, Typography } from "@mui/material";

export default function Panel() {
  return (
    <Box
      height={100}
      width={"100%"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      bgcolor={"primary.light"}
    >
      <Typography color={"primary"} variant="button">
        New Panel
      </Typography>
    </Box>
  );
}
