import { closestBlockProp, registerChaiBlockSchema, runtimeProp, stylesProp } from "./package/v2";
import { registerChaiBlock } from "./package/v2/runtime";
import { ChaiBlockComponentProps, registerChaiServerBlock } from "./package/v2/runtime/core";

type HeadingProps = {
  level: string;
  content: string;
};

// eslint-disable-next-line react-refresh/only-export-components
const Heading = (props: ChaiBlockComponentProps<HeadingProps>) => {
  return <div>{props.children}</div>;
};

const schemas = registerChaiBlockSchema({
  properties: {
    showHide: runtimeProp({
      type: "boolean",
      default: true,
    }),
    show: closestBlockProp("Heading", "level"),
    styles: stylesProp("text-2xl font-bold"),
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

registerChaiBlock(Heading, {
  type: "Heading",
  label: "Heading",
  group: "Typography",
  ...schemas,
  i18nProps: ["content", "image.alt"],
  aiProps: ["content", "image.alt"],
  ...registerChaiBlockSchema({
    properties: { name: stylesProp("") },
  }),
  dataProvider: (block) => ({ richText: block.content + " from data provider" }),
});

registerChaiServerBlock(Heading, {
  type: "Heading",
  dataProvider: async (args: any) => {
    return {
      richText: args.block.content,
    };
  },
});

registerChaiBlock(Heading, {
  type: "Heading",
  label: "Heading",
  group: "Typography",
  i18nProps: ["content", "image.alt"],
  aiProps: ["content", "image.alt"],
  ...registerChaiBlockSchema({
    properties: { name: stylesProp("") },
  }),
  dataProvider: (block) => ({ richText: block.content + " from data provider" }),
});
