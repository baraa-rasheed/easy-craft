import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Grid,
  IconButton,
  ListItemButton,
  ListItemText,
  Modal,
  List,
  TextField,
  Typography,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useMemo, useReducer, useState } from "react";
import { IElement } from "../../../types/routes";
import { CMS_COMPONENTS } from "../../../types/cms";
import IconsAutoComplete from "../../shared/IconsAutoComplete";
import components from "../../../components";

const ACTION_TYPES = {
  PROP_CHANGED: "PROP_CHANGED",
  API_CHANGED: "API_CHANGED",
};

const reducer = (state: IElement, action: Record<string, any>): IElement => {
  switch (action.type) {
    case ACTION_TYPES.PROP_CHANGED:
      return {
        ...state,
        props: { ...(state?.props ?? {}), ...action.payload },
      };
    case ACTION_TYPES.API_CHANGED:
      return {
        ...state,
        api: { ...(state?.api ?? {}), ...action.payload },
      };
    default:
      throw Error("Unknown action: " + action.type);
  }
};

interface IProps {
  isVisible: boolean;
  onDismiss: () => void;
  element: IElement;
  onSubmit: (data: IElement) => void;
}

export default function ElementFormModal({
  element,
  isVisible,
  onDismiss,
  onSubmit,
}: IProps) {
  const [state, dispatch] = useReducer(reducer, element);

  const componentOptions = CMS_COMPONENTS?.[element?.element];

  const renderElement = useMemo(() => {
    const Element = components[element.element];
    return <Element {...state?.props} />;
  }, [element, state.props]);

  const onSubmitClick = () => onSubmit(state);

  return (
    <Modal open={isVisible} onClose={onDismiss}>
      <Box sx={style}>
        {!!componentOptions && (
          <>
            <Grid container>
              <Grid
                item
                xs={12}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Typography fontSize={22} fontWeight={"bold"} lineHeight={1.2}>
                  {`Edit Element`}
                </Typography>
                <IconButton onClick={onDismiss}>
                  <CloseIcon />
                </IconButton>
              </Grid>
              <Grid item xs={12}>
                <Typography style={{ color: "#475569" }} mt={2}>
                  From here you can set the element infomration that you need.
                  you can see the available options below
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={5}>
              <Grid item xs={8}>
                <Stack
                  spacing={1}
                  height={"100%"}
                  justifyContent={"space-between"}
                >
                  <Stack spacing={1}>
                    <Grid container spacing={2} alignItems={"center"}>
                      <Grid item xs={12}>
                        <Typography variant="h6">Properties</Typography>
                      </Grid>
                      {Object.values(componentOptions.props).map((prop) => {
                        if (prop.disableUserInteraction) return null;
                        return (
                          <Grid item xs={6} key={prop.key}>
                            {prop.type["icon"] ? (
                              <IconsAutoComplete
                                value={state?.props?.[prop.key] ?? ""}
                                onIconChange={(icon) =>
                                  dispatch({
                                    type: ACTION_TYPES.PROP_CHANGED,
                                    payload: { [prop.key]: icon },
                                  })
                                }
                              />
                            ) : (
                              <TextField
                                fullWidth
                                label={prop.type["textField"].label ?? ""}
                                type={prop.type["textField"]?.type}
                                variant="outlined"
                                value={state?.props?.[prop.key] ?? ""}
                                onChange={(e) =>
                                  dispatch({
                                    type: ACTION_TYPES.PROP_CHANGED,
                                    payload: { [prop.key]: e.target.value },
                                  })
                                }
                              />
                            )}
                          </Grid>
                        );
                      })}
                    </Grid>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        {!!Object.keys(componentOptions?.apis).length && (
                          <Typography variant="h6">Actions</Typography>
                        )}
                        <List
                          component="nav"
                          aria-label="secondary mailbox folder"
                        >
                          {Object.values(componentOptions?.apis).map((api) => {
                            return (
                              <ListItemButton
                                key={api.key}
                                selected={state?.api?.key === api.key}
                                onClick={() =>
                                  dispatch({
                                    type: ACTION_TYPES.API_CHANGED,
                                    payload: api,
                                  })
                                }
                              >
                                <ListItemText primary={api.title} />
                              </ListItemButton>
                            );
                          })}
                        </List>
                      </Grid>
                      <Grid item xs={6}>
                        {state?.api?.key && (
                          <Stack spacing={2}>
                            <>
                              <Typography variant="h6">Description</Typography>
                              <Typography>
                                {state.api.key?.description}
                              </Typography>
                            </>
                            {componentOptions.apis[state.api.key]?.data?.map(
                              (item) => {
                                return (
                                  <FormControl fullWidth key={item.label}>
                                    <InputLabel id="demo-simple-select-label">
                                      {item.label}
                                    </InputLabel>
                                    <Select
                                      value={state?.api?.data?.[item.key]}
                                      label={item.label}
                                      onChange={(e) => {
                                        dispatch({
                                          type: ACTION_TYPES.API_CHANGED,
                                          payload: {
                                            data: {
                                              ...state?.api?.data,
                                              [item.key]: e.target.value,
                                            },
                                          },
                                        });
                                      }}
                                    >
                                      {item.options.map((option) => {
                                        return (
                                          <MenuItem value={option.key}>
                                            {option.label}
                                          </MenuItem>
                                        );
                                      })}
                                    </Select>
                                  </FormControl>
                                );
                              },
                            )}
                          </Stack>
                        )}
                      </Grid>
                    </Grid>
                  </Stack>
                  <Button
                    size="large"
                    variant="contained"
                    onClick={onSubmitClick}
                  >
                    Save
                  </Button>
                </Stack>
              </Grid>
              <Grid item xs>
                <Stack
                  p={2}
                  spacing={3}
                  height={"100%"}
                  borderRadius={3}
                  bgcolor={"primary.light"}
                >
                  <p className="text-xl font-bold">Preview</p>
                  {renderElement}
                </Stack>
              </Grid>
            </Grid>
          </>
        )}
      </Box>
    </Modal>
  );
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1200,
  flex: 1,
  display: "flex",
  flexDirection: "column",
  bgcolor: "background.paper",
  borderRadius: 4,
  boxShadow: 24,
  p: 4,
  gap: 2.5,
};
