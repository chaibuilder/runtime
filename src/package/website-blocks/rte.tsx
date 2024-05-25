import * as React from "react";
import { CursorTextIcon } from "@radix-ui/react-icons";
import { RichText, Styles } from "../controls";
import { registerChaiBlock } from "../runtime/builder-blocks";
import { ChaiBlock } from "../helper/types/ChaiBlock.ts";

/**
 * Heading component
 * @param props
 * @constructor
 */
const RichTextBlock = (
  props: ChaiBlock & {
    blockProps: Record<string, string>;
    styles: Record<string, string>;
  },
) => {
  const { blockProps, content, styles } = props;
  // eslint-disable-next-line react/no-danger
  return (
    <div className="prose max-w-full">
      <div {...blockProps} {...styles} dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

registerChaiBlock(RichTextBlock as React.FC<any>, {
  type: "RichText",
  label: "Rich Text",
  category: "core",
  icon: CursorTextIcon,
  group: "basic",
  props: {
    styles: Styles({ default: "" }),
    content: RichText({
      title: "Content",
      default:
        "Lorem Ipsum Rich Text Editor Demo\n" +
        "\n" +
        "Welcome to our rich text editor demo! With our powerful editor, you can create stunning documents with ease. Let's explore some of its features:\n" +
        "\n" +
        "Text Formatting: You can make text bold, italic, or underline it.\n" +
        "Lists:\n" +
        "Create ordered lists.\n" +
        "Craft unordered lists.\n" +
        "Utilize nested lists for organization.",
    }),
  },
});

export default RichTextBlock;
