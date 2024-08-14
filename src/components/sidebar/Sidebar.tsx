import {
  useMediaQuery,
  List,
  Box,
  Drawer,
  Stack,
} from "@mui/material";
const SIDE_BAR_WIDTH = "260px";
import Logo from "../../assets/logo.svg";
interface ItemType {
  isSidebarOpen: boolean;
  onSidebarClose: (event: React.MouseEvent<HTMLElement>) => void;
}

import groupBy from "lodash/groupBy";
import { useRouteStore } from "../../store/useRouteStore";
import NavItem from "./NavItem";
import NavGroup from "./NavGroup";
import { useLocation } from "react-router-dom";

const NavItems = () => {
  const routes = useRouteStore((state) => state.routes);
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
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));

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
              pl={2}
              pt={3}
              pb={5}
              gap={1}
              direction="row"
              alignItems={"center"}
            >
              <img src={Logo} className="h-9" />
            </Stack>
            <Box>
              <Box sx={{ px: 3 }}>
                <NavItems />
              </Box>
            </Box>
          </Box>
        </Drawer>
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
