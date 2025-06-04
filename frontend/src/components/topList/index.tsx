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
    // バックエンドの /auth/status エンドポイントを叩いてセッションが有効かチェック
    const getAuthStatus = async () => {
      try {
        const res = await fetch(`${ process.env.NEXT_PUBLIC_API_URL }/auth/status`, {
          method: "GET",
          credentials: "include", // Cookie（セッションID）を自動で送る
        });
        const json = await res.json();
        setIsLogin(json.isLogin);
      } catch (err: any) {
        console.error("セッションチェックでエラー:", err);
        setIsLogin(false);
      };
    }

    getAuthStatus();
  }, []);

  const logout = async () => {
    try {
      const res = await fetch(`${ process.env.NEXT_PUBLIC_API_URL }/users/signout`, {
        method: "POST",
        credentials: "include",
      });
      // リロードして isLogin を false にする
      window.location.reload();
    } catch(err: any) {
      console.error("ログアウトエラー:", err);
    }
  };

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