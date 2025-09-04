import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  Outlet,
} from "react-router";
import CMS from "./pages/cms/CMS";
import CMSLayout from "./layouts/CMSLayout";
import AppLayout from "./layouts/AppLayout";
import { generateRoutes } from "./routes/router";
import { useRouteStore } from "./store/useRouteStore";
import Login from "./pages/Login";
import { useAuthStore } from "./store/useAuthStore";
import { ThemeProvider } from "./context/theme-context";

const ProtectedRoute = () => {
  const user = useAuthStore((state) => state.user);
  if (user) return <Outlet />;
  return <Navigate to="/login" replace />;
};

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
    basename: "/easy-craft",
    async patchRoutesOnNavigation({ path, patch }) {
      if (!path.includes("cms")) {
        patch("dashboard", generateRoutes(useRouteStore.getState().routes));
      }
    },
  }
);

export default function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
