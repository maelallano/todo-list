import { useEffect, useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import styles from "./List.module.scss";

import { ListsType, ListType, TodosType } from "helpers/types";
import { Todo, AddTodo } from "..";
import { BinSVG } from "assets/icons";
import {
  getListsLS,
  removeListLS,
  updateListsOrderLS,
} from "helpers/localStorage";

type FormValues = { order: number };

type Props = {
  list: ListType;
  todos?: TodosType;
  setListsData: React.Dispatch<React.SetStateAction<ListsType>>;
  setTodosData: React.Dispatch<React.SetStateAction<TodosType>>;
};

const List: React.FC<Props> = ({ list, todos, setListsData, setTodosData }) => {
  const { id, title } = list;
  const { register, handleSubmit, watch } = useForm<FormValues>();
  const refSubmitButton = useRef<HTMLButtonElement>(null);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if (Number(data.order) === list.order) return;

    setListsData(updateListsOrderLS(list, Number(data.order)));
  };

  const triggerSubmit = () => refSubmitButton?.current?.click();

  useEffect(() => {
    const subscription = watch(triggerSubmit);
    return () => subscription.unsubscribe();
  }, [watch]);

  const handleDelete = () => {
    const { updatedLists, updatedTodos } = removeListLS(list);
    setListsData(updatedLists);
    setTodosData(updatedTodos);
  };

  return (
    <li className={styles.list}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.topBar}>
          <h3 className={styles.title}>{title}</h3>

          <div className={styles.topBar_right}>
            <select {...register("order")} value={list.order}>
              {getListsLS()
                .sort((a, b) => a.order - b.order)
                .map((value: ListType) => (
                  <option key={value.id} value={value.order}>
                    {value.order + 1}
                  </option>
                ))}
            </select>

            <button className={styles.deleteBtn} onClick={handleDelete}>
              <BinSVG />
            </button>
          </div>
        </div>

        <button hidden={true} ref={refSubmitButton} type={"submit"} />
      </form>

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
