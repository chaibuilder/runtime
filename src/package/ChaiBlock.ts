export type ChaiBlock = {
  _id: string;
  _name?: string;
  _parent?: string | null | undefined;
  _bindings?: Record<string, string>;
  readonly _type: string;
} & Record<string, string>;
