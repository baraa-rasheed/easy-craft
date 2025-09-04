import * as React from "react";
import { useMemo, useReducer } from "react";
import components from "../../../components";
// --- Types (adapt to your own app types if available) ---
export interface CMSPropDef {
  key: string;
  label?: string;
  description?: string;
  disableUserInteraction?: boolean;
  type?: {
    textField?: { type?: string; placeholder?: string };
    textarea?: { placeholder?: string; rows?: number };
    number?: { min?: number; max?: number; step?: number };
    boolean?: {};
    icon?: {};
    select?: { options: Array<{ key: string; label: string }> };
  };
}

export interface CMSApiParamDef {
  key: string;
  label: string;
  options: Array<{ key: string; label: string }>;
}

export interface CMSApiDef {
  key: string;
  title: string;
  description?: string;
  data?: CMSApiParamDef[];
}

export interface CMSComponentOptions {
  props: Record<string, CMSPropDef>;
  apis: Record<string, CMSApiDef>;
}

export interface IElement {
  element: string;
  props?: Record<string, any>;
  api?: {
    key?: string; // api key chosen
    data?: Record<string, any>; // param values
  };
}

// Expect these to be provided by your app. Keeping import lines as comments for clarity.
// import { IElement } from "../../../types/routes";
// import { CMS_COMPONENTS } from "../../../types/cms";
// import components from "../../../components";

// Replace the above with props to make the component self-contained & testable.
interface ExternalDeps {
  CMS_COMPONENTS: Record<string, CMSComponentOptions>;
  components: Record<string, React.ComponentType<any>>;
}

// --- UI (shadcn) ---
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CMS_COMPONENTS } from "@/types/cms";

// Optional: your own icon autocomplete component if present in your codebase
// import IconsAutoComplete from "../../shared/IconsAutoComplete";

// --- Reducer ---
const ACTION_TYPES = {
  PROP_CHANGED: "PROP_CHANGED",
  API_CHANGED: "API_CHANGED",
  RESET: "RESET",
} as const;

type Action =
  | { type: typeof ACTION_TYPES.PROP_CHANGED; payload: Record<string, any> }
  | { type: typeof ACTION_TYPES.API_CHANGED; payload: { key?: string; data?: Record<string, any> } }
  | { type: typeof ACTION_TYPES.RESET; payload: IElement };

function reducer(state: IElement, action: Action): IElement {
  switch (action.type) {
    case ACTION_TYPES.PROP_CHANGED:
      return { ...state, props: { ...(state.props ?? {}), ...action.payload } };
    case ACTION_TYPES.API_CHANGED: {
      // If key is changing, drop previous api.data unless explicitly provided
      const nextApi = {
        ...(state.api ?? {}),
        ...action.payload,
      };
      return { ...state, api: nextApi };
    }
    case ACTION_TYPES.RESET:
      return action.payload;
    default:
      return state;
  }
}

// --- Helpers ---
function classNames(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(" ");
}

