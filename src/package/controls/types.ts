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
  blocks?: ChaiBlock[];
  category?: string;
  preview?: string;
  hidden?: boolean;
  icon?: React.ReactNode | React.ComponentType;
  props?: {
    [key: string]:
      | ControlDefinition
      | ModelControlDefinition
      | StylesControlDefinition
      | ListControlDefinition
      | SlotControlDefinition;
  };
  builderComponent?: React.ComponentType<any>;
  canAcceptBlock?: (type: string) => boolean;
  canDelete?: () => boolean;
  canMove?: () => boolean;
  canDuplicate: () => boolean;
}
