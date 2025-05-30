"use client";
import { useEffect, useState} from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import TopList from "../../components/topList";
import { topList } from "src/data/topList";
import SubHeader from "src/components/subHeader";
import PostBlock from "src/components/postBlock"; 
import SearchContainer from "src/components/searchContainer";

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

const Mypage = () => {
  const router = useRouter();
  const [posts, setPosts] = useState<tag[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      router.push("/signin");
      return;
    }

    setIsLoading(true);
    const getPosts = async () => {
      try {
        const url = new URL(
          `${process.env.NEXT_PUBLIC_API_URL}/api/favorites`
        );
        url.searchParams.set("q", token);
        
        const res = await fetch(url.toString());
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
      <TopList topList={topList} />
      <div className={styles.container}>
        <SubHeader
          title="お気に入り一覧"
          text="あなたが登録したお気に入りの過去問やコンテンツ"
        />
        <div className={styles.pagesearch}>
          <SearchContainer />
        
          <div className={styles.favorites}>
            { isLoading ? <p>データを取得中...</p> :
              <>
              { posts ?  posts.map((post) => (
                  <PostBlock tagList={post} key={post.postId}/>
                )) : <p>null data</p> }
              </>
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default Mypage;
