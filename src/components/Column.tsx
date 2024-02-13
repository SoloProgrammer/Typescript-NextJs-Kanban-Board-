import { CardType, ColumnPropsType } from "@/types/types";
import React, { DragEvent, useState } from "react";
import Card from "./Card";
import DropIndicator from "./DropIndicator";
import AddCard from "./AddCard";

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
        className={`mt-6 h-full w-full transition-colors  ${
          active ? "bg-neutral-800/40" : "bg-neutral-800/0"
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

export default Column;
