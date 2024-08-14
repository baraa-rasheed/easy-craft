import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { useReducer } from "react";
import kebabCase from "lodash/kebabCase";
import IconsAutoComplete from "../../shared/IconsAutoComplete";

const PAGE_TYPES = ["Tempreture", "Franke", "Doors", "Others"];

const PageTypeSelector = ({ type, onTypeChange }:{type:string,onTypeChange:any}) => {
  const handleChange = (e: SelectChangeEvent) => onTypeChange(e.target.value);
  return (
    <FormControl fullWidth>
      <InputLabel id="demo-multiple-name-label">Page Section</InputLabel>
      <Select
        value={type}
        onChange={handleChange}
        input={<OutlinedInput label="Page Section" />}
      >
        {PAGE_TYPES.map((name) => (
          <MenuItem key={name} value={name}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

const ACTION_TYPES = {
  ICON_CHANGED: "ICON_CHANGED",
  TYPE_CHANGED: "TYPE_CHANGED",
  TITLE_CHANGED: "TITLE_CHANGED",
};

const reducer = (state: IRoute, action: { type: string; payload: string }) => {
  switch (action.type) {
    case ACTION_TYPES.TITLE_CHANGED:
      return { ...state, title: action.payload };
    case ACTION_TYPES.TYPE_CHANGED:
      return { ...state, type: action.payload };
    case ACTION_TYPES.ICON_CHANGED:
      return { ...state, icon: action.payload };
    default:
      throw Error("Unknown action: " + action.type);
  }
};

interface IRoute {
  title: string;
  type: string;
  icon: string;
  path: string;
}

const INIT_STATE = {
  title: "",
  type: "",
  icon: "",
  path: "",
};

interface IProps {
  isEdit?: boolean;
  currentRoute?: IRoute;
  isVisible: boolean;
  onDismiss: () => void;
  onSubmit: (data: IRoute) => void;
}

export default function RouteFormModal({
  isEdit,
  currentRoute,
  isVisible,
  onDismiss,
  onSubmit,
}: IProps) {
  const onSubmitClick = () => {
    const path = `/${kebabCase(state.type)}/${kebabCase(state.title)}`;
    onSubmit({ ...state, path });
  };

  const [state, dispatch] = useReducer(reducer, currentRoute || INIT_STATE);
  return (
    <Modal open={isVisible} onClose={onDismiss}>
      <Box sx={style}>
        <Grid container>
          <Grid
            item
            xs={12}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Typography fontSize={20} fontWeight={"bold"} lineHeight={1.2}>
              {isEdit ? "Edit Page" : "Add a New Page"}
            </Typography>
            <IconButton onClick={onDismiss}>
              <CloseIcon />
            </IconButton>
          </Grid>
          <Grid item xs={12}>
            <Typography style={{ color: "#475569" }} mt={2}>
              Set a title for your page and choose the relevant type and Icon.
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2} alignItems={"center"} mb={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="outlined-basic"
              label={`Page Title`}
              variant="outlined"
              value={state.title}
              onChange={(e) =>
                dispatch({
                  type: ACTION_TYPES.TITLE_CHANGED,
                  payload: e.target.value,
                })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <PageTypeSelector
              type={state.type}
              onTypeChange={(value: string) =>
                dispatch({ type: ACTION_TYPES.TYPE_CHANGED, payload: value })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <IconsAutoComplete
              iconName={state.icon}
              onIconChange={(icon) =>
                dispatch({ type: ACTION_TYPES.ICON_CHANGED, payload: icon })
              }
            />
          </Grid>
        </Grid>
        <Button
          size="large"
          variant="contained"
          onClick={onSubmitClick}
          style={{ borderRadius: 100 }}
        >
          Submit
        </Button>
      </Box>
    </Modal>
  );
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  flex: 1,
  display: "flex",
  flexDirection: "column",
  bgcolor: "background.paper",
  borderRadius: 4,
  boxShadow: 24,
  p: 4,
  gap: 2.5,
};
