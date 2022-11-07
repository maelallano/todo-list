import { KeysLS } from "./constants";
import { ListType, TodoType } from "./types";

// CRUD for Lists
export function getListsLS() {}
export function getListLS() {}
export function addListLS(valueToAdd: ListType) {
  const valueTemp = localStorage.getItem(KeysLS.Lists) || "";
  const newValue = JSON.parse(valueTemp)
    ? [...JSON.parse(valueTemp), valueToAdd]
    : [valueToAdd];
  const stringifiedValue = JSON.stringify(newValue);
  localStorage.setItem(KeysLS.Lists, stringifiedValue);

  return newValue
}
export function removeListLS() {}
export function updateListLS() {}

// CRUD for Todos
export function getTodosLS() {}
export function getTodoLS() {}
export function addTodoLS(valueToAdd: TodoType) {
  const valueTemp = localStorage.getItem(KeysLS.Todos) || "";
  const newValue = JSON.parse(valueTemp)
    ? [...JSON.parse(valueTemp), valueToAdd]
    : [valueToAdd];
  const stringifiedValue = JSON.stringify(newValue);
  localStorage.setItem(KeysLS.Todos, stringifiedValue);

  return newValue
}
export function removeTodoLS() {}
export function updateTodoLS() {}