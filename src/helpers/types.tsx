export interface ListType {
  id: number;
  title: string;
  color?: string;
  order: number;
}
export type ListsType = ListType[];

export interface TodoType {
  id: number;
  title: string;
  description: string;
  listId: number;
  // 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
  priority: number;
}
export type TodosType = TodoType[];
