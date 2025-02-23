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
}

type Props = {
  tagList: tag
  index: number
}

const PostBlock = ({ tagList, index }: Props) => {
  return (
    <article className={ styles.post } key={ index }>
      <h2>{ tagList.class } { tagList.category } { tagList.year }</h2>
      <div className={ styles.tagContainer }>
        <p>{ tagList.doctor }</p>
        <p>{ tagList.department }</p>
        <p>{ tagList.major }</p>
      </div>
      <p>投稿者: { tagList.author }</p>
      <p>投稿日: { tagList.createdDay }</p>
    </article>
  );
}

export default PostBlock;