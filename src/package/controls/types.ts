import React, { LazyExoticComponent } from "react";
import { ChaiBlock } from "../ChaiBlock.ts";
import {
  ControlDefinition,
  ListControlDefinition,
  ModelControlDefinition,
  SlotControlDefinition,
  StylesControlDefinition,
} from "./index.ts";

export interface ChaiBuilderBlock {
  blocks?: ChaiBlock[];
  category?: string;
  group: string;
  preview?: string;
  hidden?: boolean;
  icon?: React.ReactNode | React.FC;
  label: string;
  props?: {
    [key: string]:
      | ControlDefinition
      | ModelControlDefinition
      | StylesControlDefinition
      | ListControlDefinition
      | SlotControlDefinition;
  };
  type: string;
  builderComponent?: React.FC<any> | LazyExoticComponent<any>;
  canHaveChildBlocks?: Function;
}
