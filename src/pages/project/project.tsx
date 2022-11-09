import { useState } from "react";

import styles from "./project.module.scss";

import { AddList, List } from "components";
import { dataLists, dataTodos } from "helpers/mockupData";
import { ListsType, ListType, TodosType, TodoType } from "helpers/types";
import { KeysLS } from "helpers/constants";

type Props = {};

const Project: React.FC<Props> = () => {
  const [listsData, setListsData] = useState<ListsType>(
    JSON.parse(localStorage.getItem(KeysLS.Lists) || "[]")
  );
  const [todosData, setTodosData] = useState<TodosType>(
    JSON.parse(localStorage.getItem(KeysLS.Todos) || "[]")
  );

  function handleResetData() {
    localStorage.setItem(KeysLS.Lists, JSON.stringify(dataLists));
    localStorage.setItem(KeysLS.Todos, JSON.stringify(dataTodos));
    window.location.reload();
  }

  return (
    <div className={styles.project}>
      <div className={styles.layout}>
        <header className={styles.header}>
          <h1 className={styles.title}>Todo list app</h1>
          <button className={styles.mockupDataBtn} onClick={handleResetData}>
            Mockup data
          </button>
        </header>
        <main className={styles.main}>
          <ul className={styles.todoList}>
            {listsData
              .sort((a, b) => a.order - b.order)
              .map((list: ListType, index: number) => (
                <List
                  key={`list_${list.id}_${index}`}
                  list={list}
                  todos={todosData.filter(
                    (todo: TodoType) => todo.listId === list.id
                  )}
                  setListsData={setListsData}
                  setTodosData={setTodosData}
                />
              ))}
          </ul>
          <AddList setListsData={setListsData} />
        </main>
      </div>
    </div>
  );
};

export default Project;
