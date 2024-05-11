import { endsWith, get, keys, mapValues, pick, pickBy, set } from "lodash-es";
import React, { LazyExoticComponent } from "react";
import { ChaiBuilderBlock } from "../controls/types.ts";

type ChaiBlock = {
  _id: string;
  _name?: string;
  _parent?: string | null | undefined;
  _bindings?: Record<string, string>;
  readonly _type: string;
} & Record<string, string>;

/**
 * This is global builder blocks
 */

type BuilderBlock = {
  component: React.FC<ChaiBlock & any> | LazyExoticComponent<any>;
  group: string;
  icon?: any;
  label?: string;
  props?: any;
  type: string;
};

const BUILDER_BLOCKS: Record<string, BuilderBlock> = {};

export const useChaiBlocks = () => {
  return BUILDER_BLOCKS;
};

export const getBlockComponent = (type: string): BuilderBlock | null => {
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

const registerInternalBlock = (
  component: React.FC<ChaiBlock & any> | Promise<React.FC<ChaiBlock & any>>,
  options: ChaiBuilderBlock,
) => {
  set(BUILDER_BLOCKS, options.type, { component: component, ...options });
};
/**
 * Public API for registering a custom block
 * @param component
 * @param options
 */
export const registerChaiBlock = (
  component: React.FC<ChaiBlock & any> | Promise<React.FC<ChaiBlock & any>>,
  options: ChaiBuilderBlock,
) => {
  registerInternalBlock(component, { ...options, ...{ category: options.category || "custom" } });
};
