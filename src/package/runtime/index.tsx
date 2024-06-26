import {
  getBlockComponent,
  getBlockPropsBinding,
  getBlockPropsDataType,
  getDefaultBlockProps,
  registerChaiBlock,
  syncBlocksWithDefaults,
  useChaiBlock,
  useChaiBlocks,
} from "./builder-blocks";
import { registerStylingPresets, useGlobalStylingPresets } from "./STYLING_PRESETS.ts";
import { getChaiDataProvider, getChaiDataProviders, registerChaiDataProvider } from "./builder-data.tsx";

export {
  // hooks
  useChaiBlock,
  useChaiBlocks,
  useGlobalStylingPresets,

  // functions
  registerChaiBlock,
  registerChaiDataProvider,
  registerStylingPresets,

  // getters
  getBlockComponent,
  getChaiDataProviders,
  getDefaultBlockProps,
  getChaiDataProvider,
  getBlockPropsDataType,
  getBlockPropsBinding,

  // helpers
  syncBlocksWithDefaults,
};
