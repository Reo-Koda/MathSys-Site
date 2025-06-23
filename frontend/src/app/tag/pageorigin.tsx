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
      
      <SubTitle text="講義名" /><br />
      { tagList.class.length > 0
        ? tagList.class.map((t, i) => <p className={ styles.tag } key={`class-${i}`}>{t}</p>)
        : isLoading
          ? null
          : <p>タグがありません</p>
      }
      <br /><br />
      <SubTitle text="教授" /><br />
      { tagList.doctor.length > 0
        ? tagList.doctor.map((t, i) => <p className={ styles.tag } key={`doc-${i}`}>{t}</p>)
        : isLoading
          ? null
          : <p>タグがありません</p>
      }
      <br /><br />
      <SubTitle text="年度" /><br />
      { tagList.year.length > 0
        ? tagList.year.map((t, i) => <p className={ styles.tag } key={`year-${i}`}>{t}</p>)
        : isLoading
          ? null
          : <p>タグがありません</p>
      }
      <br /><br />
      <SubTitle text="学部" /><br />
      { tagList.department.length > 0
        ? tagList.department.map((t, i) => <p className={ styles.tag } key={`dep-${i}`}>{t}</p>)
        : isLoading
          ? null
          : <p>タグがありません</p>
      }
      <br /><br />
      <SubTitle text="学科" /><br />
      { tagList.major.length > 0
        ? tagList.major.map((t, i) => <p className={ styles.tag } key={`major-${i}`}>{t}</p>)
        : isLoading
          ? null
          : <p>タグがありません</p>
      }
      <br /><br />
      <SubTitle text="分類" /><br />
      { tagList.category.length > 0
        ? tagList.category.map((t, i) => <p className={ styles.tag } key={`cate-${i}`}>{t}</p>)
        : isLoading
          ? null
          : <p>タグがありません</p>
      }
      <br /><br />
      
    </div>
    </>
  );
}

export default Tag;