import { link } from "fs";
import styles from "./styles.module.css";
import Link from "next/link";

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
}

type Props = {
  tagList: tag
}

const PostBlock = ({ tagList }: Props) => {

  return (
    <Link href={ `/about/${ tagList.postId }` }>
      <article className={ styles.post }>
        <h2>{ tagList.class } { tagList.category } { tagList.year }</h2>
        <div className={ styles.tagContainer }>
          <p>{ tagList.doctor }</p>
          <p>{ tagList.department }</p>
          <p>{ tagList.major }</p>
        </div>
        <p>投稿者: { tagList.author }</p>
        <p>投稿日: { tagList.createdDay }</p>
      </article>
    </Link>
  );
}

export default PostBlock;