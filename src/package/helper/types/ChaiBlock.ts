export type ChaiBlock = {
  readonly _id: string;
  _name?: string;
  _parent?: string | null | undefined;
  _bindings?: Record<string, string>;
  readonly _type: string;
} & Record<string, any>;

export type GlobalBlock = Record<string, any>;
