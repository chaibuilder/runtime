import * as React from "react";
import { HeadingIcon } from "@radix-ui/react-icons";
import { MultilineText, SelectOption, Styles } from "../controls";
import { registerChaiBlock } from "../runtime/builder-blocks";
import { ChaiBlock } from "../helper/types/ChaiBlock.ts";

/**
 * Heading component
 * @param props
 * @constructor
 */
const HeadingBlock = (
  props: ChaiBlock & {
    level: string;
    blockProps: Record<string, string>;
    styles: Record<string, string>;
  },
) => {
  const { blockProps, styles, content, level = "h1", children = null } = props;

  if (children) return React.createElement(level, { ...styles, ...blockProps }, children);

  return React.createElement(level, {
    ...styles,
    ...blockProps,
    dangerouslySetInnerHTML: { __html: content },
  });
};

registerChaiBlock(HeadingBlock, {
  type: "Heading",
  label: "Heading",
  category: "core",
  icon: HeadingIcon,
  group: "basic",
  props: {
    level: SelectOption({
      title: "Level",
      default: "h1",
      binding: false,
      options: [
        { value: "h1", title: "h1" },
        { value: "h2", title: "h2" },
        { value: "h3", title: "h3" },
        { value: "h4", title: "h4" },
        { value: "h5", title: "h5" },
        { value: "h6", title: "h6" },
      ],
    }),
    styles: Styles({ default: "text-3xl" }),
    content: MultilineText({ title: "Content", default: "Heading goes here" }),
  },
});

export default HeadingBlock;
