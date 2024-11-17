import { registerChaiBlockSchema } from "../index";
import type { ChaiBlockSchema } from "../index";

describe("registerChaiBuilderBlockProps", () => {
  it("should handle empty props", () => {
    const input = {
      properties: {},
    };

    const result = registerChaiBlockSchema(input);

    expect(result).toEqual({
      schema: {},
      uiSchema: {},
    });
  });

  it("should extract UI schemas from props", () => {
    const input: ChaiBlockSchema = {
      properties: {
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

    const result = registerChaiBlockSchema(input);

    expect(result).toEqual({
      schema: {
        properties: {
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
    const input: ChaiBlockSchema = {
      properties: {
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

    const result = registerChaiBlockSchema(input);

    expect(result).toEqual({
      schema: {
        properties: {
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
    const input: ChaiBlockSchema = {
      properties: {
        title: {
          type: "string",
        },
      },
      ui: {
        "ui:order": ["title"],
      },
    };

    const result = registerChaiBlockSchema(input);

    expect(result).toEqual({
      schema: {
        properties: {
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
    const input: ChaiBlockSchema = {
      properties: {
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

    const result = registerChaiBlockSchema(input);

    expect(result).toEqual({
      schema: {
        properties: {
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
      registerChaiBlockSchema({
        properties: {
          _id: { type: "string" }, // reserved prop
          normalProp: { type: "string" },
        },
      }),
    ).toThrow("Reserved props are not allowed");
  });
});
