import { useState } from "react";
import Sidebar from "../components/cms/sidebar/Sidebar";
import { Container, Stack, styled } from "@mui/material";
import { Outlet } from "react-router-dom";
import CMSPanel from "../components/cms/CMSPanel";

const MainWrapper = styled("div")(() => ({
  width: "100%",
  display: "flex",
  minHeight: "100vh",
}));

const PageWrapper = styled("div")(() => ({
  zIndex: 1,
  flexGrow: 1,
  display: "flex",
  flexDirection: "column",
}));

export default function CMSLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <MainWrapper>
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        onSidebarClose={() => setIsSidebarOpen(false)}
      />
      <PageWrapper>
        <Container maxWidth={"xl"}>
          <Stack m={4}>
            <Outlet />
          </Stack>
        </Container>
      </PageWrapper>
      <CMSPanel />
    </MainWrapper>
  );
}
