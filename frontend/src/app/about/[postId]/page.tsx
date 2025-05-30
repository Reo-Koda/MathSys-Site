"use client";
import { use, useEffect, useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import TopList from "src/components/topList";
import { topList } from "src/data/topList";
import SubmitBtn from "src/components/submitBtn";

export default function About ({ params }: { params: Promise<{ postId: string }>;}) {
  const router = useRouter();
  const { postId } = use(params);
  const [userName, setUserName] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) setUserName(token);
    else return;

    const getFavorite = async () => {
      try {
        const url = new URL(
          `${process.env.NEXT_PUBLIC_API_URL}/api/isfavorite`
        );
        url.searchParams.set("user", token);
        url.searchParams.set("id", postId);
        
        const res = await fetch(url.toString());
        const json = await res.json();
        setIsFavorite(json.isFavorite);
      } catch (err: any) {
        console.error("API error:", err);
      }
    }

    getFavorite();
  }, []);

  const handleSubmit = async () => {
    if (!userName) {
      router.push("/signin");
      return;
    }

    try {
      var type;
      if (isFavorite) type = "out";
      else type = "in";
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/favorites/${ type }`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: userName,
          id: postId,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage(`データ ID: ${ data.id }`);
      } else {
        setMessage(`エラー: ${ data.error }`);
      }
    } catch (error: any) {
      setMessage(`通信エラー: ${ error.message }`);
    }
  }

  return (
    <>
    <TopList topList={ topList } />
    <div className={ styles.container }>
      <div className={ styles.divs }>投稿番号：{ postId }</div>
      <form onSubmit={ handleSubmit }>
        { isFavorite ? <SubmitBtn btnText="お気に入り解除"  />
          : <SubmitBtn btnText="お気に入り登録"  />
        }
      </form>
      { message && <p>{ message }</p> }
    </div>
    </>
  );
}
