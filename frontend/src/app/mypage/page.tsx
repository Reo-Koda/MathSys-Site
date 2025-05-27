"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import Image from "next/image";
import Logo from "../../public/glass.svg";
import TopList from "../../components/topList";
import { topList } from "src/data/topList";
import SubHeader from "src/components/subHeader";
import PostBlock from "src/components/postBlock"; 

const Mypage = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) router.push("/signin");
  }, []);

  const favoritePosts = [
    {
      class: "経済学部",
      doctor: "経済学入門",
      year: 2023,
      department: "経済学部",
      major: "経済学",
      category: "過去問",
      author: "studentA",
      createdDay: 20220101,
      postId: 1,
    },
    {
      class: "法学部",
      doctor: "民法",
      year: 2022,
      department: "法学部",
      major: "法学",
      category: "過去問",
      author: "studentB",
      createdDay: 20230102,
      postId: 2,
    },
    {
      class: "工学部",
      doctor: "機械工学",
      year: 2023,
      department: "工学部",
      major: "機械工学",
      category: "基礎過去問",
      author: "studentC",
      createdDay: 20240229,
      postId: 3,
    },
    {
      class: "文学部",
      doctor: "英文学",
      year: 2021,
      department: "文学部",
      major: "英文学",
      category: "過去問",
      author: "studentD",
      createdDay: 20200229,
      postId: 4,
    },
  ];

  return (
    <>
      <TopList topList={topList} />
      <div className={styles.container}>
        <SubHeader
          title="お気に入り一覧"
          text="あなたが登録したお気に入りの過去問やコンテンツ"
        />
        <div className={styles.pagesearch}>
          <section className={styles.pagesearch}>
            <input
              type="text"
              placeholder="講義名、教授名、学部、学科、年度"
            />
            <button className={styles.pagesearchbtn} aria-label="検索">
              <Image src={Logo} width={40} height={35} alt="icons" />
            </button>
          </section>

          <div className={styles.favorites}>
            {favoritePosts.map((post) => (
              
                <PostBlock tagList={post} />
             
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Mypage;
