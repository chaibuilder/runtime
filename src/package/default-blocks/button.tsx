import * as React from "react";
import { ButtonIcon } from "@radix-ui/react-icons";
import { Icon, Link, SelectOption, SingleLineText, Styles } from "../controls";
import { registerChaiBlock } from "../runtime/builder-blocks";
import { ChaiBlock } from "../helper/types/ChaiBlock.ts";

const ButtonBlock = (
  block: ChaiBlock & {
    blockProps: Record<string, string>;
    styles: Record<string, string>;
  },
) => {
  const { blockProps, icon, content, iconPos, styles, children } = block;

  const child = children || (
    <>
      {content}
      {icon && <span className={iconPos || ""} dangerouslySetInnerHTML={{ __html: icon }} />}
    </>
  );
  return React.createElement("button", { ...blockProps, ...styles, type: "button" }, child);
};

registerChaiBlock(ButtonBlock as React.FC<any>, {
  type: "Button",
  label: "Button",
  category: "core",
  icon: ButtonIcon,
  group: "basic",
  props: {
    content: SingleLineText({
      title: "Label",
      default: "Button",
      multiLingual: true,
    }),
    styles: Styles({
      default: "text-white bg-primary px-4 py-2 rounded-global flex items-center",
    }),
    link: Link({
      title: "Link",
      default: { type: "page", href: "", target: "_blank" },
    }),
    icon: Icon({ title: "Icon", default: "" }),
    iconPos: SelectOption({
      title: "Icon Position",
      default: "order-last",
      options: [
        { title: "Start", value: "order-first" },
        { title: "End", value: "order-last" },
      ],
    }),
  },
});

export default ButtonBlock;
