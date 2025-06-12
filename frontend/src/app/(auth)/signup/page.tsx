import styles from "./page.module.css";
import { JSX } from "react";
import SignContainer from "src/components/signContainer";

const SignUp = (): JSX.Element => {
  return (
    <SignContainer type="signup" btnText="サインアップ"/>
  )
}

export default SignUp;