import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import styles from "./AddTodo.module.scss";

import { TodosType } from "helpers/types";
import { addTodoLS } from "helpers/localStorage";
import { PriorityValues } from "helpers/constants";

type FormValues = {
  title: string;
};

type Props = {
  setTodosData: React.Dispatch<React.SetStateAction<TodosType>>;
  listId: number;
};

const AddTodo: React.FC<Props> = ({ setTodosData, listId }) => {
  const [isAdding, setIsAdding] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    // formState: { errors },
    setFocus,
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    setIsAdding(false);
    reset();

    const valueToAdd = {
      id: 0,
      listId,
      title: data.title,
      description: "",
      priority: PriorityValues[0]
    };

    setTodosData(addTodoLS(valueToAdd));
  };

  function handleAddCard() {
    setIsAdding(true);
    setFocus("title");
  }

  function handleCancel() {
    setIsAdding(false);
    reset();
  }

  return (
    <>
      {isAdding ? (
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("title", { required: true })} />
            {/* {errors.title && <span>This field is required</span>} */}

            <input type="submit" value="Add a card" />
          </form>
          <div>
            <button onClick={handleCancel} className={styles.button}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button onClick={handleAddCard} className={styles.button}>
          Add a card
        </button>
      )}
    </>
  );
};

export default AddTodo;
