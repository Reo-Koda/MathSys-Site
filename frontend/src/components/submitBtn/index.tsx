import styles from "./styles.module.css";

type Props = {
	btnText: string
}

const SubmitBtn = ({ btnText }: Props) => {
  return (
    <button type="submit" className={ styles.button }>{ btnText }</button>
  )
}

export default SubmitBtn;