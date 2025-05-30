import styles from "./page.module.css";
import TopList from "../../components/topList";
import { topList } from "src/data/topList";

const Contact = () => {
  return (
    <>
    <TopList topList={ topList } />
    <p className={ styles.divs }>Contact</p>
    </>
  )
}

export default Contact;