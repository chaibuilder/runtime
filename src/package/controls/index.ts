import { get, omit } from "lodash-es";
import { Code } from "./Code.ts";

const STYLES_KEY = "#styles:";

export { Code, STYLES_KEY };

export interface ControlDefinition {
  default?: any;
  hidden?: boolean;
  binding?: boolean;
  itemProperties?: { [key: string]: ControlDefinition };
  properties?: { [key: string]: ControlDefinition };
  required?: boolean;
  schema: any;
  ai?: boolean;
  i18n?: boolean;
  type: "slots" | "singular" | "list" | "model" | "styles";
  uiSchema: any;
}

export interface StylesControlDefinition {
  default: any;
  type: string;
}

export interface ModelControlDefinition {
  default: any;
  properties: { [key: string]: ControlDefinition | ModelControlDefinition | ListControlDefinition };
  title: string;
  type: string;
}

export interface SlotControlDefinition {
  count: number;
  styles: string;
  type: string;
}

export type ChaiControlDefinition =
  | ControlDefinition
  | SlotControlDefinition
  | StylesControlDefinition
  | ModelControlDefinition
  | ListControlDefinition;

export interface ListControlDefinition {
  default: any;
  itemProperties: { [key: string]: ControlDefinition | ModelControlDefinition };
  itemTitle?: () => string;
  title: string;
  type: string;
}

export type ControlProps = {
  [key: string]: any;
  hidden?: boolean;
  default?: any;
  binding?: boolean;
  description?: string;
  required?: boolean;
  title: string;
  ai?: boolean;
};

type InputProps = ControlProps & {
  format?: "email" | "uri" | "data-url";
};

/**
 * Info control
 * @param props
 * @constructor
 */
export const InfoField = (props: ControlProps) =>
  ({
    type: "singular",
    default: "",
    uiSchema: {},
    hidden: get(props, "hidden", false),
    binding: get(props, "binding", true),
    dataType: "string",
    schema: {
      type: "null",
      default: "null",
      ...omit(props, ["i18n", "ai", "required"]),
    },
  }) as ControlDefinition;

/**
 * Input control
 * @param props
 * @constructor
 */
export const SingleLineText = (props: InputProps) =>
  ({
    type: "singular",
    default: props.default || "",
    hidden: get(props, "hidden", false),
    binding: get(props, "binding", true),
    dataType: "string",
    required: props.required || false,
    ai: props.ai || false,
    i18n: props.i18n || false,
    schema: {
      type: "string",
      ...omit(props, ["ai", "required"]),
    },
    uiSchema: {
      "ui:placeholder": props.placeholder || "Enter here",
    },
  }) as ControlDefinition;

type TextAreaProps = ControlProps & {
  rows?: number;
};

/**
 * TextArea control
 * @param props
 * @constructor
 */
export const MultilineText = (props: TextAreaProps) =>
  ({
    type: "singular",
    default: props.default || "",
    hidden: get(props, "hidden", false),
    binding: get(props, "binding", true),
    dataType: "string",
    required: props.required || false,
    ai: props.ai || false,
    i18n: props.i18n || false,
    schema: {
      type: "string",
      ...omit(props, ["i18n", "ai", "required", "rows"]),
    },
    uiSchema: {
      "ui:widget": "textarea",
      "ui:placeholder": props.placeholder || "Enter here",
      "ui:options": {
        rows: props.rows || 4,
      },
    },
  }) as ControlDefinition;

type CheckboxProps = ControlProps;

/**
 * Checkbox control
 * @param props
 * @constructor
 */
export const Checkbox = (props: CheckboxProps) =>
  ({
    type: "singular",
    i18n: props.i18n || false,
    default: props.default || false,
    dataType: "boolean",
    hidden: get(props, "hidden", false),
    binding: get(props, "binding", true),
    ai: props.ai || false,
    schema: {
      type: "boolean",
      ...omit(props, ["i18n", "ai", "required"]),
    },
    uiSchema: {
      "ui:title": props.title || "Select Item",
      "ui:description": "",
    },
  }) as ControlDefinition;

type NumberProps = ControlProps & {
  enum?: number[];
  maximum?: number;
  minimum?: number;
  multipleOf?: number;
  default?: number | string;
};
export const Numeric = (props: NumberProps) =>
  ({
    type: "singular",
    default: props.default || "",
    hidden: get(props, "hidden", false),
    binding: get(props, "binding", true),
    dataType: "number",
    required: props.required || false,
    ai: props.ai || false,
    i18n: props.i18n || false,
    schema: {
      type: "number",
      ...omit(props, ["i18n", "ai", "required"]),
    },
    uiSchema: {},
  }) as ControlDefinition;

