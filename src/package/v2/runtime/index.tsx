import {
  closestBlockProp,
  getAIBlockProps,
  getBlockFormSchemas,
  getDefaultBlockProps,
  getI18nBlockProps,
  getRegisteredChaiBlock,
  registerChaiBlock,
  registerChaiServerBlock,
  setChaiBlockComponent,
  setChaiServerBlockDataProvider,
  syncBlocksWithDefaults,
  useRegisteredChaiBlock,
  useRegisteredChaiBlocks,
} from "./core";

export * from "./fonts";

const setChaiBlockDataProvider = setChaiServerBlockDataProvider;

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
  setChaiBlockComponent,
  setChaiBlockDataProvider,
  setChaiServerBlockDataProvider,
  // helpers
  syncBlocksWithDefaults,
  // hooks
  useRegisteredChaiBlock,
  useRegisteredChaiBlocks,
};

export interface ChaiPageProps {
  slug: string;
  searchParams?: Record<string, string>;
  [key: string]: any;
}
