import { UseFormRegister } from "react-hook-form";

import styles from "./TopBarTodo.module.scss";

import { ListType, TodoType } from "helpers/types";
import { getListLS, getListsLS } from "helpers/localStorage";
import { PriorityValues } from "helpers/constants";
import { BinSVG, FlagSVG } from "assets/icons";

type FormValues = { list: number; priority: number; title: string };

type Props = {
  register: UseFormRegister<FormValues>;
  todo: TodoType;
  handleDelete: () => void;
};

const TopBarTodo: React.FC<Props> = ({ register, todo, handleDelete }) => {
  return (
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
        <select {...register("list")} value={getListLS(todo.listId)?.id}>
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
  );
};

export default TopBarTodo;
