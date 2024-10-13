import { endsWith, get, keys, mapValues, pick, pickBy, set } from "lodash-es";
import React from "react";
import { IChaiBuilderBlock } from "../controls/types.ts";

type ChaiBlock = {
  _id: string;
  _name?: string;
  _parent?: string | null | undefined;
  _bindings?: Record<string, string>;
  _type: string;
} & Record<string, string>;

const BUILDER_BLOCKS: Record<string, IChaiBuilderBlock> = {};

export const useChaiBlocks = () => {
  return BUILDER_BLOCKS;
};

export const useChaiBlock = (type: string) => {
  return get(BUILDER_BLOCKS, type, null);
};

export const getBlockComponent = (type: string): IChaiBuilderBlock | null => {
  return get(BUILDER_BLOCKS, type, null);
};

export const getDefaultBlockProps = (type: string) => {
  return mapValues(BUILDER_BLOCKS[type]["props"], "default");
};

export const getBlockPropsDataType = (type: string) => {
  return mapValues(BUILDER_BLOCKS[type]["props"], "dataType");
};

export const getBlockPropsBinding = (type: string) => {
  return mapValues(BUILDER_BLOCKS[type]["props"], "binding");
};

export const syncBlocksWithDefaults = (blocks: ChaiBlock[]): ChaiBlock[] => {
  return blocks.map((block) => {
    if (BUILDER_BLOCKS[block._type]) {
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

const registerInternalBlock = (component: React.ComponentType<ChaiBlock>, options: IChaiBuilderBlock) => {
  set(BUILDER_BLOCKS, options.type, { component: component, ...options });
};
/**
 * Public API for registering a custom block
 * @param component
 * @param options
 */
export const registerChaiBlock = (component: React.ComponentType<ChaiBlock & any>, options: IChaiBuilderBlock) => {
  registerInternalBlock(component, { ...options, ...{ category: options.category || "custom" } });
};
