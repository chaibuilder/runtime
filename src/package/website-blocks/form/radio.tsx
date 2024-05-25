import { RadiobuttonIcon } from "@radix-ui/react-icons";
import { Checkbox, SingleLineText, Styles } from "../../controls";
import { registerChaiBlock } from "../../runtime";
import { generateUUID } from "../../helper/lib.ts";
import { ChaiBlock } from "../../helper/types/ChaiBlock.ts";

const RadioBlock = (
  block: ChaiBlock & {
    blockProps: Record<string, string>;
    styles: Record<string, string>;
    inputStyles: Record<string, string>;
    required: boolean;
    checked: boolean;
  },
) => {
  const { blockProps, fieldName, label, styles, inputStyles, checked, required, showLabel = true } = block;
  const fieldId = generateUUID();

  if (!showLabel)
    return (
      <input
        id={fieldId}
        {...blockProps}
        {...inputStyles}
        {...styles}
        type="radio"
        required={required}
        checked={checked}
        name={fieldName}
      />
    );
  return (
    <div {...styles} {...blockProps}>
      <input {...inputStyles} name={fieldName} id={fieldId} type="radio" required={required} defaultChecked={checked} />
      {label && <label htmlFor={fieldId}>{label}</label>}
    </div>
  );
};

registerChaiBlock(RadioBlock, {
  type: "Radio",
  label: "Radio",
  category: "core",
  icon: RadiobuttonIcon,
  group: "form",
  hidden: true,
  props: {
    styles: Styles({ default: "flex items-center w-max gap-x-2" }),
    fieldName: SingleLineText({ title: "Field Name", default: "radio" }),
    label: SingleLineText({ title: "Label", default: "Label" }),
    checked: Checkbox({ title: "Checked", default: false }),
    required: Checkbox({ title: "Required", default: false }),
  },
});

export default RadioBlock;
