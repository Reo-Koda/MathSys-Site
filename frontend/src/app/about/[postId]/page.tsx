"use client";
import { use, useEffect, useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import TopList from "src/components/topList";
import SubmitBtn from "src/components/submitBtn";
import { tag } from "src/data/tag";

export default function About ({ params }: { params: Promise<{ postId: string }>;}) {
  const router = useRouter();
  const { postId } = use(params);
  const [post, setPost] = useState<tag | null>(null);
  const [userName, setUserName] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [canDelete, setCanDelete] = useState<boolean>(false);

  useEffect(() => {
    const getAuthStatus = async () => {
      try {
        const res = await fetch(`${ process.env.NEXT_PUBLIC_API_URL }/auth/status`, {
          method: "GET",
          credentials: "include", // Cookie（セッションID）を自動で送る
        });
        const json = await res.json();
        setUserName(json.userName);
      } catch (err: any) {
        console.error("セッションチェックでエラー:", err);
      };
    }

    const getAbout = async () => {
      try {
        const url = new URL(
          `${process.env.NEXT_PUBLIC_API_URL}/about`
        );
        url.searchParams.set("id", postId);
        
        const res = await fetch(url.toString(), {
          method: "GET",
        });
        const json = await res.json();
        setPost(json.post);
      } catch (err: any) {
        console.error("API error:", err);
      }
    }

    const getFavorite = async () => {
      if (!userName) return;
      try {
        const url = new URL(
          `${process.env.NEXT_PUBLIC_API_URL}/isfavorite`
        );
        url.searchParams.set("id", postId);
        
        const res = await fetch(url.toString(), {
          method: "GET",
          credentials: "include", // Cookie（セッションID）を自動で送る
        });
        const json = await res.json();
        setIsFavorite(json.isFavorite);
      } catch (err: any) {
        console.error("API error:", err);
      }
    }

    const changeDeleteState = () => {
      if (!userName) return;
      // 投稿者と現在のユーザーを比較し、同じなら canDeleteをtrueにする
    }

    getAuthStatus();
    getAbout();
    getFavorite();
    changeDeleteState();
    if (post !== null) console.log(`post is ${post.class}`);
    else console.log("post is null");
  }, [userName, postId]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userName) {
      router.push("/signin");
      return;
    }

    try {
      var type;
      if (isFavorite) type = "out";
      else type = "in";
      const res = await fetch(`${ process.env.NEXT_PUBLIC_API_URL }/favorites/${ type }`, {
        method: 'POST',
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: postId,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage(`データ ID: ${ data.id }`);
        router.push("/mypage");
      } else {
        setMessage(`エラー: ${ data.error }`);
      }
    } catch (error: any) {
      setMessage(`通信エラー: ${ error.message }`);
    }
  }

  // 現在のユーザーが投稿したユーザーと同じかつ削除ボタンを押した時、投稿を削除する機能を実装する
  const handleDelete = () => {
    return;
  }

  return (
    <>
    <TopList />
    <div className={ styles.container }>
      <div className={ styles.divs }>
        投稿番号：{ postId }
      </div>
      { post && <h1>{ post.class }</h1> }
      <form onSubmit={ handleSubmit }>
        { isFavorite ? <SubmitBtn btnText="お気に入り解除"  />
          : <SubmitBtn btnText="お気に入り登録"  />
        }
      </form>
      <form onSubmit={ handleDelete }>
        { canDelete && <SubmitBtn btnText="投稿を削除" /> }
      </form>
      { message && <p>{ message }</p> }
    </div>
    </>
  );
}
