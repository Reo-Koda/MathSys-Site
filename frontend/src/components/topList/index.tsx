"use client";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import Link from "next/link";

interface topList {
  ref: string
	top: string
  func?: () => void
}

type Props = {
	topList: topList[]
}

const TopList = ({ topList }: Props) => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) setIsLogin(true);
    else setIsLogin(false);
  }, []);

  const logout = () => {
    localStorage.removeItem("authToken");
    window.location.reload();
  }

  const items: topList[] = isLogin ? [
      ...topList.slice(0, -1),
      { ref: '', top: 'ログアウト', func: logout }, // ダミーref
    ] : topList;
  
  return (
    <nav className={ styles.topListContainer }>
      <ul className={ styles.topListBox }>
        { items.map((item, index) => {
          return (
            <li className={ styles.topListElement } key={ index } onClick={ item.func }>
              <Link href={ item.ref } className={ styles.topListLink }>{ item.top }</Link>
            </li>
          ) })}
      </ul>
    </nav>
  );
}

export default TopList;