type SelectProps = ControlProps & {
  options: { title: string; value: string }[];
  widget?: "select";
};
export const SelectOption = (props: SelectProps) =>
  ({
    type: "singular",
    default: props.default || "",
    hidden: get(props, "hidden", false),
    binding: get(props, "binding", true),
    required: props.required || false,
    dataType: "string",
    ai: props.ai || false,
    i18n: props.i18n || false,
    schema: {
      type: "string",
      ...omit(props, ["i18n", "ai", "required", "options", "binding"]),
      oneOf: props.options.map((option) => ({ const: option.value, title: option.title })),
    },
    uiSchema: {
      "ui:widget": "select",
    },
  }) as ControlDefinition;

export const Color = (props: ControlProps) =>
  ({
    type: "singular",
    default: props.default || "",
    hidden: get(props, "hidden", false),
    binding: get(props, "binding", true),
    dataType: "string",
    ai: props.ai || false,
    i18n: props.i18n || false,
    schema: {
      type: "string",
      ...omit(props, ["i18n", "ai", "required"]),
    },
    uiSchema: {
      "ui:widget": "color",
    },
  }) as ControlDefinition;

type SlotsProps = {
  count: number;
  name: string;
  styles?: string;
  emptyStyles?: string;
};

export const Slot = (props: Omit<SlotsProps, "count">) =>
  ({
    type: "slot",
    count: 1,
    binding: false,
    name: props.name,
    styles: `${STYLES_KEY},${props.styles || ""}`,
    emptyStyles: `${STYLES_KEY},${props.emptyStyles || ""}`,
  }) as SlotControlDefinition;

export const RichText = (props: ControlProps) =>
  ({
    type: "singular",
    default: props.default || "",
    binding: get(props, "binding", true),
    dataType: "string",
    ai: props.ai || false,
    i18n: props.i18n || false,
    schema: {
      type: "string",
      ...omit(props, ["i18n", "ai", "required"]),
    },
    uiSchema: {
      "ui:widget": "richtext",
    },
  }) as ControlDefinition;

type ModelProps = ControlProps & {
  properties: {
    [key: string]: any;
  };
};

export const Model = (props: ModelProps) =>
  ({
    type: "model",
    title: props.title,
    dataType: "object",
    default: props.default || {},
    binding: get(props, "binding", true),
    properties: props.properties,
  }) as ModelControlDefinition;

type ListProps = ControlProps & {
  getItemLabel?: (item: any) => string;
  itemProperties: { [key: string]: any };
};

export const List = (props: ListProps) =>
  ({
    type: "list",
    itemProperties: props.itemProperties,
    binding: get(props, "binding", true),
    title: props.title,
    ai: props.ai || false,
    i18n: props.i18n || false,
    dataType: "array",
    default: props.default || [],
    itemTitle: props.getItemLabel ? props.getItemLabel({}) : () => "",
  }) as ListControlDefinition;

type StylesProps = {
  default?: string;
  presets?: any;
};

export const Styles = (props: StylesProps) =>
  ({
    type: "styles",
    binding: false,
    default: `${STYLES_KEY},${props.default || ""}`,
    presets: props.presets || {},
  }) as StylesControlDefinition;

export const Icon = (props: ControlProps) =>
  ({
    default: props.default || "",
    binding: get(props, "binding", true),
    type: "singular",
    dataType: "string",
    ai: props.ai || false,
    i18n: props.i18n || false,
    schema: {
      type: "string",
      title: "Icon",
      default: props.default || "",
    },
    uiSchema: {
      "ui:widget": "icon",
    },
  }) as ControlDefinition;

type LinkProps = ControlProps & {
  default: {
    href: string;
    target: string | "_self" | "_blank" | "_parent" | "_top";
    type: string | "page" | "url" | "email" | "telephone" | "scroll";
  };
};

export const Link = (props: LinkProps) =>
  ({
    default: props.default,
    type: "singular",
    binding: get(props, "binding", true),
    dataType: "object",
    ai: props.ai || false,
    i18n: props.i18n || false,
    schema: {
      type: "object",
      ...(props || {}),
      properties: {
        type: { type: "string" },
        href: { type: "string" },
        target: { type: "string" },
      },
    },
    uiSchema: {
      "ui:field": "link",
    },
  }) as ControlDefinition;

export const Image = (props: ControlProps) =>
  ({
    type: "singular",
    default: props.default || "",
    hidden: get(props, "hidden", false),
    binding: get(props, "binding", true),
    dataType: "string",
    ai: props.ai || false,
    i18n: props.i18n || false,
    schema: {
      type: "string",
      ...omit(props, ["i18n", "ai", "required"]),
    },
    uiSchema: {
      "ui:widget": "image",
    },
  }) as ControlDefinition;
