import styles from "./page.module.css";
import TopList from "../../components/topList";

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
  return (
    <>
    <TopList topList={ topList }/>
    <div className={ styles.divs }>Post</div>
    </>
  );
}

export default Post;