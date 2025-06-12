import { JSX } from "react";
import styles from "./styles.module.css";

type Props = {
  type: string
  name: string
  placeholder: string
  value: string
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  isRequired: boolean
}

const InputBox = ({ type, name, placeholder, value, handleChange, isRequired }: Props): JSX.Element => {
  return (
    <input
      className={ styles.inputbox }
      type={ type }
      name={ name }
      placeholder={ placeholder }
      value={ value }
      onChange={ handleChange }
      required={ isRequired } />
  )
}

export default InputBox;