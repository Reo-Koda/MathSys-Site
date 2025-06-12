import styles from "./not-found.module.css";
import { JSX } from "react";
import Image from "next/image";
import SadCat from "../public/sadcat_1.png";

const NotFound = (): JSX.Element => {
  return (
    <div className={ styles.container }>
      <h1>404 NotFound</h1>
      <p>お探しのページが見つかりませんでした</p>
      <Image src={ SadCat } alt="sadcat" width={500} height={500} />
    </div>
  );
}

export default NotFound;