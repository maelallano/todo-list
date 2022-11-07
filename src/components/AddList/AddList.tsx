import { useState } from "react";

import styles from "./AddList.module.scss";

import { ListsType } from "helpers/types";
import { addListLS } from "helpers/localStorage";

type Props = { setListsData: React.Dispatch<React.SetStateAction<ListsType>> };

const AddList: React.FC<Props> = ({ setListsData }) => {
  function handleAddList() {
    const valueToAdd = {
      id: 1,
      title: "open",
      color: "#EB5A46",
    };

    setListsData(addListLS(valueToAdd));
  }

  return (
    <button className={styles.button} onClick={handleAddList}>
      Add a category
    </button>
  );
  // const [isAdding, setIsAdding] = useState(false);

  // function handleAddTodo() {
  //   setIsAdding(false);

  //   const valueToAdd = {
  //     id: 1,
  //     // icon: "⭕️",
  //     listId: 1,
  //     title: "TEST",
  //     description: "Fill out human interest distribution form",
  //   };

  //   setTodosData(addTodoLS(valueToAdd));
  // }

  // return (
  //   <>
  //     {isAdding ? (
  //       <div>
  //         <input />
  //         <div>
  //           <button onClick={handleAddTodo} className={styles.button}>
  //             Add a card
  //           </button>
  //           <button
  //             onClick={() => setIsAdding(false)}
  //             className={styles.button}
  //           >
  //             Cancel
  //           </button>
  //         </div>
  //       </div>
  //     ) : (
  //       <button onClick={() => setIsAdding(true)} className={styles.button}>
  //         Add a card
  //       </button>
  //     )}
  //   </>
  // );
};

export default AddList;
