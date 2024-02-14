"use client";
import { AddCardPropsType } from "@/types/types";
import React, { FormEvent, useRef, useState } from "react";
import { motion } from "framer-motion";
const AddCard = ({ column, setCards, cards }: AddCardPropsType) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(!isOpen);

  const titleRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const title = titleRef?.current?.value!;
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
        <motion.form layout className="w-full mt-[7px]" onSubmit={handleSubmit}>
          <textarea
            className="w-full h-full bg-violet-500/20 outline-none rounded-md p-4 border border-violet-400 placeholder-violet-200 text-neutral-50"
            name="addcard"
            placeholder="Add new task..."
            id="addcard"
            ref={titleRef}
            autoFocus
            autoComplete="false"
            cols={30}
            rows={2}
          ></textarea>
          <div className="flex items-center gap-2 justify-end">
            <span
              onClick={handleOpen}
              className="text-neutral-300 hover:text-neutral-100 cursor-pointer text-xs"
            >
              Close
            </span>
            <button className="bg-white hover:bg-slate-200 text-black text-xs px-2 py-1 rounded-sm">
              Add +
            </button>
          </div>
        </motion.form>
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
