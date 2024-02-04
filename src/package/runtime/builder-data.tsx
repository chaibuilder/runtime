import { get, values } from "lodash";

type ChaiDataProvider = {
  name: string;
  dataFn: (args: Record<string, any>, currentPageUrl: string) => Promise<any>;
  description?: string;
  mockFn?: (args: Record<string, any>) => Promise<any>;
};

/**
 * Chai Data Providers
 */
const CHAI_DATA_PROVIDERS: Record<string, ChaiDataProvider & { providerKey: string }> = {};

export const registerChaiDataProvider = (providerKey: string, options: ChaiDataProvider) => {
  CHAI_DATA_PROVIDERS[providerKey] = { ...options, providerKey };
};

export const getChaiDataProvider = (providerKey: string) => {
  return get(CHAI_DATA_PROVIDERS, providerKey);
};

export const getChaiDataProviders = () => {
  return values(CHAI_DATA_PROVIDERS);
};
