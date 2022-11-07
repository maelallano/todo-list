import styles from "./Todo.module.scss";

type Props = {
  title: string;
};

const Todo: React.FC<Props> = ({ title }) => {
  return (
    <li className={styles.todo}>
      <p className={styles.title}>{title}</p>
    </li>
  );
};

export default Todo;
