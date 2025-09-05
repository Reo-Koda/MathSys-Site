import Link from "next/link";
import { JSX } from "react";
import styles from "./styles.module.css";

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

const PostBlock = ({ tagList }: Props): JSX.Element => {
  return (
    <Link href={ `/about/${ tagList.postId }` }>
      <article className={ styles.post } >
        <h2>{ tagList.class } { tagList.category } { tagList.year }</h2>
        <div className={ styles.tagContainer }>
           <p onClick={ (e) => e.preventDefault() }>{ tagList.doctor }</p>
           <p onClick={ (e) => e.preventDefault() }>{ tagList.department }</p>
           <p onClick={ (e) => e.preventDefault() }>{ tagList.major }</p>
        </div>
        <div className={ styles.nameday }>
          <p>投稿者: { tagList.author }</p>
          <p>投稿日: { tagList.createdDay.toString().split("T")[0] }</p>
        </div>
      </article>
    </Link>
  );
}

export default PostBlock;