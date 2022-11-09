import {
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";

import styles from "./AddForm.module.scss";

import { CheckSVG, CrossSVG } from "assets/icons";

type FormValues = {
  title: string;
  color?: string;
};

type Props = {
  handleSubmit: UseFormHandleSubmit<FormValues>;
  onSubmit: SubmitHandler<FormValues>;
  register: UseFormRegister<FormValues>;
  handleCancel: () => void;
  type: string;
};

const AddForm: React.FC<Props> = ({
  handleSubmit,
  onSubmit,
  register,
  handleCancel,
  type,
}) => {
  function handlePlaceholderTitle() {
    switch (type) {
      case "LIST":
        return "Enter a title for this list...";
      case "TODO":
        return "Enter a title for this card...";
      default:
        return "Enter a title...";
    }
  }
  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <textarea
        {...register("title", { required: true })}
        className={styles.inputTitle}
        placeholder={handlePlaceholderTitle()}
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

      {type === "LIST" && (
        <input
          {...register("color")}
          type="color"
          defaultValue={"#ebecf0"}
          className={styles.inputColor}
        />
      )}
    </form>
  );
};

export default AddForm;
