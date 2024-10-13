import { ControlDefinition, ControlProps } from "./index.ts";
import { get, omit } from "lodash-es";

export const Code = (props: ControlProps) =>
  ({
    type: "singular",
    default: props.default || "",
    binding: get(props, "binding", true),
    dataType: "string",
    schema: {
      type: "string",
      ...omit(props, ["i18n", "ai", "required"]),
    },
    uiSchema: {
      "ui:widget": "code",
    },
  }) as ControlDefinition;
