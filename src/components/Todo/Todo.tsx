// import { useState } from "react";

import styles from "./Todo.module.scss";

// import Modal from "components/Modal/Modal";

type Props = {
  title: string;
};

const Todo: React.FC<Props> = ({ title }) => {
  return (
    <li className={styles.todo}>
      <p className={styles.title}>{title}</p>
      <input type="select" />
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
