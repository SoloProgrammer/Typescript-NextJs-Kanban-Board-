import { DragEvent } from "react";

export type CardType = {
  title: string;
  id: string;
  column: string;
};
export type CardPropsType = {
  handleDragStart: Function;
} & CardType;

export type AddCardPropsType = {
  column: string;
  cards: CardType[];
  setCards: React.Dispatch<React.SetStateAction<CardType[]>>;
};

export type TrashBinPropsType = {
  setCards: React.Dispatch<React.SetStateAction<CardType[]>>;
  cards: CardType[];
};

export type ColumnPropsType = {
  title: string;
  headingColor: string;
  column: string;
  cards: CardType[];
  setCards: React.Dispatch<React.SetStateAction<CardType[]>>;
};

export type DropIndicatorPropsType = {
  beforeId: string;
  column: string;
};
