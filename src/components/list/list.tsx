import { useEffect, useState, useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import styles from "./List.module.scss";

import { ListsType, ListType, TodosType } from "helpers/types";
import { Todo, AddTodo } from "..";
import { BinSVG, CrossSVG } from "assets/icons";
import {
  getListsLS,
  removeListLS,
  updateListLS,
  updateListsOrderLS,
} from "helpers/localStorage";

type FormValues = { order: number; title: string };

type Props = {
  list: ListType;
  todos?: TodosType;
  setListsData: React.Dispatch<React.SetStateAction<ListsType>>;
  setTodosData: React.Dispatch<React.SetStateAction<TodosType>>;
};

const List: React.FC<Props> = ({ list, todos, setListsData, setTodosData }) => {
  const { id, title } = list;
  const [isTitleVisible, setIsTitleVisible] = useState(true);
  const { register, handleSubmit, watch, setValue, setFocus } =
    useForm<FormValues>();
  const refSubmitButton = useRef<HTMLButtonElement>(null);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    setListsData(
      updateListLS({
        ...list,
        title: data.title,
      })
    );

    setIsTitleVisible(true);

    if (Number(data.order) === list.order) return;
    setListsData(updateListsOrderLS(list, Number(data.order)));
  };

  const triggerSubmit = () => refSubmitButton?.current?.click();

  useEffect(() => {
    const subscription = watch((data, changedValue) => {
      if (changedValue.name === "order") triggerSubmit();
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  useEffect(() => {
    if (isTitleVisible) setValue("title", title);
    if (!isTitleVisible) setFocus("title");
  }, [isTitleVisible]);

  const handleDelete = () => {
    const { updatedLists, updatedTodos } = removeListLS(list);
    setListsData(updatedLists);
    setTodosData(updatedTodos);
  };

  return (
    <li className={styles.list}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.topBar}>
          {isTitleVisible ? (
            <h3
              className={styles.title}
              onClick={() => setIsTitleVisible(false)}
            >
              {title}
            </h3>
          ) : (
            <div className={styles.containerTitleInput}>
              <input
                {...register("title", { required: true })}
                className={styles.inputTitle}
                defaultValue={title}
              />
              <button
                type="button"
                className={styles.cancelBtn}
                onClick={() => setIsTitleVisible(true)}
              >
                <CrossSVG />
              </button>
            </div>
          )}

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

            <button
              type="button"
              className={styles.deleteBtn}
              onClick={handleDelete}
            >
              <BinSVG />
            </button>
          </div>
        </div>

        <button hidden={true} ref={refSubmitButton} type={"submit"} />
      </form>

      <ul className={styles.ulTodos}>
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
