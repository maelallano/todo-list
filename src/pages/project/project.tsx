import { useState } from "react";

import styles from "./project.module.scss";

import { AddList, List } from "components";
import { dataLists, dataTodos } from "helpers/mockupData";
import { ListsType, ListType, TodosType, TodoType } from "helpers/types";
import { KeysLS } from "helpers/constants";

type Props = {};

const Project: React.FC<Props> = () => {
  const [listsData, setListsData] = useState<ListsType>(
    JSON.parse(localStorage.getItem(KeysLS.Lists) || "")
  );
  const [todosData, setTodosData] = useState<TodosType>(
    JSON.parse(localStorage.getItem(KeysLS.Todos) || "")
  );

  // console.log("listsData: ", listsData);
  // console.log("todosData: ", todosData);

  function handleResetData() {
    localStorage.setItem(KeysLS.Lists, JSON.stringify(dataLists));
    localStorage.setItem(KeysLS.Todos, JSON.stringify(dataTodos));
    window.location.reload();
  }

  return (
    <div className={styles.project}>
      <div className={styles.layout}>
        <header>
          <h1 className={styles.title}>Todo list project</h1>
          <button
            style={{
              background: "white",
              padding: "12px 16px",
              borderRadius: 3,
              fontSize: 20,
              marginBottom: 20,
              cursor: "pointer",
            }}
            onClick={handleResetData}
          >
            Reset data
          </button>
        </header>
        <main className={styles.main}>
          <ul className={styles.todoList}>
            {listsData?.map((list: ListType, index: number) => (
              <List
                key={`list_${list.id}_${index}`}
                list={list}
                todos={todosData?.filter(
                  (todo: TodoType) => todo.listId === list.id
                )}
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
