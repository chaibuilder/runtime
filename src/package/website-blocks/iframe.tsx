import * as React from "react";
import { MultilineText, Styles } from "../controls";
import { registerChaiBlock } from "../runtime/builder-blocks";
import { ChaiBlock } from "../helper/types/ChaiBlock.ts";

const IframeBlock = React.memo(
  (
    props: ChaiBlock & {
      blockProps: Record<string, string>;
      styles: Record<string, string>;
      src: string;
    },
  ) => {
    const { blockProps, src, styles } = props;
    return React.createElement("iframe", {
      ...styles,
      ...blockProps,
      src,
    });
  },
);

registerChaiBlock(IframeBlock as React.ComponentType<any>, {
  type: "Iframe",
  label: "Iframe",
  category: "core",
  group: "basic",
  props: {
    styles: Styles({ default: "" }),
    src: MultilineText({
      title: "Source",
      default: "",
      placeholder: "Enter iframe source",
    }),
  },
});

export default IframeBlock;
