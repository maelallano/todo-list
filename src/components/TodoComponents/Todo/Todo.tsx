import { useState, useEffect, useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import styles from "./Todo.module.scss";

import { TodosType, TodoType } from "helpers/types";
import { updateTodoLS, removeTodoLS } from "helpers/localStorage";
import UpdateTodoTitle from "components/TodoComponents/UpdateTodoTitle/UpdateTodoTitle";
import TopBarTodo from "../TopBarTodo/TopBarTodo";

type FormValues = { list: number; priority: number; title: string };

type Props = {
  todo: TodoType;
  setTodosData: React.Dispatch<React.SetStateAction<TodosType>>;
};

const Todo: React.FC<Props> = ({ todo, setTodosData }) => {
  const [isTitleVisible, setIsTitleVisible] = useState(true);
  const { register, handleSubmit, watch, setValue, setFocus } =
    useForm<FormValues>();
  const refSubmitButton = useRef<HTMLButtonElement>(null);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    setTodosData(
      updateTodoLS({
        ...todo,
        listId: Number(data.list),
        priority: Number(data.priority),
        title: data.title,
      })
    );

    setIsTitleVisible(true);
  };

  const triggerSubmit = () => refSubmitButton?.current?.click();

  useEffect(() => {
    const subscription = watch((data, changedValue) => {
      if (changedValue.name === "list" || changedValue.name === "priority")
        triggerSubmit();
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  useEffect(() => {
    if (isTitleVisible) setValue("title", todo.title);
    if (!isTitleVisible) setFocus("title");
  }, [isTitleVisible]);

  const handleDelete = () => setTodosData(removeTodoLS(todo.id));

  return (
    <li className={styles.todo}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <TopBarTodo
          register={register}
          todo={todo}
          handleDelete={handleDelete}
        />

        <UpdateTodoTitle
          isTitleVisible={isTitleVisible}
          setIsTitleVisible={setIsTitleVisible}
          register={register}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          title={todo.title}
        />

        <button hidden={true} ref={refSubmitButton} type={"submit"} />
      </form>
    </li>
  );
};

export default Todo;
