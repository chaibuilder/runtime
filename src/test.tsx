import { registerChaiBlock } from "./package/v2/runtime";
import { ChaiBlockComponentProps, registerChaiServerBlock } from "./package/v2/runtime/core";
import { closestBlockProp, registerChaiBlockSchema, runtimeProp, stylesProp } from "./package/v2";
import { ChaiDataProviderArgs } from "./package/controls/types";

type HeadingProps = {
  level: string;
  content: string;
};

type ServerProps = {
  richText: string;
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

registerChaiBlock<HeadingProps, ServerProps, ChaiDataProviderArgs<HeadingProps, { params: any }>>(Heading, {
  type: "Heading",
  label: "Heading",
  group: "Typography",
  ...schemas,
  i18nProps: ["content", "image.alt"],
  aiProps: ["content", "image.alt"],
  schema: {
    properties: {},
  },
  dataProvider: (args) => ({ richText: args.block.content + " from data provider" }),
});

registerChaiServerBlock<HeadingProps, ServerProps, ChaiDataProviderArgs<HeadingProps, { params: any }>>(Heading, {
  type: "Heading",
  dataProvider: async (args) => {
    return {
      richText: args.block.content,
    };
  },
});
