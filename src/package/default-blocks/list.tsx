import * as React from "react";
import { ColumnsIcon, RowsIcon } from "@radix-ui/react-icons";
import { get, isEmpty } from "lodash";
import { cn } from "../helper/lib.ts";
import { MultilineText, SelectOption, Styles } from "../controls";
import { registerChaiBlock } from "../runtime/builder-blocks";
import EmptySlot from "./empty-slot";
import { ChaiBlock } from "../helper/types/ChaiBlock.ts";

const ListBlock = (
  props: ChaiBlock & {
    blockProps: Record<string, string>;
    styles: Record<string, string>;
  },
) => {
  const { blockProps, children, listType, styles, tag } = props;
  const className = cn(get(styles, "className", ""), listType);

  if (!children && isEmpty(styles?.className)) {
    return <EmptySlot blockProps={blockProps} text="LIST ITEM" />;
  }

  return React.createElement(
    tag ? tag : listType === "list-decimal" ? "ol" : "ul",
    { ...blockProps, ...styles, className },
    children,
  );
};

registerChaiBlock(ListBlock, {
  type: "List",
  label: "List",
  icon: RowsIcon,
  category: "core",
  group: "basic",
  props: {
    styles: Styles({ default: "" }),
    listType: SelectOption({
      title: "List type",
      default: "list-disc",
      options: [
        { value: "list-none", title: "None" },
        { value: "list-disc", title: "Disc" },
        { value: "list-decimal", title: "Number" },
      ],
    }),
  },
  blocks: [
    { _type: "List", _id: "a", listType: "list-none", styles: "#styles:," },
    {
      _type: "ListItem",
      _id: "b",
      _parent: "a",
      styles: "#styles:,",
      content: "Item 1",
    },
    {
      _type: "ListItem",
      _id: "c",
      _parent: "a",
      styles: "#styles:,",
      content: "Item 2",
    },
    {
      _type: "ListItem",
      _id: "d",
      _parent: "a",
      styles: "#styles:,",
      content: "Item 3",
    },
  ],
});

const ListItemBlock = (
  props: ChaiBlock & {
    content: string;
    blockProps: Record<string, string>;
    styles: Record<string, string>;
  },
) => {
  const { blockProps, content, styles, children, tag } = props;
  if (!children) {
    return React.createElement(tag || "li", {
      ...styles,
      ...blockProps,
      dangerouslySetInnerHTML: { __html: content },
    });
  }
  return React.createElement(tag || "li", { ...styles, ...blockProps }, children);
};

registerChaiBlock(ListItemBlock, {
  type: "ListItem",
  label: "List Item",
  icon: ColumnsIcon,
  category: "core",
  group: "basic",
  props: {
    styles: Styles({ default: "" }),
    content: MultilineText({ title: "Content", default: "List item" }),
  },
});

export default ListBlock;
