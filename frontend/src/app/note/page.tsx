import styles from "./page.module.css";
import { JSX } from "react";
import TopList from "../../components/topList";

const Note = (): JSX.Element => {
  return (
    <>
    <TopList />
    <p className={ styles.divs }>Note</p>
    </>
  )
}

export default Note;