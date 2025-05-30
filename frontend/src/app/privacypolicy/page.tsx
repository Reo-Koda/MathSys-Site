import styles from "./page.module.css";
import TopList from "../../components/topList";
import { topList } from "src/data/topList";

const PrivacyPolicy = () => {
  return (
    <>
    <TopList topList={ topList } />
    <p className={ styles.divs }>PrivacyPolicy</p>
    </>
  )
}

export default PrivacyPolicy;