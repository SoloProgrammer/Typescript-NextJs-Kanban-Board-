import { TrashBinPropsType } from "@/types/types";
import React, { DragEvent, useState } from "react";
import { FaFire } from "react-icons/fa";
import { FiTrash } from "react-icons/fi";

const TrashBin = ({ setCards, cards }: TrashBinPropsType) => {
  const [active, setActive] = useState(false);

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("cardId");
    setCards(cards.filter((c) => c.id !== id));
    e.dataTransfer.clearData();
    setActive(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setActive(true);
  };
  const handleDragLeave = () => setActive(false);

  return (
    <div className="flex flex-col gap-7">
      <h1 className="text-red-500 text-center">TRASH BIN</h1>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`h-56 text-2xl w-56 shrink-0 grid place-content-center border transition-colors ${
          active
            ? "bg-red-900/30 border-red-800 text-red-600"
            : "bg-neutral-500/20 border-neutral-500 text-neutral-500"
        } rounded-md text-neutral-400`}
      >
        {!active ? <FiTrash /> : <FaFire className="animate-bounce" />}
      </div>
    </div>
  );
};

export default TrashBin;
