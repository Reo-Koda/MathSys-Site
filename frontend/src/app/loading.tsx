import styles from "./loading.module.css";
import { JSX } from "react";

const Loading = (): JSX.Element => {
  return (
    <div className={ styles.loadingContainer }>
      <div className={ styles.circleSpin }></div>
      <p>Loading...</p>
    </div>
  );
}

export default Loading;