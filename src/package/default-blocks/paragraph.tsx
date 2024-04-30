import * as React from "react";
import { TextIcon } from "@radix-ui/react-icons";
import { MultilineText, Styles } from "../controls";
import { registerChaiBlock } from "../runtime/builder-blocks";

import { isNull } from "lodash";

/**
 * Heading component
 * @param props
 * @constructor
 */
const ParagraphBlock = (
  props: any & {
    blockProps: Record<string, string>;
    styles: Record<string, string>;
    children: React.ReactNode;
  },
) => {
  const { blockProps, styles, content } = props;

  if (!isNull(props.children)) return React.createElement("p", { ...styles, ...blockProps }, props.children);

  // eslint-disable-next-line react/no-danger
  return React.createElement("div", {
    ...styles,
    ...blockProps,
    dangerouslySetInnerHTML: { __html: content },
  });
};

registerChaiBlock(ParagraphBlock as React.FC<any>, {
  type: "Paragraph",
  label: "Paragraph",
  category: "core",
  icon: TextIcon,
  group: "basic",
  props: {
    styles: Styles({ default: "" }),
    content: MultilineText({
      title: "Content",
      default:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.",
    }),
  },
});

export default ParagraphBlock;
