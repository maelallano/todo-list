import styles from "./List.module.scss";

import { TodosType } from "helpers/types";
import { Todo, AddTodo } from "..";

type Props = {
  index?: number;
  title: string;
  todos?: TodosType;
  setTodosData: React.Dispatch<React.SetStateAction<TodosType>>;
};

const List: React.FC<Props> = ({ index, title, todos, setTodosData }) => {
  return (
    <div key={`list_${index}`} className={styles.list}>
      <h3 className={styles.title}>{title}</h3>
      {todos?.map((todo, index) => (
        <Todo title={todo.title} index={index} />
      ))}
      <AddTodo setTodosData={setTodosData} />
    </div>
  );
};

export default List;
