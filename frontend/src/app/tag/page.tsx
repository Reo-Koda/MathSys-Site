"use client";
import { JSX, useEffect, useState } from "react";
import styles from "./page.module.css";
import TopList from "src/components/topList";
import SubHeader from "src/components/subHeader";
import SubTitle from "src/components/subTitle";

const Tag = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tagList, setTagList] = useState<string[]>([]);

  useEffect (() => {
    // setIsLoading(true);
    const getTagList = async () => {
      try {
        const res = await fetch(
          `${ process.env.NEXT_PUBLIC_API_URL }/tags`
        );
        const json = await res.json();
        setTagList(json.tags);
      } catch (err: any) {
        console.error("API error:", err);
      } finally {
        setIsLoading(false);
      }
    }

    // getTagList();
  }, [])
  return (
    <>
    <TopList />
    <div className={ styles.container }>
    <SubHeader
      title="タグ一覧"
      text="投稿されたコンテンツに付けられたタグの一覧を確認できます"
    />
    <SubTitle text="講義名" />
    <SubTitle text="教授名" />
    <SubTitle text="年度" />
    <SubTitle text="学部" />
    <SubTitle text="学科" />
    <SubTitle text="分類" />
    { isLoading ? <p>データを取得中...</p> :
        <section className={ styles.tags }>
          { tagList ? tagList.map((tag, index) => {
            return (
              <p key={ index }>{ tag }</p>
            )
          }) : <p>登録されているタグが存在しないようです</p> }
        </section>
      }
      
    </div>
    </>
  );
}

export default Tag;