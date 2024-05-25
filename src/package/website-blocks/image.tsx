import * as React from "react";
import { ImageIcon } from "@radix-ui/react-icons";
import { Image, SingleLineText, Styles } from "../controls";
import { isEmpty } from "lodash-es";
import { registerChaiBlock } from "../runtime/builder-blocks";
import EmptySlot from "./empty-slot";
import { ChaiBlock } from "../helper/types/ChaiBlock.ts";

const ImageBlock = (
  block: ChaiBlock & {
    blockProps: Record<string, string>;
    height: number;
    width: number;
    alt: string;
    styles: Record<string, string>;
  },
) => {
  const { blockProps, image, styles, alt, height = 200, width = 200 } = block;

  if (isEmpty(image)) return <EmptySlot blockProps={blockProps} text="IMAGE URL" className="h-36" />;

  return React.createElement("img", {
    ...blockProps,
    ...styles,
    src: image,
    alt: alt,
    height: height,
    width: width,
  });
};

registerChaiBlock(ImageBlock, {
  type: "Image",
  label: "Image",
  category: "core",
  icon: ImageIcon,
  group: "basic",
  props: {
    styles: Styles({ default: "" }),
    image: Image({
      title: "Image",
      default: "https://fakeimg.pl/400x200?text=Choose&font=bebas",
    }),
    alt: SingleLineText({ title: "Alt", default: "" }),
    width: SingleLineText({ title: "Width", default: "" }),
    height: SingleLineText({ title: "Height", default: "" }),
  },
});

export default ImageBlock;
