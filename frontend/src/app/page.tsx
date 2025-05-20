"use client";
import { useEffect, useState } from "react";
import css from "./page.module.css";
import TopList from "../components/topList";
import PostBlock from "../components/postBlock";

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

interface tag {
  class: string
  doctor: string
  year: number
  department: string
  major: string
  category: string
  author: string
  createdDay: number
  postId: number
  images?: string
  memo?: string
}

// この配列オブジェクトはサンプルとしてのデータ
// const tagList: tag[] = [
//   { class: "経済学入門", doctor: "山田 伸二", year: 2023, department: "経済学部", major: "国際経済学科", category: "過去問", author: "月島 蛍", createdDay: 20230813, postId: 100001 },
//   { class: "民法", doctor: "小島 実", year: 2022, department: "法学部", major: "法律学科", category: "過去問", author: "村田 獅子", createdDay: 20220816, postId: 100002 },
//   { class: "機械工学", doctor: "菊池 郷", year: 2019, department: "工学部", major: "機械工学科", category: "レポート", author: "西 穂希", createdDay: 20190210, postId: 100003 },
//   { class: "英語コミュニケーション", doctor: "藍田 志保", year: 2021, department: "文学部", major: "英文学科", category: "レジュメ", author: "紺野 優香", createdDay: 20210309, postId: 100004 },
// ]

export default function Home() {
  const [posts, setPosts] = useState<tag[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const getPosts = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/posts`
        );
        const json = await res.json();
        setPosts(json.posts);
      } catch (err: any) {
        console.error("API error:", err);
      } finally {
        setIsLoading(false);
      } 
    }

    getPosts();
  }, []);

  return (
    <>
    <TopList topList={ topList }/>
    
    <div className={ css.container }>
      <section className={ css.search }>
        <input type="text" placeholder="講義名、科目、年度で検索" />
        <button>検索</button>
      </section>
      
      <h1 className={ css.subTitle }>最近の投稿</h1>
      {isLoading ? <p>データを取得中...</p> :
        <section className={ css.posts }>
          { posts.map((post) => {
            return (
              <PostBlock tagList={ post } key={ post.postId }></PostBlock>
            )
          }) }
        </section>
      }
      
    </div>
    </>
  );
}
