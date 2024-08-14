import { useState } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import { Container, Stack, styled } from "@mui/material";
import { Link as RouterLink, Outlet, useLocation } from "react-router-dom";

import Logo from "../assets/logo.svg";
import { motion, AnimatePresence } from "framer-motion";
const MainWrapper = styled("div")(() => ({
  width: "100%",
  display: "flex",
  minHeight: "100vh",
}));

const PageWrapper = styled("div")(() => ({
  zIndex: 1,
  flexGrow: 1,
  display: "flex",
  width: "100%",
  flexDirection: "column",
}));

export default function AppLayout() {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <MainWrapper>
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        onSidebarClose={() => setIsSidebarOpen(false)}
      />
      <PageWrapper>
        <header className="pb-6 bg-white lg:pb-0 border-b">
          <div className="px-4 mx-auto max-w-screen-2xl sm:px-6 lg:px-8">
            <nav className="flex items-center justify-between h-16 lg:h-20">
              <div className="flex-shrink-0">
                <a href="#" title="" className="flex">
                  <img src={Logo} className="w-auto h-8 lg:h-8" />
                </a>
              </div>
              <button
                type="button"
                className="inline-flex p-2 text-black transition-all duration-200 rounded-md lg:hidden focus:bg-gray-100 hover:bg-gray-100"
              >
                <svg
                  className="block w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 8h16M4 16h16"
                  />
                </svg>

                <svg
                  className="hidden w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <div className="hidden lg:flex lg:items-center lg:ml-auto lg:space-x-10">
               
                <RouterLink
                  className="bg-emerald-500 p-3 rounded-md text-base font-medium text-white transition-all duration-200 hover:bg-emerald-600 focus:text-emerald-600"
                  to={`/cms${location.pathname}`}
                >
                  Switch to Craft Mode
                </RouterLink>
              </div>
            </nav>

            <nav className="pt-4 pb-6 bg-white border border-gray-200 rounded-md shadow-md lg:hidden">
         

              <div className="px-6 mt-6">
                <RouterLink
                  className="bg-green-600 p-3 rounded-md text-base font-medium text-white transition-all duration-200 hover:bg-green-800 focus:text-green-800"
                  to={`/cms${location.pathname}`}
                >
                   Switch to Craft Mode
                </RouterLink>
              </div>
            </nav>
          </div>
        </header>
        <AnimatePresence mode={"wait"}>
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
            }}
          >
            <Container maxWidth={"xl"}>
              <Stack m={2}>
                <Outlet />
              </Stack>
            </Container>
          </motion.div>
        </AnimatePresence>
      </PageWrapper>
    </MainWrapper>
  );
}
