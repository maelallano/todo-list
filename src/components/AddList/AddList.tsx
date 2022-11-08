import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import styles from "./AddList.module.scss";

import { ListsType } from "helpers/types";
import { addListLS } from "helpers/localStorage";

type FormValues = {
  title: string;
};

type Props = { setListsData: React.Dispatch<React.SetStateAction<ListsType>> };

const AddList: React.FC<Props> = ({ setListsData }) => {
  const [isAdding, setIsAdding] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    // formState: { errors },
    setFocus,
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    setIsAdding(false);
    reset();

    const valueToAdd = {
      id: 0,
      title: data.title,
      // icon: "⭕️",
      color: "#EB5A46",
    };

    setListsData(addListLS(valueToAdd));
  };

  function handleAddList() {
    setIsAdding(true);
    setFocus("title");
  }

  function handleCancel() {
    setIsAdding(false);
    reset();
  }

  return (
    <>
      {isAdding ? (
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("title", { required: true })} />
            {/* {errors.title && <span>This field is required</span>} */}

            <input type="submit" value="Add a card" />
          </form>
          <div>
            <button onClick={handleCancel} className={styles.button}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button onClick={handleAddList} className={styles.button}>
          Add a category
        </button>
      )}
    </>
  );
};

export default AddList;
