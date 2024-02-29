import * as React from "react";
import { RichText, Styles } from "../controls";
import { registerChaiBlock } from "../runtime/builder-blocks";
import {
  BorderAllIcon,
  BorderTopIcon,
  DragHandleHorizontalIcon,
  TableIcon,
  ViewHorizontalIcon,
} from "@radix-ui/react-icons";
import { isEmpty } from "lodash";
import EmptySlot from "./empty-slot";
import { generateUUID } from "../helper/lib.ts";
import { ChaiBlock } from "../helper/types/ChaiBlock.ts";

const getDefaultBlocks = (type: string): ChaiBlock[] => {
  const td = (id: string, content: string) => ({
    _id: generateUUID(),
    _parent: id,
    _type: "TableCell",
    styles: "#styles:,",
    content: `${type === "TableHead" ? "Table Head" : "Table Cell " + content}`,
  });

  const tr = (id?: string) => {
    const trId = generateUUID();
    const rootBlock: any = {
      _type: "TableRow",
      _id: trId,
      styles: "#styles:,border-b",
    };
    if (id) rootBlock._parent = id;
    return [rootBlock, td(trId, "1"), td(trId, "2"), td(trId, "3")];
  };

  const thead = (id?: string) => {
    const theadId = generateUUID();
    const rootBlock: any = {
      _id: theadId,
      _type: "TableHead",
      styles: "#styles:,font-medium",
    };
    if (id) rootBlock._parent = id;
    return [rootBlock, ...tr(theadId)];
  };

  const tbody = (id?: string) => {
    const tbodyId = generateUUID();
    const rootBlock: any = {
      _id: tbodyId,
      _type: "TableBody",
      styles: "#styles:,",
    };
    if (id) rootBlock._parent = id;
    return [rootBlock, ...tr(tbodyId), ...tr(tbodyId)];
  };

  if (type === "Table") {
    const tableId = generateUUID();
    return [
      {
        _id: tableId,
        _type: "Table",
        styles: "#styles:,w-full text-left text-gray-500 dark:text-gray-400",
      },
      ...thead(tableId),
      ...tbody(tableId),
    ];
  }

  if (type === "TableRow") return tr();
  if (type === "TableHead") return thead();
  if (type === "TableBody") return tbody();

  return [];
};

const TableBlock = (
  props: ChaiBlock & {
    children: React.ReactNode;
    styles: any;
    tag: string;
    blockProps: Record<string, string>;
  },
) => {
  const { blockProps, children, styles } = props;
  if (!children) {
    return <EmptySlot blockProps={blockProps} text="TABLE HEAD / BODY" />;
  }
  return React.createElement("table", { ...blockProps, ...styles }, children);
};

registerChaiBlock(TableBlock, {
  type: "Table",
  label: "Table",
  category: "core",
  group: "table",
  icon: TableIcon,
  props: {
    styles: Styles({ default: "" }),
  },
  blocks: getDefaultBlocks("Table"),
});

const TableHeadBlock = (
  props: ChaiBlock & {
    children: React.ReactNode;
    styles: any;
    tag: string;
    blockProps: Record<string, string>;
  },
) => {
  const { blockProps, children, styles } = props;
  if (!children) {
    return <EmptySlot blockProps={blockProps} text="TABLE ROW" />;
  }
  return React.createElement("thead", { ...blockProps, ...styles }, children);
};

registerChaiBlock(TableHeadBlock, {
  type: "TableHead",
  label: "Table Head",
  category: "core",
  group: "table",
  icon: BorderTopIcon,
  props: {
    styles: Styles({ default: "" }),
  },
  blocks: getDefaultBlocks("TableHead"),
});

const TableBodyBlock = (
  props: ChaiBlock & {
    children: React.ReactNode;
    styles: any;
    tag: string;
    blockProps: Record<string, string>;
  },
) => {
  const { blockProps, children, styles } = props;
  if (!children) {
    return <EmptySlot blockProps={blockProps} text="TABLE ROW" />;
  }
  return React.createElement("tbody", { ...blockProps, ...styles }, children);
};

registerChaiBlock(TableBodyBlock, {
  type: "TableBody",
  label: "Table Body",
  category: "core",
  group: "table",
  icon: BorderAllIcon,
  props: {
    styles: Styles({ default: "" }),
  },
  blocks: getDefaultBlocks("TableBody"),
});

const TableRowBlock = (
  props: ChaiBlock & {
    children: React.ReactNode;
    styles: any;
    tag: string;
    blockProps: Record<string, string>;
  },
) => {
  const { blockProps, children, styles } = props;
  if (!children) {
    return <EmptySlot blockProps={blockProps} text="TABLE CELL" />;
  }

  return React.createElement("tr", { ...blockProps, ...styles }, children);
};

registerChaiBlock(TableRowBlock, {
  type: "TableRow",
  label: "Table Row",
  category: "core",
  group: "table",
  icon: ViewHorizontalIcon,
  props: {
    styles: Styles({ default: "w-full" }),
  },
  blocks: getDefaultBlocks("TableRow"),
});

const TableCellBlock = (
  props: ChaiBlock & {
    children: React.ReactNode;
    styles: any;
    tag: string;
    blockProps: Record<string, string>;
  },
) => {
  const { blockProps, children, content, styles } = props;

  if (!children && isEmpty(content)) {
    return <EmptySlot blockProps={blockProps} />;
  }

  if (!children) {
    return React.createElement("td", {
      ...blockProps,
      ...styles,
      dangerouslySetInnerHTML: { __html: content },
    });
  }
  return React.createElement("td", { ...blockProps, ...styles }, children);
};

registerChaiBlock(TableCellBlock, {
  type: "TableCell",
  label: "Table Cell",
  category: "core",
  group: "table",
  icon: DragHandleHorizontalIcon,
  props: {
    styles: Styles({ default: "" }),
    content: RichText({ title: "Content", default: "Table cell item" }),
  },
});

export default TableBlock;
