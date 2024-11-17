import { registerChaiBlock } from "./package/v2/runtime";
import { ChaiBlockComponentProps, ChaiStyles } from "./package/v2/runtime/core";
import { registerChaiBlockSchema, StylesProp } from "./package/v2";

type HeadingProps = {
  level: string;
  content: string;
  styles: ChaiStyles;
};

// eslint-disable-next-line react-refresh/only-export-components
const Heading = (props: ChaiBlockComponentProps<HeadingProps>) => {
  return <div>{props.children}</div>;
};

const schemas = registerChaiBlockSchema({
  properties: {
    styles: StylesProp("text-2xl font-bold"),
    level: {
      type: "string",
      enum: ["h1", "h2", "h3", "h4", "h5", "h6"],
      default: "h2",
      ui: { "ui:widget": "select" },
    },
    content: {
      type: "string",
      default: "This is a heading",
      ui: { "ui:widget": "textarea" },
    },
  },
  //
  required: ["level"],
  dependencies: { level: ["content"] },
  ui: { "ui:order": ["level", "content"] },
});

registerChaiBlock<HeadingProps>(Heading, {
  type: "Heading",
  label: "Heading",
  group: "Typography",
  ...schemas,
  i18nProps: ["content", "image.alt"],
  aiProps: ["content", "image.alt"],
  schema: {
    properties: {},
  },
});
