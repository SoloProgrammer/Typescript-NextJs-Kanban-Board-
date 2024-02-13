"use client";
import { DEFAULT_CARDS } from "@/data/cards";
import { CardType } from "@/types/types";
import React, { useState } from "react";
import TrashBin from "./TrashBin";
import Column from "./Column";

const Board = () => {
  const [cards, setCards] = useState<CardType[]>(DEFAULT_CARDS);
  return (
    <div className="h-full w-full overflow-scroll flex gap-3 p-10">
      <Column
        title="Backlog"
        column="backlog"
        headingColor="text-neutral-500"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="TODO"
        column="todo"
        headingColor="text-yellow-200"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="In progress"
        column="doing"
        headingColor="text-blue-200"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="Complete"
        column="done"
        headingColor="text-emerald-200"
        cards={cards}
        setCards={setCards}
      />
      <TrashBin setCards={setCards} cards={cards} />
    </div>
  );
};

export default Board;
