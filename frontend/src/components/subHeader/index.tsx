import { JSX } from "react"
import styles from "./styles.module.css"

type Props = {
	title: string
	text: string
}

const SubHeader = ({ title, text }: Props): JSX.Element => {
  return (
    <div className={ styles.subHeader }>
			<h2>{ title }</h2>
			<p>{ text }</p>
    </div>
  )
}

export default SubHeader;