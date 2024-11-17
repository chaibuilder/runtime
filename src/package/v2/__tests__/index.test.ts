import { registerChaiBlockProps } from "../index";
import type { ChaiBlockPropsSchema } from "../index";

describe("registerChaiBuilderBlockProps", () => {
  it("should handle empty props", () => {
    const input = {
      props: {},
    };

    const result = registerChaiBlockProps(input);

    expect(result).toEqual({
      propsSchema: {},
      uiSchema: {},
    });
  });

  it("should extract UI schemas from props", () => {
    const input: ChaiBlockPropsSchema = {
      props: {
        title: {
          type: "string",
          ui: { "ui:widget": "textarea" },
        },
        description: {
          type: "string",
          ui: { "ui:widget": "markdown" },
        },
      },
    };

    const result = registerChaiBlockProps(input);

    expect(result).toEqual({
      propsSchema: {
        props: {
          title: {
            type: "string",
          },
          description: {
            type: "string",
          },
        },
      },
      uiSchema: {
        title: {
          "ui:widget": "textarea",
        },
        description: {
          "ui:widget": "markdown",
        },
      },
    });
  });

  it("should handle mixed props with and without UI schemas", () => {
    const input: ChaiBlockPropsSchema = {
      props: {
        title: {
          type: "string",
          ui: {
            "ui:widget": "textarea",
          },
        },
        enabled: {
          type: "boolean",
        },
      },
    };

    const result = registerChaiBlockProps(input);

    expect(result).toEqual({
      propsSchema: {
        props: {
          title: {
            type: "string",
          },
          enabled: {
            type: "boolean",
          },
        },
      },
      uiSchema: {
        title: {
          "ui:widget": "textarea",
        },
      },
    });
  });

  it("should handle root level UI schema", () => {
    const input: ChaiBlockPropsSchema = {
      props: {
        title: {
          type: "string",
        },
      },
      ui: {
        "ui:order": ["title"],
      },
    };

    const result = registerChaiBlockProps(input);

    expect(result).toEqual({
      propsSchema: {
        props: {
          title: {
            type: "string",
          },
        },
      },
      uiSchema: {
        "ui:order": ["title"],
      },
    });
  });

  it("should merge root and prop level UI schemas", () => {
    const input: ChaiBlockPropsSchema = {
      props: {
        title: {
          type: "string",
          ui: {
            "ui:widget": "textarea",
          },
        },
      },
      ui: {
        "ui:order": ["title"],
      },
    };

    const result = registerChaiBlockProps(input);

    expect(result).toEqual({
      propsSchema: {
        props: {
          title: {
            type: "string",
          },
        },
      },
      uiSchema: {
        "ui:order": ["title"],
        title: {
          "ui:widget": "textarea",
        },
      },
    });
  });

  it("throws error for reserved props", () => {
    expect(() =>
      registerChaiBlockProps({
        props: {
          _id: { type: "string" }, // reserved prop
          normalProp: { type: "string" },
        },
      }),
    ).toThrow("Reserved props are not allowed");
  });
});
