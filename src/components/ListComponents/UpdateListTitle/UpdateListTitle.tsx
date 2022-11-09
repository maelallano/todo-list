import { UseFormRegister } from "react-hook-form";

import styles from "./UpdateListTitle.module.scss";
import { CrossSVG } from "assets/icons";

type FormValues = { order: number; title: string };

type Props = {
  isTitleVisible: boolean;
  setIsTitleVisible: React.Dispatch<React.SetStateAction<boolean>>;
  register: UseFormRegister<FormValues>;
  title: string;
};

const UpdateListTitle: React.FC<Props> = ({
  isTitleVisible,
  setIsTitleVisible,
  register,
  title
}) => {
  return (
    <>
      {isTitleVisible ? (
        <h3 className={styles.title} onClick={() => setIsTitleVisible(false)}>
          {title}
        </h3>
      ) : (
        <div className={styles.containerTitleInput}>
          <input
            {...register("title", { required: true })}
            className={styles.inputTitle}
            defaultValue={title}
          />
          <button
            type="button"
            className={styles.cancelBtn}
            onClick={() => setIsTitleVisible(true)}
          >
            <CrossSVG />
          </button>
        </div>
      )}
    </>
  );
};

export default UpdateListTitle;
