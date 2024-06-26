type Identifier = string;
type Classes = string;

export type StylingPresets = Record<Identifier, Classes>;

let GLOBAL_STYLING_PRESETS: StylingPresets = {};

export const registerStylingPresets = (helpers: StylingPresets) => {
  GLOBAL_STYLING_PRESETS = { ...GLOBAL_STYLING_PRESETS, ...helpers };
};

export const useGlobalStylingPresets = (): StylingPresets => {
  return GLOBAL_STYLING_PRESETS;
};
