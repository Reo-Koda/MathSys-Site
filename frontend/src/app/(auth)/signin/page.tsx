import styles from "./page.module.css";
import { JSX } from "react";
import SignContainer from "src/components/signContainer";

const SignIn = (): JSX.Element => {
  return (
    <SignContainer type="signin" btnText="ログイン"/>
  )
}

export default SignIn;