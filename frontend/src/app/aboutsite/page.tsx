import styles from "./page.module.css";
import TopList from "../../components/topList";
import { topList } from "src/data/topList";

const AboutSite = () => {
  return (
    <>
    <TopList topList={ topList } />
    <p className={ styles.divs }>AboutSite</p>
    </>
  )
}

export default AboutSite;