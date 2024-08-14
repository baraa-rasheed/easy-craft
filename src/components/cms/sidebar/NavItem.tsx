import {
  ListItemIcon,
  ListItem,
  List,
  styled,
  ListItemText,
  useTheme,
  ListItemButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import * as Icons from "@mui/icons-material";
type NavGroup = {
  [x: string]: any;
  id?: number;
  navlabel?: boolean;
  subheader?: string;
  title?: string;
  path?: any;
};

interface ItemType {
  item: NavGroup;
  hideMenu?: any;
  level?: number | any;
  pathDirect: string;
}

const NavIcon = ({ icon }: { icon: keyof typeof Icons }) => {
  const Icon = Icons[icon];
  return <Icon />;
};

const NavItem = ({ item, level, pathDirect }: ItemType) => {
  const theme = useTheme();
  const ListItemStyled = styled(ListItem)(() => ({
    padding: 0,
    ".MuiButtonBase-root": {
      whiteSpace: "nowrap",
      marginBottom: "2px",
      padding: "6px 8px",
      borderRadius: "8px",
      backgroundColor: level > 1 ? "transparent !important" : "inherit",
      color: theme.palette.text.secondary,
      paddingLeft: "10px",
      "&:hover": {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.primary.main,
      },
      "&.Mui-selected": {
        color: "white",
        backgroundColor: theme.palette.primary.main,
        "&:hover": {
          backgroundColor: theme.palette.primary.main,
          color: "white",
        },
      },
    },
  }));

  return (
    <List component="div" disablePadding key={item.id}>
      <ListItemStyled>
        <ListItemButton
          component={Link}
          to={`/cms${item.path}`}
          disabled={item.disabled}
          selected={pathDirect === `/cms${item.path}`}
          target={item.external ? "_blank" : ""}
        >
          <ListItemIcon
            sx={{
              minWidth: "36px",
              p: "3px 0",
              color: "inherit",
            }}
          >
            {item.icon && <NavIcon icon={item.icon} />}
          </ListItemIcon>
          <ListItemText>{item.title}</ListItemText>
        </ListItemButton>
      </ListItemStyled>
    </List>
  );
};

export default NavItem;
