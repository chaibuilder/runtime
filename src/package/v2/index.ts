import type { RJSFSchema, UiSchema } from "@rjsf/utils";
import { each, get, isEmpty, intersection, keys, omit } from "lodash-es";
import type { ChaiBlock, ChaiBlockComponentProps, ChaiStyles } from "./runtime/core.tsx";

const STYLES_KEY = "#styles:";

type ChaiBlockUiSchema = UiSchema;
type ChaiBlockPropSchema = RJSFSchema & {
  ui?: ChaiBlockUiSchema;
};

type ChaiBlockSchema = {
  properties: Record<string, ChaiBlockPropSchema>;
} & Partial<Pick<ChaiBlockPropSchema, "required" | "dependencies" | "ui" | "title" | "description" | "default">>;

type ChaiBlockSchemas = {
  schema: object | Omit<ChaiBlockSchema, "ui">;
  uiSchema?: ChaiBlockUiSchema;
};

export const registerChaiBlockSchema = (blockSchema: ChaiBlockSchema): ChaiBlockSchemas => {
  const reservedProps = ["_type", "_id", "_parent", "_bindings", "_name"];
  const propsKeys = keys(blockSchema.properties);

  if (intersection(propsKeys, reservedProps).length > 0) {
    throw new Error(`Reserved props are not allowed: ${intersection(propsKeys, reservedProps).join(", ")}`);
  }

  const schema = get(blockSchema, "properties", {}) as Record<string, ChaiBlockPropSchema>;
  const uiSchema = {};
  each(schema, (prop, key) => {
    if (!isEmpty(prop.ui)) {
      uiSchema[key] = { ...prop.ui };
      delete schema[key].ui;
    }
  });
  return {
    schema: isEmpty(schema) ? {} : { ...omit(blockSchema, ["ui"]) },
    uiSchema: { ...get(blockSchema, "ui", {}), ...uiSchema },
  };
};

export const StylesProp = (): ChaiBlockPropSchema => {
  return {
    type: "string",
    styles: true,
    ui: { "ui:widget": "hidden" },
  };
};

export const defaultChaiStyles = (classes: string) => `${STYLES_KEY},${classes}`;

export type {
  ChaiBlock,
  ChaiBlockPropSchema,
  ChaiBlockSchema,
  ChaiBlockComponentProps,
  ChaiBlockSchemas,
  ChaiBlockUiSchema,
  ChaiStyles,
};
export * from "./runtime/index.tsx";
