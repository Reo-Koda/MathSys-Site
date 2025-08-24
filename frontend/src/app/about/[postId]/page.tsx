"use client";
import { useEffect, useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import TopList from "src/components/topList";
import SubmitBtn from "src/components/submitBtn";

interface PostData {
  class: string;
  doctor: string;
  department: string;
  major: string;
  author: string;
  createdDay: string;
  photo: string;
  category: string;
  year: number;
}

export default function About({ params }: { params: Promise<{ postId: string }>; }) {
  const router = useRouter();

  const [postId, setPostId] = useState<string>("");
  const [postData, setPostData] = useState<PostData>({
    class: "情報なし",
    doctor: "情報なし",
    department: "情報なし",
    major: "情報なし",
    author: "情報なし",
    createdDay: new Date().toISOString(),
    photo: "情報なし",
    category: "情報なし",
    year: 0,
  });

  const [userName, setUserName] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [canDelete, setCanDelete] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const resolveParams = async () => {
      const p = await params;
      setPostId(p.postId);
    };
    resolveParams();
  }, [params]);

  // 投稿データ取得
  useEffect(() => {
    if (!postId) return; // postId がない場合はスキップ

    const fetchPostData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}`, {
          credentials: "include",
        });

        if (!res.ok) {
          console.warn("投稿データ取得エラー:", res.status);
        } else {
          const text = await res.text();
          const data = text.trim() ? JSON.parse(text) : null;
          if (data) setPostData(data);
        }
      } catch (err: any) {
        console.error("通信エラー:", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPostData();
  }, [postId]);

  // 認証ユーザー取得
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/status`, {
          credentials: "include",
        });

        if (!res.ok) return;

        const text = await res.text();
        const data = text.trim() ? JSON.parse(text) : null;
        if (!data) return;

        setUserName(data.userName);
        if (data.userName === postData.author) setCanDelete(true);
      } catch (err: any) {
        console.error("認証ユーザー取得エラー:", err.message);
      }
    };
    fetchUser();
  }, [postData]);

  const handleFavorite = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userName) {
      router.push("/signin");
      return;
    }

    setIsFavorite(!isFavorite);
    setMessage(isFavorite ? "お気に入り解除しました" : "お気に入り登録しました");
  };

  const handleDelete = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (canDelete) {
      setMessage("投稿を削除しました");
      router.push("/mypage");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <TopList />
      <div className={styles.container}>
        <div className={styles.divs}>
          <p>授業名：{postData.class}</p>
          <p>教授名：{postData.doctor}</p>
          <p>学部：{postData.department}</p>
          <p>学科：{postData.major}</p>
          <p>写真：{postData.photo}</p>
        </div>

        <form onSubmit={handleFavorite}>
          <SubmitBtn btnText={isFavorite ? "お気に入り解除" : "お気に入り登録"} />
        </form>

        <form onSubmit={handleDelete}>
          {canDelete && <SubmitBtn btnText="投稿を削除" />}
        </form>

        {message && <p>{message}</p>}
      </div>
    </>
  );
}
