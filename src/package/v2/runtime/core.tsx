import type { RJSFSchema, UiSchema } from "@rjsf/utils";
import { cloneDeep, each, get, has, memoize, omitBy, set } from "lodash-es";
import React, { useMemo } from "react";
import type { ChaiBlockDefinition, ChaiServerBlockDefinition } from "../../controls/types.ts";
import { ChaiBlockPropSchema } from "../index.ts";

export type ChaiBlock<T = Record<string, string>> = {
  _id: string;
  _name?: string;
  _parent?: string | null | undefined;
  _bindings?: Record<string, string>;
  _type: string;
} & T;

export type ChaiBlockComponentProps<T> = ChaiBlock<T> & {
  children?: React.ReactNode;
  blockProps: Record<string, string>;
  inBuilder: boolean;
  lang: string;
};

export type ChaiStyles = {
  [key: string]: string;
};

const REGISTERED_CHAI_BLOCKS: Record<string, ChaiBlockDefinition | ChaiServerBlockDefinition> = {};

export const useRegisteredChaiBlocks = () => {
  return REGISTERED_CHAI_BLOCKS;
};

export const useRegisteredChaiBlock = (type: keyof typeof REGISTERED_CHAI_BLOCKS) => {
  return useMemo(() => get(REGISTERED_CHAI_BLOCKS, type, null), [type]);
};

export const getRegisteredChaiBlock = memoize(
  (type: keyof typeof REGISTERED_CHAI_BLOCKS): ChaiBlockDefinition | null => {
    return get(REGISTERED_CHAI_BLOCKS, type, null);
  },
) as any;

export const getDefaultBlockProps = memoize((type: keyof typeof REGISTERED_CHAI_BLOCKS) => {
  const properties = get(REGISTERED_CHAI_BLOCKS, `${type}.schema.properties`, {});
  const defaultProps: Record<string, any> = {};
  each(properties, (propSchema: ChaiBlockPropSchema, key) => {
    if (has(propSchema, "block")) {
      return;
    }
    set(defaultProps, key, propSchema.default);
  });
  return defaultProps;
}) as any;

export const getI18nBlockProps = memoize((type: keyof typeof REGISTERED_CHAI_BLOCKS) => {
  return get(REGISTERED_CHAI_BLOCKS, `${type}.i18nProps`, []);
}) as any;

export const getAIBlockProps = memoize((type: keyof typeof REGISTERED_CHAI_BLOCKS) => {
  return get(REGISTERED_CHAI_BLOCKS, `${type}.aiProps`, []);
}) as any;

export const getBlockFormSchemas = memoize(
  (type: keyof typeof REGISTERED_CHAI_BLOCKS): { schema: RJSFSchema; uiSchema: UiSchema } => {
    const registeredBlock = getRegisteredChaiBlock(type);
    const schema = cloneDeep(registeredBlock.schema);
    const properties = get(schema, "properties", {});
    const nonStylesProperties = omitBy(properties, (prop) => prop.styles === true);
    set(schema, "properties", nonStylesProperties);
    const uiSchema = get(REGISTERED_CHAI_BLOCKS, `${type}.uiSchema`, {});
    return { schema, uiSchema };
  },
) as any;

export const syncBlocksWithDefaults = (blocks: ChaiBlock[]): ChaiBlock[] => {
  return blocks.map((block) => {
    if (has(REGISTERED_CHAI_BLOCKS, block._type)) {
      const defaults = getDefaultBlockProps(block._type);
      return { ...defaults, ...block } as ChaiBlock;
    }
    return block;
  });
};

const registerInternalBlock = <T, K>(
  component: React.ComponentType<ChaiBlockComponentProps<T>>,
  options: ChaiBlockDefinitionOptions<T, K>,
) => {
  const existingBlock = get(REGISTERED_CHAI_BLOCKS, options.type);
  if (existingBlock) {
    set(REGISTERED_CHAI_BLOCKS, options.type, { ...existingBlock, component, ...options });
  } else {
    set(REGISTERED_CHAI_BLOCKS, options.type, { component, ...options });
  }
};

export type ChaiBlockDefinitionOptions<T, K> = Omit<ChaiBlockDefinition<T, K>, "component">;

export const registerChaiBlock = <
  T extends Record<string, any> = Record<string, any>,
  K extends Record<string, any> = Record<string, any>,
>(
  component: React.ComponentType<ChaiBlockComponentProps<T>>,
  options: ChaiBlockDefinitionOptions<T, K>,
) => {
  registerInternalBlock<T, K>(component, { ...options, ...{ category: options.category || "custom" } });
};

export const registerChaiServerBlock = <
  T extends Record<string, any> = Record<string, any>,
  K extends Record<string, any> = Record<string, any>,
>(
  component: React.ComponentType<ChaiBlockComponentProps<T>>,
  options: Pick<ChaiBlockDefinition<T, K>, "type" | "dataProvider" | "i18nProps" | "aiProps">,
) => {
  const existingBlock = get(REGISTERED_CHAI_BLOCKS, options.type);
  if (existingBlock) {
    set(REGISTERED_CHAI_BLOCKS, options.type, { ...existingBlock, component, ...options });
  } else {
    set(REGISTERED_CHAI_BLOCKS, options.type, { component, ...options });
  }
};

export const setChaiServerBlockDataProvider = <K extends Record<string, any> = Record<string, any>>(
  type: keyof typeof REGISTERED_CHAI_BLOCKS,
  dataProvider: (block: ChaiBlock, lang: string, metadata?: any) => Promise<K>,
) => {
  const registeredBlock = getRegisteredChaiBlock(type);
  set(REGISTERED_CHAI_BLOCKS, type, { ...registeredBlock, dataProvider });
};

export const closestBlockProp = (blockType: keyof typeof REGISTERED_CHAI_BLOCKS, prop: string): ChaiBlockPropSchema => {
  return {
    type: "null",
    block: blockType,
    prop,
    default: null,
    runtime: true,
    ui: { "ui:widget": "hidden" },
  };
};
