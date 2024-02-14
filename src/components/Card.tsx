import { CardPropsType } from "@/types/types";
import React, { DragEvent, useState } from "react";
import { motion } from "framer-motion";
import DropIndicator from "./DropIndicator";
import TextEditor from "./TextEditor";

const Card = ({ title, id, column, setCards }: CardPropsType) => {
  const [active, setActive] = useState<Boolean>(false);

  const [clicked, setClicked] = useState<Boolean>(false);

  const onDragStart = (
    e: DragEvent<HTMLDivElement> | MouseEvent | TouchEvent | PointerEvent
  ) => {
    (e as DragEvent<HTMLDivElement>).dataTransfer.setData("cardId", id);
    setActive(true);
  };

  const updateCard = (title: string) => {
    if (title.trim().length < 1) return;

    setCards((prev) => {
      return prev.map((card) => {
        if (card.id === id) {
          card.title = title;
        }
        return card;
      });
    });
    setClicked(false);
  };

  const handleClicked = () => setClicked(!clicked);

  return (
    <>
      <DropIndicator beforeId={id} column={column} />
      {clicked ? (
        <TextEditor
          handleClose={handleClicked}
          handleSubmit={updateCard}
          value={title}
          buttonCopy={<>Save ✓</>}
          classes={`border-neutral-500 bg-neutral-800/50`}
        />
      ) : (
        <motion.div
          layoutId={id}
          id={id}
          onClick={handleClicked}
          layout
          onDragStart={onDragStart}
          onDragEnd={() => setActive(false)}
          draggable
          className={`${
            clicked && "border-violet-500"
          } p-4  text-neutral-[150] border rounded-md cursor-grab active:cursor-grabbing  ${
            active
              ? "border-violet-500 bg-violet-400/20"
              : "border-neutral-500 bg-neutral-800/85"
          }`}
        >
          <p>{title}</p>
        </motion.div>
      )}
    </>
  );
};

export default Card;
