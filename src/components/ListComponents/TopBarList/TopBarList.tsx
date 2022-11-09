import { UseFormRegister } from "react-hook-form";

import styles from "./TopBarList.module.scss";

import { ListType } from "helpers/types";
import { getListsLS } from "helpers/localStorage";
import { BinSVG } from "assets/icons";
import { UpdateListTitle } from "components";

type FormValues = { order: number; title: string };

type Props = {
  isTitleVisible: boolean;
  setIsTitleVisible: React.Dispatch<React.SetStateAction<boolean>>;
  register: UseFormRegister<FormValues>;
  list: ListType;
  handleDelete: () => void;
};

const TopBarTodo: React.FC<Props> = ({
  isTitleVisible,
  setIsTitleVisible,
  register,
  list,
  handleDelete,
}) => {
  return (
    <div className={styles.topBar}>
      <UpdateListTitle
        isTitleVisible={isTitleVisible}
        setIsTitleVisible={setIsTitleVisible}
        register={register}
        title={list.title}
      />

      <div className={styles.topBar_right}>
        <select {...register("order")} value={list.order}>
          {getListsLS()
            .sort((a, b) => a.order - b.order)
            .map((value: ListType) => (
              <option key={value.id} value={value.order}>
                {value.order + 1}
              </option>
            ))}
        </select>

        <button
          type="button"
          className={styles.deleteBtn}
          onClick={handleDelete}
        >
          <BinSVG />
        </button>
      </div>
    </div>
  );
};

export default TopBarTodo;
