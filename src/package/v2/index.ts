import type { RJSFSchema, UiSchema } from "@rjsf/utils";
import { each, get, isEmpty, intersection, keys, omit } from "lodash-es";
import type { ChaiBlock, ChaiBlockComponentProps } from "./runtime/core.tsx";

const STYLES_KEY = "#styles:";

type ChaiBlockUiSchema = UiSchema;
type ChaiBlockPropSchema = RJSFSchema & {
  ui?: ChaiBlockUiSchema;
};

type ChaiBlockPropsSchema = {
  props: Record<string, ChaiBlockPropSchema>;
} & Partial<Pick<ChaiBlockPropSchema, "required" | "dependencies" | "ui" | "title" | "description" | "default">>;

type RegisterChaiBlockProps = {
  propsSchema: object | Omit<ChaiBlockPropsSchema, "ui">;
  uiSchema?: ChaiBlockUiSchema;
};

export const registerChaiBlockProps = (blockProps: ChaiBlockPropsSchema): RegisterChaiBlockProps => {
  const reservedProps = ["_type", "_id", "_parent", "_bindings", "_name"];
  const propsKeys = keys(blockProps.props);

  if (intersection(propsKeys, reservedProps).length > 0) {
    throw new Error(`Reserved props are not allowed: ${intersection(propsKeys, reservedProps).join(", ")}`);
  }

  const propsSchema = get(blockProps, "props", {}) as Record<string, ChaiBlockPropSchema>;
  const propsUiSchema = {};
  each(propsSchema, (prop, key) => {
    if (!isEmpty(prop.ui)) {
      propsUiSchema[key] = { ...prop.ui };
      delete propsSchema[key].ui;
    }
  });
  return {
    propsSchema: isEmpty(propsSchema) ? {} : { ...omit(blockProps, ["ui"]) },
    uiSchema: { ...get(blockProps, "ui", {}), ...propsUiSchema },
  };
};

export const StylesProp = (defaultClasses: string): ChaiBlockPropSchema => {
  return {
    type: "string",
    styles: true,
    default: `${STYLES_KEY},${defaultClasses}`,
  };
};

export type {
  ChaiBlock,
  ChaiBlockPropSchema,
  ChaiBlockPropsSchema,
  ChaiBlockComponentProps,
  RegisterChaiBlockProps,
  ChaiBlockUiSchema,
};
export * from "./runtime/index.tsx";
