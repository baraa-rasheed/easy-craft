import DropArea from "../../components/cms/DropArea";
import { useCallback, useEffect, useState } from "react";
import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { v4 as uuid } from "uuid";
import { LayoutGroup, motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router";
import { SIZES } from "../../constants";
import components from "../../components";
import { CMS_COMPONENTS, getElementProps, SIZE } from "../../types/cms";
import { useRouteStore } from "../../store/useRouteStore";
import CMSElement from "../../components/cms/CMSElement";
import { IElement, IRoute } from "../../types/routes";
import ElementFormModal from "../../components/cms/modals/ElementFormModal";
import Draggable from "../../components/cms/Dragable";
import { Button } from "@/components/ui/button";
import { DeleteIcon, Edit2Icon, TrashIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import ContentSection from "@/components/layout/content-section";

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
    <div className="flex items-center space-between">
      <div className="flex-1">
        <ContentSection
          title={title}
          description={`Manage ${title} with ease`}
        />
      </div>
      <div className="flex gap-3">
        <motion.div whileHover={{ rotate: "2deg", scale: 1.1 }}>
          <Button
            className="bg-sky-700 hover:bg-sky-600 text-white"
            onClick={onEdit}
          >
            <Edit2Icon />
          </Button>
        </motion.div>
        <motion.div whileHover={{ rotate: "-2deg", scale: 1.1 }}>
          <Button
            className="bg-destructive/70 hover:bg-destructive text-white"
            onClick={onDelete}
          >
            <TrashIcon />
          </Button>
        </motion.div>
        <motion.div whileHover={{ rotate: "2deg", scale: 1.1 }}>
          <Button onClick={onPublish}>Save & Publish</Button>
        </motion.div>
      </div>
    </div>
  );
};

const RenderElement = ({
  element,
  onSizeChange,
  onEditElement,
  onDeleteElement,
}: {
  element: IElement;
  onSizeChange: (_: SIZE) => void;
  onDeleteElement: (_: string) => void;
  onEditElement: (element: IElement) => void;
}) => {
  if (!element.element) return null;
  const Component = components[element.element];
  return (
    <div className={element.size}>
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
    </div>
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
      (route) => `/cms${route.path}` === locaiton.pathname
    );
    if (currentRoute) {
      setCurrentRoute(currentRoute);
      const elements = {} as IElementState;
      currentRoute.elements.forEach((element) => {
        elements[element.id] = element;
      });
      setElements(elements);
    } else console.log("oh oh /cms",routes,currentRoute);
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
              [id]: { children: [], size: "col-span-6", type: "Grid", id },
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
                size: "col-span-6",
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
              [id]: { id, size: "col-span-6", element: sourceId, props },
            };
          });
        }
      },
    });
  }, [elements]);

  const onPublish = useCallback(() => {
    try{

      if (!currentRoute) return;
      const newRoutes = [...routes];
      const routeIndex = newRoutes.findIndex(
        (route) => `/cms${route.path}` === locaiton.pathname
      );
      newRoutes[routeIndex] = {
        ...newRoutes[routeIndex],
        elements: Object.values(elements),
      };
      setRoutes(newRoutes);
      navigate(currentRoute?.path, { replace: true });
    }catch(e){
      console.log(e);
    }
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
      <div className="flex h-full overflow-scroll flex-col gap-4 px-12 py-8 my-8 rounded-lg bg-zinc-100 dark:bg-card/60 border">
        <Header
          title={currentRoute?.title}
          onPublish={onPublish}
          onDelete={
            currentRoute?.path !== "/"
              ? () => {
                  navigate("/", { replace: true });
                  setRoutes(
                    routes.filter((route) => route.path != currentRoute?.path)
                  );
                }
              : undefined
          }
          onEdit={() => null}
        />
        <div className="grid grid-cols-12 gap-3 w-full">
          {Object.values(elements).map((item) => {
            if (item.children)
              return (
                <div className="col-span-1" key={item.id}>
                  <div className="grid grid-cols-12 gap-4">
                    {item.children.map((child: IElement) => (
                      <RenderElement
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
                  </div>
                </div>
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
          <div className="relative col-span-full">
            <DropArea
              key={Object.values(elements).length}
              id={`${Object.values(elements).length + 1}`}
            />
          </div>
        </div>
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
    </div>
  );
}
