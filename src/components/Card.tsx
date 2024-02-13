import { CardPropsType, DropIndicatorPropsType } from "@/types/types";
import React, { DragEvent, useState } from "react";
import { motion } from "framer-motion";
import DropIndicator from "./DropIndicator";

const Card = ({ title, id, column, handleDragStart }: CardPropsType) => {
  const [active, setActive] = useState(false);
  const onDragStart = (
    e: DragEvent<HTMLDivElement> | MouseEvent | TouchEvent | PointerEvent
  ) => {
    handleDragStart(e, id);
    setActive(true);
  };
  return (
    <>
      <DropIndicator beforeId={id} column={column} />
      <motion.div
        layoutId={id}
        id={id}
        layout
        onDragStart={onDragStart}
        onDragEnd={() => setActive(false)}
        draggable
        className={`p-4  text-neutral-[150] border rounded-md cursor-grab active:cursor-grabbing  ${
          active
            ? "border-violet-500 bg-violet-400/20"
            : "border-neutral-500 bg-neutral-800/85"
        }`}
      >
        <p>{title}</p>
      </motion.div>
    </>
  );
};

export default Card;
