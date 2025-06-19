import styles from "./page.module.css";
import { JSX } from "react";
import TopList from "../../components/topList";

const Contact = (): JSX.Element => {
  return (
    <>
    <TopList />
    <p className={ styles.divs }>Contact</p>
    </>
  )
}

export default Contact;