import { Box, Drawer, Stack, Typography } from "@mui/material";
import Logo from "../../assets/logo.svg";
import Draggable from "./Dragable";
import { CMS_COMPONENTS, getElementProps } from "../../types/cms";
const SIDE_BAR_WIDTH = "370px";
import components from "../../components";
import Panel from "../Panel";
type IComponentKey = keyof typeof components;

const ComponentsList = () => {
  return Object.keys(CMS_COMPONENTS).map((componentKey) => {
    const currentComponent = CMS_COMPONENTS[componentKey as IComponentKey];
    const CmsComponent = components[componentKey as IComponentKey];
    return (
      <Draggable key={componentKey} id={componentKey}>
        <CmsComponent {...getElementProps(currentComponent.props)} />
      </Draggable>
    );
  });
};

const CMSPanel = () => {
  return (
    <Box sx={{ width: SIDE_BAR_WIDTH, flexShrink: 0 }}>
      <Drawer
        open={true}
        anchor="right"
        variant="permanent"
        PaperProps={{ sx: { width: SIDE_BAR_WIDTH } }}
      >
        <Box sx={{ height: "100%" }}>
          <Box
            p={3}
            gap={1}
            display="flex"
            alignItems={"center"}
            flexDirection={"column"}
          >
            <img src={Logo} width={174} />
            <Typography>Dashboard Components </Typography>
          </Box>
          <Stack m={4} gap={2}>
            <ComponentsList />
          </Stack>
        </Box>
      </Drawer>
    </Box>
  );
};

export default CMSPanel;
