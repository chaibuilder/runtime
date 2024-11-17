import React from "react";
import { ChaiBlock } from "../ChaiBlock.ts";
import { ChaiBlockComponentProps, ChaiBlockPropsSchema, ChaiBlockUiSchema } from "../v2/index.ts";

export interface ChaiBlockDefinition<T = Record<string, any>> {
  // required
  component: React.ComponentType<ChaiBlockComponentProps<T>>;
  type: string;
  label: string;
  group: string;

  // optional
  server?: boolean;
  blocks?: ChaiBlock[] | (() => ChaiBlock[]);
  category?: string;
  preview?: string;
  hidden?: boolean | ((parentType?: string) => boolean);
  icon?: React.ReactNode | React.ComponentType;
  builderComponent?: React.ComponentType<ChaiBlockComponentProps<T>>;

  //props
  propsSchema?: object | Omit<ChaiBlockPropsSchema, "ui">;
  uiSchema?: ChaiBlockUiSchema;

  i18nProps?: string[];
  aiProps?: string[];

  // callbacks
  canAcceptBlock?: (type: string) => boolean;
  canDelete?: () => boolean;
  canMove?: () => boolean;
  canDuplicate?: () => boolean;
  canBeNested?: (type: string) => boolean;
}
