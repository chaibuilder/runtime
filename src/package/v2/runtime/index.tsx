import {
  closestBlockProp,
  getAIBlockProps,
  getBlockFormSchemas,
  getDefaultBlockProps,
  getI18nBlockProps,
  getRegisteredChaiBlock,
  registerChaiBlock,
  registerChaiServerBlock,
  setChaiServerBlockDataProvider,
  syncBlocksWithDefaults,
  useRegisteredChaiBlock,
  useRegisteredChaiBlocks,
} from "./core";

export * from "./fonts";

export {
  closestBlockProp,
  getAIBlockProps,
  getBlockFormSchemas,
  getDefaultBlockProps,
  getI18nBlockProps,
  // getters
  getRegisteredChaiBlock,
  // functions
  registerChaiBlock,
  registerChaiServerBlock,
  setChaiServerBlockDataProvider,

  // helpers
  syncBlocksWithDefaults,
  // hooks
  useRegisteredChaiBlock,
  useRegisteredChaiBlocks,
};

export interface ChaiPageProps {}
