import { useReducer } from "react";
import kebabCase from "lodash/kebabCase";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PAGE_TYPES = ["Tempreture", "Franke", "Doors", "Others"];

const PageTypeSelector = ({
  type,
  onTypeChange,
}: {
  type: string;
  onTypeChange: any;
}) => {
  return (
    <Select onValueChange={onTypeChange} value={type}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select page section" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Page Section</SelectLabel>
          {PAGE_TYPES.map((name) => (
            <SelectItem key={name} value={name}>
              {name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
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
}: Readonly<IProps>) {
  const onSubmitClick = () => {
    const path = `/${kebabCase(state.type)}/${kebabCase(state.title)}`;
    onSubmit({ ...state, path });
  };

  const [state, dispatch] = useReducer(reducer, currentRoute || INIT_STATE);
  return (
    <Dialog open={isVisible} onOpenChange={onDismiss}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Page" : "Add a New Page"}</DialogTitle>
          <DialogDescription>
            Set a title for your page and choose the relevant type and Icon.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2 my-4">
          <div className="flex flex-col gap-2">
            <Label>Page Title</Label>
            <Input
              id="outlined-basic"
              value={state.title}
              onChange={({ target: { value } }) =>
                dispatch({ type: ACTION_TYPES.TITLE_CHANGED, payload: value })
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Page Section</Label>
            <PageTypeSelector
              type={state.type}
              onTypeChange={(value: string) =>
                dispatch({ type: ACTION_TYPES.TYPE_CHANGED, payload: value })
              }
            />
          </div> 
        </div>
        <Button onClick={onSubmitClick}>
          Submit
        </Button>
      </DialogContent>
    </Dialog>
  );
}
