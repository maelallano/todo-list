import { useState, useEffect, useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import styles from "./Todo.module.scss";

import { ListType, TodosType, TodoType } from "helpers/types";
import {
  getListLS,
  getListsLS,
  updateTodoLS,
  removeTodoLS,
} from "helpers/localStorage";
import { BinSVG, CheckSVG, CrossSVG, FlagSVG } from "assets/icons";
import { PriorityValues } from "helpers/constants";
// import { Modal } from "components";

type FormValues = { list: number; priority: number; title: string };

type Props = {
  todo: TodoType;
  setTodosData: React.Dispatch<React.SetStateAction<TodosType>>;
};

const Todo: React.FC<Props> = ({ todo, setTodosData }) => {
  const { title, listId } = todo;
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
    if (isTitleVisible) setValue("title", title);
    if (!isTitleVisible) setFocus("title");
  }, [isTitleVisible]);

  const handleDelete = () => setTodosData(removeTodoLS(todo.id));

  return (
    <li className={styles.todo}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.topBar}>
          <div className={styles.priorityContainer}>
            <select {...register("priority")} value={todo.priority}>
              {PriorityValues.map((value: number) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
            <FlagSVG />
          </div>

          <div className={styles.topBar_right}>
            <select {...register("list")} value={getListLS(listId)?.id}>
              {getListsLS()
                .sort((a, b) => a.order - b.order)
                .map((value: ListType) => (
                  <option key={value.id} value={value.id}>
                    {value.title}
                  </option>
                ))}
            </select>

            <button className={styles.deleteBtn} onClick={handleDelete}>
              <BinSVG />
            </button>
          </div>
        </div>

        {isTitleVisible ? (
          <h4 className={styles.title} onClick={() => setIsTitleVisible(false)}>
            {title}
          </h4>
        ) : (
          <div className={styles.titleInputContainer}>
            <textarea
              {...register("title", { required: true })}
              className={styles.inputTitle}
              defaultValue={title}
            />
            <div className={styles.formContainer_right}>
              <button
                onClick={handleSubmit(onSubmit)}
                className={styles.addBtn}
              >
                <CheckSVG />
              </button>
              <button
                onClick={() => setIsTitleVisible(true)}
                className={styles.cancelBtn}
              >
                <CrossSVG />
              </button>
            </div>
          </div>
        )}

        <button hidden={true} ref={refSubmitButton} type={"submit"} />
      </form>
    </li>
  );
};

export default Todo;

// Modal future implementation

// const Todo: React.FC<Props> = ({ title }) => {
//   const [isModalShown, setIsModalShown] = useState(false);

//   function handleClick() {
//     console.log("title: ", title);
//     setIsModalShown(true);
//   }

//   return (
//     <>
//       <li className={styles.todo} onClick={handleClick}>
//         <p className={styles.title}>{title}</p>
//       </li>
//       {isModalShown && (
//         <Modal isShown={isModalShown} setIsShown={setIsModalShown} />
//       )}
//     </>
//   );
// };

// export default Todo;
