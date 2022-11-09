import { useEffect, useState, useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import styles from "./List.module.scss";

import { ListsType, ListType, TodosType } from "helpers/types";
import { Todo, AddTodo, TopBarList } from "components";
import {
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
    if (isTitleVisible) setValue("title", list.title);
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
        <TopBarList
          isTitleVisible={isTitleVisible}
          setIsTitleVisible={setIsTitleVisible}
          register={register}
          list={list}
          handleDelete={handleDelete}
        />

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

      <AddTodo setTodosData={setTodosData} listId={list.id} />
    </li>
  );
};

export default List;
