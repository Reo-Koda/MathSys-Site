"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import Image from "next/image";
import Logo from "../../public/glass.svg";
import TopList from "../../components/topList";
import { topList } from "src/data/topList";
import SubHeader from "src/components/subHeader";

const Mypage = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) router.push('/signin');;
    }, []);
    
  return(
    <>
    <TopList topList={ topList }/>
    <div className={styles.container}>
      <SubHeader
        title="お気に入り一覧"
        text="あなたが登録したお気に入りの過去問やコンテンツ" />
      <div className={styles.pagesearch}>
        <section className={styles.pagesearch}>
          <input type="text" placeholder="講義名、教授名、学部、学科、年度"/>
          <button className={styles.pagesearchbtn} aria-label="検索">
          <Image src={Logo} width={40} height={35} alt="icons"></Image>
          </button>
        </section>
      
        <div className={styles.favorites}>
          <div className={styles.favoriteitem}>
            <button className={styles.removebtn} title="お気に入り解除">×</button>
            <h3>経済学部 経済学入門 過去問 2023</h3>
            <button className={styles.gakubu} title="学部">経済学部</button>
            <button className={styles.nen} title="年度">2023</button>
            <p>投稿者: studentA</p>
            <p>投稿日: 20220101</p>
          </div>
          
          <div className={styles.favoriteitem}>
            <button className={styles.removebtn} title="お気に入り解除">×</button>
            <h3>法学部 民法 過去問 2022</h3>
            <button className={styles.gakubu} title="学部">法学部</button>
            <button className={styles.nen} title="年度">2022</button>
            <p>投稿者: studentB</p>
            <p>投稿日: 20230102</p>
          </div>
          
          <div className={styles.favoriteitem}>
            <button className={styles.removebtn} title="お気に入り解除">×</button>
            <h3>工学部 機械工学 基礎過去問 2023</h3>
            <button className={styles.gakubu} title="学部">工学部</button>
            <button className={styles.nen} title="年度">2023</button>
            <p>投稿者: studentC</p>
            <p>投稿日: 20240229</p>
          </div>
          
          <div className={styles.favoriteitem}>
            <button className={styles.removebtn} title="お気に入り解除">×</button>
            <h3>文学部 英文学 過去問 2021</h3>
            <button className={styles.gakubu} title="学部">文学部</button>
            <button className={styles.nen} title="年度">2021</button>
            <p>投稿者: studentD</p>
            <p>投稿日: 20200229</p>
          </div>
        </div>
      </div>
    </div>

  </>
  );
}

export default Mypage;