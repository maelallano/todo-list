import styles from "./List.module.scss";

import { ListsType, ListType, TodosType } from "helpers/types";
import { Todo, AddTodo } from "..";
import { BinSVG } from "assets/icons";
import { removeListLS } from "helpers/localStorage";

type Props = {
  list: ListType;
  todos?: TodosType;
  setListsData: React.Dispatch<React.SetStateAction<ListsType>>;
  setTodosData: React.Dispatch<React.SetStateAction<TodosType>>;
};

const List: React.FC<Props> = ({ list, todos, setListsData, setTodosData }) => {
  const { id, title } = list;

  const handleDelete = () => {
    const { updatedLists, updatedTodos } = removeListLS(list.id);
    setListsData(updatedLists);
    setTodosData(updatedTodos);
  };

  return (
    <li className={styles.list}>
      <div className={styles.topBar}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.topBar_right}>
          {/* <select {...register("list")} value={getListLS(listId)?.id}>
            {getListsLS()?.map((value: ListType) => (
              <option key={value.id} value={value.id}>
                {value.title}
              </option>
            ))}
          </select> */}

          <button className={styles.deleteBtn} onClick={handleDelete}>
            <BinSVG />
          </button>
        </div>
      </div>
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
