import { JSX } from "react";
import styles from "./styles.module.css";

type Props = {
	btnText: string
}

const SubmitBtn = ({ btnText }: Props): JSX.Element => {
  return (
    <button type="submit" className={ styles.button }>{ btnText }</button>
  )
}

export default SubmitBtn;