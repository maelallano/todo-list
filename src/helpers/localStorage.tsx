import { KeysLS } from "./constants";
import { ListsType, ListType, TodosType, TodoType } from "./types";
import { generateUniqueId } from "./utils";

// ---------- CRUD for Lists ----------
// CREATE
export function addListLS(valueToAdd: ListType): ListsType {
  const valueTemp = getListsLS();

  const newUniqueId = valueTemp.length
    ? generateUniqueId(valueTemp.map((v: ListType) => v.id))
    : 0;

  const newValue = [...valueTemp, { ...valueToAdd, id: newUniqueId }];
  localStorage.setItem(KeysLS.Lists, JSON.stringify(newValue));

  return newValue;
}

// READ
export const getListsLS = (): ListsType =>
  JSON.parse(localStorage.getItem(KeysLS.Lists) || "[]");
export function getListLS(id: number): ListType | undefined {
  return getListsLS().find((list) => list.id === id);
}

// UPDATE
export function updateListLS() {}

// DELETE
export function removeListLS(listIdToRemove: number): {
  updatedLists: ListsType;
  updatedTodos: TodosType;
} {
  const lists = getListsLS();
  const todos = getTodosLS();

  const updatedLists = lists.filter(
    (listOld: ListType) => listOld.id !== listIdToRemove
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
export function addTodoLS(valueToAdd: TodoType): TodosType {
  const valueTemp = getTodosLS();

  const newUniqueId = valueTemp.length
    ? generateUniqueId(valueTemp.map((v: TodoType) => v.id))
    : 0;

  const newValue = [...valueTemp, { ...valueToAdd, id: newUniqueId }];
  localStorage.setItem(KeysLS.Todos, JSON.stringify(newValue));

  return newValue;
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
