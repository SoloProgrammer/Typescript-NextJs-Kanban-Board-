"use client";
import { AddCardPropsType } from "@/types/types";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import TextEditor from "./TextEditor";

const AddCard = ({ column, setCards, cards }: AddCardPropsType) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(!isOpen);

  const titleRef = useRef<HTMLTextAreaElement>(null);

  const handleAddNewCard = (title: string) => {
    if (title?.trim()?.length! < 1) return;
    if (titleRef) {
      const newCard = {
        id: crypto.randomUUID(),
        title,
        column,
      };
      setCards([...cards, newCard]);
    }
    handleOpen();
  };

  return (
    <>
      {isOpen ? (
        <TextEditor
          handleClose={handleOpen}
          handleSubmit={handleAddNewCard}
          buttonCopy="Add +"
          classes="border-violet-400 placeholder-violet-200 bg-violet-500/20"
          placeholder="Add new task..."
        />
      ) : (
        <motion.button
          layout
          onClick={handleOpen}
          className="text-sm text-neutral-400 hover:text-neutral-200 cursor-pointer"
        >
          Add new +
        </motion.button>
      )}
    </>
  );
};
export default AddCard;
