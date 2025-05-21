"use client";
import { useState, FormEvent } from "react";
import styles from "./page.module.css";
import TopList from "../../components/topList";
import PostInput from "src/components/postInput";

interface topList {
  ref: string
	top: string
}

const topList: topList[] = [
  { ref: `/`, top: "ホーム" },
  { ref: `/mypage`, top: "マイページ" },
  { ref: `/post`, top: "投稿" },
  { ref: `/tag`, top: "タグ一覧" },
  { ref: `/signin`, top: "ログイン" },
]

const Post = () => {
  const [className, setClassName] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [year, setYear] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [memo, setMemo] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/post`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // user_name: userName,
          // title: title,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage(`データ追加 新規ID: ${ data.id }`);
        // window.location.reload();
      } else {
        setMessage(`エラー: ${ data.error }`);
      }
    } catch (error: any) {
      setMessage(`通信エラー: ${ error.message }`);
    }
  }

  return (
    <>
    <TopList topList={ topList }/>

    <form onSubmit={ handleSubmit }>
      <PostInput title="授業名" setValue={ setClassName } isRequired={ true } />
      <PostInput title="教授名" setValue={ setDoctorName } isRequired={ true } />
      <PostInput title="年度" setValue={ setYear } isRequired={ true } />
      <PostInput title="分類" setValue={ setCategory } isRequired={ true } />
      <PostInput title="写真" setValue={ setImage } isRequired={ false } />
      <PostInput title="メモ" setValue={ setMemo } isRequired={ false } />
      <button type="submit">追加</button>
    </form>
    </>
  );
}

export default Post;