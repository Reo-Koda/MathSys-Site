import styles from "./styles.module.css"

type Props = {
	title: string
	text: string
}

const SubHeader = ({ title, text }: Props) => {
  return (
    <div className={ styles.mypageheader }>
			<h2>{ title }</h2>
			<p>{ text }</p>
    </div>
  )
}

export default SubHeader;