import { useState } from "react";
import styles from "./app.module.scss";

import mockupData from "helpers/mockupData";
import { TodoList } from "components";

type Props = {};

const App: React.FC<Props> = () => {
  const [dataTL, setDataTL] = useState(mockupData);

  return (
    <div className={styles.app}>
      <div className={styles.layout}>
        <header>
          <h1 className={styles.title}>{dataTL?.title}</h1>
        </header>
        <main>
          <TodoList dataTL={dataTL} setDataTL={setDataTL} />
        </main>
      </div>
    </div>
  );
};

export default App;
