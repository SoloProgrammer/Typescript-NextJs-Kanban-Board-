import { ReactNode } from "react";

export type CardType = {
  title: string;
  id: string;
  column: string;
};
export type CardPropsType = {
  setCards: React.Dispatch<React.SetStateAction<CardType[]>>;
} & CardType;

export type AddCardPropsType = {
  column: string;
  cards: CardType[];
  setCards: React.Dispatch<React.SetStateAction<CardType[]>>;
};

export type TextEditorPropsType = {
  handleSubmit: (text: string) => void;
  handleClose: () => void;
  value?: string;
  buttonCopy: string | ReactNode;
  classes: string;
  placeholder?: string;
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
