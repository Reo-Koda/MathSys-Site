import styles from "./page.module.css";
import TopList from "../../components/topList";
import { topList } from "src/data/topList";

const Tag = () => {
  return (
    <>
    <TopList topList={ topList }/>
    <div className={ styles.divs }>Tag</div>
    </>
  );
}

export default Tag;