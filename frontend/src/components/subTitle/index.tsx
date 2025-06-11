import styles from "./styles.module.css"

type Props = {
  text: string
}

const SubTitle = ({ text }: Props) => {
  return (
    <h1 className={ styles.subTitle }>{ text }</h1>
  )
}

export default SubTitle;