import React from "react";
import { ChaiBlock } from "../ChaiBlock.ts";
import {
  ControlDefinition,
  ListControlDefinition,
  ModelControlDefinition,
  SlotControlDefinition,
  StylesControlDefinition,
} from "./index.ts";

export interface ChaiBuilderBlock {
  // required
  type: string;
  label: string;
  group: string;

  // optional
  blocks?: ChaiBlock[] | (() => ChaiBlock[]);
  category?: string;
  preview?: string;
  hidden?: boolean | ((parentType?: string) => boolean);
  icon?: React.ReactNode | React.ComponentType;
  props?: {
    [key: string]:
      | ControlDefinition
      | ModelControlDefinition
      | StylesControlDefinition
      | ListControlDefinition
      | SlotControlDefinition;
  };
  propsEditor?: React.ComponentType<any>;
  builderComponent?: React.ComponentType<any>;
  canAcceptBlock?: (type: string) => boolean;
  canDelete?: () => boolean;
  canMove?: () => boolean;
  canDuplicate?: () => boolean;
  canBeNested?: (type: string) => boolean;
}
