import { registerChaiBlock, useChaiBlocks } from "./package/runtime";
import {SelectOption, Styles} from "./package/controls";

const BoxBlock = () => {
  return <div>Hello</div>;
};

registerChaiBlock(BoxBlock, {
  type: "ABC",
  label: "ABc",
  category: "core",
  group: "basic",
  props: {
    styles: Styles({ default: "bg-red-500" }),
    abc: SelectOption({ binding: false, title: "abc", options: [] }),
  },
});
function App() {
  console.log(useChaiBlocks());
  return <div className="bg-background text-foreground"></div>;
}

export default App;
