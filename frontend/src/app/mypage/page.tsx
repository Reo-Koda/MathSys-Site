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
  const [selfPosts, setSelfPosts] = useState<tag[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const getPosts = async () => {
      setIsLoading(true);
      try {
        const url = new URL(
          `${process.env.NEXT_PUBLIC_API_URL}/favorites`
        );
        
        const res = await fetch(url.toString(), {
          method: "GET",
          credentials: "include", // セッションID（Cookie）を送信
        });
        const json = await res.json();
        
        if (res.ok) {
          setPosts(json.posts);
        } else {
          setMessage(json.error || "認証に失敗しました");
          // 401 ならログインページに戻す
          if (res.status === 401) {
            router.push("/signin");
          }
          return;
        }
        
      } catch (err: any) {
        console.error("API error:", err);
      } finally {
        setIsLoading(false);
      } 
    }

    const getSelfPosts = async () => {
      setIsLoading(true);
      try {
        const url = new URL(
          `${process.env.NEXT_PUBLIC_API_URL}/posts/self`
        );
        
        const res = await fetch(url.toString(), {
          method: "GET",
          credentials: "include", // セッションID（Cookie）を送信
        });
        const json = await res.json();
        if (res.ok) {
          setSelfPosts(json.posts);
        } else {
          setMessage(json.error || "認証に失敗しました");
          // 401 ならログインページに戻す
          if (res.status === 401) {
            router.push("/signin");
          }
          return;
        }
      } catch (err: any) {
        console.error("API error:", err);
      } finally {
        setIsLoading(false);
      } 
    }

    getPosts();
    getSelfPosts();
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
          { message && <p>{ message }</p> }
        
          <div className={styles.favorites}>
            { isLoading ? <p>データを取得中...</p> :
              <>
              { posts ?  posts.map((post) => (
                  <PostBlock tagList={post} key={post.postId}/>
                )) : <p>お気に入り登録がされていません<br />気になる投稿を保存していつでも見返せるようにしましょう</p> }
              </>
            }
          </div>
        </div>

        <SubHeader
          title="自分の投稿"
          text="あなたが投稿したの過去問やコンテンツ"
        />
        <div className={styles.favorites}>
          { isLoading ? <p>データを取得中...</p> :
            <>
            { selfPosts ?  selfPosts.map((post) => (
                <PostBlock tagList={post} key={post.postId}/>
              )) : <p>過去の投稿がありません<br />役に立った過去問を投稿してみんなに共有してみましょう</p> }
            </>
          }
        </div>
        
      </div>
    </>
  );
};

export default Mypage;
