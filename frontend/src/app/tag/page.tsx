"use client";
import { JSX, useEffect, useState } from "react";
import styles from "./page.module.css";
import TopList from "src/components/topList";
import SubHeader from "src/components/subHeader";
import SubTitle from "src/components/subTitle";

interface TagList {
  class: string[];
  doctor: string[];
  year: string[];
  department: string[];
  major: string[];
  category: string[];
}

const Tag = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tagList, setTagList] = useState<TagList>({
    class: [],
    doctor: [],
    year: [],
    department: [],
    major: [],
    category: [],
  });

  useEffect (() => {
    setIsLoading(true);
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

    getTagList();
  }, [])

  return (
    <>
    <TopList />
    <div className={ styles.container }>
      
      <SubHeader
        title="タグ一覧"
        text="投稿されたコンテンツに付けられたタグの一覧を確認できます"
      />
      <div className={ styles.favorites }>
      {[
        { title: "講義名", key: "class" },
        { title: "教授", key: "doctor" },
        { title: "年度", key: "year" },
        { title: "学部", key: "department" },
        { title: "学科", key: "major" },
        { title: "分類", key: "category" },
      ].map(({ title, key }) => (
        <div className={ styles.favoriteitem } key={ key }>
          <div className={ styles.title }>
            <h3>{ title }</h3>
          </div>
        <div className={ styles.tagList }>
        { tagList[key as keyof TagList].length > 0 
          ? tagList[key as keyof TagList].map((t, i) => <p className={ styles.tag } key={`${key}-${i}`}>{t}</p>)
          : isLoading 
            ? null
            : <p>タグがありません</p>
        }
        </div>
        </div>
  ))}
  </div>


  
    
      
    </div>
    </>
  );
}

export default Tag;