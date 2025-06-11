import styles from "./page.module.css";
import TopList from "../../components/topList";

const Note = () => {
  return (
    <>
    <TopList />
    <p className={ styles.divs }>Note</p>
    </>
  )
}

export default Note;