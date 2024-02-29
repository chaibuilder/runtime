import * as React from "react";
import { isEmpty } from "lodash";
import { GroupIcon, LetterCaseToggleIcon } from "@radix-ui/react-icons";
import { RichText, SingleLineText, Styles } from "../controls";
import { registerChaiBlock } from "../runtime/builder-blocks";
import EmptySlot from "./empty-slot";
import { ChaiBlock } from "../helper/types/ChaiBlock.ts";

const FormBlock = (
  props: ChaiBlock & {
    children: React.ReactNode;
    styles: any;
    tag: string;
    inBuilder: boolean;
    blockProps: Record<string, string>;
  },
) => {
  const { blockProps, errorMessage, name, _type, successMessage, action, styles, children } = props;

  if (!children && isEmpty(styles?.className)) {
    return <EmptySlot blockProps={blockProps} text="FORM FIELDS" />;
  }

  const alpineAttrs = {
    "x-data": "useForm",
    "x-on:submit.prevent": "post",
  };
  const formResponseAttr = {
    "x-html": "formResponse",
    ":class": "{'text-red-500': formStatus === 'ERROR', 'text-green-500': formStatus === 'SUCCESS'}",
  };
  return (
    <form
      {...alpineAttrs}
      data-error={errorMessage}
      data-success={successMessage}
      method={"post"}
      action={action}
      {...blockProps}
      {...styles}>
      <div {...formResponseAttr}></div>
      <input name={"formname"} type={"hidden"} value={name || _type} />
      {children}
    </form>
  );
};

export default FormBlock;

registerChaiBlock(FormBlock, {
  type: "Form",
  label: "Form",
  category: "core",
  icon: GroupIcon,
  group: "form",
  props: {
    styles: Styles({ default: "" }),
    action: SingleLineText({
      title: "Submit URL",
      default: "/api/form/submit",
    }),
    errorMessage: RichText({
      title: "Error Message",
      default: "Something went wrong. Please try again",
    }),
    successMessage: RichText({
      title: "Success Message",
      default: "Thank you for your submission.",
    }),
  },
});

const LabelBlock = (
  props: ChaiBlock & {
    children: React.ReactNode;
    styles: any;
    content: string;
    blockProps: Record<string, string>;
  },
) => {
  const { blockProps, content, styles, children } = props;
  const labelProps = { ...styles, ...blockProps };

  if (children) return React.createElement("label", labelProps, children);
  return React.createElement("label", {
    ...labelProps,
    dangerouslySetInnerHTML: { __html: content },
  });
};

registerChaiBlock(LabelBlock, {
  type: "Label",
  label: "Label",
  category: "core",
  icon: LetterCaseToggleIcon,
  group: "form",
  props: {
    styles: Styles({ default: "" }),
    content: SingleLineText({ title: "Content", default: "Label" }),
  },
});
