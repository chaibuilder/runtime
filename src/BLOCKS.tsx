import React from "react";

const STYLES_KEY = "#styles:";

type CoreBlock = {
  readonly _id: string;
  readonly _type: string;
  _name: string;
  _binding?: Record<string, string>;
};
type BoxBlock = CoreBlock & { backgroundImage?: string; children?: React.ReactNode; styles: string };
type HeadingBlock = CoreBlock & { content: string; level?: string; styles: string };

export const BLOCKS = {
  Box: {
    _id: "aaa",
    _name: "Box",
    _type: "Box",
    styles: `${STYLES_KEY},`,
    styles_attrs: { id: "box-1", "data-testid": "box-1" },
  } as BoxBlock,
  Heading: {
    _id: "bbb",
    _name: "Heading",
    _type: "Heading",
    level: "h2",
    content: "This is content",
    styles: `${STYLES_KEY},text-red-500 text-2xl`,
    styles_attrs: { id: "heading-1", "data-testid": "heading-1" },
  } as HeadingBlock,
};
