import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import styles from "./AddList.module.scss";

import { ListsType } from "helpers/types";
import { addListLS } from "helpers/localStorage";
import { AddForm } from "components";

type FormValues = {
  title: string;
  color?: string;
};

type Props = { setListsData: React.Dispatch<React.SetStateAction<ListsType>> };

const AddList: React.FC<Props> = ({ setListsData }) => {
  const [isAdding, setIsAdding] = useState(false);
  const { register, handleSubmit, reset, setFocus } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    setIsAdding(false);
    reset();

    const valueToAdd = {
      id: 0,
      title: data.title,
      color: data.color,
      order: 0,
    };

    setListsData(addListLS(valueToAdd));
  };

  useEffect(() => {
    if (isAdding) setFocus("title");
  }, [isAdding]);

  const handleAddList = () => setIsAdding(true);

  function handleCancel() {
    setIsAdding(false);
    reset();
  }

  return (
    <>
      {isAdding ? (
        <AddForm
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          register={register}
          handleCancel={handleCancel}
          type={"LIST"}
        />
      ) : (
        <button onClick={handleAddList} className={styles.button}>
          + Add a category
        </button>
      )}
    </>
  );
};

export default AddList;
