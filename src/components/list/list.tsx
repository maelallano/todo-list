import styles from "./List.module.scss";

import { ListType, TodosType } from "helpers/types";
import { Todo, AddTodo } from "..";

type Props = {
  list: ListType;
  todos?: TodosType;
  setTodosData: React.Dispatch<React.SetStateAction<TodosType>>;
};

const List: React.FC<Props> = ({ list, todos, setTodosData }) => {
  const { id, title } = list;
  return (
    <li className={styles.list}>
      <h3 className={styles.title}>{title}</h3>
      <ul>
        {todos?.map((todo, index) => (
          <Todo title={todo.title} key={`todo_${todo.id}_${index}`} />
        ))}
      </ul>
      <AddTodo setTodosData={setTodosData} listId={id} />
    </li>
  );
};

export default List;
