import { SubmitHandler, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";

import styles from "./UpdateTodoTitle.module.scss";
import { CheckSVG, CrossSVG } from "assets/icons";

type FormValues = { list: number; priority: number; title: string };

type Props = {
  isTitleVisible: boolean;
  setIsTitleVisible: React.Dispatch<React.SetStateAction<boolean>>;
  register: UseFormRegister<FormValues>;
  handleSubmit: UseFormHandleSubmit<FormValues>;
  onSubmit: SubmitHandler<FormValues>;
  title: string;
};

const UpdateTodoTitle: React.FC<Props> = ({
  isTitleVisible,
  setIsTitleVisible,
  register,
  handleSubmit,
  onSubmit,
  title,
}) => {
  return (
    <>
      {isTitleVisible ? (
        <h4 className={styles.title} onClick={() => setIsTitleVisible(false)}>
          {title}
        </h4>
      ) : (
        <div className={styles.titleInputContainer}>
          <textarea
            {...register("title", { required: true })}
            className={styles.inputTitle}
            defaultValue={title}
          />
          <div className={styles.formContainer_right}>
            <button onClick={handleSubmit(onSubmit)} className={styles.addBtn}>
              <CheckSVG />
            </button>
            <button
              onClick={() => setIsTitleVisible(true)}
              className={styles.cancelBtn}
            >
              <CrossSVG />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateTodoTitle;
