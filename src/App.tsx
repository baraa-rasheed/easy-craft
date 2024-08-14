import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import CMS from "./pages/cms/CMS";
import { createTheme, ThemeProvider } from "@mui/material";
import CMSLayout from "./layouts/CMSLayout";
import AppLayout from "./layouts/AppLayout";
import { generateRoutes } from "./routes/router";
import { useRouteStore } from "./store/useRouteStore";
import Login from "./pages/Login";
import { useAuthStore } from "./store/useAuthStore";
import DashboardSkeleton from "./components/DashboardSkeleton";

const ProtectedRoute = () => {
  const user = useAuthStore((state) => state.user);
  console.log(user);
  if (user) return <Outlet />;
  return <Navigate to="/login" replace />;
};

const theme = createTheme({
  palette: {
    primary: {
      light: "#ecfdf5",
      main: "#10b981",
      dark: "#047857",
      contrastText: "#fff",
    },
    secondary: {
      light: "#f69a4b",
      main: "#F4811F",
      dark: "#aa5a15",
      contrastText: "#fff",
    },
  },
});


const router = createBrowserRouter(
  [
    {
      element: <ProtectedRoute />,
      children: [
        {
          element: <CMSLayout />,
          children: [{ path: "/cms/*", element: <CMS /> }],
        },
        { id: "dashboard", element: <AppLayout /> },
      ],
    },
    { path: "/login", element: <Login /> },
  ],
  {
    async unstable_patchRoutesOnMiss({ path, patch }) {
      if (!path.includes("cms")) {
        patch("dashboard", generateRoutes(useRouteStore.getState().routes));
      }
    },
  },
);

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} fallbackElement={<DashboardSkeleton />} />
    </ThemeProvider>
  );
}
