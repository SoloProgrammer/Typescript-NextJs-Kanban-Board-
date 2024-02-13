"use client";
import { DEFAULT_CARDS } from "@/data/cards";
import {
  AddCardPropsType,
  CardPropsType,
  CardType,
  ColumnPropsType,
  DropIndicatorPropsType,
  TrashBinPropsType,
} from "@/types/types";
import React, { DragEvent, FormEvent, useRef, useState } from "react";
import { FaFire } from "react-icons/fa";
import { FiTrash } from "react-icons/fi";
import { motion } from "framer-motion";

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
  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setActive(false);
  };

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

const Column = ({
  title,
  headingColor,
  column,
  cards,
  setCards,
}: ColumnPropsType) => {
  const filteredCards = cards.filter((c) => c.column === column);
  const [active, setActive] = useState(false);
  const handleDragStart = (e: DragEvent<HTMLDivElement>, id: string) => {
    // e.dataTransfer.clearData();
    e.dataTransfer.setData("cardId", id);
  };
  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    highlightIndicator(e);
    setActive(true);
  };
  const handleDragEnd = () => {
    clearHighlights();
    setActive(false);
  };
  const handleDrop = (e: DragEvent) => {
    handleDragEnd();
    const cardId = e.dataTransfer.getData("cardId");
    // console.log(id);
    const indicators = getIndicators();
    const { element } = getNearestindicator(e, indicators);

    const before = (element as HTMLElement).dataset.before;

    if (!before) return;

    if (before !== cardId) {
      let copy = structuredClone(cards);

      const moveToEnd = before === "-1";

      let cardToTransfer = cards.filter((c) => c.id === cardId)[0];

      cardToTransfer = { ...cardToTransfer, column };

      copy = copy.filter((c) => c.id !== cardId);

      if (moveToEnd) {
        copy.push(cardToTransfer);
      } else {
        const insertAtIndex = copy.findIndex((c) => c.id === before);
        copy.splice(insertAtIndex, 0, cardToTransfer);
      }

      setCards(copy);
    }
  };
  const highlightIndicator = (e: DragEvent) => {
    const indicators = getIndicators();
    clearHighlights();
    const el = getNearestindicator(e, indicators);
    (el.element as HTMLElement).style.opacity = "1";
  };
  const clearHighlights = () => {
    const indicators = getIndicators();
    indicators.forEach((elm) => ((elm as HTMLElement).style.opacity = "0"));
  };
  const getNearestindicator = (e: DragEvent, indicators: Element[]) => {
    const el = indicators.reduce(
      (closest, child) => {
        const indicatorRects = child.getBoundingClientRect();
        const offset = e.clientY - (indicatorRects.top + 100);

        if (offset < 0 && offset > closest.offset) {
          return { offset, element: child };
        } else {
          return closest;
        }
        // console.log(
        //   "-----------",
        //   indicatorRects,
        //   child,
        //   offset,
        //   e.clientY,
        //   closest.offset
        // );
      },
      {
        offset: -Infinity,
        element: indicators.at(-1),
      }
    );

    return el;
  };
  const getIndicators = () => {
    return Array.from(document.querySelectorAll(`[data-column=${column}]`));
  };
  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragEnd}
      onDrop={handleDrop}
      className="w-60 shrink-0"
    >
      <div className="flex gap-2">
        <h3 className={`${headingColor}`}>{title}</h3>
        <span>{filteredCards.length}</span>
      </div>
      <div
        className={`mt-6 h-full w-full transition-colors bg-neutral-800/${
          active ? "40" : "0"
        }`}
      >
        {filteredCards.map((card: CardType) => {
          return (
            <Card key={card.id} {...card} handleDragStart={handleDragStart} />
          );
        })}
        <DropIndicator beforeId={"-1"} column={column} />
        <AddCard cards={cards} column={column} setCards={setCards} />
      </div>
    </div>
  );
};

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

const DropIndicator = ({ beforeId, column }: DropIndicatorPropsType) => (
  <div
    data-before={beforeId || -1}
    data-column={column}
    className="indicator h-[3px] my-0.5 bg-violet-500 w-full opacity-0 transition-opacity duration-[40ms]"
  ></div>
);

export default Board;
