import * as React from "react";
import { CodeIcon } from "@radix-ui/react-icons";
import { MultilineText, Styles } from "../controls";
import { registerChaiBlock } from "../runtime/builder-blocks";
import { ChaiBlock } from "../helper/types/ChaiBlock.ts";

const CustomHTMLBlock = React.memo(
  (
    props: ChaiBlock & {
      blockProps: Record<string, string>;
      styles: Record<string, string>;
    },
  ) => {
    const { blockProps, styles, content } = props;
    return React.createElement("div", {
      ...styles,
      ...blockProps,
      dangerouslySetInnerHTML: { __html: content },
    });
  },
);

registerChaiBlock(CustomHTMLBlock as React.FC<any>, {
  type: "CustomHTML",
  label: "CustomHTML",
  category: "core",
  icon: CodeIcon,
  group: "basic",
  props: {
    styles: Styles({ default: "" }),
    content: MultilineText({
      title: "HTML Content",
      default: "",
      placeholder: "Enter custom HTML code here",
    }),
  },
});

export default CustomHTMLBlock;
