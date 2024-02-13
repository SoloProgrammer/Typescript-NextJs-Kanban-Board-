import { DropIndicatorPropsType } from "@/types/types";
import React from "react";

const DropIndicator = ({ beforeId, column }: DropIndicatorPropsType) => (
  <div
    data-before={beforeId || -1}
    data-column={column}
    className="indicator h-[3px] my-0.5 bg-violet-500 w-full opacity-0 transition-opacity duration-[40ms]"
  ></div>
);

export default DropIndicator;
