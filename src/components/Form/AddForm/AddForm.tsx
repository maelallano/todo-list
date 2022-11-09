import {
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";

import styles from "./AddForm.module.scss";

import { CheckSVG, CrossSVG } from "assets/icons";

type FormValues = {
  title: string;
};

type Props = {
  handleSubmit: UseFormHandleSubmit<FormValues>;
  onSubmit: SubmitHandler<FormValues>;
  register: UseFormRegister<FormValues>;
  handleCancel: () => void;
  placeholder: string;
};

const AddForm: React.FC<Props> = ({
  handleSubmit,
  onSubmit,
  register,
  handleCancel,
  placeholder,
}) => {
  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <textarea
        {...register("title", { required: true })}
        className={styles.inputTitle}
        placeholder={placeholder}
      />
      {/* {errors.title && <span>This field is required</span>} */}

      <div className={styles.formContainer_right}>
        <button onClick={handleSubmit(onSubmit)} className={styles.addBtn}>
          <CheckSVG />
        </button>
        <button onClick={handleCancel} className={styles.cancelBtn}>
          <CrossSVG />
        </button>
      </div>
    </form>
  );
};

export default AddForm;
