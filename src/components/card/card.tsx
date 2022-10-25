import styles from "./card.module.scss";

type Props = {
  index: number;
  description: string;
};

const Card: React.FC<Props> = ({ index, description }) => {
  return (
    <div key={`card_${index}`} className={styles.card}>
      <p className={styles.description}>{description}</p>
    </div>
  );
};

export default Card;
