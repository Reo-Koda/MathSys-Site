import styles from "./page.module.css";
import { JSX } from "react";
import TopList from "../../components/topList";

const AboutSite = (): JSX.Element => {
  return (
    <>
    <TopList />
    <p className={ styles.divs }>AboutSite</p>
    </>
  )
}

export default AboutSite;