import React from "react";
import { ChaiBlock, ChaiBlockComponentProps, ChaiBlockSchema, ChaiBlockUiSchema, ChaiPageProps } from "../v2/index.ts";

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
  wrapper?: boolean;
  blocks?: ChaiBlock[] | (() => ChaiBlock[]);
  category?: string;
  hidden?: boolean | ((parentType?: string) => boolean);
  icon?: React.ReactNode | React.ComponentType;
  builderComponent?: React.ComponentType<ChaiBlockComponentProps<T>>;

  dataProvider?: (args: { lang: string; draft: boolean; inBuilder: boolean; block: ChaiBlock<T>; pageProps: K }) => K;
  dataProviderDependencies?: string[];

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
  dataProvider?: (args: {
    draft: boolean;
    inBuilder: boolean;
    lang: string;
    block: ChaiBlock<T>;
    pageProps: ChaiPageProps;
  }) => Promise<K>;
  suspenseFallback?: React.ComponentType<any>;
}
