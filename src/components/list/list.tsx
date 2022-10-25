import styles from "./list.module.scss";

import { CardsType } from "helpers/types";
import { Card } from "..";

type Props = {
  index?: number;
  title: string;
  cards?: CardsType[];
};

const List: React.FC<Props> = ({ index, title, cards }) => {
  return (
    <div key={`list_${index}`} className={styles.list}>
      <h3 className={styles.title}>{title}</h3>
      {cards?.map((card, index) => (
        <Card description={card.description} index={index} />
      ))}
      <button className={styles.button}>Add a card</button>
    </div>
  );
};

export default List;
