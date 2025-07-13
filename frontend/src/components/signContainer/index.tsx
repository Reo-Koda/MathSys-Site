"use client";
import { useState, FormEvent, SetStateAction, JSX } from "react";
import { useRouter } from "next/navigation";
import styles from "./styles.module.css";
import Link from "next/link";
import InputBox from "src/components/inputBox";
import SubmitBtn from "../submitBtn";

type Props = {
  type: string
  btnText: string
}

const SignContainer = ({ type, btnText }: Props): JSX.Element => {
  const router = useRouter();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [agree, setAgree] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //setMessage("");

    if (type === "signup" && !agree) {
      setMessage("利用規約に同意してください。");
      return;
    }

    try {
      const res = await fetch(`${ process.env.NEXT_PUBLIC_API_URL }/users/${ type }`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include",
        body: JSON.stringify({ user_name: userName, password: password }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage(`サインイン成功: ${ data.message }`);
        router.push('/');
      } else {
        setMessage(`エラー: ${ data.error }`);
      }
    } catch (error: any) {
      setMessage(`通信エラー: ${ error.message }`);
    }
  };

  const handleChange = (e: { target: { name: string; value: SetStateAction<string>; }; }) => {
    if (e.target.name === "userName") {
      setUserName(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  }

  return (
    <div className={ styles.loginContainer }>
      <h2>{ btnText }</h2>
      <form onSubmit={ handleSubmit }>
        <InputBox
        type="text"
        name="userName"
        placeholder="ユーザー名"
        value={ userName }
        handleChange={ handleChange }
        isRequired={ true } />
        <InputBox
        type="password"
        name="password"
        placeholder="パスワード"
        value={ password }
        handleChange={ handleChange }
        isRequired={ true } />

        { type == "signup" && (
        <label className={ styles.checkboxLabel }>
            <input
              type="checkbox"
              checked={ agree }
              onChange={() => setAgree(!agree)}
              className={ styles.checkbox }
            />
            <p><Link href="/terms" className={ styles.toSignup }>利用規約</Link>に同意する</p> </label>)}

        <SubmitBtn btnText={ btnText } />
      </form>
      { type == "signin" && <Link href="/signup" className={ styles.toSignup }>新規登録</Link> }
      { message && <p className={ styles.backendMessage }>{ message }</p> }
    </div>
  )
}

export default SignContainer;