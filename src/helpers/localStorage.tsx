import { KeysLS } from "./constants";
import { ListsType, ListType, TodosType, TodoType } from "./types";
import { generateUniqueId } from "./utils";

// ---------- CRUD for Lists ----------
// CREATE
export function addListLS(listToAdd: ListType): ListsType {
  const lists = getListsLS();

  const newUniqueId = lists.length
    ? generateUniqueId(lists.map((v: ListType) => v.id))
    : 0;

  const newLists = [
    ...lists,
    { ...listToAdd, id: newUniqueId, order: lists.length },
  ];
  localStorage.setItem(KeysLS.Lists, JSON.stringify(newLists));

  return newLists;
}

// READ
export const getListsLS = (): ListsType =>
  JSON.parse(localStorage.getItem(KeysLS.Lists) || "[]");
export function getListLS(id: number): ListType | undefined {
  return getListsLS().find((list) => list.id === id);
}

// UPDATE
export function updateListLS(updatedList: ListType): ListsType {
  const updatedLists = getListsLS().map((listOld: ListType) => ({
    ...listOld,
    ...[updatedList].find((listNew) => listNew.id === listOld.id),
  }));

  localStorage.setItem(KeysLS.Lists, JSON.stringify(updatedLists));

  return updatedLists;
}
export function updateListsOrderLS(
  listToUpdate: ListType,
  newOrder: number
): ListsType {
  const tempUpdatedLists = getListsLS().map((listOld: ListType) => ({
    ...listOld,
    ...[{ ...listToUpdate, order: newOrder }].find(
      (listNew) => listNew.id === listOld.id
    ),
  }));

  const direction = newOrder < listToUpdate.order ? "LEFT" : "RIGHT";

  const updatedLists = tempUpdatedLists.map((listOld: ListType) => {
    if (listOld.id === listToUpdate.id) return { ...listOld };
    if (
      direction === "LEFT" &&
      listOld.order <= listToUpdate.order &&
      listOld.order >= newOrder
    )
      return { ...listOld, order: listOld.order + 1 };
    if (
      direction === "RIGHT" &&
      listOld.order >= listToUpdate.order &&
      listOld.order <= newOrder
    )
      return { ...listOld, order: listOld.order - 1 };
    return { ...listOld };
  });

  localStorage.setItem(KeysLS.Lists, JSON.stringify(updatedLists));

  return updatedLists;
}

// DELETE
export function removeListLS(listToRemove: ListType): {
  updatedLists: ListsType;
  updatedTodos: TodosType;
} {
  const { id: listIdToRemove, order } = listToRemove;
  const lists = getListsLS();
  const todos = getTodosLS();

  const updatedLists = lists
    .filter((listOld: ListType) => listOld.id !== listIdToRemove)
    .map((listOld: ListType) =>
      listOld.order > order
        ? { ...listOld, order: listOld.order - 1 }
        : { ...listOld }
    );

  localStorage.setItem(KeysLS.Lists, JSON.stringify(updatedLists));

  const updatedTodos = todos.filter(
    (todoOld: TodoType) => todoOld.listId !== listIdToRemove
  );
  localStorage.setItem(KeysLS.Todos, JSON.stringify(updatedTodos));

  return { updatedLists, updatedTodos };
}

// ---------- CRUD for Todos ----------
// CREATE
export function addTodoLS(todoToAdd: TodoType): TodosType {
  const todos = getTodosLS();

  const newUniqueId = todos.length
    ? generateUniqueId(todos.map((v: TodoType) => v.id))
    : 0;

  const newTodos = [...todos, { ...todoToAdd, id: newUniqueId }];
  localStorage.setItem(KeysLS.Todos, JSON.stringify(newTodos));

  return newTodos;
}

// READ
export const getTodosLS = (): TodosType =>
  JSON.parse(localStorage.getItem(KeysLS.Todos) || "[]");
export function getTodoLS() {}

// UPDATE
export function updateTodoLS(updatedTodo: TodoType): TodosType {
  const updatedTodos = getTodosLS().map((todoOld: TodoType) => ({
    ...todoOld,
    ...[updatedTodo].find((todoNew) => todoNew.id === todoOld.id),
  }));

  localStorage.setItem(KeysLS.Todos, JSON.stringify(updatedTodos));

  return updatedTodos;
}

// DELETE
export function removeTodoLS(todoIdToRemove: number): TodosType {
  const updatedTodos = getTodosLS().filter(
    (todoOld: TodoType) => todoOld.id !== todoIdToRemove
  );

  localStorage.setItem(KeysLS.Todos, JSON.stringify(updatedTodos));

  return updatedTodos;
}
