import styles from "./todoList.module.scss";

import { List } from "..";
import { TodoListType, ListsType } from "helpers/types";

type Props = {
  dataTL: TodoListType;
  setDataTL: React.Dispatch<React.SetStateAction<TodoListType>>;
};

const TodoList: React.FC<Props> = ({ dataTL, setDataTL }) => {
  return (
    <div className={styles.todoList}>
      {dataTL?.lists.map((list: ListsType, index: number) => (
        <List index={index} title={list.title} cards={list.cards} />
      ))}
      <button className={styles.button}>Add a category</button>
    </div>
  );
};

export default TodoList;
