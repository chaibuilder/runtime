import React from "react";
import { ChaiBlock, ChaiBlockComponentProps, ChaiBlockSchema, ChaiBlockUiSchema } from "../v2/index.ts";

export type ChaiDataProviderArgs<T = Record<string, any>, K = Record<string, any>> = {
  block: ChaiBlock<T>;
} & K;

export interface ChaiBlockDefinition<T = Record<string, any>, K = Record<string, any>> {
  // required
  component: React.ComponentType<ChaiBlockComponentProps<T>>;
  type: string;
  label: string;
  group: string;

  // optional
  description?: string;
  blocks?: ChaiBlock[] | (() => ChaiBlock[]);
  category?: string;
  wrapper?: boolean;
  preview?: string;
  hidden?: boolean | ((parentType?: string) => boolean);
  icon?: React.ReactNode | React.ComponentType;
  builderComponent?: React.ComponentType<ChaiBlockComponentProps<T>>;

  dataProvider?: (block: ChaiBlock, lang: string) => K;

  //props
  schema?: ChaiBlockSchema;
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

export interface ChaiServerBlockDefinition<T = Record<string, any>, K = Record<string, any>> {
  component: React.ComponentType<ChaiBlockComponentProps<T>>;
  type: string;
  dataProvider?: (block: ChaiBlock, lang: string, metadata?: any) => Promise<K>;
  suspenseFallback?: React.ComponentType<any>;
}
