import { endsWith, get, has, keys, memoize, pick, pickBy, set } from "lodash-es";
import React, { useMemo } from "react";
import type { ChaiBlockDefinition } from "../../controls/types.ts";

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
};

export type ChaiStyles = {
  [key: string]: string;
};

const REGISTERED_CHAI_BLOCKS: Record<string, ChaiBlockDefinition> = {};

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
);

export const getDefaultBlockProps = memoize((type: keyof typeof REGISTERED_CHAI_BLOCKS) => {
  return get(REGISTERED_CHAI_BLOCKS, `${type}.propsSchema.default`, {});
});

export const getI18nBlockProps = memoize((type: keyof typeof REGISTERED_CHAI_BLOCKS) => {
  return get(REGISTERED_CHAI_BLOCKS, `${type}.i18nProps`, []);
});

export const getAIBlockProps = memoize((type: keyof typeof REGISTERED_CHAI_BLOCKS) => {
  return get(REGISTERED_CHAI_BLOCKS, `${type}.aiProps`, []);
});

export const syncBlocksWithDefaults = (blocks: ChaiBlock[]): ChaiBlock[] => {
  return blocks.map((block) => {
    if (has(REGISTERED_CHAI_BLOCKS, block._type)) {
      const defaults = getDefaultBlockProps(block._type);
      return {
        ...defaults,
        ...pick(block, [...keys(defaults), ...["_type", "_id", "_name", "_parent", "_bindings"]]),
        ...pickBy(block, (_, c) => endsWith(c, "_attrs")),
      } as ChaiBlock;
    }
    return block;
  });
};

const registerInternalBlock = <T extends Record<string, any>>(
  component: React.ComponentType<ChaiBlockComponentProps<T>>,
  options: Omit<ChaiBlockDefinition<T>, "component">,
) => {
  set(REGISTERED_CHAI_BLOCKS, options.type, { component: component, ...options });
};

export const registerChaiBlock = <T extends Record<string, any>>(
  component: React.ComponentType<ChaiBlockComponentProps<T>>,
  options: Omit<ChaiBlockDefinition<T>, "component">,
) => {
  registerInternalBlock<T>(component, { ...options, ...{ category: options.category || "custom" } });
};
