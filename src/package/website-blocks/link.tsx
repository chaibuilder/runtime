import * as React from "react";
import { isEmpty } from "lodash-es";
import { Link1Icon } from "@radix-ui/react-icons";
import { Link, SingleLineText, Styles } from "../controls";
import { registerChaiBlock } from "../runtime/builder-blocks";
import EmptySlot from "./empty-slot";
import { ChaiBlock } from "../helper/types/ChaiBlock.ts";

const LinkBlock = (
  props: ChaiBlock & {
    styles: any;
    link: any;
    inBuilder: boolean;
    blockProps: Record<string, string>;
    children: React.ReactNode;
  },
) => {
  const { blockProps, link, children, styles, inBuilder, content } = props;

  if (!children && isEmpty(styles?.className) && isEmpty(content)) {
    return <EmptySlot blockProps={blockProps} />;
  }

  if (inBuilder) {
    if (children) {
      return (
        <span data-simulate={"a"} {...blockProps} {...styles}>
          {children}
        </span>
      );
    } else {
      return React.createElement("span", {
        ...blockProps,
        ...styles,
        href: link.href || "#",
        target: link.target || "_self",
        dangerouslySetInnerHTML: { __html: content },
        "data-simulate": "a",
      });
    }
  }

  if (children) {
    return (
      <a href={link.href || "#/"} target={link.target} {...blockProps} {...styles}>
        {children}
      </a>
    );
  }

  return React.createElement("a", {
    ...blockProps,
    ...styles,
    href: link.href || "#",
    target: link.target || "_self",
    dangerouslySetInnerHTML: { __html: content },
  });
};

registerChaiBlock(LinkBlock, {
  type: "Link",
  label: "Link",
  category: "core",
  icon: Link1Icon,
  group: "basic",
  props: {
    styles: Styles({ default: "" }),
    content: SingleLineText({ title: "Content", default: "" }),
    link: Link({
      title: "Link",
      default: { type: "page", target: "_self", href: "" },
    }),
  },
});

export default LinkBlock;
