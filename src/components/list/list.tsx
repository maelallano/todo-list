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
        {todos
          ?.sort((a, b) => b.priority - a.priority)
          .map((todo, index) => (
            <Todo
              todo={todo}
              key={`todo_${todo.id}_${index}`}
              setTodosData={setTodosData}
            />
          ))}
      </ul>
      <AddTodo setTodosData={setTodosData} listId={id} />
    </li>
  );
};

export default List;
