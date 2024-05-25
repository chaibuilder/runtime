import Frame from "react-frame-component";
import { IframeInitialContent } from "./Iframe.ts";
import { useChaiBlocks } from "./package/runtime";
import React from "react";
import { applyBindings, getStyleAttrs } from "./helper.ts";
import { BLOCKS } from "./BLOCKS.tsx";

const RenderBlock = ({ block }: { block: any }) => {
  const blocks = useChaiBlocks();
  const blockDef = blocks[block._type];
  return React.createElement(blockDef.component, {
    blockProps: {
      "data-block-id": block._id,
      "data-block-type": block._type,
      "data-dnd": blockDef.canHaveChildBlock && blockDef.canHaveChildBlock() ? "branch" : "leaf",
    },
    inBuilder: true,
    ...applyBindings(block, {}),
    ...getStyleAttrs(block),
  });
};

function App() {
  return (
    <div className="grid grid-cols-2 h-screen w-screen">
      <div className={"p-5 border-r"}>
        <Frame className={"w-full border h-full"} initialContent={IframeInitialContent}>
          <RenderBlock block={BLOCKS["Box"]} />
          <RenderBlock block={BLOCKS["Heading"]} />
        </Frame>
      </div>
      <div className={"p-5 bg-gray-100"}>Iframe</div>
    </div>
  );
}

export default App;
