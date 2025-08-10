import { JSX } from "react"
import styles from "./styles.module.css"
import SubHeader from "src/components/subHeader";
import PostBlock from "src/components/postBlock"; 
import { tag } from "src/data/tag";
import SearchContainer from "../searchContainer";

type Props = {
	title: string
	text: string
  posts: tag[]
  isLoading: boolean
  message1: string
  message2: string
}

const TitleHeader = ({ title, text, posts, isLoading, message1, message2}: Props): JSX.Element => {
  return (
    <>
    <SubHeader
          title={title}
          text={text}
    />
    
    <div className={styles.favorites}>
        { isLoading ? <p className={styles.para}>データを取得中...</p> :
        <>
        { posts ?  posts.map((post) => (
            <PostBlock tagList={post} key={post.postId}/>
            )) : <p className={styles.para}>{message1}<br />{message2}</p> }
        </>
        }
    </div>
    </>
  )
}

export default TitleHeader;