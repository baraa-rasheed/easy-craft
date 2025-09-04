import { create } from "zustand";
import { IRoute } from "../types/routes";
import { createJSONStorage, persist } from "zustand/middleware";

const INIT_ROUTES = [
  {
    title: "Dashboard",
    path: "/",
    icon: "",
    elements: [],
  },
  {
    title: "Store insights",
    path: "/insights/tempreture",
    type: "Tempreture",
    icon: "",
    elements: [],
  },
  {
    title: "Tempreture Logs",
    path: "/temp-logs",
    type: "Tempreture",
    icon: "",
    elements: [],
  },
  {
    title: "Tempreture Metrics",
    path: "/temp-metrics",
    type: "Tempreture",
    icon: "",
    elements: [],
  },
  {
    title: "Store Insights",
    path: "/store-insights/franke",
    type: "Franke",
    icon: "",
    elements: [],
  },
  {
    title: "Comparison Charts",
    path: "/insights/franke",
    type: "Franke",
    icon: "",
    elements: [],
  },
  {
    title: "Store Insights",
    path: "/store-insights/doors",
    type: "Doors",
    icon: "",
    elements: [],
  },
  {
    title: "Door Metrics",
    path: "/door-metrics",
    type: "Doors",
    icon: "",
    elements: [],
  },
  {
    title: "Co2 Levels",
    type: "Others",
    path: "/co2-levels",
    icon: "",
    elements: [],
  },
  {
    title: "Error Codes",
    type: "Others",
    path: "/error-codes",
    icon: "",
    elements: [],
  },
  {
    title: "Tickets",
    type: "Others",
    path: "/tickets",
    icon: "",
    elements: [],
  },
];

interface RouteState {
  routes: Array<IRoute>;
  setRoutes: (routes: Array<IRoute>) => void;
}

export const useRouteStore = create<RouteState>()(
  persist(
    (set) => ({
      routes: INIT_ROUTES,
      setRoutes: (routes) => set({ routes }),
    }),
    {
      name: "routes-storage",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
