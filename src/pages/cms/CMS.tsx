import { Button, Grid, IconButton, Stack, Typography } from "@mui/material";
import DropArea from "../../components/cms/DropArea";
import { useCallback, useEffect, useState } from "react";
import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { v4 as uuid } from "uuid";
import { LayoutGroup, motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { SPACING, ELEMENT_HEIGHT, SIZES } from "../../constants";
import components from "../../components";
import { CMS_COMPONENTS, getElementProps, SIZE } from "../../types/cms";
import { useRouteStore } from "../../store/useRouteStore";
import CMSElement from "../../components/cms/CMSElement";
import { IElement, IRoute } from "../../types/routes";
import ElementFormModal from "../../components/cms/modals/ElementFormModal";
import Draggable from "../../components/cms/Dragable";
import { authApis } from "../../apis/auth";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

type IElementState = {
  [id: string]: IElement;
};

const Header = ({
  title,
  onPublish,
  onDelete,
  onEdit,
}: {
  onEdit: () => void;
  onDelete?: () => void;
  onPublish: () => void;
  title: string | undefined;
}) => {
  return (
    <Stack
      gap={3}
      direction={"row"}
      alignItems="center"
      justifyContent={"space-between"}
    >
      <Typography variant="h5" fontWeight={"500"}>
        {title}
      </Typography>
      <div className="flex gap-3">
        <motion.div whileHover={{ rotate: "2deg", scale: 1.1 }}>
          <Button variant="contained" onClick={onPublish}>
            <Typography variant="button">Save & Publish</Typography>
          </Button>
        </motion.div>
        <motion.div whileHover={{ rotate: "2deg", scale: 1.1 }}>
          <IconButton color="info" onClick={onEdit}>
            <EditIcon />
          </IconButton>
        </motion.div>
        {onDelete && (
          <motion.div whileHover={{ rotate: "-2deg", scale: 1.1 }}>
            <IconButton color="error" onClick={onDelete}>
              <DeleteIcon />
            </IconButton>
          </motion.div>
        )}
      </div>
    </Stack>
  );
};

const RenderElement = ({
  height,
  element,
  onSizeChange,
  onEditElement,
  onDeleteElement,
}: {
  height?: string;
  element: IElement;
  onSizeChange: (_: SIZE) => void;
  onDeleteElement: (_: string) => void;
  onEditElement: (element: IElement) => void;
}) => {
  if (!element.element) return null;
  const Component = components[element.element];
  return (
    <Grid item xs={SIZES[element.size]}>
      <CMSElement
        size={element.size}
        onSizeChange={onSizeChange}
        onEdit={() => onEditElement(element)}
        onDelete={() => onDeleteElement(element.id)}
      >
        <Draggable id={element.id}>
          <Component {...element.props} />
          <DropArea
            id={element.id}
            style={{ height: "100%" }}
            title="Drop here to replace element"
          />
        </Draggable>
      </CMSElement>
    </Grid>
  );
};

export default function CMS() {
  const navigate = useNavigate();
  const locaiton = useLocation();
  const { routes, setRoutes } = useRouteStore();
  const [currentRoute, setCurrentRoute] = useState<IRoute | null>(null);
  const [selectedElement, setSelectedElement] = useState<IElement | null>(null);
  const [elements, setElements] = useState<IElementState>({});

  useEffect(() => {
    const currentRoute = routes.find(
      (route) => `/cms${route.path}` === locaiton.pathname,
    );
    if (currentRoute) {
      setCurrentRoute(currentRoute);
      const elements = {} as IElementState;
      currentRoute.elements.forEach((element) => {
        elements[element.id] = element;
      });
      setElements(elements);
    } else navigate("/cms");
  }, [routes, navigate, locaiton]);

  useEffect(() => {
    return monitorForElements({
      onDrop({ source, location }) {
        const destination = location.current.dropTargets[0];
        if (!destination) return;

        const destinationId = destination.data.id as string;
        const sourceId = source.data.id as keyof typeof components | "Panel";

        if (!destinationId || !sourceId) return;

        const id = uuid();

        if (elements[sourceId] && elements[destinationId]) {
          return setElements((e) => {
            const temp = e[destinationId];
            e[destinationId] = { ...e[sourceId], id: destinationId };
            e[sourceId] = { ...temp, id: sourceId };
            return { ...e };
          });
        }

        if (elements[sourceId]) {
          return setElements((e) => {
            return {
              ...e,
              [id]: { ...elements[sourceId], id },
            };
          });
        }

        if (sourceId === "Panel") {
          setElements((e) => {
            return {
              ...e,
              [id]: { children: [], size: "medium", type: "Grid", id },
            };
          });
        } else {
          const props = getElementProps(CMS_COMPONENTS[sourceId].props);
          if (elements[destinationId]) {
            const newElements = { ...elements };
            if (elements[destinationId].children) {
              newElements[destinationId]?.children?.push({
                id,
                props,
                size: "medium",
                element: sourceId,
              });
            } else {
              newElements[destinationId] = {
                props,
                id: destinationId,
                element: sourceId,
                size: newElements[destinationId].size,
              };
            }
            return setElements(newElements);
          }
          setElements((e) => {
            return {
              ...e,
              [id]: { id, size: "medium", element: sourceId, props },
            };
          });
        }
      },
    });
  }, [elements]);

  const onPublish = useCallback(() => {
    if (!currentRoute) return;
    const newRoutes = [...routes];
    const routeIndex = newRoutes.findIndex(
      (route) => `/cms${route.path}` === locaiton.pathname,
    );
    newRoutes[routeIndex] = {
      ...newRoutes[routeIndex],
      elements: Object.values(elements),
    };
    setRoutes(newRoutes);
    navigate(currentRoute?.path, { replace: true });
  }, [locaiton, currentRoute, routes, navigate, setRoutes, elements]);

  const onElementSizeChange = (element: IElement, size: SIZE) => {
    setElements((e) => {
      const newElements = { ...e };
      newElements[element.id] = { ...newElements[element.id], size };
      return newElements;
    });
  };

  const onDeleteElement = (elementId: string) => {
    setElements((e) => {
      const newElements = { ...e };
      delete newElements[elementId];
      return newElements;
    });
  };

  return (
    <Stack gap={3}>
      <Header
        title={currentRoute?.title}
        onPublish={onPublish}
        onDelete={
          currentRoute?.path !== "/"
            ? () => {
                setRoutes(
                  routes.filter((route) => route.path != currentRoute?.path),
                );
                navigate("/", { replace: true });
              }
            : undefined
        }
        onEdit={() => null}
      />
      <LayoutGroup>
        <Grid container spacing={SPACING} position={"relative"}>
          {Object.values(elements).map((item) => {
            if (item.children)
              return (
                <Grid
                  key={item.id}
                  item
                  xs={6}
                  position="relative"
                  minHeight={200}
                  bgcolor={"primary.light"}
                >
                  <Grid item container position="relative" spacing={SPACING}>
                    {item.children.map((child: IElement) => (
                      <RenderElement
                        height="auto"
                        key={child.id}
                        element={child}
                        onDeleteElement={onDeleteElement}
                        onSizeChange={(size) =>
                          onElementSizeChange(child, size)
                        }
                        onEditElement={(element) => setSelectedElement(element)}
                      />
                    ))}
                    <DropArea id={item.id} />
                  </Grid>
                </Grid>
              );
            return (
              <RenderElement
                key={item.id}
                element={item}
                onDeleteElement={onDeleteElement}
                onSizeChange={(size) => onElementSizeChange(item, size)}
                onEditElement={(element) => setSelectedElement(element)}
              />
            );
          })}
          <Grid item xs position={"relative"}>
            <DropArea
              key={Object.values(elements).length}
              id={`${Object.values(elements).length + 1}`}
            />
          </Grid>
        </Grid>
      </LayoutGroup>
      {selectedElement && (
        <ElementFormModal
          onSubmit={(element) => {
            setSelectedElement(null);
            setElements((e) => {
              return {
                ...e,
                [element.id]: { ...element },
              };
            });
          }}
          element={selectedElement}
          isVisible={!!selectedElement}
          onDismiss={() => setSelectedElement(null)}
        />
      )}
    </Stack>
  );
}
