export interface CardsType {
  description: string;
}

export interface ListsType {
  title: string;
  cards: CardsType[];
}

export interface TodoListType {
  title: string;
  lists: ListsType[];
}
