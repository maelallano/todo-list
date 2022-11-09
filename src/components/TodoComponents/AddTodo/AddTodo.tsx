import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import styles from "./AddTodo.module.scss";

import { TodosType } from "helpers/types";
import { addTodoLS } from "helpers/localStorage";
import { PriorityValues } from "helpers/constants";
import { AddForm } from "components";

type FormValues = {
  title: string;
};

type Props = {
  setTodosData: React.Dispatch<React.SetStateAction<TodosType>>;
  listId: number;
};

const AddTodo: React.FC<Props> = ({ setTodosData, listId }) => {
  const [isAdding, setIsAdding] = useState(false);
  const { register, handleSubmit, reset, setFocus } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    setIsAdding(false);
    reset();

    const valueToAdd = {
      id: 0,
      listId,
      title: data.title,
      description: "",
      priority: PriorityValues[0],
    };

    setTodosData(addTodoLS(valueToAdd));
  };

  useEffect(() => {
    if (isAdding) setFocus("title");
  }, [isAdding]);

  const handleAddCard = () => setIsAdding(true);

  function handleCancel() {
    setIsAdding(false);
    reset();
  }

  return (
    <>
      {isAdding ? (
        <AddForm
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          register={register}
          handleCancel={handleCancel}
          type="TODO"
        />
      ) : (
        <button onClick={handleAddCard} className={styles.button}>
          + Add a card
        </button>
      )}
    </>
  );
};

export default AddTodo;
