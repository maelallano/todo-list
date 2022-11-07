import styles from "./Todo.module.scss";

type Props = {
  index: number;
  title: string;
};

const Todo: React.FC<Props> = ({ index, title }) => {
  return (
    <div key={`todo_${index}`} className={styles.todo}>
      <p className={styles.title}>{title}</p>
    </div>
  );
};

export default Todo;
