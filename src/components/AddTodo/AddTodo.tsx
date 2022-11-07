import { useState } from "react";

import styles from "./AddTodo.module.scss";

import { TodosType } from "helpers/types";
import { addTodoLS } from "helpers/localStorage";

type Props = { setTodosData: React.Dispatch<React.SetStateAction<TodosType>> };

const AddTodo: React.FC<Props> = ({ setTodosData }) => {
  const [isAdding, setIsAdding] = useState(false);

  function handleAddTodo() {
    setIsAdding(false);

    const valueToAdd = {
      id: 1,
      // icon: "⭕️",
      listId: 1,
      title: "TEST",
      description: "Fill out human interest distribution form",
    };

    setTodosData(addTodoLS(valueToAdd));
  }

  return (
    <>
      {isAdding ? (
        <div>
          <input />
          <div>
            <button onClick={handleAddTodo} className={styles.button}>
              Add a card
            </button>
            <button
              onClick={() => setIsAdding(false)}
              className={styles.button}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button onClick={() => setIsAdding(true)} className={styles.button}>
          Add a card
        </button>
      )}
    </>
  );
};

export default AddTodo;
