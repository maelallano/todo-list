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
import { BinSVG, FlagSVG } from "assets/icons";
import { PriorityValues } from "helpers/constants";
// import { Modal } from "components";

type FormValues = { list: number; priority: number };

type Props = {
  todo: TodoType;
  setTodosData: React.Dispatch<React.SetStateAction<TodosType>>;
};

const Todo: React.FC<Props> = ({ todo, setTodosData }) => {
  const { title, listId } = todo;
  const { register, handleSubmit, watch } = useForm<FormValues>();
  const refSubmitButtom = useRef<HTMLButtonElement>(null);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    setTodosData(
      updateTodoLS({
        ...todo,
        listId: Number(data.list),
        priority: data.priority,
      })
    );
  };

  const triggerSubmit = () => refSubmitButtom?.current?.click();

  useEffect(() => {
    const subscription = watch(triggerSubmit);
    return () => subscription.unsubscribe();
  }, [watch]);

  const handleDelete = () => setTodosData(removeTodoLS(todo.id));

  return (
    <li className={styles.todo}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.topbar}>
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

          <div className={styles.topbar_right}>
            <select {...register("list")} value={getListLS(listId)?.id}>
              {getListsLS()?.map((value: ListType) => (
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

        <p className={styles.title}>{title}</p>

        <button hidden={true} ref={refSubmitButtom} type={"submit"} />
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
