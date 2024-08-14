import {
  useMediaQuery,
  List,
  Box,
  Drawer,
  Typography,
  Stack,
  Fab,
} from "@mui/material";
import Logo from "../../../assets/logo.svg";
const SIDE_BAR_WIDTH = "280px";
import * as Icons from "@mui/icons-material";
import { motion } from "framer-motion";
interface ItemType {
  isSidebarOpen: boolean;
  onSidebarClose: (event: React.MouseEvent<HTMLElement>) => void;
}

import NavItem from "./NavItem";
import NavGroup from "./NavGroup";
import { useLocation, useRoutes } from "react-router-dom";
import RouteFormModal from "../modals/RouteFormModal";
import { useState } from "react";
import groupBy from "lodash/groupBy";
import { IRoute } from "../../../types/routes";
import { useRouteStore } from "../../../store/useRouteStore";

const NavItems = ({ routes }: { routes: Array<any> }) => {
  const location = useLocation();
  const data = groupBy(routes, (r) => r.type);
  return (
    <List sx={{ pt: 0 }} className="sidebarNav" component="div">
      {Object.values(data).map((routes) => {
        const list = [];
        if (routes[0].type)
          list.push(<NavGroup item={routes[0].type} key={routes[0].type} />);
        return list.concat(
          routes.map((item) => {
            return (
              <NavItem
                item={item}
                key={item.path}
                pathDirect={location.pathname}
              />
            );
          }),
        );
      })}
    </List>
  );
};

const Sidebar = ({ onSidebarClose, isSidebarOpen }: ItemType) => {
  const { routes, setRoutes } = useRouteStore();

  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));
  const [isRouteModalVisible, setisRouteModalVisible] = useState(false);
  if (lgUp) {
    return (
      <Box sx={{ width: SIDE_BAR_WIDTH, flexShrink: 0 }}>
        <Drawer
          anchor="left"
          open={isSidebarOpen}
          variant="permanent"
          PaperProps={{
            sx: { width: SIDE_BAR_WIDTH, boxSizing: "border-box" },
          }}
        >
          <Box sx={{ height: "100%" }}>
            <Stack
              p={2}
              gap={1}
              direction="column"
              alignItems={"center"}
              justifyContent={"center"}
            >
              <img src={Logo} width={174} />
              <Typography variant="body2">(Craft Mode)</Typography>
            </Stack>
            <Box>
              <Box sx={{ px: 3 }}>
                <NavItems routes={routes} />
              </Box>
            </Box>
          </Box>
          <Box position={"absolute"} bottom={20} right={20}>
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
              <Fab
                color={"primary"}
                aria-label={"add-route"}
                onClick={() => setisRouteModalVisible(true)}
              >
                <Icons.Add />
              </Fab>
            </motion.div>
          </Box>
        </Drawer>
        <RouteFormModal
          isVisible={isRouteModalVisible}
          onDismiss={() => setisRouteModalVisible(false)}
          onSubmit={(route) => {
            setisRouteModalVisible(false);
            setRoutes([...routes, { ...route, elements: [] }]);
          }}
        />
      </Box>
    );
  }

  return (
    <Drawer
      anchor="left"
      variant="temporary"
      open={isSidebarOpen}
      onClose={onSidebarClose}
      PaperProps={{
        sx: { width: SIDE_BAR_WIDTH, boxShadow: (theme) => theme.shadows[8] },
      }}
    >
      <Box px={2}>
        <img src={Logo} />
        <Box>
          <NavItems />
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