// Field renderer for props
function PropertyField({
  def,
  value,
  onChange,
}: {
  def: CMSPropDef;
  value: any;
  onChange: (next: any) => void;
}) {
  if (def.disableUserInteraction) return null;
  const label = def.label ?? def.key;

  // Select (enum) support
  if (def.type?.select) {
    return (
      <div className="space-y-2">
        <Label htmlFor={def.key}>{label}</Label>
        <Select value={value ?? ""} onValueChange={(v) => onChange(v)}>
          <SelectTrigger id={def.key} className="w-full">
            <SelectValue placeholder={`Select ${label}`} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>{label}</SelectLabel>
              {def.type.select.options.map((opt) => (
                <SelectItem key={opt.key} value={opt.key}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {def.description && (
          <p className="text-xs text-muted-foreground">{def.description}</p>
        )}
      </div>
    );
  }

  // Boolean -> Switch
  if (def.type?.boolean) {
    return (
      <div className="flex items-center justify-between gap-4 rounded-xl border p-3">
        <div className="space-y-1">
          <Label htmlFor={def.key}>{label}</Label>
          {def.description && (
            <p className="text-xs text-muted-foreground">{def.description}</p>
          )}
        </div>
        <Switch id={def.key} checked={!!value} onCheckedChange={onChange} />
      </div>
    );
  }

  // Icon picker (if you have one)
  // if (def.type?.icon) {
  //   return (
  //     <div className="space-y-2">
  //       <Label htmlFor={def.key}>{label}</Label>
  //       <IconsAutoComplete
  //         id={def.key}
  //         value={value}
  //         onChange={onChange}
  //         placeholder={def.type.textField?.placeholder ?? `Choose ${label}`}
  //       />
  //       {def.description && (
  //         <p className="text-xs text-muted-foreground">{def.description}</p>
  //       )}
  //     </div>
  //   );
  // }

  // Multiline
  if (def.type?.textarea) {
    return (
      <div className="space-y-2">
        <Label htmlFor={def.key}>{label}</Label>
        <Textarea
          id={def.key}
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          rows={def.type.textarea.rows ?? 4}
          placeholder={def.type.textarea.placeholder}
        />
        {def.description && (
          <p className="text-xs text-muted-foreground">{def.description}</p>
        )}
      </div>
    );
  }

  // Number
  if (def.type?.number) {
    return (
      <div className="space-y-2">
        <Label htmlFor={def.key} className="capitalize">{label}</Label>
        <Input
          id={def.key}
          type="number"
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value === "" ? "" : Number(e.target.value))}
          min={def.type.number.min}
          max={def.type.number.max}
          step={def.type.number.step}
          placeholder={def.type.textField?.placeholder}
        />
        {def.description && (
          <p className="text-xs text-muted-foreground">{def.description}</p>
        )}
      </div>
    );
  }

  // Default -> text input
  return (
    <div className="space-y-2">
      <Label htmlFor={def.key} className="capitalize">{label}</Label>
      <Input
        id={def.key}
        type={def.type?.textField?.type ?? "text"}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={def.type?.textField?.placeholder}
      />
      {def.description && (
        <p className="text-xs text-muted-foreground">{def.description}</p>
      )}
    </div>
  );
}

function ApiConfigurator({
  apis,
  value,
  onChange,
}: {
  apis: Record<string, CMSApiDef>;
  value?: { key?: string; data?: Record<string, any> };
  onChange: (next: { key?: string; data?: Record<string, any> }) => void;
}) {
  const selected = value?.key ? apis[value.key] : undefined;

  return (
    <div className="space-y-4">
      {!!Object.keys(apis ?? {}).length && (
        <div className="space-y-2">
          <Label>Actions</Label>
          <Select
            value={value?.key ?? ""}
            onValueChange={(apiKey) => onChange({ key: apiKey, data: {} })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select loader function" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Component loaders</SelectLabel>
                {Object.values(apis).map((api) => (
                  <SelectItem key={api.key} value={api.key}>
                    {api.title}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      )}

      {selected && (
        <div className="space-y-3 rounded-xl border p-3">
          {selected.description && (
            <p className="text-sm text-muted-foreground">{selected.description}</p>
          )}

          {(selected.data ?? []).map((param) => (
            <div className="space-y-2" key={param.key}>
              <Label htmlFor={`api-${param.key}`}>{param.label}</Label>
              <Select
                value={value?.data?.[param.key] ?? ""}
                onValueChange={(v) =>
                  onChange({
                    key: selected.key,
                    data: { ...(value?.data ?? {}), [param.key]: v },
                  })
                }
              >
                <SelectTrigger id={`api-${param.key}`} className="w-full">
                  <SelectValue placeholder={`Select ${param.label}`} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>{param.label}</SelectLabel>
                    {param.options.map((opt) => (
                      <SelectItem key={opt.key} value={opt.key}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// --- Main component ---
interface ElementFormModalProps extends ExternalDeps {
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
}: Readonly<ElementFormModalProps>) {
  const [state, dispatch] = useReducer(reducer, element);

  // Keep reducer in sync when an external element changes
  React.useEffect(() => {
    dispatch({ type: ACTION_TYPES.RESET, payload: element });
  }, [element.element]);

  const componentOptions = CMS_COMPONENTS?.[element?.element];

  const renderElement = useMemo(() => {
    const Element = components[element.element];
    if (!Element) return null;
    return <Element {...(state?.props ?? {})} />;
  }, [element.element, state?.props, components]);

  const handleSubmit = () => onSubmit(state);

  return (
    <Dialog open={isVisible} onOpenChange={onDismiss}>
      <DialogContent className="sm:max-w-4xl lg:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Edit Element</DialogTitle>
          <DialogDescription>
            Configure the element properties and optional loader actions. A live
            preview is shown on the right.
          </DialogDescription>
        </DialogHeader>

        {!!componentOptions && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Left: Controls */}
            <div className="space-y-6">
              {/* Properties */}
              <section className="space-y-3">
                <h3 className="text-sm font-medium tracking-tight">Properties</h3>
                <ScrollArea className="">
                  <div className="grid grid-cols-1 gap-4 m-4 md:grid-cols-2">
                    {Object.values(componentOptions.props).map((prop) => (
                      <PropertyField
                        key={prop.key}
                        def={prop}
                        value={state?.props?.[prop.key]}
                        onChange={(next) =>
                          dispatch({
                            type: ACTION_TYPES.PROP_CHANGED,
                            payload: { [prop.key]: next },
                          })
                        }
                      />
                    ))}
                  </div>
                </ScrollArea>
              </section>

              {/* Actions / API */}
              <section className="space-y-3">
                <ApiConfigurator
                  apis={componentOptions.apis}
                  value={state.api}
                  onChange={(next) =>
                    dispatch({ type: ACTION_TYPES.API_CHANGED, payload: next })
                  }
                />
              </section>

              <div className="flex justify-end gap-2">
                <Button variant="secondary" onClick={onDismiss} type="button">
                  Cancel
                </Button>
                <Button onClick={handleSubmit} type="button">
                  Save
                </Button>
              </div>
            </div>

            {/* Right: Preview */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium tracking-tight">Preview</h3>
              <div className={classNames(
                "rounded-2xl",
                !renderElement && "text-muted-foreground"
              )}>
                {renderElement || <p>No preview available for this element.</p>}
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
