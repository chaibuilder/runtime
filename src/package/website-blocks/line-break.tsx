import * as React from "react";
import { Styles } from "../controls";
import { registerChaiBlock } from "../runtime/builder-blocks";
import { SpaceBetweenVerticallyIcon } from "@radix-ui/react-icons";
import { ChaiBlock } from "../helper/types/ChaiBlock.ts";

const LineBreakComponent = (props: ChaiBlock & { styles: any; blockProps: Record<string, string> }) => {
  const { blockProps, styles } = props;
  return React.createElement("br", { ...blockProps, ...styles });
};

registerChaiBlock(LineBreakComponent, {
  type: "LineBreak",
  label: "Line Break",
  category: "core",
  group: "basic",
  icon: SpaceBetweenVerticallyIcon,
  props: {
    styles: Styles({ default: "" }),
  },
});

export default LineBreakComponent;
