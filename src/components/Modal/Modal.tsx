import styles from "./Modal.module.scss";

type Props = {
  isShown: boolean;
  setIsShown: React.Dispatch<React.SetStateAction<boolean>>;
};

const Modal: React.FC<Props> = ({ isShown, setIsShown }) => {
  if (!isShown) return <></>;

  return (
    <div className={styles.container}>
      <div className={styles.overlay} onClick={() => setIsShown(false)}></div>
      <div className={styles.modal}>Modal</div>
    </div>
  );
};

export default Modal;
