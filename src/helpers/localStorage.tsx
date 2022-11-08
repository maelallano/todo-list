import { KeysLS } from "./constants";
import { ListsType, ListType, TodosType, TodoType } from "./types";
import { generateUniqueId } from "./utils";

// CRUD for Lists
export function getListsLS(): ListsType {
  return JSON.parse(localStorage.getItem("lists") || "[]");
}
export function getListLS(id: number): ListType | undefined {
  return getListsLS().find((list) => list.id === id);
}

export function addListLS(valueToAdd: ListType): ListsType {
  const valueTemp = JSON.parse(localStorage.getItem(KeysLS.Lists) || "[]");

  const newUniqueId = valueTemp.length
    ? generateUniqueId(valueTemp.map((v: ListType) => v.id))
    : 0;

  const newValue = [...valueTemp, { ...valueToAdd, id: newUniqueId }];
  localStorage.setItem(KeysLS.Lists, JSON.stringify(newValue));

  return newValue;
}

export function removeListLS() {}
export function updateListLS() {}

// CRUD for Todos
export function getTodosLS() {}
export function getTodoLS() {}

export function addTodoLS(valueToAdd: TodoType): TodosType {
  const valueTemp = JSON.parse(localStorage.getItem(KeysLS.Todos) || "[]");

  const newUniqueId = valueTemp.length
    ? generateUniqueId(valueTemp.map((v: TodoType) => v.id))
    : 0;

  const newValue = [...valueTemp, { ...valueToAdd, id: newUniqueId }];
  localStorage.setItem(KeysLS.Todos, JSON.stringify(newValue));

  return newValue;
}

export function removeTodoLS(todoIdToRemove: number): TodosType {
  const todos = JSON.parse(localStorage.getItem(KeysLS.Todos) || "[]");

  const updatedTodos = todos.filter(
    (todoOld: TodoType) => todoOld.id !== todoIdToRemove
  );

  localStorage.setItem(KeysLS.Todos, JSON.stringify(updatedTodos));

  return updatedTodos;
}

export function updateTodoLS(updatedTodo: TodoType): TodosType {
  const todos = JSON.parse(localStorage.getItem(KeysLS.Todos) || "[]");

  const updatedTodos = todos.map((todoOld: TodoType) => ({
    ...todoOld,
    ...[updatedTodo].find((todoNew) => todoNew.id === todoOld.id),
  }));

  localStorage.setItem(KeysLS.Todos, JSON.stringify(updatedTodos));

  return updatedTodos;
}
