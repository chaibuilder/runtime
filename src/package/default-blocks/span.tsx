import * as React from "react";
import { MultilineText, Styles } from "../controls";
import { registerChaiBlock } from "../runtime/builder-blocks";
import { ChaiBlock } from "../helper/types/ChaiBlock.ts";

const SpanBlock = (
  props: ChaiBlock & {
    children: React.ReactNode;
    styles: any;
    blockProps: Record<string, string>;
  },
) => {
  const { blockProps, styles, content, children = null, tag } = props;

  if (children) return React.createElement("span", { ...styles, ...blockProps }, children);

  return React.createElement(tag || "span", {
    ...styles,
    ...blockProps,
    dangerouslySetInnerHTML: { __html: content },
  });
};

registerChaiBlock(SpanBlock, {
  type: "Span",
  label: "Span",
  category: "core",
  group: "basic",
  props: {
    styles: Styles({ default: "" }),
    content: MultilineText({ title: "Content", default: "" }),
  },
});

export default SpanBlock;
