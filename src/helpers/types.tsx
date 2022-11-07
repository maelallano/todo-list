export interface ListType {
  id: number;
  name: string;
  color: string;
}
export type ListsType = ListType[];

export interface TodoType {
  id: number;
  title: string;
  description: string;
  listId: number;
}
export type TodosType = TodoType[];
