import { MultilineText } from "../controls";
import { registerChaiBlock } from "../runtime/builder-blocks";
import { SpaceBetweenVerticallyIcon } from "@radix-ui/react-icons";
import { ChaiBlock } from "../helper/types/ChaiBlock.ts";

const RawTextBlock = (
  props: ChaiBlock & {
    content: string;
    inBuilder: boolean;
    blockProps: Record<string, string>;
  },
) => {
  if (props.inBuilder) {
    return <span {...props.blockProps}>&nbsp;{props.content}&nbsp;</span>;
  }
  return ` ${props.content} `;
};

registerChaiBlock(RawTextBlock, {
  type: "Text",
  label: "Text",
  hidden: true,
  category: "core",
  group: "basic",
  icon: SpaceBetweenVerticallyIcon,
  props: {
    content: MultilineText({ title: "Content", defaultValue: "" }),
  },
});

export default RawTextBlock;
