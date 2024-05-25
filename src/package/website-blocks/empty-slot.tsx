import { omit } from "lodash-es";
import { cn } from "../helper/lib";

type EmptySlotProps = {
  blockProps?: any;
  className?: any;
  text?: string;
  styles?: any;
};
const EmptySlot = ({ blockProps, className = "", styles = {} }: EmptySlotProps) => {
  return (
    <div
      {...blockProps}
      className={cn("flex h-20 flex-col items-center justify-center", className)}
      {...omit(styles, ["className"])}>
      <div className="flex h-full w-full items-center justify-center  outline-dashed outline-1 -outline-offset-1 outline-gray-400 duration-300">
        <span className="opacit flex items-center gap-x-1.5 text-xs font-semibold text-gray-400"></span>
      </div>
    </div>
  );
};

export default EmptySlot;
